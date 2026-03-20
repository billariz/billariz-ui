/**
 * Copyright (C) 2025 Uppli SAS — Billariz
 *
 * This file is part of Billariz, licensed under the GNU Affero General
 * Public License v3.0 (AGPL-3.0). You may use, modify and distribute
 * this software under the terms of the AGPL-3.0.
 *
 * For commercial use without AGPL obligations, contact:
 * contact@billariz.com | contact@uppli.fr
 * https://billariz.com
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_TYPE } from 'src/constants/enums';
import PropsException from 'src/exceptions/propsException';
import {
  getParametersByName,
  getParametersAutocomplete,
} from 'src/redux/slices/parameter';

export default function useTableFilters(props) {
  // Check if props or filters are missing; throw an error if they are
  if (!props?.filters) {
    throw new PropsException(['filters']);
  }

  const queryParamFilters = Object.fromEntries(props.queryParamFilters ?? []);
  const dispatch = useDispatch();
  const { parametersByName } = useSelector((state) => state.parameters);

  // Manage applied filter states and set initial states
  const [appliedFilters, setAppliedFilters] = useState([]);
  let filters = Object.values(props.filters);

  // Initialize state for filter inputs and values based on the filter structure
  const [inputs, setInputs] = useState(
    initializeInputs(filters, queryParamFilters)
  );
  const [values, setValues] = useState(initializeValues(filters));

  // Assign inputs and values to filters in a structured format
  filters = assignInputsAndValues(filters, inputs, values);

  // Process filters to dispatch values based on filter type and load states
  const processFilters = (filters) => {
    for (const filter of filters) {
      if (
        [FILTER_TYPE.SELECT_BOX, FILTER_TYPE.TAB].includes(filter.type) &&
        !filter.valuesLoaded
      ) {
        dispatch(getParametersByName(filter.parameterName));
        filter.valuesLoaded = true;
      }
      if (
        [FILTER_TYPE.AUTOCOMPLETE].includes(filter.type) &&
        !filter.valuesLoaded
      ) {
        const filterEntries = Object.fromEntries(appliedFilters);
        const requestAdditionelParams = filter.additionelParams
          ? filter.additionelParams(filterEntries)
          : null;
        if (!filter.dynamicFetching?.isDynamic) {
          dispatch(
            getParametersAutocomplete(
              filter.parameterName,
              filter.category,
              null,
              requestAdditionelParams
            )
          );
        }

        filter.valuesLoaded = true;
      }
      // Process nested child filters recursively
      if (filter.child) {
        filter.child = Object.values(filter.child);
        processFilters(filter.child);
      }
    }
  };

  useEffect(() => {
    let newFilterValuesState = [...values];

    // Update values based on parameter data from Redux store
    for (const parameterName in parametersByName) {
      if (Object.getOwnPropertyDescriptor(parametersByName, parameterName)) {
        const value = [
          ...(filters.some(
            (filter) =>
              filter.parameterName === parameterName && filter.addAllValue
          )
            ? [
                {
                  value: '*',
                  standardLabel: 'All',
                  defaultLabel: 'Tous',
                  category: 'ALL',
                  subCategory: 'ALL',
                },
              ]
            : []),
          ...parametersByName[parameterName],
        ];
        // Recursively update values for nested filters
        updateFilterValues(filters, parameterName, value, newFilterValuesState);
      }
    }

    setValues(newFilterValuesState);

    // Initialize inputs with default values and update recursively for children
    let inputValues = initializeInputs(filters);
    for (const filterIndex in filters) {
      if (Object.hasOwn(filters, filterIndex)) {
        const filter = filters[filterIndex];
        inputValues[filter.index] = filter.value || filter.defaultValue || ''; // Use filter.index
        updateInputValues(filter.child ?? [], inputValues);
      }
    }
    setInputs(inputValues);
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametersByName]);

  processFilters(Object.values(filters));

  // Handle changes in field values by updating inputs and applying changes
  const onFieldValueChanges = (id, newValue, applyChanges) => {
    //set ValueLoaded to filters dependOn on filter id
    filters
      .filter((filter) => filter.dependOn == id)
      .forEach((filter) => {
        filter.valuesLoaded = false;
      });
    const filterIndex = findFilterIndex(filters, id);
    if (filterIndex !== null) {
      const newFiltersState = [...inputs]; // Copy current inputs
      newFiltersState[filterIndex] = newValue; // Update only the relevant index
      setInputs(newFiltersState);
      if (applyChanges) {
        applyFiltersFromInputs(newFiltersState);
      }
    }
  };

  // Reset all filters to initial input values
  const resetFilters = () => {
    if (appliedFilters.length > 0) {
      setInputs(initializeInputs(filters));
      setAppliedFilters([]);
    }
  };

  // Apply filters based on current input values and check if changes occurred
  const applyFiltersFromInputs = (arrayFilters) => {
    const flattenFilters = (
      filters,
      filterValues,
      result = [],
      index = { value: 0 }
    ) => {
      filters.forEach((filter) => {
        result.push([filter.id, filterValues[index.value]]);
        index.value += 1;
        if (filter.child) {
          flattenFilters(filter.child, filterValues, result, index);
        }
      });
      return result;
    };

    // Filter out invalid values and compare with current applied filters
    const resultFilters = flattenFilters(filters, arrayFilters).filter(
      ([, value]) => value && value !== 'all' && value !== '*'
    );

    const newAppliedFilters = [...resultFilters];
    if (
      newAppliedFilters.length !== appliedFilters.length ||
      !newAppliedFilters.every(
        ([key, value], i) =>
          key === appliedFilters[i][0] && value === appliedFilters[i][1]
      )
    ) {
      setAppliedFilters(newAppliedFilters);
    }
  };

  const applyFilters = () => {
    applyFiltersFromInputs(inputs);
  };

  return {
    filters,
    appliedFilters,
    applyFilters,
    resetFilters,
    onFieldValueChanges,
  };
}

// Initialize input states based on default values and handle nested children
const initializeInputs = (filters, queryParamFilters) => {
  let inputs = [];
  filters.forEach((item) => {
    inputs[item.index] =
      queryParamFilters?.[item.id] ?? item.defaultValue ?? ''; // Use nullish coalescing (??)

    if (item.child) {
      inputs = inputs.concat(initializeInputs(Object.values(item.child)));
    }
  });
  return inputs;
};

// Initialize value state arrays for filters, including nested children
const initializeValues = (filters) => {
  let values = [];
  filters.forEach((item) => {
    values[item.index] = []; // Use item.index to ensure the correct index
    if (item.child) {
      values = values.concat(initializeValues(Object.values(item.child)));
    }
  });
  return values;
};

// Assign input and value states to the filters, handling nested children
const assignInputsAndValues = (filters, inputs, values) =>
  filters.map((filter) => {
    filter.value = inputs[filter.index] || ''; // Use filter.index
    filter.values = values[filter.index] || [];
    if (filter.child) {
      filter.child = assignInputsAndValues(
        Object.values(filter.child),
        inputs,
        values
      );
    }
    return filter;
  });

// Update values in filters based on parameterName, handling nested children
const updateFilterValues = (
  filters,
  parameterName,
  value,
  newFilterValuesState
) => {
  filters.forEach((filter) => {
    // Use the filter's index to update the corresponding index in newFilterValuesState
    if (filter.parameterName === parameterName) {
      newFilterValuesState[filter.index] = value; // Use filter.index here
    }
    // Recursively update child filters
    if (filter.child) {
      updateFilterValues(
        Object.values(filter.child),
        parameterName,
        value,
        newFilterValuesState
      );
    }
  });
};

// Update input values for filters, including nested child filters
const updateInputValues = (filters, inputValues) => {
  filters.forEach((filter) => {
    inputValues[filter.index] = filter.defaultValue || ''; // Use filter.index here
    if (filter.child) {
      updateInputValues(Object.values(filter.child), inputValues);
    }
  });
};

// Find the index of a filter by ID, traversing nested child filters
const findFilterIndex = (filtersArray, id, indexCounter = { count: 0 }) => {
  for (const filter of filtersArray) {
    if (filter.id === id) {
      return indexCounter.count;
    }
    indexCounter.count++;
    if (filter.child) {
      const childIndex = findFilterIndex(filter.child, id, indexCounter);
      if (childIndex !== null) {
        return childIndex;
      }
    }
  }
  return null;
};

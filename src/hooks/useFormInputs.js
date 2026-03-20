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

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropsException from 'src/exceptions/propsException';
import {
  getParametersByName,
  getParametersAutocomplete,
} from 'src/redux/slices/parameter';
import PropTypes from 'prop-types';

useFormInputs.propTypes = {
  inputsConfig: PropTypes.array,
};
export default function useFormInputs({ inputsConfig, currentObject, parent }) {
  if (!inputsConfig) {
    throw new PropsException(['inputs']);
  }

  const dispatch = useDispatch();

  const [selectedValues, setSelectedValues] = useState(
    Array(inputsConfig.length).fill('')
  );

  const [values, setValues] = useState(Array(inputsConfig.length).fill([]));
  const [valuesLoaded, setValuesLoaded] = useState(false);

  const { parametersByName } = useSelector((state) => state.parameters);

  const getInputsValidation = () =>
    inputsConfig.reduce((res, input) => {
      res[input.name] = input.validation;
      return res;
    }, {});

  const getDefaultValues = () =>
    inputsConfig.reduce((res, input) => {
      res[input.name] =
        input.getCurrentValue(currentObject) ??
        (input.validation?.spec?.optional && input.getDefaultValue
          ? input.getDefaultValue()
          : '');
      return res;
    }, {});

  const getEmptyValues = () =>
    inputsConfig.reduce((res, input) => {
      res[input.name] = input.getDefaultValue();
      return res;
    }, {});

  const getValues = (action) => {
    if (action === 'add') {
      return getEmptyValues();
    }
    return getDefaultValues();
  };

  const inputs = useMemo(
    () =>
      inputsConfig.map((input, index) => {
        input.values = values[index];
        if (Array.isArray(input.appendValues))
          input.values = [...input.appendValues, ...input.values];

        if (input.values) {
          try {
            const defaultObject =
              input.values.find(
                (value) =>
                  value.id ===
                  (selectedValues[index].id || selectedValues[index])
              ) || input.values[0];
            input.value = defaultObject?.id || selectedValues[index];
            input.defaultValue = defaultObject;
            input.parentEntity = parent;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            input.value = selectedValues[index];
          }
        }

        return input;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputsConfig, selectedValues, values]
  );

  useEffect(() => {
    let newInputValuesState = [...values];

    for (const input of inputs) {
      const { parameterName } = input;
      if (Object.hasOwn(parametersByName, parameterName)) {
        const value = [...parametersByName[parameterName]];
        const index = inputs.indexOf(input);

        newInputValuesState = Object.assign(newInputValuesState, {
          [index]: value,
        });
      }
    }
    setValues(newInputValuesState);

    let inputValues = Array(inputs.length).fill('');
    for (const inputIndex in inputs) {
      if (Object.hasOwn(inputs, inputIndex)) {
        const input = inputs[inputIndex];
        inputValues = Object.assign([...inputValues], {
          [inputIndex]: input.getCurrentValue(currentObject) || '',
        });
      }
    }
    setSelectedValues(inputValues);
    setValuesLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parametersByName, inputsConfig]);

  useEffect(() => {
    for (const input of inputs) {
      if (
        (input.type === 'RHFSelect' || input.type === 'RHFMultiselect') &&
        !input.valuesLoaded
      ) {
        dispatch(getParametersByName(input.parameterName));
        input.valuesLoaded = true;
      }
      if (
        input.type === 'RHFAutocomplete' &&
        !input.dependOn &&
        (!input.valuesLoaded || input.additionelParams)
      ) {
        const additionelParams = input.additionelParams
          ? input.additionelParams(parent || {})
          : null;
        if (!input.dynamicFetching) {
          dispatch(
            getParametersAutocomplete(
              input.parameterName,
              input.category,
              null,
              additionelParams
            )
          );
        }

        input.valuesLoaded = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent]);

  return {
    inputs,
    valuesLoaded,
    getInputsValidation,
    getDefaultValues,
    getValues,
  };
}

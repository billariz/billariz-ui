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

import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import Label from 'src/components/Label';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { getParametersAutocomplete } from 'src/redux/slices/parameter';

TableHeaderAutocomplete.propTypes = {
  filter: PropTypes.object,
  onChanges: PropTypes.func,
  appliedFilters: PropTypes.array,
};

export default function TableHeaderAutocomplete({
  filter,
  onChanges,
  appliedFilters,
}) {
  const { translate, currentLang, translateBackend } = useLocales();
  const dispatch = useDispatch();

  // In TableHeaderAutocomplete component
  const [autocompleteValue, setAutocompleteValue] = useState(
    filter.values.find((i) => i.id === filter.value) || null
  );
  // Add this useEffect to sync local state with prop changes
  useEffect(() => {
    const newValue = filter.values.find((i) => i.id === filter.value);
    setAutocompleteValue(newValue);
  }, [filter.value, filter.values]);

  const [loading, setLoading] = useState(false); // Loading state

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(async (finalParam) => {
      try {
        setLoading(true); // Set loading to true before dispatch
        await dispatch(
          getParametersAutocomplete(
            filter.parameterName,
            '',
            null,
            finalParam,
            false
          )
        );
      } finally {
        setLoading(false); // Set loading to false after dispatch
      }
    }, 300),
    []
  );

  return (
    <Autocomplete
      fullWidth
      size="small"
      label={translate(filter.label)}
      value={autocompleteValue}
      onChange={(event, newValue) => {
        const valueToSet = newValue || null; // Ensure we set null when clearing
        setAutocompleteValue(valueToSet);
        onChanges(
          filter.id,
          valueToSet ? valueToSet[filter.enumId || 'id'] : '',
          true
        );
      }}
      options={filter.values.sort((a, b) => {
        const aSubCategory =
          (a.subCategory && translateBackend(a.subCategory)) || '';
        const bSubCategory =
          (b.subCategory && translateBackend(b.subCategory)) || '';
        const aCategory = (a.category && translateBackend(a.category)) || '';
        const bCategory = (b.category && translateBackend(b.category)) || '';
        return (
          -bSubCategory.localeCompare(aSubCategory) -
          bCategory.localeCompare(aCategory) * 10
        );
      })}
      groupBy={(option) =>
        (option.category && translateBackend(option.category)) ||
        (currentLang.locale === 'fr' ? 'Aucune catégorie' : 'No category')
      }
      getOptionLabel={(option) =>
        filter.getOptionDisplay
          ? filter.getOptionDisplay(option)
          : translateBackend(option) || option?.[filter.enumId || 'id']
      }
      filterOptions={(options, state) =>
        options.filter((option) => {
          const optionDisplay = filter.getOptionDisplay
            ? filter.getOptionDisplay(option)?.toLowerCase()
            : '';
          const label = translateBackend(option)?.toLowerCase() || '';
          const id = (option[filter.enumId || 'id'] || '')
            .toString()
            .toLowerCase();
          const query = state.inputValue.toLowerCase();
          return (
            label.includes(query) ||
            id.includes(query) ||
            optionDisplay.includes(query)
          );
        })
      }
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={translate(filter.label)}
          placeholder={
            filter?.dynamicFetching?.isDynamic
              ? translate('Utilities.tapeForSearch')
              : ''
          }
          onChange={(e) => {
            if (
              e.currentTarget.value &&
              e.currentTarget.value.length > 1 &&
              filter?.dynamicFetching?.isDynamic
            ) {
              const baseParam = `&${filter.dynamicFetching.key}=${e.currentTarget.value}`;
              const filterEntries = Object.fromEntries(appliedFilters || []);
              const additionalParam =
                filter.additionelParams && filterEntries[filter.dependOn]
                  ? `${filter.additionelParams(filterEntries)}`
                  : '';

              const finalParam = `${additionalParam}${baseParam}`;
              debouncedFetch(finalParam);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderGroup={(params) => (
        <div key={params.key + 'autocompleteGroup'}>
          <div className="MuiAutocomplete-GroupHead">{params.group}</div>
          <ul className="MuiAutocomplete-Group">{params.children}</ul>
        </div>
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option?.[filter.enumId || 'id']}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Label
              variant="random"
              color={
                !filter.getOptionDisplay
                  ? (option.subCategory &&
                      translateBackend(option.subCategory)) ||
                    ''
                  : filter.getOptionDisplay(option)
              }
              sx={{
                textTransform: 'uppercase',
                minHeight: 'auto',
                minWidth: 'auto',
                marginRight: '8px',
              }}
            >
              {!filter.getOptionDisplay
                ? (option.subCategory &&
                    translateBackend(option.subCategory)) ||
                  ''
                : filter.getOptionDisplay(option)}
            </Label>
            <div style={{ color: 'GrayText', fontSize: '10px' }}>
              {option?.[filter.enumId || 'id']}
            </div>
          </div>
          <div>{!filter.getOptionDisplay && translateBackend(option)}</div>
        </li>
      )}
    />
  );
}

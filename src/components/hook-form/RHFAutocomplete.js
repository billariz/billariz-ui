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

import PropTypes from 'prop-types';
// form
import { Controller, useFormContext, useWatch } from 'react-hook-form';
// @mui
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
//hooks
import { useCallback, useEffect, useMemo, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { useDispatch } from 'react-redux';

//Components
import Label from 'src/components/Label';

//Utils
import { debounce } from 'lodash';

//Actions
import { getParametersAutocomplete } from 'src/redux/slices/parameter';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  enumId: PropTypes.string,
  keyOption: PropTypes.string,
  dependOn: PropTypes.string,
  parameterName: PropTypes.string,
  additionelParams: PropTypes.func,
  getOptionDisplay: PropTypes.func,
  linkedField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }),
  dynamicFetching: PropTypes.object,
  autoSelectSingleOption: PropTypes.bool,
  parentEntity: PropTypes.object,
  formIndex: PropTypes.number,
};

export default function RHFAutocomplete({
  name,
  values,
  label,
  enumId,
  keyOption = 'subCategory',
  dependOn = null,
  parameterName,
  additionelParams,
  getOptionDisplay = null,
  linkedField = null,
  dynamicFetching = {},
  autoSelectSingleOption = false,
  parentEntity = {},
  formIndex, // Used when filtering items based on the screen it's open on
  ...other
}) {
  const { control, setValue } = useFormContext();
  const { currentLang, translateBackend, translate } = useLocales();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Loading state
  const currentFields = useWatch({ control });
  const dependOnValue = dependOn ? currentFields[dependOn] : null;

  const options = useMemo(
    () =>
      values.sort((a, b) => {
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
      }),
    [values, translateBackend]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(async (finalParam) => {
      try {
        setLoading(true); // Set loading to true when the request starts
        await dispatch(
          getParametersAutocomplete(parameterName, '', null, finalParam, false)
        );
      } finally {
        setLoading(false); // Set loading to false when the request ends
      }
    }, 300),
    []
  );

  const getAdditionalParam = () => {
    if (!additionelParams) return '';

    if (parentEntity && currentFields) {
      return `${additionelParams(parentEntity)}${additionelParams(currentFields)}`;
    }
    if (parentEntity) {
      return additionelParams(parentEntity);
    }
    if (dependOnValue) {
      return additionelParams(currentFields);
    }
    return '';
  };

  useEffect(() => {
    const currentFieldId =
      typeof formIndex == 'number'
        ? currentFields._embedded[formIndex][name.split('.')[1]]
        : currentFields[name];
    if (currentFieldId && dynamicFetching?.isDynamic) {
      dispatch(
        getParametersAutocomplete(
          parameterName,
          '',
          null,
          `&${enumId || 'id'}=${currentFieldId}`,
          false
        )
      );
    } else if (
      dependOnValue &&
      additionelParams &&
      parameterName &&
      !dynamicFetching?.isDynamic
    ) {
      const finalParam = getAdditionalParam();
      dispatch(
        getParametersAutocomplete(
          parameterName,
          '',
          null,
          finalParam,
          !dynamicFetching.isDynamic
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dependOnValue,
    additionelParams,
    parameterName,
    dynamicFetching.isDynamic,
  ]);

  useEffect(() => {
    if (
      options.length == 1 &&
      options[0][enumId || 'id'] &&
      autoSelectSingleOption &&
      !dynamicFetching?.isDynamic
    )
      setValue(name, options[0][enumId || 'id']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (typeof field.value === 'object')
          field.onChange(field.value[enumId || 'id']);
        return (
          <Autocomplete
            {...other}
            fullWidth
            size="small"
            label={label}
            value={
              options.find((value) => value[enumId || 'id'] == field.value) ||
              null
            }
            isOptionEqualToValue={(option, value) => {
              if (getOptionDisplay) {
                return getOptionDisplay(option) === getOptionDisplay(value);
              }
              return option[enumId || 'id'] === value[enumId || 'id'];
            }}
            onChange={(event, newValue) => {
              field.onChange(newValue?.[enumId || 'id'] || '');
              if (linkedField) {
                setValue(
                  linkedField.name,
                  newValue ? newValue[linkedField.key] : ''
                );
              }
            }}
            filterOptions={(options, state) =>
              options.filter((option) => {
                const optionDisplay = getOptionDisplay
                  ? getOptionDisplay(option)?.toLowerCase()
                  : '';
                const label = translateBackend(option)?.toLowerCase() || '';
                const id = (option[enumId || 'id'] || '')
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
            options={options}
            loading={loading}
            groupBy={(option) =>
              (option.category && translateBackend(option.category)) ||
              (currentLang.value === 'fr' ? 'Aucune catégorie' : 'No category')
            }
            getOptionLabel={(option) =>
              getOptionDisplay
                ? getOptionDisplay(option)
                : translateBackend(option) || option?.[enumId || 'id']
            }
            renderInput={(params) => (
              <TextField
                error={!!error}
                helperText={
                  error?.message ? `${label} ${translate(error?.message)}` : ''
                }
                {...params}
                label={label}
                placeholder={
                  dynamicFetching.isDynamic ? 'Start typing to search...' : ''
                }
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
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const minCharacter = dynamicFetching.minCharacter || 1;
                  if (
                    inputValue.length > minCharacter &&
                    dynamicFetching.isDynamic
                  ) {
                    const baseParam = `&${dynamicFetching.key}=${inputValue}`;
                    const finalParam = `${getAdditionalParam()}${baseParam}`;
                    debouncedFetch(finalParam);
                  }
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
                // eslint-disable-next-line react/prop-types
                key={option?.[enumId || 'id'] + props?.id}
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
                      !getOptionDisplay
                        ? (option[keyOption] &&
                            translateBackend(option[keyOption])) ||
                          (option.type && translateBackend(option.type)) ||
                          ''
                        : getOptionDisplay(option)
                    }
                    sx={{
                      textTransform: 'uppercase',
                      minHeight: 'auto',
                      minWidth: 'auto',
                      marginRight: '8px',
                    }}
                  >
                    {!getOptionDisplay
                      ? (option[keyOption] &&
                          translateBackend(option[keyOption])) ||
                        ''
                      : getOptionDisplay(option)}
                  </Label>
                  <div style={{ color: 'GrayText', fontSize: '10px' }}>
                    {option?.[enumId || 'id']}
                  </div>
                </div>
                <div>{!getOptionDisplay && translateBackend(option)}</div>
              </li>
            )}
          />
        );
      }}
    />
  );
}

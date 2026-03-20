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
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField, Chip } from '@mui/material';
//hooks
import { useMemo } from 'react';
import useLocales from 'src/hooks/useLocales';

//Components
import Label from 'src/components/Label';

//Utils

//Actions

// ----------------------------------------------------------------------

RHFMultiSelectAutocomplete.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  label: PropTypes.string,
  enumId: PropTypes.string,
  keyOption: PropTypes.string,
  getOptionDisplay: PropTypes.func,
  parentEntity: PropTypes.object,
  category: PropTypes.object,
};

export default function RHFMultiSelectAutocomplete({
  name,
  values,
  label,
  enumId,
  keyOption = 'subCategory',
  category = { category: 'category', parameterName: 'category' },
  getOptionDisplay = null,
  ...other
}) {
  const { control } = useFormContext();
  const { currentLang, translateBackend, translate } = useLocales();

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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...other}
          multiple // Enable multiple selections
          fullWidth
          size="small"
          label={label}
          value={options.filter((option) =>
            field.value?.includes(option[enumId || 'id'])
          )}
          isOptionEqualToValue={(option, value) => {
            if (getOptionDisplay) {
              return (
                getOptionDisplay(option, translate) ===
                getOptionDisplay(value, translate)
              );
            }
            return option[enumId || 'id'] === value[enumId || 'id'];
          }}
          onChange={(event, newValue) => {
            field.onChange(newValue.map((value) => value[enumId || 'id']));
          }}
          filterOptions={(options, state) =>
            options.filter((option) => {
              const optionDisplay = getOptionDisplay
                ? getOptionDisplay(option, translate)?.toLowerCase()
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
          groupBy={(option) =>
            (option[category.category] &&
              translate(
                `param_${category.parameterName}.${option[category.category]}`
              )) ||
            (currentLang.value === 'fr' ? 'Aucune catégorie' : 'No category')
          }
          getOptionLabel={(option) =>
            getOptionDisplay
              ? getOptionDisplay(option, translate)
              : translateBackend(option) || option?.[enumId || 'id']
          }
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={error?.message}
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
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
                      : getOptionDisplay(option, translate)
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
                    : getOptionDisplay(option, translate)}
                </Label>
                <div style={{ color: 'GrayText', fontSize: '10px' }}>
                  {option?.[enumId || 'id']}
                </div>
              </div>
              <div>{!getOptionDisplay && translateBackend(option)}</div>
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option[enumId || 'id']}
                label={
                  getOptionDisplay
                    ? getOptionDisplay(option, translate)
                    : translateBackend(option) || option[enumId || 'id']
                }
              />
            ))
          }
        />
      )}
    />
  );
}

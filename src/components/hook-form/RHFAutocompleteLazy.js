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
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Box, TextField } from '@mui/material';
import React, { useState, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import { getParametersAutocompleteApi } from 'src/api/parameters';
import useLocales from 'src/hooks/useLocales';

RHFAutocompleteLazy.propTypes = {
  name: PropTypes.string.isRequired, // Name for postal code
  cityName: PropTypes.string, // Name for city
  label: PropTypes.string,
};

export default function RHFAutocompleteLazy({ name, ...other }) {
  const { control } = useFormContext();
  const [postalCodeOptions, setPostalCodeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isPostalLoading, setIsPostalLoading] = useState(false);
  const { translate } = useLocales();
  const prevPostalCode = useRef();

  // Fetch postal codes with debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPostalCodes = useCallback(
    debounce(async (input) => {
      if (input.length >= 3) {
        setIsPostalLoading(true);
        try {
          const response = await getParametersAutocompleteApi(
            'postalCodes',
            'postalCode',
            `&postalCode=${input}`
          );
          setPostalCodeOptions(response._embedded.postalCodes || []);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching postal codes:', error);
        } finally {
          setIsPostalLoading(false);
        }
      }
    }, 300),
    []
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2 }}>
      {/* Postal Code Autocomplete */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          if (field.value && field.value != prevPostalCode.current) {
            (async () => {
              prevPostalCode.current = field.value;
              setIsPostalLoading(true);
              try {
                const response = await getParametersAutocompleteApi(
                  'postalCodes',
                  'postalCode',
                  `&postalCode=${field.value}`
                );
                const postalOptions = response._embedded.postalCodes || [];
                setPostalCodeOptions(postalOptions);

                // Extract city options for the provided postal code
                const cities = postalOptions
                  .filter((option) => option.postalCode === field.value)
                  .map((option) => option.cityName);
                setCityOptions(cities);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error(
                  'Error fetching postal codes for defaultValue:',
                  error
                );
              } finally {
                setIsPostalLoading(false);
              }
            })();
          }
          return (
            <Autocomplete
              {...other}
              sx={{ width: '50%' }}
              options={postalCodeOptions.filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((t) => t.postalCode === value.postalCode)
              )}
              loading={isPostalLoading}
              value={
                postalCodeOptions.find(
                  (option) => option.postalCode === field.value
                ) || null
              }
              onInputChange={(e, value) => fetchPostalCodes(value)}
              onChange={(e, newValue) => {
                field.onChange(newValue?.postalCode || '');
                const cities =
                  postalCodeOptions
                    .filter(
                      (option) => option.postalCode === newValue?.postalCode
                    )
                    ?.map((i) => i.cityName) || [];
                setCityOptions(cities);
              }}
              getOptionLabel={(option) => option?.postalCode || ''}
              isOptionEqualToValue={(option, value) =>
                option?.postalCode === value?.postalCode
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate('Customer.Forms.CustomerAddress.PostalCode')}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          );
        }}
      />

      {/* City Autocomplete */}
      <Controller
        name={'city'}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...other}
            sx={{ width: '50%' }}
            options={cityOptions}
            value={
              cityOptions.length == 1
                ? cityOptions[0]
                : cityOptions.find((option) => option === field.value) || null
            }
            onInputChange={() =>
              cityOptions.length === 1
                ? field.onChange(cityOptions[0])
                : cityOptions.length === 0 && field.onChange('')
            }
            onChange={(e, newValue) => {
              field.onChange(newValue || '');
            }}
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={translate('Customer.Forms.CustomerAddress.City')}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />
    </Box>
  );
}

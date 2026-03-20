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

/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css'; // Ensure this file is imported
import { Box, FormHelperText, FormControl } from '@mui/material';
import useLocales from 'src/hooks/useLocales';

// Custom styles for PhoneInput field
const phoneInputStyle = (error) => ({
  width: '100%',
  padding: '10px',
  marginTop: '-20px',
  border: `1px solid ${error ? '#FF625F' : '#ced4da'}`,
  borderRadius: '4px',
  fontSize: '20px',
  '&:focus': {
    borderColor: '#80bdff',
    outline: 'none',
  },
});

RHFPhoneInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFPhoneInput({ name, label, ...other }) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['fr'].includes(iso2);
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Box mt={2}>
            <PhoneInput
              {...field}
              defaultCountry="fr"
              countries={countries}
              disableCountryGuess
              disableDialCodePrefill
              disableDialCodeAndPrefix
              showDisabledDialCodeAndPrefix
              onChange={(value) => {
                field.onChange(value === '+33' ? '' : value);
              }}
              value={field.value || ''}
              placeholder={label}
              style={phoneInputStyle(error)} // Applying styles directly
              {...other}
            />
          </Box>
          {error && (
            <FormHelperText>
              {error?.message ? `${label} ${translate(error?.message)}` : ''}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

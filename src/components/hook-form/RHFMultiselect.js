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
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from '@mui/material';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

RHFMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  values: PropTypes.array,
};

export default function RHFMultiSelect({ name, label, values, ...other }) {
  const { control } = useFormContext();
  const { translate, translateBackend } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedValues = value ? value?.split(',') : [];
        return (
          <FormControl fullWidth error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              multiple
              value={selectedValues}
              onChange={(e) => {
                const newValue = e.target.value.join(',');
                onChange(newValue);
              }}
              renderValue={(selected) => selected.join(', ')}
              {...other}
            >
              {values?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={selectedValues.includes(option.value)} />
                  <ListItemText primary={translateBackend(option)} />
                </MenuItem>
              ))}
            </Select>
            {error && (
              <p
                style={{ color: 'red' }}
              >{`${label} ${translate(error?.message)}`}</p>
            )}
          </FormControl>
        );
      }}
    />
  );
}

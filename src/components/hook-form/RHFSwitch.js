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
import { Switch, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFSwitch.propTypes = {
  name: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function RHFSwitch({ name, setValue, disabled, ...other }) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              onChange={(e) => {
                if (!disabled) {
                  if (setValue) setValue(e.target.value === 'false');
                  field.onChange(e.target.value === 'false');
                }
              }}
              checked={field.value}
              color={disabled ? 'default' : 'primary'}
              sx={{ opacity: disabled ? 0.2 : 1 }}
            />
          )}
        />
      }
      {...other}
    />
  );
}

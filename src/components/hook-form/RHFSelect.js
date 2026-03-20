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
import { TextField } from '@mui/material';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func,
};

export default function RHFSelect({
  name,
  children,
  label,
  setValue,
  ...other
}) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          onChange={(e) => {
            if (setValue) setValue(e.target.value);
            field.onChange(e.target.value);
          }}
          select
          fullWidth
          SelectProps={{ native: true }}
          label={label}
          error={!!error}
          helperText={
            error?.message ? `${label} ${translate(error?.message)}` : ''
          }
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

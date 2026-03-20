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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import format from 'date-fns/format';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default function RHFDatePicker({ name, label, ...other }) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          slotProps={{
            textField: {
              size: 'small',
              error: !!error,
              helperText: error?.message
                ? `${label} ${translate(error?.message)}`
                : '',
            },
          }}
          label={label}
          disableMaskedInput
          sx={{ width: '100%' }}
          inputFormat="yyyy-MM-dd"
          format="yyyy-MM-dd"
          value={field.value ? new Date(field.value) : null} // Use `field.value` directly
          onChange={(newValue) => {
            try {
              field.onChange(format(newValue, 'yyyy-MM-dd'));
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('Error formating date:', e);
              field.onChange(newValue);
            }
          }}
          {...other}
        />
      )}
    />
  );
}

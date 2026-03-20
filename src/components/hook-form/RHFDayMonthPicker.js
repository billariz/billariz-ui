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
import parse from 'date-fns/parse';
import { useState } from 'react';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

RHFDayMonthPicker.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFDayMonthPicker({
  name,
  label,
  defaultValue,
  ...other
}) {
  const { control } = useFormContext();
  const { translate } = useLocales();

  const [currentDate, setCurrentDate] = useState(
    defaultValue ? parse(defaultValue, 'dd/MM', new Date()) : null
  );
  const [firstRender, setFirstRender] = useState(true);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (firstRender) {
          if (field.value) {
            setCurrentDate(parse(field.value, 'dd/MM', new Date()));
          } else if (defaultValue) {
            field.onChange(defaultValue);
          }
          setFirstRender(false);
        }
        return (
          <DatePicker
            views={['day', 'month']} // Restrict to day and month views
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
            sx={{ width: '100%' }}
            disableMaskedInput
            disableOpenPicker
            inputFormat="dd/MM"
            format="dd/MM"
            value={currentDate}
            onChange={(newValue) => {
              setCurrentDate(newValue);
              try {
                // Format the value as dd/MM
                const formattedValue = format(newValue, 'dd/MM');
                field.onChange(formattedValue);
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Error formating date:', e);
                field.onChange(newValue);
              }
            }}
            {...other}
          />
        );
      }}
    />
  );
}

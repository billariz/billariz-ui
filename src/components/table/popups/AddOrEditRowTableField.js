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

import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  RHFAutocomplete,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFMultiselect,
  RHFDatePicker,
  RHFEntity,
} from 'src/components/hook-form';
import RHFDayMonthPicker from 'src/components/hook-form/RHFDayMonthPicker';
import useLocales from 'src/hooks/useLocales';

AddOrEditRowTableField.propTypes = {
  fieldName: PropTypes.string,
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
  ]),
  inputs: PropTypes.array,
  formIndex: PropTypes.number,
  type: PropTypes.string,
};
export default function AddOrEditRowTableField({
  fieldName,
  fieldValue,
  inputs,
  formIndex,
  type, // edit/create form
}) {
  const { translate, translateBackend } = useLocales();

  const customFieldName = `_embedded[${formIndex}].${fieldName}`;

  const input = inputs.find((_) => _.name === fieldName);
  const { control } = useFormContext();
  const currentFields = useWatch({ control })._embedded[formIndex];

  return (
    <Grid
      key={customFieldName}
      item
      xs={input.size.xs}
      sm={input.size.sm}
      md={input.size.md}
      lg={input.size.lg}
    >
      {input.type === 'RHFTextField' && (
        <RHFTextField
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}

      {input.type === 'RHFSelect' && (
        <RHFSelect
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          InputLabelProps={{ shrink: true }}
          className={'addOrEditRowTableForm__select'}
          SelectProps={{
            native: true,
            sx: { textTransform: 'capitalize' },
          }}
          sx={{ maxWidth: { md: 200 } }}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        >
          <option value=""></option>
          {input.values &&
            input.values.length > 0 &&
            input.values.map((option) => (
              <option key={option?.id} value={option.value}>
                {translateBackend(option)}
              </option>
            ))}
        </RHFSelect>
      )}

      {input.type === 'RHFDatePicker' && (
        <RHFDatePicker
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}
      {input.type === 'RHFDayMonthPicker' && (
        <RHFDayMonthPicker
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          defaultValue={input.defaultDate}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}

      {input.type === 'RHFSwitch' && (
        <RHFSwitch
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}

      {input.type === 'RHFAutocomplete' && (
        <RHFAutocomplete
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          values={input.values}
          defaultValue={fieldValue}
          getOptionDisplay={input.getOptionDisplay}
          enumId={input.enumId}
          autoSelectSingleOption={input.autoSelectSingleOption}
          dynamicFetching={input.dynamicFetching}
          parameterName={input.parameterName}
          parentEntity={input.parentEntity}
          additionelParams={input.additionelParams}
          formIndex={formIndex}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}

      {input.type === 'RHFMultiselect' && (
        <RHFMultiselect
          size="small"
          name={customFieldName}
          label={translate(input.label)}
          values={input.values}
          disabled={
            input.disabled ||
            (input.disableEdit && type == 'edit') ||
            input.disabledOnCondition?.(currentFields)
          }
        />
      )}
      {input.type === 'RHFEntity' && !(input.hideOnEdit && type === 'edit') && (
        <RHFEntity
          name={customFieldName}
          label={translate(input.label)}
          getApi={input.getApi}
          columns={input.columns}
          config={input.filters}
          enityModel={input.enityModel}
          entityKey={input.entityKey}
          form={input.form}
          addApi={input.addApi}
          formIndex={formIndex}
          subject={input.subject}
        />
      )}
    </Grid>
  );
}

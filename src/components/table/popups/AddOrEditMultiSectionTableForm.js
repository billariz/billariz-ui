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
// @mui
import { Stack, Grid, Card, Box, Button } from '@mui/material';
import { useMemo, useEffect, useState, memo } from 'react';
import useLocales from 'src/hooks/useLocales';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import useFormInputs from 'src/hooks/useFormInputs';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFImagePicker,
  RHFMultiSelect,
  RHFPhoneInput,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import FormTabsBuilder from 'src/components/forms/FormTabsBuilder';
import { transformFormObject } from 'src/utils/transformFormObject';
import UploadPopup from './uploadPopup';
import useToggle from 'src/hooks/useToggle';
import Iconify from 'src/components/Iconify';

// components
AddOrEditMultiSectionTableForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  currentObject: PropTypes.object,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  action: PropTypes.string,
  enableImport: PropTypes.bool,
};
function deepMerge(original, transformed) {
  for (const key in transformed) {
    // Check if the key in transformed is an object
    if (
      typeof transformed[key] === 'object' &&
      transformed[key] !== null &&
      !(transformed[key] instanceof Array) // Ignore arrays
    ) {
      // Merge the entire nested object from original into transformed
      if (original[key] && typeof original[key] === 'object') {
        transformed[key] = { ...original[key], ...transformed[key] };
      }
    }
  }
  return transformed;
}
export default function AddOrEditMultiSectionTableForm({
  open,
  form,
  currentObject,
  onSubmit,
  action,
  enableImport,
}) {
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();
  const { translate } = useLocales();
  const [onSubmitAttempt, setOnSubmitAttempt] = useState(false);
  const items = Object.keys(form).map((key) => ({
    label: `TableTabs.${key}`, // Tab label is dynamic
    value: key,
    form: form[key],
  }));

  const combinedInputs = useMemo(
    () => items.reduce((acc, section) => [...acc, ...section.form.FIELDS], []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getInputsValidation, getDefaultValues, inputs } = useFormInputs({
    inputsConfig: combinedInputs,
    currentObject,
  });
  const validations = getInputsValidation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues = useMemo(() => getDefaultValues(), [currentObject]);
  const schema = useMemo(() => Yup.object().shape(validations), [validations]);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;
  const currentFields = useWatch({ control });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categorized = {};

  inputs
    .filter((input) => !input.displayOn || input.displayOn(currentFields))
    .forEach((input) => {
      const categoryKey = input.tab; // Use the `tab` key for categorization
      if (!categorized[categoryKey]) {
        categorized[categoryKey] = [];
      }
      categorized[categoryKey].push(input);
    });

  // Extract the first category for the top section
  const [topCategoryKey, ...remainingKeys] = Object.keys(categorized);
  const topCategory = useMemo(
    () => categorized[topCategoryKey] || [],
    [categorized, topCategoryKey]
  );
  const filteredCategories = remainingKeys.reduce((acc, key) => {
    acc[key] = categorized[key];
    return acc;
  }, {});

  useEffect(() => {
    if (open && currentObject) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, form]);
  const picture = useMemo(
    () => topCategory.find((input) => input.type == 'RHFPicture'),
    [topCategory]
  );

  return (
    <FormProvider {...methods}>
      <Stack direction="column" sx={{ py: 0, px: 0 }}>
        {/* First Tab always on top */}
        <Stack sx={{ py: 2.5, px: 3 }}>
          {picture ? (
            <Grid container spacing={2}>
              <Grid item xs={3.6}>
                <Card sx={{ py: 3, px: 3 }}>
                  <Box sx={{ mb: 6 }}>
                    <RHFImagePicker name={picture.name} label={picture.label} />
                  </Box>
                  <RHFTextField
                    size="small"
                    name={picture.name}
                    label={translate(picture.label)}
                  />
                </Card>
              </Grid>
              <Grid item xs={8.4}>
                <TopCategoryContent
                  topCategory={topCategory}
                  action={action}
                  currentFields={currentFields}
                />
              </Grid>
            </Grid>
          ) : (
            <TopCategoryContent
              topCategory={topCategory}
              action={action}
              currentFields={currentFields}
            />
          )}
        </Stack>

        {!picture && (
          <Stack sx={{ py: 2.5, px: 3 }}>
            <FormTabsBuilder
              tabs={filteredCategories} // Dynamic fields based on selected tab
              errors={errors}
              onSubmitAttempt={onSubmitAttempt}
              action={action}
            />
          </Stack>
        )}

        <Stack direction="row" justifyContent="flex-end" sx={{ px: 3 }}>
          <Box>
            {enableImport && action === 'create' && (
              <Button
                size="small"
                startIcon={<Iconify icon="eva:upload-outline" />}
                onClick={onOpenFrom}
                sx={{ flexShrink: 0, mr: 2 }}
              >
                {translate('common.form.import')}
              </Button>
            )}
            <LoadingButton
              sx={{ height: '36px' }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={(data) => {
                setOnSubmitAttempt(!onSubmitAttempt);
                handleSubmit((data) => {
                  const id = currentObject?.id || null;
                  onSubmit(
                    action,
                    deepMerge(currentObject, transformFormObject(data, inputs)),
                    id
                  ); // Logs the submitted form data
                })(data);
              }}
            >
              {action === 'create'
                ? translate('common.form.saveLabel')
                : translate('common.form.updateLabel')}
            </LoadingButton>
          </Box>
        </Stack>
      </Stack>
      <UploadPopup
        open={openFrom}
        onClose={onCloseFrom}
        onSubmit={onSubmit}
        fields={combinedInputs}
      />
    </FormProvider>
  );
}

const TopCategoryContent = memo(({ topCategory, action, currentFields }) => {
  const { translate, translateBackend } = useLocales();
  return (
    <Grid container columns={{ xs: 4, sm: 12, md: 12 }} spacing={2}>
      {topCategory.map((input, i) => (
        <Grid
          item
          xs={input.size.xs}
          sm={input.size.sm}
          md={input.size.md}
          lg={input.size.lg}
          key={input.name + i}
        >
          {input.type === 'RHFTextField' && (
            <RHFTextField
              size="small"
              name={input.name}
              label={translate(input.label)}
              InputLabelProps={{ shrink: true }}
              disabled={
                input.disabled || (action == 'edit' && input.disableEdit)
              }
              sx={{ width: '100%' }}
            />
          )}
          {input.type === 'RHFPhoneField' && (
            <RHFPhoneInput
              disabled={
                input.disabled || (action == 'edit' && input.disableEdit)
              }
              size="small"
              name={input.name}
              label={translate(input.label)}
              InputLabelProps={{ shrink: true }}
            />
          )}

          {input.type === 'RHFMultiselect' && (
            <RHFMultiSelect
              size="small"
              name={input.name}
              values={input.values}
              label={translate(input.label)}
              disabled={
                input.disabled ||
                (input.disableEdit && action == 'edit') ||
                input.disabledOnCondition?.(currentFields)
              }
            />
          )}
          {input.type === 'RHFAutocomplete' && (
            <RHFAutocomplete
              size="small"
              name={input.name}
              label={translate(input.label)}
              values={input.values}
              dependOn={input.dependOn}
              additionelParams={input.additionelParams}
              parameterName={input.parameterName}
              getOptionDisplay={input.getOptionDisplay}
              linkedField={input.linkedField}
              dynamicFetching={input.dynamicFetching}
              disabled={
                input.disabled ||
                (input.disableEdit && action == 'edit') ||
                input.disabledOnCondition?.(currentFields)
              }
            />
          )}
          {input.type === 'RHFDatePicker' && (
            <RHFDatePicker
              disabled={
                input.disabled ||
                (input.disableEdit && action == 'edit') ||
                input.disabledOnCondition?.(currentFields)
              }
              label={translate(input.label)}
              name={input.name}
              sx={{ width: 1 }}
            />
          )}
          {input.type === 'RHFRadioGroup' && (
            <RHFRadioGroup
              size="small"
              name={input.name}
              options={input.values}
              getOptionLabel={input.values}
            />
          )}
          {input.type === 'RHFSwitch' && (
            <RHFSwitch
              size="small"
              name={input.name}
              label={translate(input.label)}
              disabled={
                input.disabled || (action == 'edit' && input.disableEdit)
              }
            />
          )}
          {input.type === 'RHFSelect' && (
            <RHFSelect
              size="small"
              name={input.name}
              label={translate(input.label)}
              InputLabelProps={{ shrink: true }}
              SelectProps={{
                native: true,
                sx: { textTransform: 'capitalize' },
              }}
              disabled={
                input.disabled ||
                (input.disableEdit && action == 'edit') ||
                input.disabledOnCondition?.(currentFields)
              }
              sx={{ width: '100%' }}
            >
              <option value=""></option>
              {input?.values?.map((option) => (
                <option key={option.value} value={option.value}>
                  {translateBackend(option)}
                </option>
              ))}
            </RHFSelect>
          )}
        </Grid>
      ))}
    </Grid>
  );
});

TopCategoryContent.propTypes = {
  topCategory: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  currentFields: PropTypes.object.isRequired,
};

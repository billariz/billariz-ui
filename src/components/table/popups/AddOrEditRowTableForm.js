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

import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Divider, Stack } from '@mui/material';

import { FormProvider } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';

//Yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddOrEditRowTableFieldsContainer from './AddOrEditRowTableFieldsContainer';
import UploadPopup from './uploadPopup';

import PropTypes from 'prop-types';

import './AddOrEditRowTableForm.css';

//Hooks
import useToggle from 'src/hooks/useToggle';
import useFormInputs from 'src/hooks/useFormInputs';
import useLocales from 'src/hooks/useLocales';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

AddOrEditRowTableForm.propTypes = {
  form: PropTypes.object,
  currentObject: PropTypes.object,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  parentEntity: PropTypes.object,
  enableImport: PropTypes.bool,
};
export default function AddOrEditRowTableForm({
  action,
  form,
  currentObject,
  onSubmit,
  onDelete,
  parentEntity,
  enableImport = false,
}) {
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const { translate } = useLocales();
  const { getInputsValidation, inputs, getValues } = useFormInputs({
    inputsConfig: form.FIELDS,
    currentObject,
    parent: parentEntity,
  });

  const validations = getInputsValidation();
  const validationSchema = Yup.object().shape(validations);

  const schema = Yup.object({
    _embedded: Yup.array().of(validationSchema),
  });

  const value = getValues(action);
  const values = [value];

  const defaultValues = useMemo(
    () => ({
      _embedded: values,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values, form.fields]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: '_embedded',
  });

  const onSubmitData = (data) => {
    // Check if _embedded exists and is an array
    if (Array.isArray(data._embedded)) {
      // Map over the array and convert string "true"/"false" values to booleans
      data._embedded = data._embedded.map((item) => {
        // Iterate over each key in the object
        Object.keys(item).forEach((key) => {
          if (item[key] === 'true') {
            item[key] = true;
          } else if (item[key] === 'false') {
            item[key] = false;
          }
        });
        return item;
      });
    }

    const id = currentObject?.id || null;
    onSubmit(action, data._embedded, id);
  };

  const addNewRow = () => {
    append(getValues());
  };

  const deleteRow = (index) => {
    if (fields.length > 1) remove(index);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitData)}>
      <Card
        container="true"
        spacing={2}
        columns={{ xs: 4, sm: 12, md: 12 }}
        padding={2}
        sx={{ p: 2 }}
      >
        <Stack
          divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />}
          spacing={3}
        >
          {fields.map((form, index) => (
            <Stack key={index} alignItems="flex-end" spacing={1.5}>
              <AddOrEditRowTableFieldsContainer
                form={form}
                formIndex={index}
                inputs={inputs}
                type={action}
              />
              {action === 'create' && form.length !== 1 && (
                <Button
                  size="small"
                  color="error"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={() => deleteRow(index)}
                >
                  {translate('common.form.removeLabel')}
                </Button>
              )}
            </Stack>
          ))}
        </Stack>
      </Card>
      <Box sx={{ mt: 1 }}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent={action == 'duplicate' ? 'end' : 'space-between'}
        >
          {action === 'create' && (
            <>
              <Button
                size="small"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={addNewRow}
                sx={{ flexShrink: 0 }}
              >
                {translate('common.form.addLabel')}
              </Button>
              <Box>
                {enableImport && (
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
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ flexShrink: 0 }}
                >
                  {translate('common.form.saveLabel')}
                </LoadingButton>
              </Box>
            </>
          )}
          {action === 'duplicate' && (
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ flexShrink: 0 }}
            >
              {translate('common.form.duplicate')}
            </LoadingButton>
          )}

          {action === 'edit' && (
            <>
              <div>
                {onDelete && (
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={onDelete}
                  >
                    {translate('common.form.removeLabel')}
                  </Button>
                )}
              </div>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ flexShrink: 0 }}
              >
                {translate('common.form.updateLabel')}
              </LoadingButton>
            </>
          )}
        </Stack>
      </Box>
      <UploadPopup
        open={openFrom}
        onClose={onCloseFrom}
        onSubmit={onSubmit}
        fields={form?.FIELDS}
      />
    </FormProvider>
  );
}

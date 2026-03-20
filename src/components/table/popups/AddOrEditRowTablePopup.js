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

import { Box, Dialog, Stack, Typography } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AddOrEditRowTableForm from './AddOrEditRowTableForm';
import PropTypes from 'prop-types';
import useLocales from 'src/hooks/useLocales';
import AddOrEditMultiSectionTableForm from './AddOrEditMultiSectionTableForm';

AddOrEditRowTablePopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  form: PropTypes.object,
  currentObject: PropTypes.object,
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  parentEntity: PropTypes.object,
  maxWidth: PropTypes.string,
  enableImport: PropTypes.bool,
};
export default function AddOrEditRowTablePopup({
  open,
  onClose,
  form,
  currentObject,
  action,
  onSubmit,
  onDelete,
  parentEntity,
  maxWidth = 'lg',
  enableImport,
}) {
  const { translate } = useLocales();

  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2.5, px: 3 }}
      >
        <Box sx={{ textAlign: { sm: 'left' }, py: 2.5, px: 3 }}>
          <Stack direction="row">
            <div style={{ marginRight: '5px' }}>
              <SettingsApplicationsIcon
                alt="Contract"
                color="primary"
                sx={{ fontSize: 30 }}
              />
            </div>
            <div style={{ marginRight: '5px' }}>
              <Typography variant="h6">
                {action === 'create'
                  ? translate('common.form.addLabel')
                  : translate('common.form.editLabel')}{' '}
                {open && action === 'edit'
                  ? currentObject.reference || currentObject.id
                  : ''}
              </Typography>
            </div>
          </Stack>
        </Box>
        {form.FIELDS ? (
          <AddOrEditRowTableForm
            form={form}
            action={action}
            currentObject={currentObject}
            onSubmit={onSubmit}
            onDelete={onDelete}
            parentEntity={parentEntity}
            enableImport={enableImport}
          />
        ) : (
          <AddOrEditMultiSectionTableForm
            open={open}
            onClose={onClose}
            currentObject={currentObject}
            form={form}
            onSubmit={onSubmit}
            action={action}
            parentEntity={parentEntity}
            enableImport={enableImport}
          />
        )}
      </Stack>
    </Dialog>
  );
}

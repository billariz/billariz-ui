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

import PropTypes from 'prop-types';
import CSVReader from 'src/components/csvReader';

//Hooks
import useLocales from 'src/hooks/useLocales';

//Icons
import UploadFileIcon from '@mui/icons-material/UploadFile';

UploadPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  maxWidth: PropTypes.string,
  fields: PropTypes.array,
};
export default function UploadPopup({
  open,
  onClose,
  maxWidth = 'lg',
  onSubmit,
  fields,
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
              <UploadFileIcon
                alt="upload"
                color="primary"
                sx={{ fontSize: 30 }}
              />
            </div>
            <div style={{ marginRight: '5px' }}>
              <Typography variant="h6">
                {translate('common.form.import')}
              </Typography>
            </div>
          </Stack>
        </Box>
        <CSVReader onSubmit={onSubmit} fields={fields} />
      </Stack>
    </Dialog>
  );
}

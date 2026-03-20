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
import DangerousIcon from '@mui/icons-material/Dangerous';
import { Box, Button, Dialog, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useLocales from 'src/hooks/useLocales';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

DeleteRowTablePopup.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  currentIds: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default function DeleteRowTablePopup({
  open,
  onClose,
  currentIds,
  onSubmit,
}) {
  const { translate } = useLocales();
  const theme = useTheme();

  const onDelete = async () => {
    Array.isArray(currentIds) &&
      currentIds.length > 0 &&
      currentIds.forEach((id) => onSubmit('delete', null, id));
  };

  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose}>
      <Stack
        direction='column'
        alignItems='center'
        justifyContent='space-between'
        sx={{ py: 2.5, px: 3 }}
      >
        <Box sx={{ textAlign: { sm: 'left' }, py: 2.5, px: 3 }}>
          <Stack direction='row'>
            <div style={{ marginRight: '5px' }}>
              <DangerousIcon
                alt='Contract'
                color='error'
                sx={{ fontSize: 30 }}
              />
            </div>
            <div style={{ marginRight: '5px' }}>
              <Typography variant='h6'>
                {translate('common.form.removeLabel')}
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={'info'}
                  sx={{ textTransform: 'info' }}
                >
                  {Array.isArray(currentIds) &&
                    currentIds.length > 0 &&
                    currentIds.map((id) => <span key={id}>#{id}</span>)}
                </Label>
              </Typography>
            </div>
          </Stack>
          <Stack
            spacing={2}
            direction='row'
            justifyContent='left'
            paddingTop={3}
            paddingLeft={4}
          >
            <Typography variant='h7'>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={'error'}
                sx={{ textTransform: 'info' }}
              >
                {translate('common.form.deleteMessage2nd')}
              </Label>
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ p: 1, mt: 1 }}>
        <Stack spacing={2} direction='row' justifyContent='right'>
          <Button size='small' variant='contained' onClick={onClose}>
            {translate('common.form.cancelLabel')}
          </Button>
          <Button
            size='small'
            color='error'
            variant='contained'
            startIcon={<Iconify icon='eva:trash-2-outline' />}
            onClick={onDelete}
          >
            {translate('common.form.removeLabel')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

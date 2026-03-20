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

import { IconButton, Stack, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import updateBilingRunApi from 'src/api/billingRuns/updateBillingRun';
import useLocales from 'src/hooks/useLocales';
import Iconify from '../../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';
//

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  billingRun: PropTypes.object.isRequired,
};

export default function InvoiceToolbar({ billingRun }) {
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const launchAction = async (action) => {
    const billObj = {
      status: action,
    };
    dispatch(startLoading());
    const result = await updateBilingRunApi(billingRun.id, billObj);
    if (result) {
      enqueueSnackbar(translate('Parameter.UpdateSuccess'), {
        variant: 'success',
      });
    }
    dispatch(finishLoading());
  };

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="right"
      alignItems={{ sm: 'center' }}
      sx={{ mb: 2, ml: 2 }}
    >
      <Stack direction="row" spacing={1}>
        <Tooltip title="Check" onClick={() => launchAction('VALIDATION')}>
          <IconButton>
            <Iconify icon={'ic:baseline-bookmark-added'} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print" onClick={() => launchAction('PRINTSHOP')}>
          <IconButton>
            <Iconify icon={'eva:printer-fill'} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

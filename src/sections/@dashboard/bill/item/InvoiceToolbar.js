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
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Tooltip,
} from '@mui/material';

// hooks
import useLocales from 'src/hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Iconify from '../../../../components/Iconify';

//Actions
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';
import { dispatchBillAction, resetEvent } from 'src/redux/slices/bill';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import { downloadBillApi } from 'src/api/bills';

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceToolbar({ invoice }) {
  const { currentEvent } = useSelector((state) => state.bills);
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  function downloadPDF(blob) {
    try {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = invoice.reference
        ? `${invoice.reference}.pdf`
        : 'document.pdf';

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error decoding Base64 PDF:', error);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    height: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  const [open, setOpen] = useState(false);
  const [urlPdf, setUrlPdf] = useState('');

  useEffect(() => {
    if (!currentEvent?.name) return;
    const handleSuccess = (message) => {
      dispatch(finishLoading());
      enqueueSnackbar(translate(message), { variant: 'success' });
    };

    const handleError = () => {
      dispatch(finishLoading());
    };

    switch (currentEvent.name) {
      case TABLE_EVENTS_ENUMS.ROW_ADDED:
        handleSuccess('Utilities.addSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_UPDATED:
        handleSuccess('Utilities.updateSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_DELETED:
        handleSuccess('Utilities.deleteSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_ADD_ERROR:
      case TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR:
      case TABLE_EVENTS_ENUMS.ROW_DELETE_ERROR:
        handleError();
        break;

      default:
        break;
    }
    dispatch(resetEvent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvent]);

  const launchAction = (action) => {
    dispatch(startLoading());
    dispatch(dispatchBillAction(action, null, invoice.id));
  };
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={'start'}
      width={'100%'}
      sx={{ mb: 2, ml: 2 }}
    >
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {urlPdf === '' ? (
            <Stack
              direction="row"
              sx={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Stack>
          ) : (
            <embed
              src={urlPdf}
              width="100%"
              height="100%"
              type="application/pdf"
            />
          )}
        </Box>
      </Modal>

      {/** Print */}
      {['CANCELED', 'VALIDATED'].includes(invoice.status) && !invoice.path && (
        <Tooltip
          title={translate('Bill.Printshop')}
          onClick={() => launchAction('PRINTED')}
        >
          <IconButton>
            <Iconify icon={'eva:printer-fill'} />
          </IconButton>
        </Tooltip>
      )}

      {/** Send */}
      {invoice.path && (
        <Tooltip title={translate('Bill.Send')}>
          <IconButton>
            <Iconify icon={'ic:round-send'} />
          </IconButton>
        </Tooltip>
      )}

      {/** Validate */}
      {['IN_FAILURE', 'CALCULATED'].includes(invoice.status) && (
        <Tooltip
          title={translate('Bill.Validate')}
          onClick={() => launchAction('VALIDATED')}
        >
          <IconButton>
            <Iconify icon={'ic:baseline-bookmark-added'} />
          </IconButton>
        </Tooltip>
      )}

      {/** Delete */}
      {['CALCULATED'].includes(invoice.status) && (
        <Tooltip
          title={translate('Bill.Delete')}
          onClick={() => launchAction('DELETE')}
        >
          <IconButton color="error">
            <Iconify icon={'eva:trash-2-fill'} />
          </IconButton>
        </Tooltip>
      )}

      {/** Cancel */}
      {['PRINTED', 'VALIDATED'].includes(invoice.status) && (
        <Tooltip
          title={translate('Bill.Cancel')}
          onClick={() => launchAction('CANCELED')}
        >
          <IconButton>
            <Iconify icon={'eva:close-circle-fill'} />
          </IconButton>
        </Tooltip>
      )}
      {/** Download */}
      {invoice.path && (
        <Tooltip title={translate('Utilities.Download')}>
          <IconButton
            onClick={async () => {
              const blob = await downloadBillApi(invoice.id);
              if (blob !== '') downloadPDF(blob);
            }}
          >
            <Iconify icon={'eva:download-fill'} />
          </IconButton>
        </Tooltip>
      )}

      {/** Display */}
      {invoice.path && (
        <Tooltip title={translate('Utilities.View')}>
          <IconButton
            onClick={async () => {
              setOpen(true);
              const blob = await downloadBillApi(invoice.id);
              setUrlPdf(window.URL.createObjectURL(blob));
            }}
          >
            <Iconify icon={'eva:eye-fill'} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

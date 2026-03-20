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
import { Box, Stack, Button } from '@mui/material';

// hooks
import useToggle from 'src/hooks/useToggle';
import useLocales from 'src/hooks/useLocales';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// components
import AddOrEditRowTablePopup from 'src/components/table/popups/AddOrEditRowTablePopup';
import Iconify from 'src/components/Iconify';

//Redux
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';

//Config
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';
import DeleteRowTablePopup from '../table/popups/DeleteRowTablePopup';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';
// ----------------------------------------------------------------------

Toolbar.propTypes = {
  entity: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  currentEvent: PropTypes.object,
  dispatchEntityAction: PropTypes.func,
  resetEvent: PropTypes.func,
  enableDelete: PropTypes.bool,
  subject: PropTypes.string,
};

export default function Toolbar({
  entity,
  dispatchEntityAction,
  resetEvent,
  form,
  currentEvent,
  enableDelete = true,
  subject,
}) {
  const ability = abilityManager.getAbility();

  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const {
    toggle: openDeleteRowPopup,
    onOpen: onOpenDeleteRowPopup,
    onClose: onCloseDeleteRowPopup,
  } = useToggle();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (action, args, id) => {
    dispatch(startLoading());
    dispatch(dispatchEntityAction(action, args, id));
  };

  useEffect(() => {
    if (!currentEvent?.name) return;

    const handleSuccess = (message) => {
      dispatch(finishLoading());
      enqueueSnackbar(translate(message), { variant: 'success' });
      onCloseFrom();
      onCloseDeleteRowPopup();
    };

    const handleError = () => {
      dispatch(finishLoading());
    };

    switch (currentEvent.name) {
      case TABLE_EVENTS_ENUMS.ROW_ADDED:
        handleSuccess('Utilities.addSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_UPDATED:
      case TABLE_EVENTS_ENUMS.ROW_DELETED:
        handleSuccess('Utilities.updateSuccess');
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

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
      sx={{ mb: -1 }}
    >
      <Box sx={{ mt: 1 }}>
        {enableDelete && (
          <Can I="DELETE" a={subject} ability={ability}>
            <Button
              color="error"
              size="small"
              startIcon={<Iconify icon={'eva:trash-2-outline'} />}
              onClick={() => onOpenDeleteRowPopup()}
              sx={{ mr: 4 }}
              variant="outlined"
            >
              {translate('Utilities.Delete')}
            </Button>
          </Can>
        )}
        <Can I="UPDATE" a={subject} ability={ability}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Iconify icon={'eva:edit-fill'} />}
            onClick={onOpenFrom}
          >
            {translate('Utilities.Edit')}
          </Button>
        </Can>
      </Box>

      <AddOrEditRowTablePopup
        open={openFrom}
        onClose={onCloseFrom}
        form={form}
        action={'edit'}
        currentObject={entity}
        onSubmit={onSubmit}
      />
      <DeleteRowTablePopup
        open={openDeleteRowPopup}
        onClose={onCloseDeleteRowPopup}
        currentIds={[entity?.id]}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}

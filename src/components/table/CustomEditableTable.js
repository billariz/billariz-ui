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

/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import TABLE_EVENTS_ENUMS from './enums/TableEventsEnum';

//Hooks
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useToggle from 'src/hooks/useToggle';
import useLocales from 'src/hooks/useLocales';

// Actions
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

//Components
import FallBacks from '../fallbacks';
import AddOrEditRowTablePopup from './popups/AddOrEditRowTablePopup';
import DeleteRowTablePopup from './popups/DeleteRowTablePopup';
import CustomTable from './CustomTable';
import Iconify from '../Iconify';
import { useCSVDownloader } from 'react-papaparse';

//Utils
import { flatten } from 'flat';

CustomEditableTable.propTypes = {
  config: PropTypes.object,
  rows: PropTypes.array,
  totalCount: PropTypes.number,
  columns: PropTypes.array,
  isLoading: PropTypes.bool,
  dispatchCallback: PropTypes.func,
  handleOnDoubleClick: PropTypes.func,
  initialFilterValues: PropTypes.array,
  form: PropTypes.object,
  dispatchEvent: PropTypes.func,
  currentEvent: PropTypes.object,
  impliedValues: PropTypes.object,
  parentEntity: PropTypes.object,
  defaultFormValue: PropTypes.object,
  displayAddButton: PropTypes.bool,
  displayDeleteAction: PropTypes.bool,
  resetEvent: PropTypes.func,
  maxWidth: PropTypes.string,
  enablePagination: PropTypes.bool,
  subject: PropTypes.string,
  error: PropTypes.number,
  enableImport: PropTypes.bool,
};
export default function CustomEditableTable({
  config,
  rows,
  totalCount,
  columns,
  isLoading,
  dispatchCallback,
  initialFilterValues,
  form,
  dispatchEvent, // (action = create/edit/delete, args= objet)
  currentEvent,
  impliedValues,
  parentEntity,
  handleOnDoubleClick,
  defaultFormValue = {},
  displayAddButton = true,
  displayDeleteAction = false,
  resetEvent = null,
  maxWidth,
  enablePagination,
  subject,
  error,
  enableImport,
}) {
  const { CSVDownloader, Type } = useCSVDownloader();

  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
  const [currentObject, setCurrentObject] = useState({ posId: 'test' });
  const [currentIds, setCurrentIds] = useState(null);
  const [action, setAction] = useState('create');

  const renderBottomActions = () => (
    <>
      {displayAddButton && (
        <Can I="CREATE" a={subject} ability={ability}>
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{
              px: 3,
              py: 3,
              top: 0,
              position: { md: 'absolute' },
              flexShrink: 0,
            }}
            onClick={handleAddRow}
          >
            {translate('common.form.addLabel')}
          </Button>
        </Can>
      )}
    </>
  );
  const renderRowActions = (selectedItems, handleAction) => (
    <>
      {displayDeleteAction && (
        <Can I="DELETE" a={subject} ability={ability}>
          <Stack spacing={1} direction="row">
            <Tooltip title={translate('common.delete')}>
              <IconButton
                color="primary"
                onClick={() => handleAction('delete', selectedItems)}
              >
                <Iconify icon={'eva:trash-2-outline'} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Can>
      )}
      <Stack spacing={1} direction="row">
        <Tooltip title={translate('common.export')}>
          <span>
            <CSVDownloader
              className="csvdownloader"
              type={Type.Button}
              filename={subject}
              bom={true}
              data={() =>
                rows
                  .filter((row) => selectedItems.includes(row.id))
                  .map((row) => {
                    delete row._links;
                    return flatten(row, { maxDepth: 2 });
                  })
              }
            >
              <Iconify
                icon="eva:upload-outline"
                rotate={2}
                sx={{ width: '24px', height: '24px' }}
              />
            </CSVDownloader>
          </span>
        </Tooltip>
      </Stack>
    </>
  );

  const handleAddRow = () => {
    setCurrentObject(defaultFormValue);
    setCurrentIds([]);
    setAction('create');
    onOpenFrom();
  };

  const handleDuplicateRow = (element) => {
    setCurrentObject(element);
    setCurrentIds([]);
    setAction('duplicate');
    onOpenFrom();
  };

  const handleEditRow = (id, element) => {
    if (abilityManager.can('UPDATE', subject)) {
      setCurrentObject(element);
      setCurrentIds([element.id]);
      setAction('edit');
      onOpenFrom();
    } else {
      enqueueSnackbar(translate('Error.notAthorised'), { variant: 'error' });
    }
  };

  const handleDeleteRow = () => {
    setAction('delete');
    onOpenDeleteRowPopup();
  };

  const onSubmit = (action, args, id) => {
    dispatch(startLoading());
    dispatch(dispatchEvent(action, args, id, impliedValues));
  };

  const onCloseDeletePopup = () => {
    onCloseDeleteRowPopup();
    setAction('edit');
  };

  const onHandleAction = (action, selectedIds) => {
    switch (action) {
      case 'delete':
        setAction('delete');
        setCurrentIds(selectedIds);
        onOpenDeleteRowPopup();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!currentEvent?.name) return;

    const handleSuccess = (message) => {
      dispatch(finishLoading());
      enqueueSnackbar(translate(message), { variant: 'success' });
      onCloseDeletePopup();
      onCloseFrom();
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
    resetEvent && dispatch(resetEvent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvent]);

  return (
    <>
      <Can I="READ" a={subject} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <CustomTable
              config={config}
              rows={rows}
              totalCount={totalCount}
              columns={columns}
              isLoading={isLoading}
              dispatchCallback={dispatchCallback}
              handleDuplicateRow={handleDuplicateRow}
              handleOnDoubleClick={handleOnDoubleClick || handleEditRow}
              renderRowActions={renderRowActions}
              renderBottomActions={renderBottomActions}
              initialFilterValues={initialFilterValues}
              handleAction={onHandleAction}
              enablePagination={enablePagination}
              subject={subject}
              error={error}
            />
          ) : (
            <FallBacks errorCode={401} />
          )
        }
      </Can>

      <AddOrEditRowTablePopup
        open={openFrom}
        onClose={onCloseFrom}
        form={form}
        action={action}
        currentObject={currentObject}
        onSubmit={onSubmit}
        onDelete={handleDeleteRow}
        parentEntity={parentEntity}
        maxWidth={maxWidth}
        enableImport={enableImport}
      />

      <DeleteRowTablePopup
        open={openDeleteRowPopup}
        onClose={onCloseDeletePopup}
        currentIds={currentIds}
        onSubmit={onSubmit}
      />
    </>
  );
}

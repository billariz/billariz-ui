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

import { useState, useMemo } from 'react';

import SERVICE_ELEMENT_CONFIG from 'src/constants/serviceElement';

// components
import { CustomEditableTable } from '../../../../components/table';
// sections
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  dispatchServiceElementAction,
  getServiceElements,
  resetEvent,
} from 'src/redux/slices/serviceElement';
import { ServiceElementInfo } from '.';
import useToggle from 'src/hooks/useToggle';

// ----------------------------------------------------------------------

const columns = SERVICE_ELEMENT_CONFIG.COLUMNS;
const config = SERVICE_ELEMENT_CONFIG.FILTERS;
const form = SERVICE_ELEMENT_CONFIG.FORMS;

// ----------------------------------------------------------------------

ServiceElementList.propTypes = {
  tosId: PropTypes.number,
  contractId: PropTypes.number,
  posId: PropTypes.string,
};

export default function ServiceElementList({ contractId, tosId, posId }) {
  // states
  const { serviceElements, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.serviceElements);

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const [currentServiceElementId, setCurrentServiceElementId] = useState(null);
  const currentServiceElement = useMemo(
    () => serviceElements.find((e) => e.id === currentServiceElementId),
    [serviceElements, currentServiceElementId]
  );

  const initialFilterValues = [];
  if (tosId) initialFilterValues.push(['tosId', tosId]);
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const handleEditRow = (serviceElementId) => {
    setCurrentServiceElementId(serviceElementId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={serviceElements}
        totalCount={totalCount}
        columns={columns}
        isLoading={isLoading}
        dispatchCallback={getServiceElements}
        dispatchEvent={dispatchServiceElementAction}
        displayDeleteAction={true}
        handleOnDoubleClick={handleEditRow}
        initialFilterValues={initialFilterValues}
        form={form}
        currentEvent={currentEvent}
        resetEvent={resetEvent}
        displayAddButton={false}
        subject="SERVICE_ELEMENT"
        error={error}
      />

      <ServiceElementInfo
        open={openFrom}
        onClose={onCloseFrom}
        serviceElement={currentServiceElement}
      />
    </>
  );
}

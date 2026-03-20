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

import TERME_OF_SERVICES_CONFIG from 'src/constants/termeOfServices';

// components
import { CustomEditableTable } from 'src/components/table';
// sections
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getTermeOfServices,
  dispatchTermOfServiceAction,
  resetEvent,
} from 'src/redux/slices/termeOfService';

import TermOfServiceInfo from './TermOfServiceInfo';
import useToggle from 'src/hooks/useToggle';

// ----------------------------------------------------------------------

const columns = TERME_OF_SERVICES_CONFIG.COLUMNS;
const config = TERME_OF_SERVICES_CONFIG.FILTERS;
const form = TERME_OF_SERVICES_CONFIG.FORMS;

// ----------------------------------------------------------------------

TermeOfServiceList.propTypes = {
  contractId: PropTypes.number,
  serviceType: PropTypes.string,
  serviceId: PropTypes.number,
  posId: PropTypes.string,
};

export default function TermeOfServiceList({
  contractId,
  serviceType,
  serviceId,
  posId,
}) {
  // states
  const { termeOfServices, totalCount, isLoading, currentEvent, error } =
    useSelector((state) => state.termeOfServices);
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  // Current service state
  const [currentTermOfServiceId, setCurrentTermOfServiceId] = useState(null);
  const currentTermOfService = useMemo(
    () => termeOfServices.find((e) => e.id === currentTermOfServiceId),
    [termeOfServices, currentTermOfServiceId]
  );
  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (serviceType) initialFilterValues.push(['serviceType', serviceType]);
  if (serviceId) initialFilterValues.push(['serviceId', serviceId]);
  if (posId) initialFilterValues.push(['posId', posId]);

  const handleViewRow = (termeOfServiceId) => {
    setCurrentTermOfServiceId(termeOfServiceId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={termeOfServices}
        totalCount={totalCount}
        columns={columns}
        form={form}
        defaultFormValue={{ contractId: contractId, serviceId: serviceId }}
        isLoading={isLoading}
        dispatchCallback={getTermeOfServices}
        handleOnDoubleClick={handleViewRow}
        initialFilterValues={initialFilterValues}
        dispatchEvent={dispatchTermOfServiceAction}
        displayDeleteAction={true}
        currentEvent={currentEvent}
        resetEvent={resetEvent}
        subject="TERM_OF_SERVICE"
        error={error}
      />

      <TermOfServiceInfo
        open={openFrom}
        onClose={onCloseFrom}
        termeOfService={currentTermOfService}
      />
    </>
  );
}

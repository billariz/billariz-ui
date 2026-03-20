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
import { useSelector } from 'react-redux';
import useToggle from 'src/hooks/useToggle';
import { useMemo, useState } from 'react';

// components
import { CustomEditableTable } from 'src/components/table';

// redux
import {
  dispatchServiceAction,
  getServices,
  resetEvent,
} from 'src/redux/slices/service';

// constants
import SERVICES_CONFIG from 'src/constants/services';

// sections
import ServiceInfo from './ServiceInfo';

// ----------------------------------------------------------------------

const columns = SERVICES_CONFIG.COLUMNS;
const config = SERVICES_CONFIG.FILTERS;
const form = SERVICES_CONFIG.FORMS;

// ----------------------------------------------------------------------

ServiceList.propTypes = {
  contractId: PropTypes.number.isRequired,
};

export default function ServiceList({ contractId }) {
  // Redux state
  const { services, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.services
  );

  // Modal control
  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  // Current service state
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const currentService = useMemo(
    () => services.find((e) => e.id === currentServiceId),
    [services, currentServiceId]
  );

  // Initial filters
  const initialFilterValues = [['contractId', contractId]];

  const handleViewRow = (serviceId) => {
    setCurrentServiceId(serviceId);
    onOpenFrom();
  };

  return (
    <>
      <CustomEditableTable
        config={config}
        rows={services}
        totalCount={totalCount}
        columns={columns}
        form={form}
        defaultFormValue={{ contractId }}
        isLoading={isLoading}
        dispatchCallback={getServices}
        handleOnDoubleClick={handleViewRow}
        initialFilterValues={initialFilterValues}
        dispatchEvent={dispatchServiceAction}
        displayDeleteAction={true}
        currentEvent={currentEvent}
        resetEvent={resetEvent}
        subject="SERVICE"
        error={error}
      />

      <ServiceInfo
        open={openFrom}
        onClose={onCloseFrom}
        service={currentService}
      />
    </>
  );
}

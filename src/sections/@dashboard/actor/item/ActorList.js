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

//Consts
import ACTOR_CONFIG from 'src/constants/actor';

import PropTypes from 'prop-types';
// components
import { CustomEditableTable } from 'src/components/table';

//Actions
import {
  dispatchActorAction,
  getActors,
  resetEvent,
} from 'src/redux/slices/actor';

//Hooks
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

const columns = ACTOR_CONFIG.COLUMNS;
const config = ACTOR_CONFIG.FILTERS;
// ----------------------------------------------------------------------

ActorList.propTypes = {
  contractId: PropTypes.number,
  perimeterId: PropTypes.number,
  customerId: PropTypes.number,
};

export default function ActorList({ contractId, perimeterId, customerId }) {
  // states
  const { actors, totalCount, isLoading, currentEvent, error } = useSelector(
    (state) => state.actors
  );

  const initialFilterValues = [];
  if (contractId) initialFilterValues.push(['contractId', contractId]);
  if (perimeterId) initialFilterValues.push(['perimeterId', perimeterId]);
  if (customerId) initialFilterValues.push(['customerId', customerId]);

  const form = {
    FIELDS: perimeterId
      ? ACTOR_CONFIG.FORMS.FIELDS.filter((e) => e.name != 'perimeterId')
      : ACTOR_CONFIG.FORMS.FIELDS,
  };

  const parentEntity = useMemo(() => ({ contractId }), [contractId]);

  return (
    <CustomEditableTable
      config={config}
      rows={actors}
      totalCount={totalCount}
      columns={columns}
      isLoading={isLoading}
      dispatchCallback={getActors}
      displayDeleteAction={true}
      initialFilterValues={initialFilterValues}
      form={form}
      dispatchEvent={dispatchActorAction}
      currentEvent={currentEvent}
      impliedValues={{ perimeterId }}
      resetEvent={resetEvent}
      parentEntity={parentEntity}
      maxWidth="xl"
      subject="ACTOR"
      error={error}
    />
  );
}

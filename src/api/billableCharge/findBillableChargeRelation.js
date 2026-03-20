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

import ENDPOINTS from 'src/constants/enums/endpoints';
import API_SERVICE from 'src/utils/apiService';

const findBillableChargeRelationApi = async (billableChargeId) => {
  const url = ENDPOINTS.BILLABLE_CHARGE_FIND_RELATION.replace('{{billableChargeId}}', billableChargeId);
  return await API_SERVICE.get(url);
};

export default findBillableChargeRelationApi;
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

import API_SERVICE from 'src/utils/apiService';
import ENDPOINTS from 'src/constants/enums/endpoints';

const updateConsumptionById = async (consumptionId, payload) => {
  try {
    const url = ENDPOINTS.CONSUMPTION.replace(
      '{{consumptionId}}',
      consumptionId
    );
    return await API_SERVICE.patch(url, payload);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update consumption:', error);
    return null;
  }
};

export default updateConsumptionById;

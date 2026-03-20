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

const findChartByNameApi = async (chartName, params) => {
  try {
    const url = ENDPOINTS.CHARTS_BY_NAME.replace('{{chartName}}', chartName);
    return await API_SERVICE.get(url, params);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch chart:', error);
    return null;
  }
};

export default findChartByNameApi;

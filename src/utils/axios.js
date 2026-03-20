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

import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------
const currentGroup = localStorage.getItem('currentGroup');
const baseURL = HOST_API.replace('__GROUP__', currentGroup);

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || 'Something went wrong')
);

export default axiosInstance;

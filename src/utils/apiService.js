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

import { LOG_TYPE } from 'src/constants/enums';
import HttpException from 'src/exceptions/httpException';
import axios from './axios';
import logger from './logger';
import SnackbarUtils from 'src/utils/toast.js';
import transformEmptyString from './transformEmptyString';

async function get(path, queryParams) {
  try {
    const response = await axios.get(path, {
      params: queryParams,
      validateStatus: function () {
        return true;
      },
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status >= 400 && response.status < 600) {
      logger.log(
        LOG_TYPE.FAILED,
        `[ERROR] GET ${path}: ${response.status}`,
        response.data
      );
      throw new HttpException(path, response.status, response.data);
    }
    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw new HttpException(error.path, error.errorCode, error.msg);
  }
}
async function getFile(path) {
  try {
    const response = await axios.get(path, { responseType: 'blob' });
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      return blob;
    }

    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    const errorMessage =
      error && typeof error.getMessage === 'function'
        ? error.getMessage()
        : JSON.stringify(error);
    logger.log(LOG_TYPE.FAILED, `[ERROR] GET ${path}: 0`, errorMessage);
    throw new HttpException(path, 0, errorMessage);
  }
}

async function post(path, payload, apiRequiresFullJson) {
  try {
    const headers = {
      'Content-Type': apiRequiresFullJson
        ? 'application/full+json'
        : 'application/json',
    };
    const response = await axios.post(path, transformEmptyString(payload), {
      headers,
    });
    if ((response.status >= 200) & (response.status <= 210)) {
      if (response.data === '') response.data = 'SUCCESS';
      return response.data;
    }
    logger.log(
      LOG_TYPE.FAILED,
      `[ERROR] POST ${path}: ${response.status}`,
      response.data
    );
    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    logger.log(LOG_TYPE.FAILED, `[ERROR] POST ${path}: 0`, error);
    SnackbarUtils.error(error.description || 'Parameter.ErreurUpdate');
    throw new HttpException(path, 0, error());
  }
}

async function update(path, payload) {
  try {
    const response = await axios.update(path, transformEmptyString(payload));
    if ((response.status >= 200) & (response.status <= 210)) {
      if (response.data === '') response.data = 'SUCCESS';
      return response.data;
    }
    logger.log(
      LOG_TYPE.FAILED,
      `[ERROR] UPDATE ${path}: ${response.status}`,
      response.data
    );
    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    logger.log(LOG_TYPE.FAILED, `[ERROR] UPDATE ${path}: 0`, error);
    SnackbarUtils.error(error.description || 'Parameter.ErreurUpdate');
    throw new HttpException(path, 0, error());
  }
}

async function patch(path, payload, apiRequiresFullJson) {
  try {
    const headers = {
      'Content-Type': apiRequiresFullJson
        ? 'application/full+json'
        : 'application/json',
    };
    const response = await axios.patch(path, transformEmptyString(payload), {
      headers,
    });
    if ((response.status >= 200) & (response.status <= 210)) {
      if (response.data === '') response.data = 'SUCCESS';
      return response.data;
    }
    logger.log(
      LOG_TYPE.FAILED,
      `[ERROR] PATCH ${path}: ${response.status}`,
      response.data
    );
    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    logger.log(LOG_TYPE.FAILED, `[ERROR] PATCH ${path}: 0`, error);
    SnackbarUtils.error(error.description || 'Parameter.ErreurUpdate');
    throw new HttpException(path, 0, error());
  }
}

async function deleting(path) {
  try {
    const response = await axios.delete(path);
    if ((response.status >= 200) & (response.status <= 210)) {
      if (response.data === '') response.data = 'SUCCESS';
      return response;
    }
    logger.log(LOG_TYPE.FAILED, `[ERROR] DELETE ${path}`, response.data);
    throw new HttpException(path, response.status, response.data);
  } catch (error) {
    logger.log(LOG_TYPE.FAILED, `[ERROR] DELETE ${path}: 0`, error);
    SnackbarUtils.error(error.description || 'Parameter.ErreurUpdate');
    throw new HttpException(path, 0, error());
  }
}

const API_SERVICE = {
  deleting,
  get,
  patch,
  post,
  update,
  getFile,
};

export default API_SERVICE;

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

import POS_CONFIG from './pos';
import * as Yup from 'yup';
import { addPosApi, findPosApi } from 'src/api/pos';
import { PosModel } from 'src/models/Pos.model';

const CONTRACTPOS_CONFIG = {
  COLUMNS: POS_CONFIG.COLUMNS,
  FILTERS: POS_CONFIG.FILTERS,
  FORMS: {
    POS_ABOUT: {
      FIELDS: [
        {
          name: 'startDate',
          label: 'contractPos.TableHeader.startDate',
          type: 'RHFDatePicker',
          validation: Yup.string().required('Error.isRequired'),
          disabledOnCondition: (contractPos) =>
            contractPos.pointOfService == '',
          getCurrentValue: (contractPos) => contractPos.startDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'contractPos.TableHeader.endDate',
          type: 'RHFDatePicker',
          disabledOnCondition: (contractPos) =>
            contractPos.pointOfService == '',
          getCurrentValue: (contractPos) => contractPos.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'posId',
          label: 'contractPos.TableHeader.pointOfService',
          type: 'RHFEntity',
          validation: Yup.mixed().test(
            'not-empty-string',
            'Error.isRequired',
            (value) => value !== ''
          ),
          getApi: findPosApi,
          entityKey: 'pointOfServices',
          enityModel: PosModel,
          columns: POS_CONFIG.COLUMNS,
          getCurrentValue: () => null,
          addApi: addPosApi,
          filters: POS_CONFIG.FILTERS,
          form: POS_CONFIG,
          subject: 'POINT_OF_SERVICE',
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
      ],
    },
  },
};

export default CONTRACTPOS_CONFIG;

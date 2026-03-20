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

import * as Yup from 'yup';
import CONTRACTS_CONFIG from './contracts';
import { addContractApi, findContractsApi } from 'src/api/contracts';
import { ContractModel } from 'src/models/Contract.model';

const POS_CONTRACT_CONFIG = {
  COLUMNS: CONTRACTS_CONFIG.COLUMNS,
  FILTERS: CONTRACTS_CONFIG.FILTERS,
  FORMS: {
    CONTRACT_ABOUT: {
      FIELDS: [
        {
          name: 'startDate',
          label: 'posContract.TableHeader.startDate',
          type: 'RHFDatePicker',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (posContract) => posContract.startDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'endDate',
          label: 'posContract.TableHeader.endDate',
          type: 'RHFDatePicker',
          getCurrentValue: (contractPos) => contractPos.endDate,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'contractId',
          label: 'posContract.TableHeader.contract',
          type: 'RHFEntity',
          validation: Yup.mixed().test(
            'not-empty-string',
            'Error.isRequired',
            (value) => value !== ''
          ),
          getApi: findContractsApi,
          entityKey: 'contracts',
          enityModel: ContractModel,
          columns: CONTRACTS_CONFIG.COLUMNS,
          getCurrentValue: () => null,
          addApi: addContractApi,
          filters: CONTRACTS_CONFIG.FILTERS,
          form: CONTRACTS_CONFIG,
          subject: 'CONTRACT',
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

export default POS_CONTRACT_CONFIG;

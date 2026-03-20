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

import PARAMETERS_CONFIG from './parameters';
import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import { FILTER_TYPE } from './enums';
import * as Yup from 'yup';
import { addThirdApi, findThirdsApi } from 'src/api/thirds';
import { ThirdModel } from 'src/models/Third.model';
import THIRD_CONFIG from './thirds';

const ACTOR_CONFIG = {
  COLUMNS: [
    {
      id: 'fullname',
      label: 'Actor.TableHeader.nom',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: (actor) => actor.getFullName(), type: 'text' }],
      },
    },

    {
      id: 'address',
      label: 'Actor.TableHeader.adress',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: (actor) => actor.getFirstLineAdress(), type: 'text' },
          { value: (actor) => actor.getSecondLineAdress(), type: 'text' },
        ],
      },
    },
    {
      id: 'phone',
      label: 'Actor.TableHeader.phone',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: (actor) => actor.getPhoneNumber(), type: 'text' }],
      },
    },
    {
      id: 'email',
      label: 'Actor.TableHeader.email',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: (actor) => actor.getEmail(), type: 'text' }],
      },
    },
    {
      id: 'role',
      label: 'Actor.TableHeader.role',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'actorRole',
            value: (actor) => actor.getRole(),
            type: 'text',
          },
        ],
      },
    },
  ],
  FILTERS: {
    ROLE: {
      index: 0,
      id: 'role',
      label: 'Actor.FilterLabels.role',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ACTOR_ROLE,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Actor.FilterLabels.id',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_CONTRACT: {
      index: 2,
      id: 'contractId',
      label: 'Actor.FilterLabels.ContractNumber',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_CUSTOMER: {
      index: 3,
      id: 'customerId',
      label: 'Actor.FilterLabels.CustomerNumber',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ID_PERIMETER: {
      index: 4,
      id: 'perimeterId',
      label: 'Actor.FilterLabels.PerimeterNumber',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'role',
        label: 'Actor.role',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        parameterName: PARAMETERS_CONFIG.NAME.ACTOR_ROLE,
        getCurrentValue: (parameter) => parameter.role,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'perimeterId',
        label: 'Actor.perimeterId',
        type: 'RHFAutocomplete',
        validation: Yup.string().required('Error.isRequired'),
        category: 'perimeter',
        autoSelectSingleOption: true,
        parameterName: PARAMETERS_CONFIG.NAME.PERIMETER,
        getOptionDisplay: (option) => `${option.reference}`,
        additionelParams: (parameter) => {
          const { contractId } = parameter;
          return contractId ? `&contractId=${contractId}` : '';
        },
        getCurrentValue: (parameter) => parameter.perimeterId,
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
      {
        name: 'startDate',
        label: 'Actor.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (parameter) => parameter.startDate,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'endDate',
        label: 'Actor.endDate',
        type: 'RHFDatePicker',
        getCurrentValue: (parameter) => parameter.endDate,
        size: {
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
        },
      },
      {
        name: 'thirdId',
        label: 'Actor.TableHeader.third',
        type: 'RHFEntity',
        validation: Yup.mixed().test(
          'not-empty-string',
          'Error.isRequired',
          (value) => value !== ''
        ),
        getApi: findThirdsApi,
        entityKey: 'thirds',
        enityModel: ThirdModel,
        columns: THIRD_CONFIG.COLUMNS,
        getCurrentValue: (parameter) => parameter.thirdId,
        addApi: addThirdApi,
        filters: THIRD_CONFIG.FILTERS,
        form: THIRD_CONFIG,
        subject: 'THIRD',
        size: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
        },
      },
    ],
  },
};

export default ACTOR_CONFIG;

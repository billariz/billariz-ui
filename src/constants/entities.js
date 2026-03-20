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

import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import { FILTER_TYPE } from './enums';

import * as Yup from 'yup';
import PARAMETERS_CONFIG from './parameters';

const ENTITY_CONFIG = {
  COLUMNS: [
    {
      id: 'entity',
      label: 'Entity.TableHeader.entityName',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'entity', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'category',
      label: 'Entity.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'category', type: 'text' },
          { value: 'subCategory', type: 'text' },
        ],
      },
    },
    {
      id: 'company',
      label: 'Entity.TableHeader.company',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'company.companyName', type: 'text' },
          { value: 'company.legalFormCode', type: 'text' },
        ],
      },
    },
    {
      id: 'master',
      label: 'Entity.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'master', type: 'switch' }],
      },
    },
    {
      id: 'masterOrganismId',
      label: 'Entity.TableHeader.masterEntity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'masterOrganismId', type: 'text' }],
      },
    },
    {
      id: 'Label',
      label: 'Entity.TableHeader.Label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLabel', type: 'text' }],
      },
    },
    {
      id: 'picture',
      label: 'Entity.TableHeader.picture',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'picture', type: 'logo' }],
      },
    },
  ],
  FILTERS: {
    DEFAULT: {
      index: 0,
      id: 'category',
      label: 'Service.FilterLabels.category',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ENTITY_CATEGORY,
    },
    SUB_CATEGOTY: {
      index: 1,
      id: 'subCategory',
      label: 'ServiceElement.FilterLabels.subCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ENTITY_SUB_CATEGORY,
    },
    MASTER_ENTITY: {
      index: 2,
      id: 'id',
      additionelParams: () => `&master=true`,
      label: 'Entity.FilterLabels.masterOrganismId',
      type: 'autocomplete',
      category: 'organism',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      addAllValue: true,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
    },
    companyName: {
      index: 3,
      id: 'companyName',
      label: 'Entity.FilterLabels.companyName',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    MASTER: {
      index: 4,
      id: 'master',
      label: 'Entity.FilterLabels.isMaster',
      type: 'RHFSwitch',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: false,
    },
  },
  FORMS: {
    ENTITY_ABOUT: {
      FIELDS: [
        {
          name: 'companyName',
          label: 'Entity.Forms.companyName',
          type: 'RHFTextField',
          path: 'entity.company.companyName',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.company?.companyName,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'category',
          label: 'Entity.Forms.category',
          parameterName: PARAMETERS_CONFIG.NAME.ENTITY_CATEGORY,
          type: 'RHFSelect',
          path: 'entity.category',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.category,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'subCategory',
          label: 'Entity.Forms.subCategory',
          path: 'entity.subCategory',
          parameterName: PARAMETERS_CONFIG.NAME.ENTITY_SUB_CATEGORY,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.subCategory,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'master',
          label: 'Entity.Forms.isMaster',
          type: 'RHFSwitch',
          path: 'entity.master',
          getCurrentValue: (parameter) => parameter.master == true,
          size: {
            xs: 12,
            sm: 6,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'masterOrganismId',
          label: 'Entity.Forms.masterEntity',
          type: 'RHFAutocomplete',
          category: 'organism',
          path: 'entity.masterOrganismId',
          parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
          additionelParams: () => `&master=true`,
          getCurrentValue: (parameter) => parameter.masterOrganismId,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'legalFormCode',
          label: 'Entity.Forms.legalFormCode',
          parameterName: PARAMETERS_CONFIG.NAME.LEGAL_FORM,
          type: 'RHFSelect',
          path: 'entity.company.legalFormCode',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.company?.legalFormCode,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'identificationId',
          label: 'Entity.Forms.identificationId',
          type: 'RHFTextField',
          path: 'entity.company.identificationId',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.company?.identificationId,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'vatId',
          label: 'Entity.Forms.vatId',
          type: 'RHFTextField',
          path: 'entity.company.vatId',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.company?.vatId,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'naceCode',
          label: 'Entity.Forms.naceCode',
          parameterName: PARAMETERS_CONFIG.NAME.NACE_CODE,
          type: 'RHFSelect',
          path: 'entity.company.naceCode',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.company?.naceCode,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'defaultLabel',
          label: 'Entity.Forms.defaultLabel',
          type: 'RHFTextField',
          path: 'entity.defaultLabel',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.defaultLabel,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'standardLabel',
          label: 'Entity.Forms.standardLabel',
          type: 'RHFTextField',
          path: 'entity.standardLabel',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.standardLabel,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'description',
          label: 'Entity.Forms.description',
          type: 'RHFTextField',
          path: 'entity.description',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.description,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'picture',
          label: 'Entity.Forms.picture',
          type: 'RHFPicture',
          path: 'entity.picture',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.picture,
          size: {
            xs: 6,
            sm: 3,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
  },
};

export default ENTITY_CONFIG;

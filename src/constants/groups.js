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

const GROUP_CONFIG = {
  COLUMNS: [
    {
      id: 'group',
      label: 'Group.TableHeader.GroupName',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'groupName', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'organismId',
      label: 'Group.TableHeader.entity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'organism', type: 'logo' },
          { value: 'organism.company.companyName', type: 'text' },
        ],
      },
    },
    {
      id: 'category',
      label: 'Group.TableHeader.category',
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
      id: 'Label',
      label: 'Group.TableHeader.Label',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLabel', type: 'text' }],
      },
    },
    {
      id: 'description',
      label: 'Group.TableHeader.description',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'description', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    DEFAULT: {
      index: 0,
      id: 'category',
      label: 'Group.FilterLabels.category',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GROUP_CATEGORY,
    },
    SUB_CATEGOTY: {
      index: 1,
      id: 'subCategory',
      label: 'Group.FilterLabels.subCategory',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GROUP_SUB_CATEGORY,
    },
    GROUP: {
      index: 2,
      id: 'groupName',
      label: 'Group.FilterLabels.group',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ENTITY: {
      index: 3,
      id: 'organismId',
      label: 'Group.FilterLabels.entityName',
      type: 'autocomplete',
      category: 'organism',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      child: {
        companyName: {
          index: 4,
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
      },
      defaultValue: '',
      parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
    },
  },
  FORMS: {
    GROUP: {
      FIELDS: [
        {
          name: 'organismId',
          label: 'Group.entity',
          type: 'RHFAutocomplete',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
          getCurrentValue: (parameter) => parameter.organismId,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'groupName',
          label: 'Group.groupName',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.groupName,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'category',
          label: 'Group.category',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.GROUP_CATEGORY,
          getCurrentValue: (parameter) => parameter.category,
          getDefaultValue: () => '...',
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'subCategory',
          label: 'Group.subCategory',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.GROUP_SUB_CATEGORY,
          getCurrentValue: (parameter) => parameter.subCategory,
          getDefaultValue: () => '...',
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'defaultLabel',
          label: 'Group.defaultLabel',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.defaultLabel,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'standardLabel',
          label: 'Group.standardLabel',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.standardLabel,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
        {
          name: 'description',
          label: 'Group.description',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.description,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
        },
      ],
    },
  },
};

export default GROUP_CONFIG;

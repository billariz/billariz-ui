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
import * as Yup from 'yup';
import { FILTER_TYPE } from './enums';
import PARAMETERS_CONFIG from './parameters';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

import { toggleUserMasterStatus } from 'src/redux/slices/user';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const USER_CONFIG = {
  COLUMNS: [
    {
      id: 'user',
      label: 'User.TableHeader.User',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'individual.firstName', type: 'text' },
          { value: 'userName', type: 'text' },
        ],
      },
    },
    {
      id: 'contact',
      label: 'User.TableHeader.Contact',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'contact.phone1', type: 'text' }],
      },
    },
    {
      id: 'entity',
      label: 'User.TableHeader.entity',
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
      id: 'group',
      label: 'User.TableHeader.group',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'group.groupName', type: 'text' },
          { value: 'group.category', type: 'text' },
        ],
      },
    },
    {
      id: 'userRole',
      label: 'User.TableHeader.title',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'userRole', type: 'text' }],
      },
    },
    {
      id: 'defaultLanguage',
      label: 'User.TableHeader.defaultLanguage',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'defaultLanguage', type: 'text' }],
      },
    },
    {
      id: 'master',
      label: 'User.TableHeader.master',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'master',
            type: 'switch',
            handleChange: toggleUserMasterStatus,
          },
        ],
      },
    },
    {
      id: 'picture',
      label: 'User.TableHeader.picture',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'picture', type: 'logo' }],
      },
    },
    {
      id: 'status',
      label: 'User.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'user',
          },
        ],
      },
    },
  ],
  FILTERS: {
    DEFAULT: {
      index: 0,
      id: 'title',
      label: 'User.FilterLabels.title',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.USER_ROLE,
    },
    ENTITY: {
      index: 1,
      id: 'organismId',
      label: 'User.FilterLabels.entityName',
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
    GROUP: {
      index: 2,
      id: 'groupId',
      label: 'User.FilterLabels.group',
      type: 'autocomplete',
      category: 'group',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.GROUPS,
    },
    FIRST_NAME: {
      index: 3,
      id: 'firstName',
      label: 'User.FilterLabels.firstName',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    LAST_NAME: {
      index: 4,
      id: 'lastName',
      label: 'User.FilterLabels.lastName',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    STATUS: {
      index: 5,
      id: 'status',
      label: 'User.FilterLabels.status',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.USER_STATUS,
    },
    USER_NAME: {
      index: 6,
      id: 'userName',
      label: 'User.FilterLabels.userName',
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
    USER_ABOUT: {
      tabLabel: 'TableTabs.users.users',
      FIELDS: [
        {
          name: 'userName',
          disableEdit: true,
          label: 'User.Forms.userName',
          type: 'RHFTextField',
          path: 'user.userName',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.userName,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'titleCode',
          label: 'User.Forms.titleCode',
          parameterName: PARAMETERS_CONFIG.NAME.TITLE_CODE,
          type: 'RHFSelect',
          path: 'user.individual.titleCode',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.individual?.titleCode,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'firstName',
          label: 'User.Forms.firstName',
          type: 'RHFTextField',
          path: 'user.individual.firstName',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.individual?.firstName,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'lastName',
          label: 'User.Forms.lastName',
          type: 'RHFTextField',
          path: 'user.individual.lastName',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.individual?.lastName,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'phone1',
          label: 'User.Forms.phone',
          type: 'RHFPhoneField',
          path: 'user.contact.phone1',
          validation: Yup.string()
            .test('is-valid-phone', 'Invalid phone number', (value) => {
              // Treat '+33' as valid
              if (value === '+33') return true;
              // Validate other values
              return isPossiblePhoneNumber(value);
            })
            .test(
              'is-required',
              'Error.isRequired',
              (value) => value !== '+33'
            ),
          getCurrentValue: (parameter) => parameter?.contact?.phone1,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'email',
          label: 'User.Forms.email',
          type: 'RHFTextField',
          path: 'user.contact.email',
          disableEdit: true,
          validation: Yup.string()
            .email('Error.invalidEmail')
            .required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter?.contact?.email,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'defaultLanguage',
          label: 'User.Forms.defaultLanguage',
          parameterName: PARAMETERS_CONFIG.NAME.LANGUAGE,
          type: 'RHFSelect',
          path: 'user.defaultLanguage',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.defaultLanguage,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'userRole',
          label: 'User.Forms.title',
          parameterName: PARAMETERS_CONFIG.NAME.USER_ROLE,
          type: 'RHFSelect',
          path: 'user.userRole',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (parameter) => parameter.userRole,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'organismId',
          label: 'User.Forms.organism',
          type: 'RHFAutocomplete',
          category: 'organism',
          path: 'user.organismId',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.ORGANISMS,
          getCurrentValue: (parameter) => parameter?.organism?.id,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'groupId',
          label: 'User.Forms.group',
          type: 'RHFAutocomplete',
          category: 'group',
          path: 'user.groupId',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.GROUPS,
          getCurrentValue: (parameter) => parameter?.group?.id,
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'master',
          label: 'User.Forms.master',
          type: 'RHFSwitch',
          path: 'user.master',
          getCurrentValue: (parameter) => (parameter.master ? true : false),
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'User.Forms.active',
          type: 'RHFSwitch',
          path: 'user.status',
          getCurrentValue: (parameter) => parameter.status === 'ACTIVE',
          size: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'picture',
          label: 'User.Forms.picture',
          type: 'RHFPicture',
          path: 'user.picture',
          hideOnBoxInfo: true,
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

export default USER_CONFIG;

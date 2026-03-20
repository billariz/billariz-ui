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
import PARAMETERS_CONFIG from './parameters';

import { isPossiblePhoneNumber } from 'react-phone-number-input';

const PROFILE_CONFIG = {
  COLUMNS: [],
  FILTERS: {},
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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
          disableEdit: true,
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

export default PROFILE_CONFIG;

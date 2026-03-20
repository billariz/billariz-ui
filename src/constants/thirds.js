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
import PARAMETERS_CONFIG from './parameters';
import { FILTER_TYPE } from './enums';
import * as Yup from 'yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const THIRD_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Third.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'fullname',
      label: 'Third.TableHeader.name',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: (third) => third.getFullName(), type: 'text' }],
      },
    },
    {
      id: 'address',
      label: 'Third.TableHeader.address',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: (third) => third.getFirstLineAdress(), type: 'text' },
          { value: (third) => third.getSecondLineAdress(), type: 'text' },
        ],
      },
    },
    {
      id: 'financialInformation',
      label: 'Third.TableHeader.financialInformation',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'paymentMode',
            value: 'financialInformation.paymentMode',
            type: 'text',
          },
          { value: 'financialInformation.domicilationId', type: 'text' },
          {
            translParam: 'domicilationStatus',
            value: 'financialInformation.domicilationStatus',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'email',
      label: 'Third.TableHeader.contact',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: (third) => third.getEmail(), type: 'text' },
          { value: (third) => third.getPhoneNumber(), type: 'text' },
        ],
      },
    },
    {
      id: 'companyName',
      label: 'Third.TableHeader.company',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: (third) =>
              `${third.company ? third.company.companyName : '-'}`,
            type: 'text',
          },
          {
            value: (third) =>
              `${third.company ? third.company.identificationId : ''} `,
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'type',
      label: 'Third.TableHeader.type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'thirdType',
            value: (third) => third.getType(),
            type: 'text',
          },
        ],
      },
    },
  ],
  FILTERS: {
    TYPE: {
      index: 0,
      id: 'type',
      label: 'Third.FilterLabels.type',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.THIRD_TYPE,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Third.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    FIRST_NAME: {
      index: 2,
      id: 'firstName',
      label: 'Third.FilterLabels.firstName',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    LAST_NAME: {
      index: 3,
      id: 'lastName',
      label: 'Third.FilterLabels.lastName',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    EMAIL: {
      index: 4,
      id: 'email',
      label: 'Third.FilterLabels.email',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    PHONE: {
      index: 5,
      id: 'phone',
      label: 'Third.FilterLabels.phone',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    PAYMENT_MODE: {
      index: 6,
      id: 'paymentMode',
      label: 'Third.FilterLabels.paymentMode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.PAYMENT_MODE,
    },
    DOMICILIATION_ID: {
      index: 7,
      id: 'domiciliationId',
      label: 'Third.FilterLabels.domiciliationId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    IBAN: {
      index: 8,
      id: 'iban',
      label: 'Third.FilterLabels.iban',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    COMPANY_NAME: {
      index: 9,
      id: 'companyName',
      label: 'Third.FilterLabels.companyName',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    COMPANY_ID: {
      index: 10,
      id: 'identificationId',
      label: 'Third.FilterLabels.identificationId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    VAT_ID: {
      index: 11,
      id: 'vatId',
      label: 'Third.FilterLabels.vatId',
      type: FILTER_TYPE.TEXT_FIELD,
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
    THIRD_ABOUT: {
      tabLabel: 'TableTabs.third.third',
      FIELDS: [
        {
          name: 'type',
          label: 'Third.Forms.ThirdAbout.type',
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          parameterName: PARAMETERS_CONFIG.NAME.THIRD_TYPE,
          path: 'third.type',
          tab: 'third',
          getCurrentValue: (third) => third.type,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'titleCode',
          label: 'Third.Forms.ThirdAbout.titleCode',
          parameterName: PARAMETERS_CONFIG.NAME.TITLE_CODE,
          validation: Yup.string().required('Error.isRequired'),
          type: 'RHFSelect',
          path: 'third.individual.titleCode',
          tab: 'third',
          getCurrentValue: (third) =>
            third?.individual?.titleCode ? third.individual.titleCode : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'birthDate',
          label: 'Third.Forms.ThirdAbout.birthDate',
          type: 'RHFDatePicker',
          path: 'third.individual.birthDate',
          tab: 'third',
          getCurrentValue: (third) =>
            third?.individual?.birthDate ? third.individual.birthDate : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'firstName',
          label: 'Third.Forms.ThirdAbout.firstName',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.individual.firstName',
          tab: 'third',
          getCurrentValue: (third) =>
            third?.individual?.firstName ? third.individual.firstName : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'lastName',
          label: 'Third.Forms.ThirdAbout.lastName',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.individual.lastName',
          tab: 'third',
          getCurrentValue: (third) =>
            third?.individual?.lastName ? third.individual.lastName : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    THIRD_FINANCIAL: {
      tabLabel: 'TableTabs.third.financial',
      FIELDS: [
        {
          name: 'paymentMode',
          label: 'Third.Forms.thirdFinancial.paymentMode',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.PAYMENT_MODE,
          path: 'third.financialInformation.paymentMode',
          tab: 'third.financial',
          getCurrentValue: (third) =>
            third?.financialInformation?.paymentMode
              ? third.financialInformation.paymentMode
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'domicilationId',
          label: 'Third.Forms.thirdFinancial.domicilationId',
          type: 'RHFTextField',
          path: 'third.financialInformation.domicilationId',
          tab: 'third.financial',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('paymentMode', (value) => {
            if (value[0] == 'DIRECT_DEBIT') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.financialInformation?.domicilationId
              ? third.financialInformation.domicilationId
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'domicilationStatus',
          label: 'Third.Forms.thirdFinancial.domicilationStatus',
          type: 'RHFSelect',
          parameterName: PARAMETERS_CONFIG.NAME.DOMICILIATION_STATUS,
          path: 'third.financialInformation.domicilationStatus',
          tab: 'third.financial',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('paymentMode', (value) => {
            if (value[0] == 'DIRECT_DEBIT') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.financialInformation?.domicilationStatus
              ? third.financialInformation.domicilationStatus
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'iban',
          label: 'Third.Forms.thirdFinancial.iban',
          type: 'RHFTextField',
          path: 'third.financialInformation.iban',
          tab: 'third.financial',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('paymentMode', (value) => {
            if (value[0] == 'DIRECT_DEBIT') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.financialInformation?.iban
              ? third.financialInformation.iban
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'bicCode',
          label: 'Third.Forms.thirdFinancial.bicCode',
          type: 'RHFTextField',
          path: 'third.financialInformation.bicCode',
          tab: 'third.financial',
          getCurrentValue: (third) =>
            third?.financialInformation?.bicCode
              ? third.financialInformation.bicCode
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    THIRD_ADDRESS: {
      tabLabel: 'TableTabs.third.address',
      FIELDS: [
        {
          name: 'number',
          label: 'Third.Forms.thirdAddress.Number',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.address.number',
          tab: 'third.address',
          getCurrentValue: (third) =>
            third?.address?.number ? third.address.number : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'street',
          label: 'Third.Forms.thirdAddress.Street',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.address.street',
          tab: 'third.address',
          getCurrentValue: (third) =>
            third?.address?.street ? third.address.street : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'box',
          label: 'Third.Forms.thirdAddress.Box',
          type: 'RHFTextField',
          path: 'third.address.box',
          tab: 'third.address',
          getCurrentValue: (third) =>
            third?.address?.box ? third.address.box : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'postalCode',
          label: 'Third.Forms.thirdAddress.PostalCode',
          type: 'RHFLazyPostalCode',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.address.postalCode',
          tab: 'third.address',
          getCurrentValue: (third) =>
            third?.address?.postalCode ? third.address.postalCode : null,
          size: {
            xs: 12,
            sm: 8,
            md: 8,
            lg: 8,
          },
        },
        {
          name: 'city',
          label: 'Third.Forms.thirdAddress.City',
          type: 'None',
          validation: Yup.string().required('Error.isRequired'),
          path: 'third.address.city',
          tab: 'third.address',
          getCurrentValue: (third) =>
            third?.address?.city ? third.address.city : null,
          size: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
          },
        },
        {
          name: 'countryCode',
          label: 'Third.Forms.thirdAddress.CountryCode',
          parameterName: PARAMETERS_CONFIG.NAME.COUNTRY_CODE,
          type: 'RHFSelect',
          path: 'third.address.countryCode',
          tab: 'third.address',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (third) =>
            third?.address?.countryCode ? third.address.countryCode : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
      ],
    },
    THIRD_CONTACT: {
      tabLabel: 'TableTabs.third.contact',
      FIELDS: [
        {
          name: 'email',
          label: 'Third.Forms.contact.Email',
          type: 'RHFTextField',
          validation: Yup.string()
            .email('Error.invalidEmail')
            .required('Error.isRequired'),
          path: 'third.contact.email',
          tab: 'third.contact',
          getCurrentValue: (third) =>
            third?.contact?.email ? third.contact.email : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone1',
          label: 'Third.Forms.contact.Phone1',
          type: 'RHFPhoneField',
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
          path: 'third.contact.phone1',
          tab: 'third.contact',
          getCurrentValue: (third) =>
            third?.contact?.phone1 ? third.contact.phone1 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone2',
          label: 'Third.Forms.contact.Phone2',
          type: 'RHFPhoneField',
          validation: Yup.string().test(
            'is-valid-phone',
            'Invalid phone number',
            (value) => {
              // Skip validation if the field is empty
              if (!value || value == '+33') return true;
              return isPossiblePhoneNumber(value);
            }
          ),
          path: 'third.contact.phone2',
          tab: 'third.contact',
          getCurrentValue: (third) =>
            third?.contact?.phone2 ? third.contact.phone2 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone3',
          label: 'Third.Forms.contact.Phone3',
          type: 'RHFPhoneField',
          validation: Yup.string().test(
            'is-valid-phone',
            'Invalid phone number',
            (value) => {
              // Skip validation if the field is empty
              if (!value || value == '+33') return true;
              return isPossiblePhoneNumber(value);
            }
          ),
          path: 'third.contact.phone3',
          tab: 'third.contact',
          getCurrentValue: (third) =>
            third?.contact?.phone3 ? third.contact.phone3 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'fax',
          label: 'Third.Forms.contact.Fax',
          type: 'RHFPhoneField',
          validation: Yup.string().test(
            'is-valid-phone',
            'Invalid phone number',
            (value) => {
              // Skip validation if the field is empty
              if (!value || value == '+33') return true;
              return isPossiblePhoneNumber(value);
            }
          ),
          path: 'third.contact.fax',
          tab: 'third.contact',
          getCurrentValue: (third) =>
            third?.contact?.fax ? third.contact.fax : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'deliveryModeCode',
          label: 'Third.Forms.contact.deliveryModeCode',
          parameterName: PARAMETERS_CONFIG.NAME.DELIVERY_MODE_CODE,
          type: 'RHFSelect',
          path: 'third.contact.deliveryModeCode',
          tab: 'third.contact',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (third) =>
            third?.contact?.deliveryModeCode
              ? third.contact.deliveryModeCode
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    THIRD_COMPANY: {
      tabLabel: 'TableTabs.third.company',
      displayOnTab: (object) => object.type == 'PROFESSIONAL',
      FIELDS: [
        {
          name: 'vatable',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.Vatable',
          type: 'RHFSwitch',
          path: 'third.company.vatable',
          tab: 'third.company',
          getCurrentValue: (third) =>
            third?.company?.vatable ? third.company.vatable : false,
          size: {
            xs: 12,
            sm: 12,
            md: 2,
            lg: 2,
          },
        },
        {
          name: 'companyName',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.CompanyName',
          type: 'RHFTextField',
          path: 'third.company.companyName',
          tab: 'third.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.company?.companyName ? third.company.companyName : '',
          size: {
            xs: 12,
            sm: 12,
            md: 10,
            lg: 10,
          },
        },
        {
          name: 'identificationId',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.IdentificationId',
          type: 'RHFTextField',
          path: 'third.company.identificationId',
          tab: 'third.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.company?.identificationId
              ? third.company.identificationId
              : '',
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'vatId',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.VatId',
          type: 'RHFTextField',
          path: 'third.company.vatId',
          tab: 'third.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.company?.vatId ? third.company.vatId : '',
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'legalFormCode',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.LegalFormCode',
          parameterName: PARAMETERS_CONFIG.NAME.LEGAL_FORM,
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          type: 'RHFSelect',
          path: 'third.company.legalFormCode',
          tab: 'third.company',
          getCurrentValue: (third) =>
            third?.company?.legalFormCode ? third.company.legalFormCode : '',
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'naceCode',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Third.Forms.thirdCompany.NaceCode',
          parameterName: PARAMETERS_CONFIG.NAME.NACE_CODE,
          type: 'RHFSelect',
          path: 'third.company.naceCode',
          tab: 'third.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (third) =>
            third?.company?.naceCode ? third.company.naceCode : '',
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
  },
};

export default THIRD_CONFIG;

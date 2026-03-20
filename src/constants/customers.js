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
import WIDGETS_CONFIG from './widgets';
import * as Yup from 'yup';
import { MultilineCellRenderer } from 'src/components/table/cell/renderer';
import { FILTER_TYPE } from './enums';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

//icons
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CUSTOMERS_CONFIG = {
  WIDGETS: [
    {
      label: 'Customer.Widget.Application',
      widgetName: WIDGETS_CONFIG.NAME.CUSTOMER_APPLICATION,
      color: 'error',
    },
    {
      label: 'Customer.Widget.Conversion',
      widgetName: WIDGETS_CONFIG.NAME.CUSTOMER_CONVERSION,
      color: 'primary',
    },
    {
      label: 'Customer.Widget.Lead',
      widgetName: WIDGETS_CONFIG.NAME.CUSTOMER_LEAD,
      color: 'success',
    },
  ],
  COLUMNS: [
    {
      id: 'client_Ref',
      label: 'Customer.TableHeader.ClientRef',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'reference',
            type: 'text',
          },
          {
            value: 'creationDate',
            type: 'date',
          },
        ],
      },
    },

    {
      id: 'contact',
      label: 'Customer.TableHeader.Contact',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: (customer) => customer.getEmail(), type: 'text' },
          { value: (customer) => customer.getPhone(), type: 'text' },
        ],
      },
    },
    {
      id: 'client_Id',
      label: 'Customer.TableHeader.Client',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: (customer) =>
              `${customer.individual.lastName} ${customer.individual.firstName}`,
            type: 'text',
          },
          {
            value: (customer) =>
              `${customer.company ? customer.company.companyName : ''} `,
            type: 'typography',
          },
        ],
      },
    },
    {
      id: 'category',
      label: 'Customer.TableHeader.Category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'customerCategory', value: 'category', type: 'text' },
        ],
      },
    },
    {
      id: 'type',
      label: 'Customer.TableHeader.Type',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'customerType', value: 'type', type: 'text' }],
      },
    },
    {
      id: 'languageCode',
      label: 'Customer.TableHeader.LanguageCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'language', value: 'languageCode', type: 'text' },
        ],
      },
    },
    {
      id: 'status',
      label: 'Customer.TableHeader.Statut',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'customer',
          },
        ],
      },
    },
  ],
  FILTERS: {
    CATEGORY: {
      index: 0,
      id: 'category',
      label: 'Customer.FilterLabels.CustomerCategory',
      type: FILTER_TYPE.TAB,
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    REF_CLIENT: {
      index: 1,
      id: 'customerRef',
      label: 'Customer.FilterLabels.CustomerRef',
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
      index: 2,
      id: 'email',
      label: 'Customer.FilterLabels.Email',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    PHONE_NUMBER: {
      index: 3,
      id: 'phone',
      label: 'Customer.FilterLabels.PhoneNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },

    LASTNAME: {
      index: 4,
      id: 'lastName',
      label: 'Customer.FilterLabels.LastName',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    FIRSTNAME: {
      index: 5,
      id: 'firstName',
      label: 'Customer.FilterLabels.FirstName',
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
      index: 6,
      id: 'companyName',
      label: 'Customer.FilterLabels.CompanyName',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      displayOn: (isOpen, filters) =>
        isOpen &&
        Array.isArray(filters) &&
        filters.length > 0 &&
        filters.find((filter) => filter.id === 'type').value === 'PROFESSIONAL',
    },
    NUM_ID: {
      index: 7,
      id: 'identificationId',
      label: 'Customer.FilterLabels.CompanyId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      displayOn: (isOpen, filters) =>
        isOpen &&
        Array.isArray(filters) &&
        filters.length > 0 &&
        filters.find((filter) => filter.id === 'type').value === 'PROFESSIONAL',
    },
    NUM_TVA: {
      index: 8,
      id: 'vatId',
      label: 'Customer.FilterLabels.VATNumber',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      displayOn: (isOpen, filters) =>
        isOpen &&
        Array.isArray(filters) &&
        filters.length > 0 &&
        filters.find((filter) => filter.id === 'type').value === 'PROFESSIONAL',
    },

    TYPE: {
      index: 9,
      id: 'type',
      label: 'Customer.FilterLabels.CustomerType',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_TYPE,
    },
    STATUS: {
      index: 10,
      id: 'status',
      label: 'Customer.FilterLabels.CustomerStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_STATUS,
    },
  },
  FORMS: {
    CUSTOMERS_ABOUT: {
      hideOnBox: true,
      FIELDS: [
        {
          name: 'reference',
          disableEdit: true,
          label: 'Customer.CustomerAbout.Reference',
          type: 'RHFTextField',
          tab: 'customer',
          path: 'customer.reference',
          getCurrentValue: (customer) => customer.reference,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'category',
          label: 'Customer.CustomerAbout.Category',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_CATEGORY,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.category',
          tab: 'customer',
          getCurrentValue: (customer) => customer.category,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'status',
          label: 'Customer.CustomerAbout.Status',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_STATUS,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.status',
          tab: 'customer',
          getCurrentValue: (customer) => customer.status,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'type',
          label: 'Customer.CustomerAbout.Type',
          parameterName: PARAMETERS_CONFIG.NAME.CUSTOMER_TYPE,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.type',
          tab: 'customer',
          getCurrentValue: (customer) => customer.type,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'languageCode',
          label: 'Customer.CustomerAbout.LanguageCode',
          parameterName: PARAMETERS_CONFIG.NAME.LANGUAGE,
          type: 'RHFSelect',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.languageCode',
          tab: 'customer',
          getCurrentValue: (customer) => customer.languageCode,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    CUSTOMERS_INDIVIDUAL: {
      title: 'Customer.Individual',
      icon: <PersonIcon alt="customer" color="primary" sx={{ fontSize: 20 }} />,
      tabLabel: 'TableTabs.customer.individual',
      FIELDS: [
        {
          name: 'titleCode',
          label: 'Customer.Forms.CustomerIndividual.TitleCode',
          parameterName: PARAMETERS_CONFIG.NAME.TITLE_CODE,
          validation: Yup.string().required('Error.isRequired'),
          type: 'RHFSelect',
          path: 'customer.individual.titleCode',
          tab: 'customer.individual',
          getCurrentValue: (customer) =>
            customer?.individual?.titleCode
              ? customer.individual.titleCode
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'birthDate',
          label: 'Customer.Forms.CustomerIndividual.BirthDate',
          type: 'RHFDatePicker',
          path: 'customer.individual.birthDate',
          tab: 'customer.individual',
          getCurrentValue: (customer) =>
            customer?.individual?.birthDate
              ? customer.individual.birthDate
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'firstName',
          label: 'Customer.Forms.CustomerIndividual.FirstName',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.individual.firstName',
          tab: 'customer.individual',
          getCurrentValue: (customer) =>
            customer?.individual?.firstName
              ? customer.individual.firstName
              : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'lastName',
          label: 'Customer.Forms.CustomerIndividual.LastName',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.individual.lastName',
          tab: 'customer.individual',
          getCurrentValue: (customer) =>
            customer?.individual?.lastName
              ? customer.individual.lastName
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
    CUSTOMERS_ADDRESS: {
      title: 'Customer.Address',
      icon: (
        <LocationOnIcon alt="address" color="primary" sx={{ fontSize: 20 }} />
      ),
      tabLabel: 'TableTabs.customer.address',
      FIELDS: [
        {
          name: 'number',
          label: 'Customer.Forms.CustomerAddress.Number',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.address.number',
          tab: 'customer.address',
          getCurrentValue: (customer) =>
            customer?.address?.number ? customer.address.number : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'street',
          label: 'Customer.Forms.CustomerAddress.Street',
          type: 'RHFTextField',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.address.street',
          tab: 'customer.address',
          getCurrentValue: (customer) =>
            customer?.address?.street ? customer.address.street : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'box',
          label: 'Customer.Forms.CustomerAddress.Box',
          type: 'RHFTextField',
          path: 'customer.address.box',
          tab: 'customer.address',
          getCurrentValue: (customer) =>
            customer?.address?.box ? customer.address.box : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'postalCode',
          label: 'Customer.Forms.CustomerAddress.PostalCode',
          type: 'RHFLazyPostalCode',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.address.postalCode',
          tab: 'customer.address',
          getCurrentValue: (customer) =>
            customer?.address?.postalCode ? customer.address.postalCode : null,
          size: {
            xs: 12,
            sm: 8,
            md: 8,
            lg: 8,
          },
        },
        {
          name: 'city',
          label: 'Customer.Forms.CustomerAddress.City',
          type: 'None',
          validation: Yup.string().required('Error.isRequired'),
          path: 'customer.address.city',
          tab: 'customer.address',
          getCurrentValue: (customer) =>
            customer?.address?.city ? customer.address.city : null,
          size: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
          },
        },
        {
          name: 'countryCode',
          label: 'Customer.Forms.CustomerAddress.CountryCode',
          parameterName: PARAMETERS_CONFIG.NAME.COUNTRY_CODE,
          type: 'RHFSelect',
          path: 'customer.address.countryCode',
          tab: 'customer.address',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (customer) =>
            customer?.address?.countryCode
              ? customer.address.countryCode
              : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
      ],
    },
    CUSTOMERS_CONTACT: {
      title: 'Customer.Contact',
      icon: <CallIcon alt="contact" color="primary" sx={{ fontSize: 20 }} />,
      tabLabel: 'TableTabs.customer.contact',
      FIELDS: [
        {
          name: 'email',
          label: 'Customer.Forms.CustomerContact.Email',
          type: 'RHFTextField',
          validation: Yup.string()
            .email('Error.invalidEmail')
            .required('Error.isRequired'),
          path: 'customer.contact.email',
          tab: 'customer.contact',
          getCurrentValue: (customer) =>
            customer?.contact?.email ? customer.contact.email : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone1',
          label: 'Customer.Forms.CustomerContact.Phone1',
          type: 'RHFPhoneField',
          validation: Yup.string()
            .test('is-valid-phone', 'Invalid phone number', (value) => {
              // Treat '+33' as valid
              if (value === '+33') return true;
              // Validate other values
              return isPossiblePhoneNumber(value);
            })
            .test('is-required', 'Error.isRequired', (value) => {
              if (value === '+33') return false; // handle +33 as empty value
              return true;
            }),
          path: 'customer.contact.phone1',
          tab: 'customer.contact',
          getCurrentValue: (customer) =>
            customer?.contact?.phone1 ? customer.contact.phone1 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone2',
          label: 'Customer.Forms.CustomerContact.Phone2',
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
          path: 'customer.contact.phone2',
          tab: 'customer.contact',
          getCurrentValue: (customer) =>
            customer?.contact?.phone2 ? customer.contact.phone2 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'phone3',
          label: 'Customer.Forms.CustomerContact.Phone3',
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
          path: 'customer.contact.phone3',
          tab: 'customer.contact',
          getCurrentValue: (customer) =>
            customer?.contact?.phone3 ? customer.contact.phone3 : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'fax',
          label: 'Customer.Forms.CustomerContact.Fax',
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
          path: 'customer.contact.fax',
          tab: 'customer.contact',
          getCurrentValue: (customer) =>
            customer?.contact?.fax ? customer.contact.fax : null,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'deliveryModeCode',
          label: 'Customer.Forms.CustomerContact.DeliveryModeCode',
          parameterName: PARAMETERS_CONFIG.NAME.DELIVERY_MODE_CODE,
          type: 'RHFSelect',
          path: 'customer.contact.deliveryModeCode',
          tab: 'customer.contact',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (customer) =>
            customer?.contact?.deliveryModeCode
              ? customer.contact.deliveryModeCode
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
    CUSTOMERS_COMPANY: {
      icon: (
        <BusinessIcon alt="company" color="primary" sx={{ fontSize: 20 }} />
      ),
      title: 'Customer.Company',
      tabLabel: 'TableTabs.customer.company',
      displayOnTab: (object) => object.type == 'PROFESSIONAL',
      FIELDS: [
        {
          name: 'vatable',
          displayOn: (object) => object.type == 'PROFESSIONAL',
          label: 'Customer.Forms.CustomerCompany.Vatable',
          type: 'RHFSwitch',
          path: 'customer.company.vatable',
          tab: 'customer.company',
          getCurrentValue: (customer) =>
            customer?.company?.vatable ? customer.company.vatable : false,
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
          label: 'Customer.Forms.CustomerCompany.CompanyName',
          type: 'RHFTextField',
          path: 'customer.company.companyName',
          tab: 'customer.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (customer) =>
            customer?.company?.companyName ? customer.company.companyName : '',
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
          label: 'Customer.Forms.CustomerCompany.IdentificationId',
          type: 'RHFTextField',
          path: 'customer.company.identificationId',
          tab: 'customer.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (customer) =>
            customer?.company?.identificationId
              ? customer.company.identificationId
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
          label: 'Customer.Forms.CustomerCompany.VatId',
          type: 'RHFTextField',
          path: 'customer.company.vatId',
          tab: 'customer.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (customer) =>
            customer?.company?.vatId ? customer.company.vatId : '',
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
          label: 'Customer.Forms.CustomerCompany.LegalFormCode',
          parameterName: PARAMETERS_CONFIG.NAME.LEGAL_FORM,
          type: 'RHFSelect',
          path: 'customer.company.legalFormCode',
          tab: 'customer.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (customer) =>
            customer?.company?.legalFormCode
              ? customer.company.legalFormCode
              : '',
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
          label: 'Customer.Forms.CustomerCompany.NaceCode',
          parameterName: PARAMETERS_CONFIG.NAME.NACE_CODE,
          type: 'RHFSelect',
          path: 'customer.company.naceCode',
          tab: 'customer.company',
          // eslint-disable-next-line consistent-return
          validation: Yup.string().when('type', (value) => {
            if (value[0] == 'PROFESSIONAL') {
              return Yup.string().required('Error.isRequired');
            }
          }),
          getCurrentValue: (customer) =>
            customer?.company?.naceCode ? customer.company.naceCode : '',
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

export default CUSTOMERS_CONFIG;

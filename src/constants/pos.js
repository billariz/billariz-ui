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

//Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';

const POS_CONFIG = {
  COLUMNS: [
    {
      id: 'reference',
      label: 'Pos.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'reference', type: 'text' },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'market',
      label: 'Pos.TableHeader.market',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'market', value: 'market', type: 'text' }],
      },
    },
    {
      id: 'contractId',
      label: 'Pos.TableHeader.contract',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'contractPointOfService.contractId', type: 'contract' },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'Pos.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'contractPointOfService.startDate', type: 'date' }],
      },
    },
    {
      id: 'endDate',
      label: 'Pos.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'contractPointOfService.endDate', type: 'date' }],
      },
    },
    {
      id: 'address',
      label: 'Pos.TableHeader.address',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: (pos) => pos.getAddress(), type: 'text' }],
      },
    },
    {
      id: 'tgoCode',
      label: 'Pos.TableHeader.tgoCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'tgoCode', value: 'tgoCode', type: 'text' }],
      },
    },
    {
      id: 'dgoCode',
      label: 'Pos.TableHeader.dgoCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'dgoCode', value: 'dgoCode', type: 'text' }],
      },
    },
    {
      id: 'direction',
      label: 'Pos.TableHeader.direction',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'direction', value: 'direction', type: 'text' }],
      },
    },
    {
      id: 'deliveryState',
      label: 'Pos.TableHeader.deliveryState',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'deliveryState',
            value: 'deliveryState',
            type: 'text',
          },
          {
            translParam: 'deliveryStatus',
            value: 'deliveryStatus',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'readingCycle',
      label: 'Pos.TableHeader.readingCycle',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ beTransl: true, value: 'readingCycle', type: 'text' }],
      },
    },
    {
      id: 'temporaryConnection',
      label: 'Pos.TableHeader.temporaryConnection',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'temporaryConnection', type: 'switch' },
          {
            value: (pos) =>
              `${pos.temporaryConnection ? pos.temporaryConnectionType : ''}`,
            type: 'text',
          },
        ],
      },
    },
  ],
  FILTERS: {
    DIRECTION: {
      index: 0,
      id: 'direction',
      label: 'Pos.FilterLabels.direction',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
    },
    ID: {
      index: 1,
      id: 'reference',
      label: 'Pos.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    MARKET: {
      index: 2,
      id: 'market',
      label: 'Pos.FilterLabels.market',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.MARKET,
    },
    TGO: {
      index: 3,
      id: 'tgoCode',
      label: 'Pos.FilterLabels.tgoCode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TGO,
    },
    DGO: {
      index: 4,
      id: 'dgoCode',
      label: 'Pos.FilterLabels.dgoCode',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.DGO,
    },
    DELIVERY_STATE: {
      index: 5,
      id: 'deliveryState',
      label: 'Pos.FilterLabels.deliveryState',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_DELIVERY_STATE,
    },
    DELIVERY_STATUS: {
      index: 6,
      id: 'deliveryStatus',
      label: 'Pos.FilterLabels.deliveryStatus',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_DELIVERY_STATUS,
    },
    READING_CYCLE: {
      index: 7,
      id: 'readingCycle',
      label: 'Pos.FilterLabels.readingCycle',
      type: FILTER_TYPE.AUTOCOMPLETE,
      parameterName: PARAMETERS_CONFIG.NAME.READING_CYCLE,
      dynamicFetching: { isDynamic: true, key: 'label' },
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    TEMPORARY_CONNECTION: {
      index: 8,
      id: 'temporaryConnection',
      label: 'Pos.FilterLabels.temporaryConnection',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      child: {
        TEMPORARY_CONNECTION_TYPE: {
          index: 9,
          id: 'temporaryConnectionType',
          label: 'Pos.FilterLabels.temporaryConnectionType',
          type: FILTER_TYPE.SELECT_BOX,
          size: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          defaultValue: '*',
          parameterName: PARAMETERS_CONFIG.NAME.POS_TEMPORARY_CONNECTION_TYPE,
          displayOn: (filters) => filters.temporaryConnection == 'TRUE',
        },
      },
      resetChild: (filters) => filters.temporaryConnection !== 'TRUE',
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.POS_TEMPORARY_CONNECTION,
    },

    CONTRACT_ID: {
      index: 10,
      id: 'contractRef',
      label: 'Pos.FilterLabels.contractRef',
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
    POS_ABOUT: {
      tabLabel: 'TableTabs.pos.pos',
      FIELDS: [
        {
          name: 'reference',
          label: 'Pos.Forms.reference',
          type: 'RHFTextField',
          disableEdit: true,
          path: 'pos.reference',
          tab: 'pos',
          getCurrentValue: (pos) => pos.reference,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'readingCycleId',
          label: 'Pos.Forms.readingCycle',
          type: 'RHFAutocomplete',
          path: 'pos.readingCycleId',
          tab: 'pos',
          dynamicFetching: { isDynamic: true, key: 'label' },
          getCurrentValue: (pos) => pos?.readingCycle?.id,
          getTranslatedValue: (pos) => pos?.readingCycle,
          parameterName: PARAMETERS_CONFIG.NAME.READING_CYCLE,
          size: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'market',
          label: 'Pos.Forms.market',
          type: 'RHFSelect',
          path: 'pos.market',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.market,
          parameterName: PARAMETERS_CONFIG.NAME.MARKET,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'direction',
          label: 'Pos.Forms.direction',
          type: 'RHFSelect',
          path: 'pos.direction',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.direction,
          parameterName: PARAMETERS_CONFIG.NAME.DIRECTION,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'dgoCode',
          label: 'Pos.Forms.dgoCode',
          type: 'RHFSelect',
          path: 'pos.dgoCode',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.dgoCode,
          parameterName: PARAMETERS_CONFIG.NAME.DGO,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'tgoCode',
          label: 'Pos.Forms.tgoCode',
          type: 'RHFSelect',
          path: 'pos.tgoCode',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.tgoCode,
          parameterName: PARAMETERS_CONFIG.NAME.TGO,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
        {
          name: 'deliveryStatus',
          label: 'Pos.Forms.deliveryStatus',
          type: 'RHFSelect',
          path: 'pos.deliveryStatus',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.deliveryStatus,
          parameterName: PARAMETERS_CONFIG.NAME.POS_DELIVERY_STATUS,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },

        {
          name: 'deliveryState',
          label: 'Pos.Forms.deliveryState',
          type: 'RHFSelect',
          path: 'pos.deliveryState',
          tab: 'pos',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) => pos.deliveryState,
          parameterName: PARAMETERS_CONFIG.NAME.POS_DELIVERY_STATE,
          size: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
        },
      ],
    },
    POS_ADDRESS: {
      title: 'Pos.address',
      icon: (
        <LocationOnIcon alt="address" color="primary" sx={{ fontSize: 20 }} />
      ),
      tabLabel: 'TableTabs.pos.address',
      FIELDS: [
        {
          name: 'number',
          label: 'Pos.Forms.PosAddress.Number',
          type: 'RHFTextField',
          path: 'pos.address.number',
          tab: 'pos.address',
          getCurrentValue: (pos) =>
            pos?.address?.number ? pos.address.number : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'street',
          label: 'Pos.Forms.PosAddress.Street',
          type: 'RHFTextField',
          path: 'pos.address.street',
          tab: 'pos.address',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) =>
            pos?.address?.street ? pos.address.street : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'box',
          label: 'Pos.Forms.PosAddress.Box',
          type: 'RHFTextField',
          path: 'pos.address.box',
          tab: 'pos.address',
          getCurrentValue: (pos) =>
            pos?.address?.box ? pos.address.box : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
        {
          name: 'postalCode',
          label: 'Pos.Forms.PosAddress.PostalCode',
          type: 'RHFLazyPostalCode',
          validation: Yup.string().required('Error.isRequired'),
          path: 'pos.address.postalCode',
          tab: 'pos.address',
          getCurrentValue: (pos) =>
            pos?.address?.postalCode ? pos.address.postalCode : null,
          size: {
            xs: 12,
            sm: 8,
            md: 8,
            lg: 8,
          },
        },
        {
          name: 'city',
          label: 'Pos.Forms.PosAddress.City',
          type: 'None',
          validation: Yup.string().required('Error.isRequired'),
          path: 'pos.address.city',
          tab: 'pos.address',
          getCurrentValue: (pos) =>
            pos?.address?.city ? pos.address.city : null,
          size: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
          },
        },
        {
          name: 'countryCode',
          label: 'Pos.Forms.PosAddress.CountryCode',
          parameterName: PARAMETERS_CONFIG.NAME.COUNTRY_CODE,
          type: 'RHFSelect',
          path: 'pos.address.countryCode',
          tab: 'pos.address',
          validation: Yup.string().required('Error.isRequired'),
          getCurrentValue: (pos) =>
            pos?.address?.countryCode ? pos.address.countryCode : null,
          size: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
        },
      ],
    },
    POS_TEMPORARY_CONNECTION: {
      tabLabel: 'TableTabs.pos.temporaryConnection',
      FIELDS: [
        {
          name: 'temporaryConnection',
          label: 'Pos.Forms.temporaryConnection',
          type: 'RHFSwitch',
          path: 'pos.temporaryConnection',
          tab: 'pos.temporaryConnection',
          getCurrentValue: (pos) =>
            pos.temporaryConnection ? pos.temporaryConnection : false,
          size: {
            xs: 12,
            sm: 12,
            md: 2,
            lg: 2,
          },
        },
        {
          name: 'temporaryConnectionType',
          label: 'Pos.Forms.temporaryConnectionType',
          type: 'RHFSelect',
          path: 'pos.temporaryConnectionType',
          tab: 'pos.temporaryConnection',
          getCurrentValue: (pos) => pos.temporaryConnectionType,
          parameterName: PARAMETERS_CONFIG.NAME.POS_TEMPORARY_CONNECTION_TYPE,
          size: {
            xs: 12,
            sm: 12,
            md: 10,
            lg: 10,
          },
        },
      ],
    },
  },
};

export default POS_CONFIG;

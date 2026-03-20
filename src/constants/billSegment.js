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
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';

const BILL_SEGMENT_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'ServiceElement.TableHeader.category',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceElementCategory',
            value: 'se.category',
            type: 'text',
          },
          {
            translParam: 'serviceElementSubCategory',
            value: 'se.subCategory',
            type: 'text',
          },
          { value: 'id', type: 'text' },
        ],
      },
    },
    {
      id: 'period',
      label: 'BillSegment.TableHeader.period',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'startDate', type: 'date' },
          { value: 'endDate', type: 'date' },
        ],
      },
    },
    {
      id: 'quantity',
      label: 'BillSegment.TableHeader.quantity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'quantity', type: 'text' },
          { translParam: 'sqType', value: 'quantityUnit', type: 'text' },
        ],
      },
    },
    {
      id: 'quantityThreshold',
      label: 'BillSegment.TableHeader.quantityThreshold',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'quantityThreshold', type: 'text' },
          {
            translParam: 'quantityThresholdBase',
            value: 'quantityThresholdBase',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'tou',
      label: 'BillSegment.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'touGroup', value: 'touGroup', type: 'text' },
          { translParam: 'tou', value: 'tou', type: 'text' },
        ],
      },
    },
    {
      id: 'price',
      label: 'BillSegment.TableHeader.price',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'price', type: 'text' },
          { translParam: 'priceUnit', value: 'priceUnit', type: 'text' },
        ],
      },
    },
    {
      id: 'priceThreshold',
      label: 'BillSegment.TableHeader.priceThreshold',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'priceThreshold', type: 'text' },
          {
            translParam: 'priceThresholdBase',
            value: 'priceThresholdBase',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'amount',
      label: 'BillSegment.TableHeader.amount',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'amount', type: 'text' }],
      },
    },
    {
      id: 'vatRate',
      label: 'BillSegment.TableHeader.vatRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'vatRate', value: 'vatRate', type: 'text' }],
      },
    },
    {
      id: 'nature',
      label: 'BillSegment.TableHeader.nature',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'meterReadQuality', value: 'nature', type: 'text' },
        ],
      },
    },
    {
      id: 'billId',
      label: 'BillSegment.TableHeader.billId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'billId', type: 'bill' },
          { value: 'cancelledBy', type: 'bill' },
        ],
      },
    },
    {
      id: 'element',
      label: 'BillSegment.TableHeader.element',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'meterReadId', type: 'meterRead' },
          { value: 'articleId', type: 'article' },
        ],
      },
    },
    {
      id: 'schema',
      label: 'BillSegment.TableHeader.schema',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { translParam: 'billSegmentSchema', value: 'schema', type: 'text' },
        ],
      },
    },
    {
      id: 'status',
      label: 'BillSegment.TableHeader.status',
      align: 'left',
      cell: {
        renderer: StatusLabel,
        value: [
          {
            type: 'billSegment',
          },
        ],
      },
    },
  ],
  FILTERS: {
    STATUS: {
      index: 0,
      id: 'status',
      label: 'BillSegment.FilterLabels.status',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_SEGMENT_STATUS,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'BillSegment.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    SE_ID: {
      index: 2,
      id: 'seId',
      label: 'BillSegment.FilterLabels.seId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_CATEGORY,
    },
    TOS_ID: {
      index: 3,
      id: 'tosId',
      label: 'BillSegment.FilterLabels.tosId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
      parameterName: PARAMETERS_CONFIG.NAME.TERME_OF_SERVICE_SUBCATEGORY,
    },
    CONTRACT_ID: {
      index: 4,
      id: 'contractId',
      label: 'BillSegment.FilterLabels.contractId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    BILL_ID: {
      index: 5,
      id: 'billId',
      label: 'BillSegment.FilterLabels.billId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '',
    },
    TOU_GROUP: {
      index: 6,
      id: 'touGroup',
      label: 'ServiceElement.FilterLabels.touGroup',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU_GROUP,
    },
    TOU: {
      index: 7,
      id: 'touGroup',
      label: 'ServiceElement.FilterLabels.tou',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.TOU,
    },
    START_DATE: {
      index: 8,
      id: 'startDate',
      label: 'Service.FilterLabels.startDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    END_DATE: {
      index: 9,
      id: 'endDate',
      label: 'Service.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
    },
    SCHEMA: {
      index: 10,
      id: 'schema',
      label: 'BillSegment.FilterLabels.schema',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.BILL_SEGMENT_SCHEMA,
    },
    VAT_RATE: {
      index: 11,
      id: 'vatRate',
      label: 'BillSegment.FilterLabels.vatRate',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.VAT_RATE,
    },
    NATURE: {
      index: 12,
      id: 'nature',
      label: 'BillSegment.FilterLabels.nature',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.METER_READ_QUALITY,
    },
    METER_READ_ID: {
      index: 13,
      id: 'meterReadId',
      label: 'BillSegment.FilterLabels.meterReadId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    ARTICLE_ID: {
      index: 14,
      id: 'articleId',
      label: 'BillSegment.FilterLabels.articleId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    CATEGORY: {
      index: 15,
      id: 'category',
      label: 'ServiceElement.FilterLabels.category',
      type: 'selectBox',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_CATEGORY,
    },
    SUBCATEGORY: {
      index: 16,
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
      parameterName: PARAMETERS_CONFIG.NAME.SERVICE_ELEMENT_SUB_CATEGORY,
    },
  },
};

export default BILL_SEGMENT_CONFIG;

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
import PARAMETERS_CONFIG from './parameters';
import * as Yup from 'yup';

const ARTICLES_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Article.TableHeader.article',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'period',
      label: 'Article.TableHeader.period',
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
      id: 'effectiveDate',
      label: 'Article.TableHeader.effectiveDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'effectiveDate', type: 'date' }],
      },
    },
    {
      id: 'externalArticleId',
      label: 'Article.TableHeader.externalArticleId',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'externalArticleId', type: 'text' }],
      },
    },
    {
      id: 'quantity',
      label: 'Article.TableHeader.quantity',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'quantity', type: 'text' },
          {
            translParam: 'sqType',
            value: 'unitOfQuantity',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'tou',
      label: 'Article.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'tou', value: 'tou', type: 'text' }],
      },
    },
    {
      id: 'unitPrice',
      label: 'Article.TableHeader.unitPrice',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'unitOfUnitPrice',
            value: 'unitOfUnitPrice',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'amount',
      label: 'Article.TableHeader.amount',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'amount', type: 'text' }],
      },
    },
    {
      id: 'vatRate',
      label: 'Article.TableHeader.vatRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'vatRate', value: 'vatRate', type: 'text' }],
      },
    },
  ],
  FILTERS: {
    STATUT: {
      index: 0,
      id: 'statut',
      label: 'Article.FilterLabels.statut',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ARTICLE_STATUS,
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Article.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
    START_DATE: {
      index: 2,
      id: 'startDate',
      label: 'Article.FilterLabels.startDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
    END_DATE: {
      index: 3,
      id: 'endDate',
      label: 'Article.FilterLabels.endDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
    EFFECTIVE_DATE: {
      index: 4,
      id: 'effectiveDate',
      label: 'Article.FilterLabels.effectiveDate',
      type: FILTER_TYPE.DATE_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
    ARTICLE_TYPE: {
      index: 5,
      id: 'articleType',
      label: 'Article.FilterLabels.articleType',
      dynamicFetching: { isDynamic: true, key: 'label' },
      type: FILTER_TYPE.AUTOCOMPLETE,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.ARTICLE_TYPE,
    },
    POS_REF: {
      index: 6,
      id: 'posRef',
      label: 'Article.FilterLabels.posRef',
      type: FILTER_TYPE.TEXT_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
    BILL_ID: {
      index: 7,
      id: 'billId',
      label: 'Article.FilterLabels.billId',
      type: FILTER_TYPE.TEXT_FIELD,
      size: { xs: 12, sm: 6, md: 3, lg: 3 },
      defaultValue: '',
    },
  },
  FORMS: {
    FIELDS: [
      {
        name: 'articleTypeId',
        label: 'Article.Forms.articleType',
        type: 'RHFAutocomplete',
        validation: Yup.string().required('Error.isRequired'),
        dynamicFetching: { isDynamic: true, key: 'label' },
        getCurrentValue: (article) => article.articleTypeId,
        parameterName: PARAMETERS_CONFIG.NAME.ARTICLE_TYPE,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'billId',
        label: 'Article.Forms.billId',
        type: 'RHFTextField',
        disabled: true,
        getCurrentValue: (article) => article.billId,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'startDate',
        label: 'Article.Forms.startDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.startDate,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'endDate',
        label: 'Article.Forms.endDate',
        type: 'RHFDatePicker',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.endDate,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'effectiveDate',
        label: 'Article.Forms.effectiveDate',
        type: 'RHFDatePicker',
        disableEdit: true,
        getCurrentValue: (article) => article.effectiveDate,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'quantity',
        label: 'Article.Forms.quantity',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.quantity,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'tou',
        label: 'Article.Forms.tou',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.tou,
        parameterName: PARAMETERS_CONFIG.NAME.TOU,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'status',
        label: 'Article.Forms.status',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.statut,
        parameterName: PARAMETERS_CONFIG.NAME.ARTICLE_STATUS,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'unitOfQuantity',
        label: 'Article.Forms.unitOfQuantity',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.unitOfQuantity,
        parameterName: PARAMETERS_CONFIG.NAME.SQ_TYPE,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'unitOfUnitPrice',
        label: 'Article.Forms.unitOfUnitPrice',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.unitOfUnitPrice,
        parameterName: PARAMETERS_CONFIG.NAME.UNIT_OF_UNIT_PRICE,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'unitPrice',
        label: 'Article.Forms.unitPrice',
        type: 'RHFTextField',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.unitPrice,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
      {
        name: 'vatRate',
        label: 'Article.Forms.vatRate',
        type: 'RHFSelect',
        validation: Yup.string().required('Error.isRequired'),
        getCurrentValue: (article) => article.vatRate,
        parameterName: PARAMETERS_CONFIG.NAME.VAT_RATE,
        size: {
          xs: 12,
          sm: 6,
          md: 3,
          lg: 3,
        },
      },
    ],
  },
};

export default ARTICLES_CONFIG;

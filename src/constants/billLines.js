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

const BILL_LINE_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'BillLine.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'billLineCategory',
      label: 'BillLine.TableHeader.billLineCategory',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            translParam: 'serviceElementCategory',
            value: 'billLineCategory',
            type: 'text',
          },
          {
            translParam: 'serviceElementSubCategory',
            value: 'billLineSubCategory',
            type: 'text',
          },
        ],
      },
    },
    {
      id: 'startDate',
      label: 'BillLine.TableHeader.startDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'startDate', type: 'date' }],
      },
    },

    {
      id: 'endDate',
      label: 'BillLine.TableHeader.endDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'endDate', type: 'date' }],
      },
    },
    {
      id: 'tou',
      label: 'BillLine.TableHeader.tou',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'tou', value: 'tou', type: 'text' }],
      },
    },

    {
      id: 'quantity',
      label: 'BillLine.TableHeader.quantity',
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
      id: 'price',
      label: 'BillLine.TableHeader.price',
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
      id: 'vatRate',
      label: 'BillLine.TableHeader.vatRate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ translParam: 'vatRate', value: 'vatRate', type: 'text' }],
      },
    },
    {
      id: 'totalWithoutVat',
      label: 'BillLine.TableHeader.totalWithoutVat',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'totalWithoutVat', type: 'text' }],
      },
    },
  ],
};

export default BILL_LINE_CONFIG;

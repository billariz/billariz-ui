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
import { JOURNAL_STATUS, FILTER_TYPE } from './enums';
import PARAMETERS_CONFIG from './parameters';

const JOURNAL_CONFIG = {
  COLUMNS: [
    {
      id: 'id',
      label: 'Journal.TableHeader.id',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'id', type: 'text' }],
      },
    },
    {
      id: 'userName',
      label: 'Journal.TableHeader.user',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: (data) => data.user || '', type: 'logo' },
          { value: (data) => data.user.userName, type: 'text' },
        ],
      },
    },
    {
      id: 'creationDate',
      label: 'Journal.TableHeader.creationDate',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'creationDate', type: 'datetime' }],
      },
    },
    {
      id: 'method',
      label: 'Journal.TableHeader.action',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'method', type: 'text' }],
      },
    },
    {
      id: 'newStatus',
      label: 'Journal.TableHeader.forStatus',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          {
            value: 'newStatus',
            type: 'label',
            color: (newStatus) =>
              (newStatus === JOURNAL_STATUS.COMPLETED && 'success') ||
              (newStatus === JOURNAL_STATUS.FAILURE && 'error') ||
              'default',
          },
        ],
      },
    },
    {
      id: 'track',
      label: 'Journal.TableHeader.track',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [
          { value: 'ipAdress', type: 'stack' },
          { value: 'userAgent', type: 'stack' },
          { value: 'forwardedFor', type: 'stack' },
          { value: 'apiPath', type: 'stack' },
        ],
      },
    },
    {
      id: 'comment',
      label: 'Journal.TableHeader.messageCode',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'comment', type: 'stack' }],
      },
    },
    {
      id: 'messages',
      label: 'Journal.TableHeader.messages',
      align: 'left',
      cell: {
        renderer: MultilineCellRenderer,
        value: [{ value: 'messages', type: 'stack' }],
      },
    },
  ],
  FILTERS: {
    ACTION: {
      index: 0,
      id: 'action',
      label: 'Journal.TableHeader.action',
      type: FILTER_TYPE.TAB,
      size: {
        xs: 12,
        sm: 6,
        md: 2,
        lg: 2,
      },
      defaultValue: '*',
      parameterName: 'journalAction',
    },
    ID: {
      index: 1,
      id: 'id',
      label: 'Journal.FilterLabels.id',
      type: FILTER_TYPE.TEXT_FIELD,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '',
    },
    USER: {
      index: 2,
      id: 'userName',
      label: 'Journal.TableHeader.user',
      type: FILTER_TYPE.AUTOCOMPLETE,
      dynamicFetching: { isDynamic: true, key: 'userName' },
      getOptionDisplay: (option) => `${option.userName}`,
      enumId: 'userName',
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.USERS,
    },
    OBJECTTYPE: {
      index: 3,
      id: 'objectType',
      label: 'Journal.FilterLabels.objectType',
      type: FILTER_TYPE.SELECT_BOX,
      size: {
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
      },
      defaultValue: '*',
      parameterName: PARAMETERS_CONFIG.NAME.OBJECT_TYPE,
    },
    OBJECTID: {
      index: 4,
      id: 'objectId',
      label: 'Journal.FilterLabels.objectId',
      type: FILTER_TYPE.TEXT_FIELD,
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
      id: 'newStatus',
      label: 'Journal.TableHeader.forStatus',
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
};

export default JOURNAL_CONFIG;

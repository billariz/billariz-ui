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

const CUSTOMERCONTRACTS_CONFIG = {
  COLUMNS: [
    {
      id: 'contract_Id',
      label: 'Customer.Contract.TableHeader.Id',
      align: 'left',
    },
    {
      id: 'status',
      label: 'Customer.Contract.TableHeader.Status',
      align: 'left',
    },
    {
      id: 'market',
      label: 'Customer.Contract.TableHeader.Market',
      align: 'left',
    },
    {
      id: 'startDate',
      label: 'Customer.Contract.TableHeader.StartDate',
      align: 'left',
    },
    {
      id: 'endDate',
      label: 'Customer.Contract.TableHeader.EndDate',
      align: 'left',
    },
    {
      id: 'billingMode',
      label: 'Customer.Contract.TableHeader.BillingMode',
      align: 'left',
    },
    {
      id: 'direction',
      label: 'Customer.Contract.TableHeader.Direction',
      align: 'left',
    },
    {
      id: 'Periodicity',
      label: 'Customer.Contract.TableHeader.Periodicity',
      align: 'left',
    },
    {
      id: 'Cycle',
      label: 'Customer.Contract.TableHeader.Cycle',
      align: 'left',
    },
    {
      id: 'AfterDate',
      label: 'Customer.Contract.TableHeader.AfterDate',
      align: 'left',
    },
    {
      id: 'serviceCategory',
      label: 'Customer.Contract.TableHeader.serviceCategory',
      align: 'left',
    },
    {
      id: 'subscriptionDate',
      label: 'Customer.Contract.TableHeader.subscriptionDate',
      align: 'left',
    },
  ],
  FILTERS: {
    NUM_CONTRACT: {
      index: 3,
      id: 'contractId',
      label: 'Customer.Contract.FilterLabels.ContractNumber',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
    MARKET: {
      index: 5,
      id: 'market',
      label: 'Customer.Contract.FilterLabels.Market',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
    STATUS: {
      index: 4,
      id: 'status',
      label: 'Customer.Contract.FilterLabels.Status',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },

    DIRECTION: {
      index: 6,
      id: 'direction',
      label: 'Customer.Contract.FilterLabels.Direction',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
    BILLINGMODE: {
      index: 7,
      id: 'billingMode',
      label: 'Customer.Contract.FilterLabels.BillingMode',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
    BILLINGFREQUENCY: {
      index: 8,
      id: 'billingFrequency',
      label: 'Customer.Contract.FilterLabels.BillingFrequency',
      type: 'TextField',
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      },
      defaultValue: '',
    },
  },
};

export default CUSTOMERCONTRACTS_CONFIG;

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

export class BillModel {
  id;

  reference;

  billingRunId;

  status;

  type;

  nature;

  perimeter;

  contract;

  customer;

  vatNR;

  vatRR;

  totalVat;

  totalAmount;

  billDate;

  startDate;

  endDate;

  cancelledBill;

  accountingDate;

  groupBillId;

  details;

  constructor(json) {
    Object.assign(this, json);
  }

  relations() {
    return [
      this.contract && {
        ...this.contract,
        relationType: 'BILL_CONTRACT',
        secondObjectId: this.contract.id,
      },
      this.customer && {
        ...this.customer,
        relationType: 'BILL_CUSTOMER',
        secondObjectId: this.customer.id,
      },
      this.perimeter && {
        ...this.perimeter,
        relationType: 'BILL_PERIMETER',
        secondObjectId: this.perimeter.id,
      },
    ].filter(Boolean);
  }
}

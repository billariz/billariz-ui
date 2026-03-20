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

export class ServiceElement {
  id;

  tosId;

  seTypeId;

  master;

  vatRate;

  rateType;

  operand;

  operandType;

  factor;

  factorType;

  metered;

  billingScheme;

  accountingScheme;

  estimateAuthorized;

  touGroup;

  tou;

  startDate;

  endDate;

  status;

  minDayForEstimate;

  seListBaseForSq;

  threshold;

  thresholdType;

  thresholdBase;

  sqType;

  category;

  subCategory;

  constructor(json) {
    Object.assign(this, json);
  }

  getPrice() {
    return `${this.operand} + ${this.factor} * ${this.rateType}`;
  }
}

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

export class ServiceModel {
  
  id;

  contractId;

  serviceType;

  startDate;

  endDate;

  touGroup;

  tou;

  amount;

  threshold;

  thresholdType;

  thresholdBase;

  operand;

  operandType;

  factor;

  factorType;

  rateType;

  status;
  
  constructor(json) {
    Object.assign(this, json);
  }

  getCategory() {
    return this.serviceType.category || 'N/A';
  }
}

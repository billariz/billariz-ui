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

export class ActorModel {
  id;

  role;

  perimeterId;

  third;

  startDate;

  endDate;

  constructor(json) {
    Object.assign(this, json);
  }

  getFullName() {
    return `${this?.third?.individual?.firstName} ${this?.third?.individual?.lastName}`;
  }

  getFirstLineAdress() {
    return `${this?.third?.address?.number} ${this?.third?.address?.street}`;
  }

  getSecondLineAdress() {
    return `${this?.third?.address?.postalCode} ${this?.third?.address?.city}`;
  }

  getPhoneNumber() {
    return `${this?.third?.contact?.phone1}`;
  }

  getEmail() {
    return `${this?.third?.contact?.email}`;
  }

  getRole() {
    return `${this.role}`;
  }
}

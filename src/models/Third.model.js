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

export class ThirdModel {
  id;

  type;

  address;

  financialInformation;

  individual;

  company;

  contact;

  constructor(json) {
    Object.assign(this, json);
  }

  getFullName() {
    if (this.individual)
      return `${this.individual.firstName} ${this.individual.lastName}`;
    else
      return `${this.company.companyName}`;
  }

  getFirstLineAdress() {
    return `${this.address.number} ${this.address.street}`;
  }

  getSecondLineAdress() {
    return `${this.address.postalCode} ${this.address.city}`;
  }

  getPhoneNumber() {
    return `${this.contact.phone1}`;
  }

  getEmail() {
    return `${this.contact.email}`;
  }

  getType() {
    return `${this.type}`;
  }
}

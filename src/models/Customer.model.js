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

export default class CustomerModel {
  category;

  creationDate;

  customerId;

  id;

  languageCode;

  status;

  type;

  individual;

  company;

  contact;

  address;

  constructor(json) {
    Object.assign(this, json);
  }

  getCategory() {
    return this.category || 'N/A';
  }

  getEmail() {
    return this?.contact?.email || 'N/A';
  }

  getPhone() {
    return this?.contact?.phone1 || 'N/A';
  }

  getCompanyName() {
    return this?.company?.companyName || 'N/A';
  }

  getCompanyId() {
    return this?.company?.identificationId || 'N/A';
  }

  getFullName() {
    if (this.type === 'RESIDENTIAL') {
      return this?.individual?.firstName
        ? `${this.individual.firstName} ${this.individual.lastName}`
        : 'N/A';
    }
    return this?.company?.companyName ? this.company.companyName : '';
  }

  getIndividual() {
    return (
      (this?.individual?.firstName &&
        `${this.individual.firstName} ${this.individual.lastName}`) ||
      'N/A'
    );
  }

  getInitials() {
    return this.getFullName()
      .match(/(\b\S)?/g)
      .join('')
      .toUpperCase();
  }

  getAddress() {
    if (this.address) {
      return `${this.address.street || 'No Street'} \n${
        this.address.postalCode
      } - ${this.address.city}`;
    } else return null;
  }
}

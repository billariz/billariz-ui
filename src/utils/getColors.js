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

export const getColors = (status, defaultValue = "default") => {
  try {
    switch (status) {
      case "ACTIVITY_CONTRACT":
      case "order1":
      case "BILLED":
        return "primary";
      case "EFFECTIVE":
        return "success";
      case "CLIENT":
      case "COMPLETED":
        return "success";
      case "ACTIVITY_PERIMETER":
      case "VALIDATED":
        return "success";
      case "OPEN":
        return "success";
      case "ACTIVE":
        return "success";
      case "INITIALIZED":
        return "info";
      case "PROSPECT":
      case "PENDING":
        return "warning";
      case "IN_PROGRESS":
      case "order4":
      case "CALCULATED":
        return "info";
      case "order2":
      case "CLAUSED":
        return "default";
      case "PENDING_START":
        return "warning";
      case "WAITING":
        return "warning";
      case "LEAD":
      case "SUSPENDED":
        return "warning";
      case "ACTIVITY_BILL":
      case "order3":
      case "INSTALLED":
        return "info";
      case "PRINTED":
        return "info";
      case "FINALIZED":
        return "success";
      case "CANCELED":
        return "error";
      case "TERMINATED":
        return "success";
      case "CLOSED":
        return "default";
      case "ACTIVITY_METER_READ":
      case "ACTIVITY_BILLABLE_CHARGE":
      case "IN_FAILURE":
        return "error";
      case "DISABLED":
        return "error";
      case "CANCELLED":
        return "default";
      case "BLOCKED":
        return "error";
      default:
        return defaultValue;
    }
  } catch {
    return "error";
  }
};

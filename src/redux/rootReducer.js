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

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import activityReducer from './slices/activity';
import actorReducer from './slices/actor';
import billReducer from './slices/bill';
import billSegmentReducer from './slices/billSegment';
import billinRunReducer from './slices/billingRun';
import consumptionReducer from './slices/consumption';
import contractReducer from './slices/contract';
import customerReducer from './slices/customer';
import entityReducer from './slices/entity';
import eventReducer from './slices/event';
import groupReducer from './slices/group';
import journalReducer from './slices/journal';
import meterReducer from './slices/meter';
import meterReadReducer from './slices/meterRead';
import parameterReducer from './slices/parameter';
import perimeterReducer from './slices/perimeter';
import pointOfServiceReducer from './slices/pointOfService';
import posCapacityReducer from './slices/posCapacity';
import posConfigurationReducer from './slices/posConfiguration';
import posEstimateReducer from './slices/posEstimate';
import rateReducer from './slices/rate';
import rateTypeReducer from './slices/rateType';
import relationReducer from './slices/relation';
import seStartOptionReducer from './slices/seStartOption';
import serviceReducer from './slices/service';
import serviceElementReducer from './slices/serviceElement';
import serviceElementTypeReducer from './slices/serviceElementType';
import serviceStartOptionReducer from './slices/serviceStartOption';
import serviceTypeReducer from './slices/serviceType';
import termeOfServiceReducer from './slices/termeOfService';
import tosStartOptionReducer from './slices/tosStartOption';
import tosTypeReducer from './slices/tosType';
import userReducer from './slices/user';
import activityTypeReducer from './slices/activityType';
import activityTemplateReducer from './slices/activityTemplate';
import eventTemplateReducer from './slices/eventTemplate';
import thirdReducer from './slices/third';
import objectProcessRuleReducer from './slices/objectProcessRule';
import gloablLoading from './slices/gloablLoading';
import postalCode from './slices/postalCode';
import climaticRef from './slices/climaticRef';
import geoRef from './slices/geoRef';
import billableChargeReducer from './slices/billableCharge';
import articleReducer from './slices/article';
import defaultCountryCode from './slices/defaultCountryCode';
import permission from './slices/permission';
import roleReducer from './slices/role';
import rolePermissionReducer from './slices/rolePermission';
import userPermissionReducer from './slices/userPermission';
import userRoleReducer from './slices/userRole';
import chartReducer from './slices/chart';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  keyPrefix: 'redux-',
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  customers: customerReducer,
  contracts: contractReducer,
  parameters: parameterReducer,
  perimeters: perimeterReducer,
  pointOfServices: pointOfServiceReducer,
  activities: activityReducer,
  events: eventReducer,
  bills: billReducer,
  posConfigurations: posConfigurationReducer,
  posCapacities: posCapacityReducer,
  posEstimates: posEstimateReducer,
  consumptions: consumptionReducer,
  meters: meterReducer,
  meterReads: meterReadReducer,
  services: serviceReducer,
  termeOfServices: termeOfServiceReducer,
  relations: relationReducer,
  journals: journalReducer,
  serviceElements: serviceElementReducer,
  billSegments: billSegmentReducer,
  actors: actorReducer,
  serviceTypes: serviceTypeReducer,
  serviceStartOptions: serviceStartOptionReducer,
  tosTypes: tosTypeReducer,
  tosStartOptions: tosStartOptionReducer,
  serviceElementTypes: serviceElementTypeReducer,
  seStartOptions: seStartOptionReducer,
  rateTypes: rateTypeReducer,
  rates: rateReducer,
  billingRuns: billinRunReducer,
  organisms: entityReducer,
  groups: groupReducer,
  users: userReducer,
  activityType: activityTypeReducer,
  activityTemplate: activityTemplateReducer,
  eventTemplate: eventTemplateReducer,
  thirds: thirdReducer,
  objectProcessRules: objectProcessRuleReducer,
  postalCodes: postalCode,
  globalLoading: gloablLoading,
  climaticRefs: climaticRef,
  geoRefs: geoRef,
  billableCharges: billableChargeReducer,
  articles: articleReducer,
  permissions: permission,
  roles: roleReducer,
  rolePermissions: rolePermissionReducer,
  userPermissions: userPermissionReducer,
  userRoles: userRoleReducer,
  defaultCountryCode: defaultCountryCode,
  charts: chartReducer,
});

export { rootPersistConfig, rootReducer };

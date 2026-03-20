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

import { PureAbility } from '@casl/ability';
import axios from 'axios';
import ENDPOINTS from 'src/constants/enums/endpoints';
import { HOST_API } from '../config';

class AbilityManager {
  constructor() {
    // Instance de PureAbility pour gérer les permissions
    this.ability = new PureAbility([], {
      subjectName: (subject) => subject,
    });

    // Cache local pour stocker les permissions
    this.permissionsCache = new Map();
  }

  can(action, subject) {
    return this.ability.can(action, subject);
  }

  update(rules) {
    this.ability.update(rules);
  }

  clearCache() {
    this.permissionsCache.clear(); // Clears the existing cache
  }

  // Méthode pour charger les permissions
  async loadPermissions(authToken, userName, entity = null) {
    const cacheKey = entity ? `${userName}:${entity}` : userName;

    // Vérifier si les permissions sont déjà en cache
    const cacheEntry = this.permissionsCache.get(cacheKey);

    if (cacheEntry && cacheEntry.expiry > Date.now()) {
      console.info(`Permissions pour ${cacheKey} chargées depuis le cache.`);
      return cacheEntry.permissions;
    }
    const currentGroup = localStorage.getItem('currentGroup');
    const baseURL = HOST_API.replace('__GROUP__', currentGroup);
    try {
      // Construire l'URL pour récupérer les permissions
      const url = `${baseURL}${ENDPOINTS.FIND_PERMISSIONS}?userName=${userName}`;
      const roleResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Filtrer les permissions selon l'entité (si spécifiée)
      const rolePermissions = roleResponse.data._embedded.permissions
        .filter((perm) => !entity || perm.entity === entity)
        .map((perm) => ({
          action: perm.action,
          subject: perm.entity,
        }));

      // Mettre à jour les permissions dans l'instance ability
      this.ability.update(rolePermissions);
      // Ajouter les permissions au cache
      this.permissionsCache.set(cacheKey, {
        permissions: rolePermissions,
        expiry: Date.now() + 60 * 60 * 1000, // Expire dans 1 heure
      });

      console.info(`Permissions pour ${cacheKey} chargées depuis l'API.`);
      return rolePermissions;
    } catch (error) {
      console.error(
        `Erreur lors du chargement des permissions pour ${cacheKey} :`,
        error
      );
      return [];
    }
  }

  // Méthode pour accéder à l'instance ability
  getAbility() {
    return this.ability;
  }
}

// Exporter une instance unique pour réutilisation
const abilityManager = new AbilityManager();
export default abilityManager;

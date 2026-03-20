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

import React from 'react';
import { Can } from '@casl/react';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

// Créer un cache local (en mémoire) pour les permissions
const permissionsCache = new Map();

const PermissionGuard = ({ action, subject, children }) => {
  const { ability, loadPermissions } = useAuth();

  React.useEffect(() => {
    // Vérifier si les permissions pour le sujet sont déjà en cache
    if (!permissionsCache.has(subject)) {
      loadPermissions(subject).then((permissions) => {
        // Ajouter au cache après chargement
        permissionsCache.set(subject, permissions);
      });
    } else {
      // Mettre à jour CASL Ability avec les permissions en cache
      ability.update(permissionsCache.get(subject));
    }
  }, [subject, loadPermissions, ability]);

  return (
    <Can I={action} a={subject} ability={ability}>
      {children}
    </Can>
  );
};

PermissionGuard.propTypes = {
  action: PropTypes.string,
  subject: PropTypes.string,
  children: PropTypes.node,
};

export default PermissionGuard;

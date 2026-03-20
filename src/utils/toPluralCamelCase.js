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


export default function toPluralCamelCase(entityName) {
    if (!entityName || typeof entityName !== "string") {
      throw new Error("Input must be a non-empty string");
    }
  
    // Déterminer le suffixe pluriel en respectant les règles de base en anglais
    const pluralize = (word) => {
      if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
        // Si le mot se termine par une consonne suivie de "y", remplacer "y" par "ies"
        return word.slice(0, -1) + "ies";
      } else if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z") || word.endsWith("ch") || word.endsWith("sh")) {
        // Si le mot se termine par "s", "x", "z", "ch", ou "sh", ajouter "es"
        return word + "es";
      } else {
        // Ajouter simplement "s" pour les autres cas
        return word + "s";
      }
    };
  
    // Trouver la première lettre en majuscule (camelCase) pour séparer les parties
    const parts = entityName.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g);
  
    if (!parts) {
      return pluralize(entityName); // Cas spécial si le mot est déjà simple
    }
  
    // Pluraliser la dernière partie de l'entité
    const pluralizedParts = [...parts.slice(0, -1), pluralize(parts[parts.length - 1])];
  
    // Recomposer le mot camelCase avec la dernière partie au pluriel
    return pluralizedParts.join("");
  }
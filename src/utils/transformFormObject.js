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

export function transformFormObject(formData, mappings) {
    const transformedData = {};
  
    // Iterate through each mapping to transform the data
    mappings.forEach((mapping) => {
      const { path, name } = mapping;
      const value = formData[name];
  
      if (value !== undefined) {
        const pathArray = path.split('.'); // Split the path by '.' to get individual keys
  
        // Remove the first key (since it's not needed)
        pathArray.shift();
  
        // Create a reference to the nested structure
        let currentObject = transformedData;
  
        // Iterate through the remaining parts of the path to build the nested object
        pathArray.forEach((key, index) => {
          if (index === pathArray.length - 1) {
            // Last key, assign the value
            currentObject[key] = value;
          } else {
            // If the key doesn't exist, create an empty object
            currentObject[key] = currentObject[key] || {};
          }
          currentObject = currentObject[key]; // Move deeper into the object
        });
      }
    });
  
    return transformedData;
  }
  
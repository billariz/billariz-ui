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

export default function removeKeys(obj, keyName) {
    if (Array.isArray(obj)) {
        // Pass keyName to the recursive call
        return obj.map(item => removeKeys(item, keyName));
    } else if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            if (key !== keyName) {
                acc[key] = removeKeys(obj[key], keyName); // Pass keyName here too
            }
            return acc;
        }, {});
    }
    return obj;
}

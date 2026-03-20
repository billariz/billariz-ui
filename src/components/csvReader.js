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

import { unflatten } from 'flat';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { useCSVReader, formatFileSize } from 'react-papaparse';
import useLocales from 'src/hooks/useLocales';

const styles = {
  zone: {
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CCC',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
  },
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: 'GREY_DIM',
  },
  default: {
    borderColor: '#CCC',
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};

CSVReader.propTypes = {
  onSubmit: PropTypes.func,
  fields: PropTypes.array,
};

const cleanObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  let allNullOrFalse = true;
  const cleanedObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const cleanedValue = cleanObject(value); // Recursively clean nested objects

      if (
        cleanedValue !== null &&
        cleanedValue !== '' &&
        cleanedValue !== false
      ) {
        allNullOrFalse = false;
      }

      return [key, cleanedValue];
    })
  );

  return allNullOrFalse ? null : cleanedObj;
};

const setNestedValue = (obj, path, value) => {
  const keys = path.split('.').slice(1); // Ignore first segment
  if (keys.length === 0) return obj; // If no valid keys, return unchanged object

  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key];
    }
  });

  return obj;
};

// Function to process fields and detect missing values using the first row
const processCSVData = (fields, parsedData) => {
  if (!parsedData.length) {
    return { transformedData: [], missing: [] };
  }

  const missing = new Set();
  const headerRow = parsedData[0]; // Use first row as reference

  fields.forEach((field) => {
    if (field.getCurrentValue) {
      const value = field.getCurrentValue(headerRow);
      if (field.validation) {
        try {
          field.validation.validateSync(value);
        } catch (error) {
          if (error?.errors[0] == 'Error.isRequired') missing.add(field.name);
        }
      }
    }
  });

  const transformedData = parsedData.map((row) => ({
    fields: fields.reduce((acc, field) => {
      if (!field.getCurrentValue) return acc;

      const value = field.getCurrentValue(row);
      const keyPath = field.path || `object.${field.name}`;

      setNestedValue(acc, keyPath, value);
      return acc;
    }, {}),
  }));

  return { transformedData, missing: [...missing] };
};

export default function CSVReader({ onSubmit, fields }) {
  const { CSVReader } = useCSVReader();
  const { translate } = useLocales();
  const [missingFields, setMissingFields] = useState([]);

  return (
    <>
      {missingFields.length > 0 && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>{translate('common.missing_fields')}:</strong>{' '}
          {missingFields.join(', ')}
        </div>
      )}
      <CSVReader
        config={{ header: true }}
        onUploadAccepted={(results) => {
          if (!results?.data?.length) return;
          const parsedData = results.data.map((row) => unflatten(row));
          const { transformedData, missing } = processCSVData(
            fields,
            parsedData
          );

          setMissingFields(missing);

          if (missing.length === 0) {
            onSubmit(
              'create',
              transformedData.map((d) => cleanObject(d.fields)),
              null
            );
          }
        }}
        noDrag
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }) => (
          <div {...getRootProps()} style={{ ...styles.zone }}>
            {acceptedFile ? (
              <div style={styles.file}>
                <div style={styles.info}>
                  <span style={styles.size}>
                    {formatFileSize(acceptedFile.size)}
                  </span>
                  <span style={styles.name}>{acceptedFile.name}</span>
                </div>
                <div style={styles.progressBar}>
                  <ProgressBar />
                </div>
                <div {...getRemoveFileProps()} style={styles.remove}>
                  <Remove />
                </div>
              </div>
            ) : (
              translate('common.clickToUpload')
            )}
          </div>
        )}
      </CSVReader>
    </>
  );
}

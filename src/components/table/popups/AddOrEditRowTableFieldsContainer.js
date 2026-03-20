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

import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

import AddOrEditRowTableField from './AddOrEditRowTableField';

AddOrEditRowTableFieldsContainer.propTypes = {
  form: PropTypes.object,
  inputs: PropTypes.array,
  formIndex: PropTypes.number,
  type: PropTypes.string,
};
export default function AddOrEditRowTableFieldsContainer({
  form,
  inputs,
  formIndex,
  type = 'edit',
}) {
  let fields = Object.keys(form)
    .filter((key) => key != 'id')
    .map((key) => [key, form[key]]);
  const new_fields = inputs.filter((key) => key.name === 'id');
  if (new_fields.length > 0 && new_fields[0].show) {
    if (type === 'create' || (type === 'edit' && new_fields[0].disableEdit)) {
      fields.unshift(['id', form['id']]);
    }
  }

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 12 }} padding={5}>
      {fields.map(([fieldName, fieldValue]) => (
        <AddOrEditRowTableField
          key={fieldName}
          fieldName={fieldName}
          fieldValue={fieldValue}
          formIndex={formIndex}
          inputs={inputs}
          type={type}
        />
      ))}
    </Grid>
  );
}

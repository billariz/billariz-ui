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

import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
// components

import { CustomerAbout } from '.';
import CustomerChart from './CustomerChart';

// ----------------------------------------------------------------------

CustomerInfo.propTypes = {
  customer: PropTypes.object,
};

export default function CustomerInfo({ customer }) {
  return (
    <Grid
      container
      spacing={1}
      columns={{ xs: 4, sm: 12, md: 12 }}
      paddingBottom={2}
      paddingTop={3}
      paddingLeft={3}
    >
      <Grid item sm={6} md={6} lg={8}>
        {customer && <CustomerAbout customer={customer} />}
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        {customer && <CustomerChart customer={customer} />}
      </Grid>
    </Grid>
  );
}

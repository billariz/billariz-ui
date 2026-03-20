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
import WidgetStats from './WidgetStats';
import PropTypes from 'prop-types';

WidgetList.propTypes = {
  widgets: PropTypes.array,
  widgetsValues: PropTypes.object,
};
export default function WidgetList({ widgets, widgetsValues }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {widgets.map(({ label, widgetName, color }) => {
        let [value, percent] = [0, 0];
        if (widgetsValues?.[widgetName]?.value?.length > 0)
          [value, percent] = widgetsValues[widgetName].value;
        return (
          <Grid key={widgetName} item xs={12} md={4} lg={4}>
            <WidgetStats
              title={label}
              color={color}
              total={value}
              icon={'eva:person-fill'}
              chartData={parseInt(percent * 100, 2)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

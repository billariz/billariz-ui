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

import { Box } from '@mui/material';
import PropTypes from 'prop-types';

//Redux
import { getCharts } from 'src/redux/slices/chart';

//Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChartCard from 'src/components/chart/chart';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const ChartContainer = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{children}</Box>
);
ChartContainer.propTypes = {
  children: PropTypes.node,
};

export default function DashboardChart() {
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { charts = [] } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(getCharts());
  }, [dispatch]);

  return (
    <ChartContainer>
      {charts.map((chart) => (
        <ChartCard
          key={chart.title}
          chart={chart}
          title={translate(
            `param_${chart?.meta?.titleTranslationKey}.${chart?.title}`
          )}
        />
      ))}
    </ChartContainer>
  );
}

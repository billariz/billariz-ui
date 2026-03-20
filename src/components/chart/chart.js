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
import { Box, Card, Typography } from '@mui/material';
import { FILTER_TYPE } from 'src/constants/enums';

import { BaseOptionChart } from 'src/components/chart';

//Components
import ReactApexChart from 'react-apexcharts';
import TableHeader from 'src/hooks/TableHeader';

//Hooks
import { useEffect, useMemo, useRef, useState } from 'react';

import useLocales from 'src/hooks/useLocales';
import { useDispatch } from 'react-redux';

// Configuration constants

import { getChartByName } from 'src/redux/slices/chart';
const CHART_HEIGHT = 400;

const CHART_TYPE_MAP = {
  verticalBar: 'bar',
  bar: 'bar',
  line: 'line',
  area: 'area',
  donut: 'donut',
};
const TOOLBAR_OPTIONS = {
  tools: {
    download: false,
    selection: false,
    zoom: false,
    zoomin: false,
    zoomout: false,
    pan: false,
    reset: false,
  },
};

const translateLabel = (translationKey, label, translate) =>
  translationKey ? translate(`param_${translationKey}.${label}`) : label;

export default function ChartCard({
  title,
  chart,
  dispatchChartAction = getChartByName,
  objectId,
}) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const filtersElements = useMemo(
    () => ({
      GRANULARITY: {
        index: 0,
        id: 'granularity',
        label: 'common.granularity',
        type: FILTER_TYPE.SELECT_BOX,
        size: {
          xs: 12,
          sm: 6,
          md: 4,
          lg: 4,
        },
        defaultValue: '*',
        parameterName: chart?.meta?.granularityType,
      },
      START_DATE: {
        index: 1,
        id: 'startDate',
        label: 'BillableCharge.FilterLabels.startDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 4, lg: 4 },
        defaultValue: '',
      },
      END_DATE: {
        index: 2,
        id: 'endDate',
        label: 'BillableCharge.FilterLabels.endDate',
        type: FILTER_TYPE.DATE_FIELD,
        size: { xs: 12, sm: 6, md: 4, lg: 4 },
        defaultValue: '',
      },
    }),
    [chart?.meta?.granularityType]
  );

  const onFilterChanges = (appliedFilters) => {
    if (JSON.stringify(filters) === JSON.stringify(appliedFilters)) return;
    setFilters(appliedFilters);
  };

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      dispatch(dispatchChartAction(chart.title, filters, objectId));
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Card
      sx={{
        width: {
          xs: '100%',
          lg: objectId ? '100%' : 'calc(50% - 1rem)',
        },
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableHeader
        config={filtersElements}
        onFilterChanges={onFilterChanges}
        subject={''}
      />
      <Box sx={{ width: '100%', height: CHART_HEIGHT }}>
        <RenderChart chart={chart} />
      </Box>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.object,
  dispatchChartAction: PropTypes.func,
  objectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const RenderChart = ({ chart }) => {
  const { translate } = useLocales();

  const getTranslatedSeries = (chart) =>
    chart.series?.map((serie) => ({
      ...serie,
      name: translateLabel(
        chart?.meta?.serieTranslationKey,
        serie.name,
        translate
      ),
    })) || [];
  const renderDonutChart = (chart) => {
    const series = chart.series?.map((serie) => serie?.data?.[0]) || [];
    const labels =
      chart.series?.map((serie) =>
        translateLabel(chart?.meta?.serieTranslationKey, serie?.name, translate)
      ) || [];

    return (
      <ReactApexChart
        type="donut"
        height={CHART_HEIGHT}
        width="100%"
        series={series}
        options={{
          chart: { ...TOOLBAR_OPTIONS, type: 'donut' },
          labels,
        }}
      />
    );
  };

  const renderStandardChart = (chart) => {
    const translatedCategories =
      chart.labels?.map((label) =>
        translateLabel(chart?.meta?.labelTranslationKey, label)
      ) || [];

    return (
      <ReactApexChart
        type={CHART_TYPE_MAP[chart.type] || 'area'}
        series={getTranslatedSeries(chart)}
        height={CHART_HEIGHT}
        width="100%"
        options={{
          ...BaseOptionChart(),
          tooltip: {
            y: {
              formatter: (y) =>
                chart?.meta?.unit ? `${y.toFixed(0)} ${chart.meta.unit}` : y,
            },
            fillSeriesColor: true,
            ...BaseOptionChart().tooltip,
          },
          chart: {
            ...BaseOptionChart().chart,
            id: `chart-${chart.title}`,
            toolbar: TOOLBAR_OPTIONS,
          },
          xaxis: { categories: translatedCategories },
        }}
      />
    );
  };

  if (!chart?.type) return null;
  return chart.type === 'donut'
    ? renderDonutChart(chart)
    : renderStandardChart(chart);
};

RenderChart.propTypes = {
  chart: PropTypes.object,
};

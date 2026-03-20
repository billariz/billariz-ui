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
import {
  Box,
  Card,
  CardHeader,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
// utils
import { TableNoData } from 'src/components/table';
import useLocales from 'src/hooks/useLocales';
import { fPercent } from '../../../../utils/formatNumber';
// _mock

// ----------------------------------------------------------------------

BillingRunOverview.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.string,
      status: PropTypes.string,
      statusCount: PropTypes.number,
      statusPercent: PropTypes.number,
      total: PropTypes.number,
    })
  ),
  title: PropTypes.bool,
};

export default function BillingRunOverview({ steps, title }) {
  const { translate } = useLocales();
  if (!steps || steps.length === 0) {
    return (
      <Card sx={{ height: '100%' }}>
        {title && <CardHeader title={translate('BillingRun.overview')} />}
        <Box spacing={1.5} sx={{ pt: 1, px: 3, pb: 3, alignContent: 'center' }}>
          <div>&nbsp;</div>
          &nbsp;&nbsp;
          <Table>
            <TableBody>
              <TableNoData isNotFound />
            </TableBody>
          </Table>
          <div>&nbsp;</div>
        </Box>
      </Card>
    );
  }
  return (
    <Card>
      {title && <CardHeader title={translate('BillingRun.overview')} />}
      <Stack spacing={1.5} sx={{ pt: 1, px: 3, pb: 3 }}>
        {steps.map(
          (progress) =>
            progress.status === 'COMPLETED' && (
              <ProgressItem key={progress.unique_id} progress={progress} />
            )
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.object,
};

function ProgressItem({ progress }) {
  const { translate } = useLocales();

  const getColor = () => {
    if (progress.statusPercent === 1) {
      return 'success';
    } else if (progress.statusPercent > 0 && progress.statusPercent < 1) {
      return 'warning';
    } else if (progress.statusPercent === 0) {
      return 'error';
    } else {
      return 'primary';
    }
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {translate(`BillingRun.${progress.step}`)}
        </Typography>
        <Typography variant="subtitle2">
          {progress.statusCount}/{progress.total}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.statusPercent * 100)})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.statusPercent * 100}
        color={getColor()}
      />
    </Stack>
  );
}

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
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from '../utils/formatNumber';
// components
import Iconify from './Iconify';

// ----------------------------------------------------------------------

ChartAnalytic.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  percent: PropTypes.number,
  price: PropTypes.number,
  priceVated: PropTypes.number,
  total: PropTypes.number,
  totalAll: PropTypes.number,
  item: PropTypes.string,
  small: PropTypes.bool,
};

export default function ChartAnalytic({
  title,
  total,
  icon,
  color,
  percent,
  price,
  priceVated,
  totalAll,
  item,
  small,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={small ? 'left' : 'center'}
      sx={{ width: 1, minWidth: small ? 1 : 200 }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative' }}
      >
        <Iconify
          icon={icon}
          sx={{
            color,
            width: small ? 18 : 24,
            height: small ? 18 : 24,
            position: 'absolute',
          }}
        />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={small ? 30 : 56}
          thickness={4}
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={small ? 30 : 56}
          thickness={4}
          sx={{
            color: 'grey.50016',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.48,
          }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography variant={small ? 'h7' : 'H6'}>{title}</Typography>
        <Typography variant={small ? 'subtitle2' : 'subtitle3'}>
          {total && fShortenNumber(total)}
          {totalAll && `/${fShortenNumber(totalAll)}`}{' '}
          <Box
            component="span"
            sx={{ color: 'text.secondary', typography: 'body2' }}
          >
            {item}
          </Box>
        </Typography>

        <Typography variant={small ? 'subtitle2' : 'subtitle4'} sx={{ color }}>
          {price && `${fCurrency(price)}€ HT `}{' '}
          {priceVated && `/ ${fCurrency(priceVated)}€ TTC`}
        </Typography>
      </Stack>
    </Stack>
  );
}

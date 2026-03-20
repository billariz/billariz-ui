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

import { Stack, Switch, TableCell, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Label from '../../../Label';

DefaultCellRenderer.propTypes = {
  row: PropTypes.object.isRequired,
  cellConfig: PropTypes.object,
};
export default function DefaultCellRenderer({ cellConfig, row }) {
  const theme = useTheme();
  return (
    <TableCell>
      <Stack key={cellConfig.value} direction={'row'} container='true'>
        {cellConfig.type === 'label' && row[cellConfig.value] && (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={cellConfig.color}
          >
            {row[cellConfig.value]}
          </Label>
        )}
        {cellConfig.type === 'switch' && (
          <Switch checked={row[cellConfig.value]} />
        )}
      </Stack>
    </TableCell>
  );
}

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

// @mui
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import { Stack, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
//

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9} >
          <Stack alignItems='center' justifyContent='space-between'>
             <HourglassDisabledIcon alt="No data" color="primary" sx={{ fontSize: 50 }} />
          </Stack>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}

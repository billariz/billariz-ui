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

import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Stack, TableCell, TableRow, Box } from '@mui/material';
//
import SmallLogo from './SmallLogo';

// ----------------------------------------------------------------------

const TableLoaderStyle = styled('div')(({ theme }) => ({
  top: 50,
  height: 500,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default, // Match the table background
  opacity: 0.8, // Add slight transparency
}));

export default function LoadingTable() {
  return (
    <TableRow>
      <TableCell colSpan={9}>
        <Stack alignItems="center" justifyContent="space-between">
          <TableLoaderStyle>
            <m.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeatDelay: 1,
                repeat: Infinity,
              }}
            >
              <SmallLogo disabledLink sx={{ width: 64, height: 64 }} />
            </m.div>

            <Box
              component={m.div}
              animate={{
                scale: [1.2, 1, 1, 1.2, 1.2],
                rotate: [270, 0, 0, 270, 270],
                opacity: [0.25, 1, 1, 1, 0.25],
                borderRadius: ['25%', '25%', '50%', '50%', '25%'],
              }}
              transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '25%',
                position: 'absolute',
                border: (theme) =>
                  `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
              }}
            />

            <Box
              component={m.div}
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 270, 270, 0, 0],
                opacity: [1, 0.25, 0.25, 0.25, 1],
                borderRadius: ['25%', '25%', '50%', '50%', '25%'],
              }}
              transition={{
                ease: 'linear',
                duration: 3.2,
                repeat: Infinity,
              }}
              sx={{
                width: 120,
                height: 120,
                borderRadius: '25%',
                position: 'absolute',
                border: (theme) =>
                  `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
              }}
            />
          </TableLoaderStyle>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

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
import { Stack, Skeleton, Box, Paper } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonKanbanColumn() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
    >
      {[...Array(3)].map((_, index) => (
        <Paper variant="outlined" key={index} sx={{ p: 2.5, width: 310 }}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" sx={{ paddingTop: '75%', borderRadius: 1.5 }} />
            {index === 0 && (
              <Skeleton variant="rectangular" sx={{ paddingTop: '25%', borderRadius: 1.5 }} />
            )}
            {index !== 2 && (
              <Skeleton variant="rectangular" sx={{ paddingTop: '25%', borderRadius: 1.5 }} />
            )}
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

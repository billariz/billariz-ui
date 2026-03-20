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
import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonPost() {
  return (
    <>
      <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={64} height={64} />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
        </Box>
      </Box>
    </>
  );
}

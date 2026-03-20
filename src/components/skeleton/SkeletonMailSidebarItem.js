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
import { Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonMailSidebarItem() {
  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={{ px: 3, py: 1 }}>
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="text" sx={{ width: 0.25, height: 16 }} />
    </Stack>
  );
}

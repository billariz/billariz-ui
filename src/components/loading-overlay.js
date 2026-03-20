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
import { Stack, Box } from '@mui/material';
//
import { useSelector } from 'react-redux';
import SmallLogo from './SmallLogo';

// ----------------------------------------------------------------------

const LoaderStyle = styled('div')(() => ({
  position: 'absolute',
  top: 150,
  height: 2,
  right: 50,
  bottom: 0,
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1, // Add slight transparency
}));

export default function LoadingOverlay() {
  const { isLoading } = useSelector((state) => state.globalLoading);
  return (
    <>
      {isLoading && (
        <Stack alignItems="center" justifyContent="space-between">
          <LoaderStyle>
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
              <SmallLogo disabledLink sx={{ width: 32, height: 32 }} />
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
                width: 50,
                height: 50,
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
                width: 60,
                height: 60,
                borderRadius: '25%',
                position: 'absolute',
                border: (theme) =>
                  `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
              }}
            />
          </LoaderStyle>
        </Stack>
      )}
    </>
  );
}

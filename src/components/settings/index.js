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
import { AnimatePresence, m } from 'framer-motion';
import { useState, useEffect } from 'react';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Backdrop,
  Divider,
  Typography,
  Stack,
  FormControlLabel,
  Radio,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { NAVBAR } from '../../config';
//
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { IconButtonAnimate, varFade } from '../animate';
//
import SettingMode from './SettingMode';
import SettingLayout from './SettingLayout';
import SettingStretch from './SettingStretch';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';
import SettingColorPresets from './SettingColorPresets';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({
    color: theme.palette.background.paper,
    opacity: 0.92,
  }),
  top: '0px',
  right: '0px',
  // bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'auto',
  overflowY: 'auto',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light'
      ? theme.palette.grey[500]
      : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

export default function Settings() {
  const { themeDirection, onResetSetting } = useSettings();
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const { translate } = useLocales();

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          background: 'transparent',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      {!open && (
        <IconButton open={open} onClick={handleToggle}>
          <SettingsIcon />
        </IconButton>
      )}

      <AnimatePresence>
        {open && (
          <RootStyle {...varSidebar}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 2, pr: 1, pl: 2.5 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                }}
              >
                {translate('Settings.Settings')}
              </Typography>
              <div>
                <IconButtonAnimate onClick={onResetSetting}>
                  <Iconify icon={'ic:round-refresh'} width={20} height={20} />
                </IconButtonAnimate>
                <IconButtonAnimate onClick={handleClose}>
                  <Iconify icon={'eva:close-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </div>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ flexGrow: 1 }}>
              <Stack
                spacing={3}
                sx={{
                  p: 3,
                  overflowY: 'auto',
                  height: '90vh',
                  paddingBottom: '20px',
                }}
              >
                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                  >
                    {translate('Settings.Mode')}
                  </Typography>
                  <SettingMode />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                  >
                    {translate('Settings.Direction')}
                  </Typography>
                  <SettingDirection />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                  >
                    {translate('Settings.Layout')}
                  </Typography>
                  <SettingLayout />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                  >
                    {translate('Settings.Presets')}
                  </Typography>
                  <SettingColorPresets />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    }}
                  >
                    {translate('Settings.Stretch')}
                  </Typography>
                  <SettingStretch />
                </Stack>
                <Stack spacing={1.5}>
                  <SettingFullscreen />
                </Stack>
              </Stack>
            </Scrollbar>
          </RootStyle>
        )}
      </AnimatePresence>
    </>
  );
}

// ----------------------------------------------------------------------

BoxMask.propTypes = {
  value: PropTypes.string,
};

export function BoxMask({ value }) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}

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

import { useState } from 'react';
// @mui
import { MenuItem, Stack, Typography } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { GridExpandMoreIcon } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { allLang, currentLang, onChangeLang, translate } = useLocales();

  const flags = {
    en: '🇬🇧',
    fr: '🇫🇷',
    es: '🇪🇸',
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
            px: 1.5,
            height: 40,
            minWidth: 50,
            justifyContent: 'space-between',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <span style={{ fontSize: '1.5rem', marginRight: 8 }}>
          {flags[currentLang.locale]}
        </span>
        <GridExpandMoreIcon />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {allLang.map((option) => (
            <MenuItem
              key={option.locale}
              sx={{ textAlign: 'right' }}
              selected={option.value === currentLang.locale}
              onClick={() => {
                onChangeLang(option.locale);
                handleClose();
              }}
            >
              {flags[option.locale]} {translate('param_languageCode.' + option.locale?.toUpperCase())}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}

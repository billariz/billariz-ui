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

import React from 'react';
import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import useLocales from 'src/hooks/useLocales';

const Footer = () => {
  const { translate } = useLocales();
  const domain = window.location.hostname;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const footerLinks = [
    { label: 'Footer.privacy', href: '/privacy' },
    { label: 'Footer.terms', href: '/terms' },
    { label: 'Footer.cookie-preferences', href: '/cookie-preferences' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        top: '100%',
        py: 0.5,
        width: '100%',
        textAlign: 'center',
        zIndex: 2000,
        backgroundColor: '#171d26',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          gap: isMobile ? 1 : 0, // Add spacing in mobile view
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Typography color="grey">
            {domain === 'dev.ui.billariz.com'
              ? 'DEV - V1.0.0'
              : domain.split('.')[0]}
          </Typography>
          <Link href="/comments" color="grey" underline="hover">
            {translate('Footer.comments')}
          </Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              color="grey"
              href={link.href}
              underline="hover"
            >
              {translate(link.label)}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

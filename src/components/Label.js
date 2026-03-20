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
// @mui
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const stringToColour = (str) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

const RootStyle = styled('span')(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = ownerState;

  const styleFilled = (colorProps) => ({
    color: theme.palette[colorProps].contrastText,
    backgroundColor: theme.palette[colorProps].main,
  });

  const styleOutlined = (colorProps) => ({
    color: theme.palette[colorProps].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[colorProps].main}`,
  });

  const styleGhost = (colorProps) => ({
    color: theme.palette[colorProps][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[colorProps].main, 0.16),
  });

  const styleRandom = (colorProps) => ({
    color: colorProps,
    backgroundColor: colorProps + "30",
    filter: "brightness(60%)"
  });

  return {
    minHeight: 22,
    minWidth: 22,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
        ...(variant === 'filled' && { ...styleFilled(color) }),
        ...(variant === 'outlined' && { ...styleOutlined(color) }),
        ...(variant === 'ghost' && { ...styleGhost(color) }),
        ...(variant === 'random' && { ...styleRandom(stringToColour(color)) }),
      }
      : {
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.grey[500_32]}`,
        }),
        ...(variant === 'ghost' && {
          color: isLight
            ? theme.palette.text.secondary
            : theme.palette.common.white,
          backgroundColor: theme.palette.grey[500_16],
        }),
      }),
  };
});

// ----------------------------------------------------------------------

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'random']),
};

export default function Label({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}

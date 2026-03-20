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

// ----------------------------------------------------------------------

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
        },
        listbox: {
          padding: theme.spacing(0),
          '& .MuiAutocomplete-option': {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
          },
          '& .MuiAutocomplete-GroupHead': {
            backgroundColor: theme.palette.primary.lighter, //"rgb(240 241 249)",
            color: theme.palette.primary.dark, //"rgb(57 73 171)",
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(2),
            position: 'sticky',
            top: "0",
            fontWeight: 600,
            zIndex: 1,
          },
          '& MuiAutocomplete-Group': {
            padding: 0
          }
        },
      },
    },
  };
}

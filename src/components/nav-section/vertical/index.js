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
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';
import useLocales from 'src/hooks/useLocales';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}) {
  const { translate } = useLocales();

  const hasPermission = (subjects) => {
    if (!Array.isArray(subjects)) {
      return abilityManager.can('READ', subjects);
    }

    return subjects.some((subject) => abilityManager.can('READ', subject));
  };

  return (
    <Box {...other}>
      {navConfig.map((group) => {
        // Check if any item in the group has at least one authorized subject
        const hasAuthorizedItems = group.items.some((list) =>
          hasPermission(list.subjects)
        );

        if (!hasAuthorizedItems) return null;

        return (
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {translate(group.subheader)}
            </ListSubheaderStyle>

            {group.items.map((list) => {
              // Check if current item has any authorized subject
              if (!hasPermission(list.subjects)) return null;

              return (
                <NavListRoot
                  key={list.title}
                  list={list}
                  isCollapse={isCollapse}
                />
              );
            })}
          </List>
        );
      })}
    </Box>
  );
}

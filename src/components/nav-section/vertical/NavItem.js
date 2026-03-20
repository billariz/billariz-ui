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
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, ListItemText, Tooltip } from '@mui/material';
//
import Iconify from '../../Iconify';
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '..';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    notAvailable: PropTypes.bool,
  }),
};

export function NavItemRoot({ item, isCollapse, open = false, active }) {
  const { title, path, icon, info, children, notAvailable } = item;
  const { translate } = useLocales();
  const titleTranslated = translate(title);
  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={titleTranslated}
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  const listItem = (
    <ListItemStyle
      component={RouterLink}
      to={!isExternalLink(path) ? path : undefined}
      href={isExternalLink(path) ? path : undefined}
      target={isExternalLink(path) ? '_blank' : undefined}
      rel={isExternalLink(path) ? 'noopener' : undefined}
      onClick={(event) => {
        if (!isExternalLink(path) && location.pathname === path.split('?')[0]) {
          event.preventDefault(); // Prevent React Router from handling navigation
          window.location.href = path.split('?')[0]; // Force full reload
        }
      }}
      style={{
        pointerEvents: notAvailable ? 'none' : 'auto',
        opacity: notAvailable ? 0.5 : 1,
      }}
      activeRoot={active}
    >
      {renderContent}
    </ListItemStyle>
  );

  return notAvailable ? (
    <Tooltip title={translate('Utilities.notAvailable')}>
      <span>{listItem}</span>
    </Tooltip>
  ) : (
    listItem
  );
}

// ----------------------------------------------------------------------

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { title, path, info, children } = item;

  const { translate } = useLocales();
  const titleTranslated = translate(title);

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={titleTranslated} />
      {info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      component={Link}
      href={path}
      target="_blank"
      rel="noopener"
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

ArrowIcon.propTypes = {
  open: PropTypes.bool,
};

export function ArrowIcon({ open }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}

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

import { Link as RouterLink, useNavigate } from 'react-router-dom';

// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

// hooks
import { useAuth } from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useLocales from 'src/hooks/useLocales';
import useToggle from 'src/hooks/useToggle';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

// components
import MenuPopover from 'src/components/MenuPopover';
import MyAvatar from 'src/components/MyAvatar';
import { IconButtonAnimate } from 'src/components/animate';
import ProfilePopUp from '../ProfilePopUp';

// routes
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [{ label: 'Profile.Home', linkTo: '/' }];

const ACTION_ITEMS = [
  { label: 'Profile.Profile', handlerName: 'handleOpenProfile' },
  { label: 'Profile.Logout', handlerName: 'handleLogout' },
];

const popoverStyles = {
  p: 0,
  mt: 1.5,
  ml: 0.75,
  '& .MuiMenuItem-root': {
    typography: 'body2',
    borderRadius: 0.75,
  },
};

const avatarButtonStyles = (open) => ({
  p: 0,
  ...(open && {
    '&:before': {
      zIndex: 1,
      content: "''",
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
    },
  }),
});

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    toggle: profileOpen,
    onOpen: openProfile,
    onClose: closeProfile,
  } = useToggle();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOpenProfile = () => {
    handleClose();
    openProfile();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATH_AUTH.login, { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
      enqueueSnackbar(translate('Errors.Logout'), { variant: 'error' });
    }
  };

  const actionHandlers = {
    handleOpenProfile,
    handleLogout,
  };

  return (
    <>
      <IconButtonAnimate
        aria-label="account-settings"
        onClick={handleOpen}
        sx={avatarButtonStyles(Boolean(anchorEl))}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={popoverStyles}
      >
        <UserInfo user={user} />
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuSection
          items={MENU_OPTIONS}
          handleClose={handleClose}
          translate={translate}
        />
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuSection
          items={ACTION_ITEMS}
          translate={translate}
          handlers={actionHandlers}
        />
      </MenuPopover>

      <ProfilePopUp
        open={profileOpen}
        onClose={closeProfile}
        userName={user?.name}
      />
    </>
  );
}

// Sub-components for better readability

const UserInfo = ({ user }) => (
  <Box sx={{ my: 1.5, px: 2.5 }}>
    <Typography variant="subtitle2" noWrap>
      {user?.given_name} {user?.family_name}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
      {user?.profile}
    </Typography>
  </Box>
);
UserInfo.propTypes = {
  user: PropTypes.object,
};

const MenuSection = ({ items, handleClose, translate, handlers }) => (
  <Stack sx={{ p: 1 }}>
    {items.map(({ label, linkTo, handlerName }) => (
      <MenuItem
        key={label}
        {...(linkTo && { to: linkTo, component: RouterLink })}
        onClick={handlerName ? handlers[handlerName] : handleClose}
      >
        {translate(label)}
      </MenuItem>
    ))}
  </Stack>
);
MenuSection.propTypes = {
  items: PropTypes.array.isRequired,
  translate: PropTypes.func,
  handleClose: PropTypes.func,
  handlers: PropTypes.object,
};

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
import { MenuItem, Stack, Typography, Box } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AwsCognitoContext';
import BuildIcon from '@mui/icons-material/Build';
import ApprovalIcon from '@mui/icons-material/Approval';
import LiveTvIcon from '@mui/icons-material/LiveTv';


// ----------------------------------------------------------------------

export default function InstancePopover() {
  const { translate } = useLocales();
  const { user } = useContext(AuthContext);
  const currentGroup = window.localStorage.getItem('currentGroup');

  const handleChangeGroup = (group) => {
    const initGroup = window.localStorage.getItem('currentGroup'); 
    localStorage.setItem('currentGroup', group);

    // Ouvrir une nouvelle fenêtre avec le même path actuel
    const currentPath = window.location.pathname + window.location.search;
    const newWindow = window.open(`${currentPath}`, '_blank');

  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const getGroupIcon = (group) => {
  switch (group?.toLowerCase()) {
    case 'demo-live':
      return <LiveTvIcon fontSize="small" color="success" />;
    case 'demo-staging':
      return <ApprovalIcon fontSize="small" color="warning" />;
    case 'demo-dev':
      return <BuildIcon fontSize="small" color="info" />;
    default:
      return <BuildIcon fontSize="small" color="disabled" />;
  }
};

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
            px: 1.5,
            height: 40,
            minWidth: 250,
            justifyContent: 'space-between',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        {currentGroup &&
       <Typography component={Box} display="flex" alignItems="center">
          {getGroupIcon(currentGroup)}
          <Box component="span" sx={{ ml: 1 }}>
            {currentGroup?.charAt(0).toUpperCase() + currentGroup.slice(1)}
          </Box>
        </Typography>
        }
        <GridExpandMoreIcon />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 250,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
      <Stack spacing={0.75} sx={{ px: 1 }}>
        <Typography variant="subtitle2" >{translate('user.instances')}</Typography>
          {user?.groups?.map((group) => (
            <MenuItem
              key={group}
              selected={group === currentGroup}
              onClick={() => {
                handleChangeGroup(group);
                handleClose(); // ou tout autre effet
              }}
            >
              {getGroupIcon(group)}
              <Box component="span" sx={{ ml: 1 }}>
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </Box>
            </MenuItem>
        ))}
      </Stack>
      </MenuPopover>
    </>
  );
}

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
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

//Hooks
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// components
import Label from 'src/components/Label';
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';

//Icons
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import ROLE_CONFIG from 'src/constants/roles';
import { dispatchRoleAction, resetEvent } from 'src/redux/slices/role';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

RoleDetail.propTypes = {
  role: PropTypes.object,
};
const configBox = ROLE_CONFIG.FORMS;
const form = ROLE_CONFIG.FORMS.ROLE_ABOUT;
export default function RoleDetail({ role }) {
  const { currentEvent } = useSelector((state) => state.roles);

  const theme = useTheme();

  if (!role) {
    return null;
  }

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
          <Box sx={{ textAlign: { sm: 'left' } }}>
            <Stack direction="row">
              <div style={{ marginRight: '5px' }}>
                <WorkspacePremiumIcon
                  alt="Role"
                  color="primary"
                  sx={{ fontSize: 25 }}
                />
              </div>
              <div style={{ marginRight: '5px' }}>
                <Typography sx={{ mt: 0 }}>
                  <Label
                    variant={
                      theme.palette.mode === 'light' ? 'ghost' : 'filled'
                    }
                    color={'info'}
                    sx={{ textTransform: 'uppercase', mb: 1 }}
                  >
                    {role.id}
                  </Label>
                </Typography>
              </div>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos config={configBox} values={role} />
          </Grid>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Toolbar
              entity={role}
              dispatchEntityAction={dispatchRoleAction}
              resetEvent={resetEvent}
              form={form}
              currentEvent={currentEvent}
              subject="ROLE"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

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
import { Box, Card, Grid, Stack } from '@mui/material';

//Hooks
import { useSelector } from 'react-redux';

// components
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';
import EntityViewHeader from 'src/components/view/EntityViewHeader';

//Consts
import USER_CONFIG from 'src/constants/users';

//Actions
import { dispatchUserAction, resetEvent } from 'src/redux/slices/user';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

UserDetail.propTypes = {
  user: PropTypes.object,
};
const form = USER_CONFIG.FORMS;
export default function UserDetail({ user }) {
  const { currentEvent } = useSelector((state) => state.users);

  if (!user) {
    return null;
  }

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          entity={user}
          type="user"
          horizontalItems={[]}
          verticalItems={[]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <Stack
            direction="row"
            sx={{ width: '100%', justifyContent: 'center', mt: 2 }}
          >
            <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
              <BoxInfos config={form} values={user} />

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                  mb: 2,
                }}
              >
                <Toolbar
                  entity={user}
                  dispatchEntityAction={dispatchUserAction}
                  resetEvent={resetEvent}
                  form={form}
                  currentEvent={currentEvent}
                  subject="USER"
                />
              </Box>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

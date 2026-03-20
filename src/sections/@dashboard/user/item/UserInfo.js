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
import { Card, Container, Dialog, Grid } from '@mui/material';

// components
import { TableTabs } from 'src/components/table';
import UserPermissionList from 'src/sections/@dashboard/userPermission/item/UserPermissionList';
import UserDetail from './UserDetail';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

//Hooks
import useSettings from 'src/hooks/useSettings';
import { useMemo, useState } from 'react';
import UserRoleList from '../../userRole/item/UserRole';

// ----------------------------------------------------------------------

UserInfo.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function UserInfo({ open, onClose, user }) {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.users.roles',
        value: 'userRoles',
        subject: 'USER_ROLE',
      },
      {
        label: 'TableTabs.users.permissions',
        value: 'userPermissions',
        subject: 'USER_PERMISSION',
      },
    ],
    []
  );
  const filteredItems = useMemo(
    () => items.filter((item) => abilityManager.can('READ', item.subject)),
    [items]
  );

  const [currentTable, setCurrentTable] = useState(
    filteredItems[0]?.value || ''
  );

  const openTable = (value) => {
    setCurrentTable(value);
  };

  // eslint-disable-next-line consistent-return
  const renderTable = () => {
    switch (currentTable) {
      case 'userPermissions':
        return <UserPermissionList userId={user?.id} />;
      case 'userRoles':
        return <UserRoleList userId={user?.id} />;
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={onClose}
      style={{ borderRadius: 0 }}
      variant="scrollable"
      scrollbuttons="auto"
    >
      <Can I="READ" a={'USER'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container
              sx={{ py: 2, px: 0 }}
              maxWidth={themeStretch ? false : 'xl'}
            >
              <Grid
                container
                spacing={1}
                columns={{ xs: 4, sm: 12, md: 12 }}
                paddingBottom={3}
                paddingTop={3}
                paddingLeft={3}
                paddingRight={3}
                style={{ display: 'flex', alignItems: 'stretch' }}
              >
                <Grid
                  item
                  sm={6}
                  md={6}
                  lg={8}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {user && <UserDetail user={user} />}
                </Grid>
              </Grid>
              <Card>
                {user && filteredItems.length > 0 && (
                  <Card>
                    <TableTabs
                      items={filteredItems}
                      defaultValue={filteredItems[0]?.value || ''}
                      onChange={openTable}
                    />
                    {renderTable()}
                  </Card>
                )}
              </Card>
            </Container>
          ) : (
            <FallBacks errorCode={401} />
          )
        }
      </Can>
    </Dialog>
  );
}

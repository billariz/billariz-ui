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

// COnfig
import { PATH_DASHBOARD } from 'src/routes/paths';

// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableTabs } from 'src/components/table';
import Page from 'src/components/Page';
// sections

//Hooks
import { useMemo, useState } from 'react';
import useSettings from 'src/hooks/useSettings';
import useLocales from 'src/hooks/useLocales';

import { Container, Stack, Card } from '@mui/material';

// sections
import PermissionList from 'src/sections/@dashboard/permission/item/PermissionList';
import RoleList from 'src/sections/@dashboard/role/item/RoleList';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function RoleListPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  const openTable = (value) => {
    setCurrentTable(value);
  };

  const items = useMemo(
    () => [
      {
        label: 'Role.roles',
        value: 'role',
        subject: 'ROLE',
      },
      {
        label: 'Role.Permissions',
        value: 'permission',
        subject: 'PERMISSION',
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

  const renderTable = () => {
    switch (currentTable) {
      case 'role':
        return <RoleList />;
      case 'permission':
        return <PermissionList />;

      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={translate('Role.List')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Role.RoleList"
          icon="role"
          links={[
            { name: 'Role.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Role.roles',
              href: PATH_DASHBOARD.role.root,
            },
            { name: 'Role.List' },
          ]}
        />
        <Stack>
          <Card maxWidth={themeStretch ? false : 'xl'}>
            <TableTabs
              items={filteredItems}
              defaultValue={filteredItems[0]?.value || ''}
              onChange={openTable}
            />
            {renderTable()}
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

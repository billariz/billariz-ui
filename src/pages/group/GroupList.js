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

import {
  Container
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// sections
import useLocales from 'src/hooks/useLocales';
import GroupList from 'src/sections/@dashboard/group/item/GroupList';

export default function GroupListPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title={translate("Group.List")}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Group.List"
          icon='group'
          links={[
            { name: 'Group.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Group.Group', href: PATH_DASHBOARD.group.root },
            { name: 'Group.List' },
          ]}
        />

    <GroupList />
      </Container>
    </Page>
  );
}

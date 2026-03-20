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
import EntityList from 'src/sections/@dashboard/entity/item/EntityList';

export default function EntityListPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

 

  return (
    <Page title={translate("Entity.List")}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Entity.List"
          icon='entity'
          links={[
            { name: 'Entity.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Entity.Entity', href: PATH_DASHBOARD.event.root },
            { name: 'Entity.List' },
          ]}
        />

<EntityList />
      </Container>
    </Page>
  );
}

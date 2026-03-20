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
import {
  PerimeterList
} from 'src/sections/@dashboard/perimeter/item';


export default function PerimeterListPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title={translate("Perimeter.PerimeterList")}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Perimeter.PerimeterList"
          icon='perimeter'
          links={[
            { name: 'Perimeter.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Perimeter.Perimeter', href: PATH_DASHBOARD.perimeter.root },
            { name: 'Perimeter.List' },
          ]}
        />

        <PerimeterList />
      </Container>
    </Page>
  );
}

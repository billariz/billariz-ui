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

import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { Consumption } from 'src/sections/@dashboard/consumption/item';

export default function ConsumptionListPage() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  return (
    <Page title={translate('Consumption.List')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Consumption.ConsumptionList"
          icon="consumption"
          links={[
            { name: 'Consumption.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Consumption.consumption',
              href: PATH_DASHBOARD.consumption.root,
            },
            { name: 'Consumption.List' },
          ]}
        />
        <Consumption />
      </Container>
    </Page>
  );
}

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
import { CustomerList } from 'src/sections/@dashboard/customer/item';

export default function CustomerListPage() {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();

  return (
    <Page title={translate('Customer.List')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Customer.ClientList"
          icon="customer"
          links={[
            { name: 'Customer.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Customer.List' },
          ]}
        />
        <CustomerList />
      </Container>
    </Page>
  );
}

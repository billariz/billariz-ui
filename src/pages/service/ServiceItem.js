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

import { Card, Container, Stack } from '@mui/material';
import { TableTabs } from 'src/components/table';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// sections
import { useMemo, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { ServiceStartOption } from 'src/sections/@dashboard/serviceStartOption/item';
import ServiceTypeList from 'src/sections/@dashboard/serviceType/item/ServiceTypeList';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function ServicePage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const items = useMemo(
    () => [
      {
        label: 'Service.serviceType',
        value: 'ServiceType',
        subject: 'SERVICE_TYPE',
      },
      {
        label: 'Service.serviceStartOption',
        value: 'ServiceStartOption',
        subject: 'SERVICE_START_OPTION',
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

  const renderTable = () => {
    switch (currentTable) {
      case 'ServiceType':
        return <ServiceTypeList />;
      case 'ServiceStartOption':
        return <ServiceStartOption />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={translate('Service.Services')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Service.List"
          icon="service"
          links={[
            { name: 'Service.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Service.Services', href: PATH_DASHBOARD.service.root },
            { name: 'Service.List' },
          ]}
        />
        <Stack>
          <div>
            <Card maxWidth={themeStretch ? false : 'xl'}>
              <TableTabs
                items={filteredItems}
                defaultValue={filteredItems[0]?.value || ''}
                onChange={openTable}
              />
              {renderTable()}
            </Card>
          </div>
        </Stack>
      </Container>
    </Page>
  );
}

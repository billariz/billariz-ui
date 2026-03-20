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

// components
import { SeStartOption } from 'src/sections/@dashboard/seStartOption/item';
import { ServiceElementType } from 'src/sections/@dashboard/serviceElementType/item';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';

// Hooks
import { useMemo, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import useSettings from '../../hooks/useSettings';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function SeStartOptionPage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const items = useMemo(
    () => [
      {
        label: 'ServiceElement.ServiceElementType',
        value: 'ServiceElementType',
        subject: 'SERVICE_ELEMENT_TYPE',
      },
      {
        label: 'ServiceElement.ServiceElementStartOption',
        value: 'ServiceElementStartOption',
        subject: 'SERVICE_ELEMENT_START_OPTION',
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
      case 'ServiceElementType':
        return <ServiceElementType />;
      case 'ServiceElementStartOption':
        return <SeStartOption />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={translate('ServiceElement.ServiceElements')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="ServiceElement.List"
          icon="serviceElement"
          links={[
            { name: 'ServiceElement.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'ServiceElement.ServiceElements',
              href: PATH_DASHBOARD.serviceElement.root,
            },
            { name: 'ServiceElement.List' },
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

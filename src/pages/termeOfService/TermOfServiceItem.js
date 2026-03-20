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
import { TosType } from 'src/sections/@dashboard/termOfServiceType/item';
import { TosStartOption } from 'src/sections/@dashboard/tosStartOption/item';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function TermOfServicePage() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const items = useMemo(
    () => [
      {
        label: 'TermOfService.TermOfServiceTypes',
        value: 'TermOfService',
        subject: 'TERM_OF_SERVICE_TYPE',
      },
      {
        label: 'TermOfService.tosStartOption',
        value: 'TosStartOption',
        subject: 'TERM_OF_SERVICE_START_OPTION',
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
      case 'TermOfService':
        return <TosType />;
      case 'TosStartOption':
        return <TosStartOption />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={translate('TermOfService.TermOfServices')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="TermOfService.List"
          icon="termOfService"
          links={[
            { name: 'TermOfService.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'TermOfService.termOfService',
              href: PATH_DASHBOARD.service.root,
            },
            { name: 'TermOfService.List' },
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

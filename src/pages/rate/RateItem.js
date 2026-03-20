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
import { Rate } from 'src/sections/@dashboard/rate/item';
import RateTypeList from 'src/sections/@dashboard/rateType/item/RateTypeList';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function RateItem() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const items = useMemo(
    () => [
      {
        label: 'Rate.rateVersion',
        value: 'rateVersions',
        subject: 'RATE',
      },
      {
        label: 'Rate.rateType',
        value: 'rateType',
        subject: 'RATE_TYPE',
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
      case 'rateVersions':
        return <Rate />;
      case 'rateType':
        return <RateTypeList />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={translate('Rate.rates')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Rate.List"
          icon="rate"
          links={[
            { name: 'Rate.Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Rate.rates', href: PATH_DASHBOARD.rate.root },
            { name: 'Rate.List' },
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

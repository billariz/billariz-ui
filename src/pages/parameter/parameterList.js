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

import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableTabs } from 'src/components/table';
import Page from '../../components/Page';
// sections

import { useMemo, useState } from 'react';
import { Container, Stack, Card } from '@mui/material';

// sections
import ParameterList from 'src/sections/@dashboard/parameter/item/ParameterList';
import PostalCodeList from 'src/sections/@dashboard/postalCode/item/PostalCodeList';
import ClimaticRefList from 'src/sections/@dashboard/climaticRef/item/climaticRefList';
import GeoRefList from 'src/sections/@dashboard/geoRef/item/GeoRefList';

//Permissions
import abilityManager from 'src/permissions/ability';

export default function ParameterListPage() {
  const { themeStretch } = useSettings();

  const openTable = (value) => {
    setCurrentTable(value);
  };

  const items = useMemo(
    () => [
      {
        label: 'Parameter.parameters',
        value: 'enum',
        subject: 'PARAMETER',
      },
      {
        label: 'Parameter.PostalCode',
        value: 'postalCode',
        subject: 'POSTAL_CODE',
      },
      {
        label: 'Parameter.GeoRef',
        value: 'geoRef',
        subject: 'GEO_FACTOR',
      },
      {
        label: 'Parameter.ClimaticRef',
        value: 'climaticRef',
        subject: 'CLIMATC_REF',
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
      case 'enum':
        return <ParameterList />;
      case 'postalCode':
        return <PostalCodeList />;
      case 'geoRef':
        return <GeoRefList />;
      case 'climaticRef':
        return <ClimaticRefList />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title="Parameter.List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Parameter.ParameterList"
          icon="parameter"
          links={[
            { name: 'Parameter.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Parameter.parameters',
              href: PATH_DASHBOARD.parameter.root,
            },
            { name: 'Parameter.List' },
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

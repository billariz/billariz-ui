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

import { useMemo, useState } from 'react';
import { Container, Stack, Card } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { TableTabs } from 'src/components/table';
// sections
import ActivityTypeList from 'src/sections/@dashboard/activityType/activityTypeList';
import ActivityTemplateList from 'src/sections/@dashboard/activityTemplate/activityTemplateList';
import EventTemplateList from 'src/sections/@dashboard/eventTemplate/eventTemplateList';

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
        label: 'ActivityTemplate.activityType.activityType',
        value: 'activityType',
        subject: 'ACTIVITY_TYPE',
      },
      {
        label: 'ActivityTemplate.activityTemplate',
        value: 'activityTemplate',
        subject: 'ACTIVITY_TEMPLATE',
      },
      {
        label: 'ActivityTemplate.eventTemplate.eventTemplate',
        value: 'eventTemplate',
        subject: 'EVENT_TEMPLATE',
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
      case 'activityType':
        return <ActivityTypeList />;
      case 'activityTemplate':
        return <ActivityTemplateList />;
      case 'eventTemplate':
        return <EventTemplateList />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title="ActivityTemplate.List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="ActivityTemplate.activityTemplate"
          icon="parameter"
          links={[
            { name: 'ActivityTemplate.Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'ActivityTemplate.activityTemplate',
              href: PATH_DASHBOARD.activityTemplate.root,
            },
            { name: 'ActivityTemplate.List' },
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

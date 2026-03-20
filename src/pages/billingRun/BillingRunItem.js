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

// @mui
import { Card, Container, Grid } from '@mui/material';
import { TableTabs } from 'src/components/table';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import FallBacks from 'src/components/fallbacks';

// sections
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getBillingRunById } from 'src/redux/slices/billingRun';
import ActivityList from 'src/sections/@dashboard/activity/item/ActivityList';
import BillList from 'src/sections/@dashboard/bill/item/BillList';
import BillingRunAnalytic from 'src/sections/@dashboard/billingRun/item/BillingRunAnalytic';
import BillingRunIndex from 'src/sections/@dashboard/billingRun/item/BillingRunIndex';
import BillingRunOverview from 'src/sections/@dashboard/billingRun/item/BillingRunOverview';
import { ContractList } from 'src/sections/@dashboard/contract/item';
import { JournalList } from 'src/sections/@dashboard/journal/item';
import { PerimeterList } from 'src/sections/@dashboard/perimeter/item';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

export default function BillingRunItem() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  // states
  const { currentBillingRun } = useSelector((state) => state.billingRuns);
  const ability = abilityManager.getAbility();

  const billingRun = currentBillingRun?.billingRun;
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBillingRunById(id));
  }, [id, dispatch]);

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.Bills',
        value: 'bills',
        subject: 'BILL',
      },
      {
        label: 'TableTabs.Contracts',
        value: 'contracts',
        subject: 'CONTRACT',
      },
      {
        label: 'TableTabs.Perimeters',
        value: 'perimeters',
        subject: 'PERIMETER',
      },
      {
        label: 'TableTabs.Activities',
        value: 'activity',
        subject: 'ACTIVITY',
      },
      {
        label: 'TableTabs.Journal',
        value: 'journal',
        subject: 'JOURNAL',
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
      case 'bills':
        return <BillList runId={billingRun.id} />;
      case 'contracts':
        return (
          <ContractList
            billingCycle={billingRun.billingCycle.id}
            status={'EFFECTIVE'}
          />
        );
      case 'perimeters':
        return (
          <PerimeterList
            billingCycle={billingRun.billingCycle.id}
            status={'OPEN'}
          />
        );
      case 'activity':
        return (
          <ActivityList
            objectId={billingRun.id}
            relationType={'ACTIVITY_BILLING_RUN'}
          />
        );
      case 'journal':
        return (
          <JournalList objectId={billingRun.id} objectType={'BILLING_RUN'} />
        );
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={id}>
      <Can I="READ" a={'BILLING_RUN'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={id}
                name={'BillingRun.BillingRun'}
                icon="billingRun"
                links={[
                  { name: 'BillingRun.Dashboard', href: PATH_DASHBOARD.root },
                  {
                    name: 'BillingRun.List',
                    href: PATH_DASHBOARD.billingRun.root,
                  },
                  { name: id, href: PATH_DASHBOARD.root },
                ]}
              />
              {billingRun && (
                <Card sx={{ marginTop: 2 }}>
                  <Grid
                    container
                    spacing={1}
                    columns={{ xs: 4, sm: 12, md: 12 }}
                    paddingBottom={2}
                    paddingTop={2}
                    paddingLeft={2}
                    paddingRight={2}
                  >
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <BillingRunIndex billingRun={billingRun} />
                    </Grid>
                    <Grid item xs={6} sm={3} md={6} lg={3}>
                      <BillingRunOverview
                        steps={billingRun.billingRunOverview}
                        title
                      />
                    </Grid>
                  </Grid>
                  <Card sx={{ m: 2 }}>
                    <BillingRunAnalytic
                      data={billingRun.billOverview}
                      contractCount={billingRun.contractCount}
                    />
                  </Card>
                </Card>
              )}
              {billingRun && filteredItems.length > 0 && (
                <Card
                  sx={{
                    marginTop: 2,
                  }}
                >
                  <TableTabs
                    items={filteredItems}
                    defaultValue={filteredItems[0]?.value || ''}
                    onChange={openTable}
                  />
                  {renderTable()}
                </Card>
              )}
            </Container>
          ) : (
            <FallBacks errorCode={401} />
          )
        }
      </Can>
    </Page>
  );
}

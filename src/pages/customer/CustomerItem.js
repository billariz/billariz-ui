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

import { Card, Container, Grid, Stack } from '@mui/material';

//Actions
import { getCustomerById } from 'src/redux/slices/customer';

//Hooks
import useSettings from '../../hooks/useSettings';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { PATH_DASHBOARD } from '../../routes/paths';

//Components
import { TableTabs } from 'src/components/table';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import CustomerChart from 'src/sections/@dashboard/customer/item/CustomerChart';
import PerimeterList from 'src/sections/@dashboard/perimeter/item/PerimeterList';
import ActivityList from 'src/sections/@dashboard/activity/item/ActivityList';
import ContractList from 'src/sections/@dashboard/contract/item/ContractList';
import { CustomerAbout } from 'src/sections/@dashboard/customer/item';
import { JournalList } from 'src/sections/@dashboard/event/item';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

export default function CustomerItem() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const ability = abilityManager.getAbility();

  // states
  const { currentCustomer } = useSelector((state) => state.customers);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [dispatch, id]);

  const customer = currentCustomer?.customer;

  let heading = id;
  if (customer) heading = customer.reference ? customer.reference : id;

  const items = useMemo(
    () => [
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
    ],
    []
  );
  const filteredItems = useMemo(
    () => items.filter((item) => abilityManager.can('READ', item.subject)),
    [items]
  );
  const customerItems = useMemo(
    () => [
      {
        label: 'TableTabs.Detail',
        value: 'detail',
        subject: 'CUSTOMER',
      },
      {
        label: 'TableTabs.Activities',
        value: 'activity',
        subject: 'ACTIVITY',
      },
      {
        label: 'TableTabs.Journal',
        value: 'JOURNAL',
      },
    ],
    []
  );
  const filteredCustomerItems = useMemo(
    () =>
      customerItems.filter((item) => abilityManager.can('READ', item.subject)),
    [customerItems]
  );

  const [currentTable, setCurrentTable] = useState(
    filteredItems[0]?.value || ''
  );
  const [customerCurrentTable, setCustomerCurrentTable] = useState(
    filteredCustomerItems[0]?.value || ''
  );

  const openTable = (value) => {
    setCurrentTable(value);
  };

  const openCustomerTable = (value) => {
    setCustomerCurrentTable(value);
  };

  const renderTable = () => {
    switch (currentTable) {
      case 'contracts':
        return <ContractList customerId={customer.id} />;
      case 'perimeters':
        return <PerimeterList customerId={customer.id} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  const customerRenderTable = () => {
    switch (customerCurrentTable) {
      case 'detail':
        return (
          <Grid
            container
            spacing={1}
            columns={{ xs: 4, sm: 12, md: 12 }}
            paddingBottom={2}
            paddingTop={3}
            paddingLeft={3}
          >
            <Grid item sm={6} md={6} lg={8}>
              {customer && <CustomerAbout customer={customer} />}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              {customer && <CustomerChart customer={customer} />}
            </Grid>
          </Grid>
        );
      case 'activity':
        return (
          <ActivityList
            objectId={customer.id}
            relationType="ACTIVITY_CUSTOMER"
          />
        );
      case 'journal':
        return <JournalList objectId={customer.id} objectType={'CUSTOMER'} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };
  return (
    <Page title={heading}>
      <Can I="READ" a={'CUSTOMER'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={heading}
                icon="customer"
                name={'Customer.Customer'}
                links={[
                  { name: 'Customer.Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Customer.List', href: PATH_DASHBOARD.customer.root },
                  { name: heading, href: PATH_DASHBOARD.customerItem.root },
                ]}
              />
              <Stack>
                {customer && filteredCustomerItems.length > 0 && (
                  <Card>
                    <TableTabs
                      items={filteredCustomerItems}
                      defaultValue={filteredCustomerItems[0]?.value || ''}
                      onChange={openCustomerTable}
                    />
                    {customerRenderTable()}
                  </Card>
                )}
                {customer && filteredItems.length > 0 && (
                  <Card>
                    <TableTabs
                      items={filteredItems}
                      defaultValue={filteredItems[0]?.value || ''}
                      onChange={openTable}
                      sx={{ pt: 2 }}
                    />
                    {renderTable()}
                  </Card>
                )}
              </Stack>
            </Container>
          ) : (
            <FallBacks errorCode={401} />
          )
        }
      </Can>
    </Page>
  );
}

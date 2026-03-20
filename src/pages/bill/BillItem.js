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

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// sections
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import ActivityList from 'src/sections/@dashboard/activity/item/ActivityList';
import BillSegmentList from 'src/sections/@dashboard/billSegment/item/BillSegmentList';
import { JournalList } from 'src/sections/@dashboard/journal/item';
import BillDetails from '../../sections/@dashboard/bill/item/BillDetails';
import { TableTabs } from 'src/components/table';
import BillDetail from 'src/sections/@dashboard/bill/item/BillDetail';
import BillIndex from 'src/sections/@dashboard/bill/item/BillIndex';
import FallBacks from 'src/components/fallbacks';

//Redux
import { getBillById } from 'src/redux/slices/bill';

//Hooks
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useSettings from '../../hooks/useSettings';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

export default function BillItem() {
  const { themeStretch } = useSettings();
  const {
    currentBill: { bill },
  } = useSelector((state) => state.bills);
  const ability = abilityManager.getAbility();

  const { id } = useParams();

  let heading = id;
  if (bill) heading = bill.reference ? bill.reference : bill.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillById(id));
  }, [dispatch, id]);

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.BillDetails',
        value: 'billDetails',
        subject: 'BILL',
      },
      {
        label: 'TableTabs.BillSegments',
        value: 'billSegments',
        subject: 'BILL_SEGMENT',
      },
      {
        label: 'TableTabs.Activity',
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
      case 'billDetails':
        return <BillDetails billLines={bill.details} />;
      case 'billSegments':
        return <BillSegmentList billId={bill.id} />;
      case 'activity':
        return (
          <ActivityList objectId={bill.id} relationType={'ACTIVITY_INVOICE'} />
        );
      case 'journal':
        return <JournalList objectId={bill.id} objectType={'BILL'} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={heading}>
      <Can I="READ" a={'BILL'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={heading}
                name={'Bill.Bill'}
                icon="bill"
                links={[
                  { name: 'Bill.Dashboard', href: PATH_DASHBOARD.root },
                  {
                    name: 'Bill.List',
                    href: PATH_DASHBOARD.bill.root,
                  },
                  { name: heading, href: PATH_DASHBOARD.root },
                ]}
              />
              {bill && (
                <Grid
                  container
                  spacing={0}
                  columns={{ xs: 4, sm: 12, md: 12 }}
                  paddingBottom={2}
                  paddingTop={2}
                  paddingLeft={0}
                >
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <BillDetail bill={bill} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={8} sx={{ pl: 2 }}>
                    <BillIndex invoice={bill} />
                  </Grid>
                </Grid>
              )}
              {bill && filteredItems.length > 0 && (
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

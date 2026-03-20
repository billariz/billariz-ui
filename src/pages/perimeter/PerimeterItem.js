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
import { getPerimeterById } from 'src/redux/slices/perimeter';

// Hooks
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useSettings from '../../hooks/useSettings';

import { PATH_DASHBOARD } from '../../routes/paths';
//Components
import FallBacks from 'src/components/fallbacks';
import { JournalList } from 'src/sections/@dashboard/journal/item';
import ActivityList from 'src/sections/@dashboard/activity/item/ActivityList';
import ActorList from 'src/sections/@dashboard/actor/item/ActorList';
import BillList from 'src/sections/@dashboard/bill/item/BillList';
import { ContractList } from 'src/sections/@dashboard/contract/item';
import { CustomerInfo } from 'src/sections/@dashboard/customer/item';
import {
  PerimeterCharts,
  PerimeterDetail,
} from 'src/sections/@dashboard/perimeter/item';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { TableTabs } from 'src/components/table';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

export default function PerimeterItem() {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  // states
  const { currentPerimeter } = useSelector((state) => state.perimeters);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerimeterById(id));
  }, [dispatch, id]);

  const perimeterItems = useMemo(
    () => [
      {
        label: 'TableTabs.Detail',
        value: 'detail',
        subject: 'PERIMETER',
      },
      {
        label: 'TableTabs.Actor',
        value: 'actor',
        subject: 'ACTOR',
      },
      {
        label: 'TableTabs.Customer',
        value: 'customer',
        subject: 'CUSTOMER',
      },
      {
        label: 'TableTabs.Activity',
        value: 'activity',
        subject: 'ACTIVITY',
      },
      {
        label: 'TableTabs.Bill',
        value: 'bill',
        subject: 'BILL',
      },
      {
        label: 'TableTabs.Journal',
        value: 'journal',
        subject: 'JOURNAL',
      },
    ],
    []
  );
  const filteredPerimeterItems = useMemo(
    () =>
      perimeterItems.filter((item) => abilityManager.can('READ', item.subject)),
    [perimeterItems]
  );

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.Contract',
        value: 'contract',
        subject: 'CONTRACT',
      },
    ],
    []
  );
  const filteredItems = useMemo(
    () => items.filter((item) => abilityManager.can('READ', item.subject)),
    [items]
  );

  const perimeter = currentPerimeter?.perimeter;

  let heading = id;
  if (perimeter) heading = perimeter.reference ? perimeter.reference : id;

  const [currentTable, setCurrentTable] = useState(
    filteredItems[0]?.value || ''
  );
  const [currentTableDetail, setCurrentTableDetail] = useState(
    filteredPerimeterItems[0]?.value || ''
  );

  const openTable = (value) => {
    setCurrentTable(value);
  };
  const openTableDetail = (value) => {
    setCurrentTableDetail(value);
  };

  const renderTable = () => {
    switch (currentTable) {
      case 'contract':
        return <ContractList perimeterId={perimeter.id} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  const renderTableDetail = () => {
    switch (currentTableDetail) {
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
              <PerimeterDetail perimeter={perimeter} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <PerimeterCharts perimeter={perimeter} />
            </Grid>
          </Grid>
        );
      case 'actor':
        return <ActorList perimeterId={perimeter.id} />;
      case 'customer':
        return <CustomerInfo customer={currentPerimeter.customer} />;
      case 'activity':
        return (
          <ActivityList
            objectId={perimeter.id}
            relationType="ACTIVITY_PERIMETER"
          />
        );
      case 'bill':
        return <BillList perimeterId={perimeter.id} />;
      case 'journal':
        return <JournalList objectId={perimeter.id} objectType={'PERIMETER'} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={heading}>
      <Can I="READ" a={'PERIMETER'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={heading}
                icon="perimeter"
                name="Perimeter.Perimeter"
                links={[
                  { name: 'Perimeter.Dashboard', href: PATH_DASHBOARD.root },
                  {
                    name: 'Perimeter.List',
                    href: PATH_DASHBOARD.perimeter.root,
                  },
                  { name: heading, href: PATH_DASHBOARD.perimeterItem.root },
                ]}
              />
              <Stack>
                {perimeter && filteredPerimeterItems.length > 0 && (
                  <Card>
                    <TableTabs
                      items={filteredPerimeterItems}
                      defaultValue={filteredPerimeterItems[0]?.value || ''}
                      onChange={openTableDetail}
                    />
                    {renderTableDetail()}
                  </Card>
                )}
                {perimeter && filteredItems.length > 0 && (
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

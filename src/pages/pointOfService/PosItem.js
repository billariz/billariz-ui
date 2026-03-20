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

// Actions
import { getPosById } from 'src/redux/slices/pointOfService';

import { PATH_DASHBOARD } from '../../routes/paths';
//Hooks
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useSettings from '../../hooks/useSettings';

//Components
import { TableTabs } from 'src/components/table';
import { BillableCharge } from 'src/sections/@dashboard/billableCharge/item';
import { PointOfServiceContracts } from 'src/sections/@dashboard/pointOfServiceContracts/item';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { Consumption } from 'src/sections/@dashboard/consumption/item';
import { Meter } from 'src/sections/@dashboard/meter/item';
import {
  PosChart,
  PosDetail,
} from 'src/sections/@dashboard/pointOfService/item';
import { PosCapacity } from 'src/sections/@dashboard/posCapacity/item';
import { PosConfiguration } from 'src/sections/@dashboard/posConfiguration/item';
import { PosEstimate } from 'src/sections/@dashboard/posEstimate/item';
import { JournalList } from 'src/sections/@dashboard/journal/item';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

export default function CustomerItem() {
  const { themeStretch } = useSettings();

  const { currentPOS } = useSelector((state) => state.pointOfServices);
  const { id } = useParams();
  const dispatch = useDispatch();
  const ability = abilityManager.getAbility();

  useEffect(() => {
    dispatch(getPosById(id));
  }, [dispatch, id]);

  const pointOfService = currentPOS?.pos;
  const chart = currentPOS?.chart;

  let heading = id;
  if (pointOfService)
    heading = pointOfService.reference ? pointOfService.reference : id;

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.Contract',
        value: 'contract',
        subject: 'CONTRACT_POS',
      },
      {
        label: 'TableTabs.Configuration',
        value: 'configuration',
        subject: 'POINT_OF_SERVICE_CONFIGURATION',
      },
      {
        label: 'TableTabs.Capacity',
        value: 'capacity',
        subject: 'POINT_OF_SERVICE_CAPACITY',
      },
      {
        label: 'TableTabs.Estimate',
        value: 'estimate',
        subject: 'POINT_OF_SERVICE_ESTIMATE',
      },
      {
        label: 'TableTabs.Meter',
        value: 'meter',
        subject: 'METER',
      },
      {
        label: 'TableTabs.Consumption',
        value: 'consumption',
        subject: 'METER_READ',
      },
      {
        label: 'TableTabs.BillableCharge',
        value: 'billableCharge',
        subject: 'BILLABLE_CHARGE',
      },
    ],
    []
  );
  const filteredItems = useMemo(
    () => items.filter((item) => abilityManager.can('READ', item.subject)),
    [items]
  );

  const posItems = useMemo(
    () => [
      {
        label: 'TableTabs.Detail',
        value: 'detail',
        subject: 'POINT_OF_SERVICE',
      },
      {
        label: 'TableTabs.Journal',
        value: 'journal',
        subject: 'JOURNAL',
      },
    ],
    []
  );
  const filteredPostItems = useMemo(
    () => posItems.filter((item) => abilityManager.can('READ', item.subject)),
    [posItems]
  );

  const renderTable = () => {
    switch (currentTable) {
      case 'contract':
        return <PointOfServiceContracts posId={pointOfService.id} />;
      case 'configuration':
        return <PosConfiguration posId={pointOfService.id} />;
      case 'capacity':
        return <PosCapacity posId={pointOfService.id} />;
      case 'estimate':
        return <PosEstimate posId={pointOfService.id} />;
      case 'meter':
        return <Meter posId={pointOfService.id} />;
      case 'consumption':
        return (
          <Consumption
            posId={pointOfService.id}
            posRef={pointOfService.reference}
          />
        );
      case 'billableCharge':
        return (
          <BillableCharge
            posId={pointOfService.id}
            posRef={pointOfService.reference}
          />
        );
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
            spacing={0}
            columns={{ xs: 4, sm: 12, md: 12 }}
            paddingBottom={2}
            paddingTop={2}
            paddingLeft={2}
          >
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <PosDetail pos={pointOfService} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <PosChart pos={pointOfService} chart={chart} />
            </Grid>
          </Grid>
        );
      case 'journal':
        return (
          <JournalList
            objectId={pointOfService.id}
            objectType="POINTOFSERVICE"
          />
        );
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  const [currentTable, setCurrentTable] = useState(
    filteredItems[0]?.value || ''
  );
  const [currentTableDetail, setCurrentTableDetail] = useState(
    filteredPostItems[0]?.value || ''
  );

  const openTable = (value) => {
    setCurrentTable(value);
  };
  const openTableDetail = (value) => {
    setCurrentTableDetail(value);
  };

  return (
    <Page title={heading}>
      <Can I="READ" a={'POINT_OF_SERVICE'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={heading}
                icon="pos"
                name={'Pos.Pos'}
                links={[
                  { name: 'Pos.Dashboard', href: PATH_DASHBOARD.root },
                  {
                    name: 'Pos.List',
                    href: PATH_DASHBOARD.pointOfService.root,
                  },
                  { name: heading, href: PATH_DASHBOARD.pointOfService.root },
                ]}
              />

              <Stack>
                <div>
                  {pointOfService && (
                    <>
                      {filteredPostItems.length > 0 && (
                        <Card>
                          <TableTabs
                            items={filteredPostItems}
                            defaultValue={filteredPostItems[0]?.value || ''}
                            onChange={openTableDetail}
                          />
                          {renderTableDetail()}
                        </Card>
                      )}
                      {filteredItems.length > 0 && (
                        <Card>
                          <TableTabs
                            items={filteredItems}
                            defaultValue={filteredItems[0]?.value || ''}
                            onChange={openTable}
                          />
                          {renderTable()}
                        </Card>
                      )}
                    </>
                  )}
                </div>
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

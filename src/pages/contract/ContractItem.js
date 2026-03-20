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
import { getContractById } from 'src/redux/slices/contract';

import { PATH_DASHBOARD } from '../../routes/paths';

//Hooks
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useSettings from '../../hooks/useSettings';

//Components
import Page from '../../components/Page';
import { TableTabs } from 'src/components/table';
import { JournalList } from 'src/sections/@dashboard/journal/item';
import { ContractPointOfServices } from 'src/sections/@dashboard/contractPointOfServices/item';
import { BillSegmentList } from 'src/sections/@dashboard/billSegment/item';
import ActivityList from 'src/sections/@dashboard/activity/item/ActivityList';
import ActorList from 'src/sections/@dashboard/actor/item/ActorList';
import BillList from 'src/sections/@dashboard/bill/item/BillList';
import { Consumption } from 'src/sections/@dashboard/consumption/item';
import { BillableCharge } from 'src/sections/@dashboard/billableCharge/item';
import {
  ContractChart,
  ContractDetail,
} from 'src/sections/@dashboard/contract/item';
import { CustomerInfo } from 'src/sections/@dashboard/customer/item';
import { Meter } from 'src/sections/@dashboard/meter/item';
import PerimeterList from 'src/sections/@dashboard/perimeter/item/PerimeterList';
import { PosCapacity } from 'src/sections/@dashboard/posCapacity/item';
import { PosConfiguration } from 'src/sections/@dashboard/posConfiguration/item';
import { PosEstimate } from 'src/sections/@dashboard/posEstimate/item';
import ServiceList from 'src/sections/@dashboard/service/item/ServiceList';
import ServiceElementList from 'src/sections/@dashboard/serviceElement/item/ServiceElementList';
import TermeOfServiceList from 'src/sections/@dashboard/termeOfService/item/TermeOfServiceList';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

export default function ContractItem() {
  const ability = abilityManager.getAbility();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  // states
  const { currentContract } = useSelector((state) => state.contracts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getContractById(id));
  }, [dispatch, id]);

  const contractItems = useMemo(
    () => [
      {
        label: 'TableTabs.Detail',
        value: 'detail',
        subject: 'CONTRACT',
      },
      {
        label: 'TableTabs.Perimeter',
        value: 'perimeter',
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
        label: 'TableTabs.Service',
        value: 'service',
        subject: 'SERVICE',
      },
      {
        label: 'TableTabs.TermOfservice',
        value: 'termeOfService',
        subject: 'TERM_OF_SERVICE',
      },
      {
        label: 'TableTabs.ServiceElement',
        value: 'serviceElement',
        subject: 'SERVICE_ELEMENT',
      },
      {
        label: 'TableTabs.BillSegments',
        value: 'billSegment',
        subject: 'BILL_SEGMENT',
      },
      {
        label: 'TableTabs.Bill',
        value: 'bill',
        subject: 'BILL',
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

  // Filtrer les éléments en fonction des permissions
  const filteredContractItems = useMemo(
    () =>
      contractItems.filter((item) => abilityManager.can('READ', item.subject)),
    [contractItems]
  );

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.PointOfService',
        value: 'pointOfService',
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

  const [currentTable, setCurrentTable] = useState(
    filteredItems[0]?.value || ''
  );
  const [currentTableDetail, setCurrentTableDetail] = useState(
    filteredContractItems[0]?.value || ''
  );

  const openTable = (value) => {
    setCurrentTable(value);
  };
  const openTableDetail = (value) => {
    setCurrentTableDetail(value);
  };

  const contract = currentContract?.contract;
  const chart = currentContract?.chart;

  let heading = id;
  if (contract) heading = contract.reference ? contract.reference : id;

  const renderTable = () => {
    switch (currentTable) {
      case 'pointOfService':
        return <ContractPointOfServices contractId={contract.id} />;
      case 'configuration':
        return <PosConfiguration contractId={contract.id} />;
      case 'capacity':
        return <PosCapacity contractId={contract.id} />;
      case 'estimate':
        return <PosEstimate contractId={contract.id} />;
      case 'meter':
        return <Meter contractId={contract.id} />;
      case 'consumption':
        return <Consumption contractId={contract.id} />;
      case 'billableCharge':
        return <BillableCharge contractId={contract.id} />;
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
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ContractDetail contract={contract} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <ContractChart contract={contract} chart={chart} />
            </Grid>
          </Grid>
        );

      case 'perimeter':
        return <PerimeterList contractId={contract.id} />;
      case 'actor':
        return <ActorList contractId={contract.id} />;
      case 'customer':
        return <CustomerInfo customer={currentContract.customer} />;
      case 'service':
        return <ServiceList contractId={contract.id} />;
      case 'termeOfService':
        return <TermeOfServiceList contractId={contract.id} />;
      case 'serviceElement':
        return <ServiceElementList contractId={contract.id} />;
      case 'billSegment':
        return <BillSegmentList contractId={contract.id} />;
      case 'activity':
        return (
          <ActivityList
            objectId={contract.id}
            relationType={'ACTIVITY_CONTRACT'}
          />
        );
      case 'bill':
        return <BillList contractId={contract.id} />;
      case 'journal':
        return <JournalList objectId={contract.id} objectType={'CONTRACT'} />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Page title={heading}>
      <Can I="READ" a={'CONTRACT'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <HeaderBreadcrumbs
                heading={heading}
                icon="contract"
                name={'Contract.Contract'}
                links={[
                  { name: 'Contract.Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Contract.List', href: PATH_DASHBOARD.contract.root },
                  { name: heading, href: PATH_DASHBOARD.contractItem.root },
                ]}
              />

              <Stack>
                <div>
                  {contract && filteredContractItems.length > 0 && (
                    <Card>
                      <TableTabs
                        items={filteredContractItems}
                        defaultValue={filteredContractItems[0]?.value || ''}
                        onChange={openTableDetail}
                      />
                      {renderTableDetail()}
                    </Card>
                  )}
                  {contract && filteredItems.length > 0 && (
                    <Card>
                      <TableTabs
                        items={filteredItems}
                        defaultValue={filteredItems[0]?.value || ''}
                        onChange={openTable}
                      />
                      {renderTable()}
                    </Card>
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

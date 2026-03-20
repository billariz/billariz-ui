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

import PropTypes from 'prop-types';
// @mui
import { Card, Container, Dialog, Grid } from '@mui/material';
// components
import { useMemo, useState } from 'react';
import { TableTabs } from 'src/components/table';
import useSettings from '../../../../hooks/useSettings';
import ActivityList from '../../activity/item/ActivityList';
import TermeOfServiceList from '../../termeOfService/item/TermeOfServiceList';
import ServiceDetail from './ServiceDetail';
import ServiceCharts from './ServiceCharts';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

ServiceInfo.propTypes = {
  onClose: PropTypes.func,
  service: PropTypes.object,
  open: PropTypes.bool,
};

export default function ServiceInfo({ open, onClose, service }) {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.TermOfservice',
        value: 'termOfservice',
        subject: 'TERM_OF_SERVICE',
      },
      {
        label: 'TableTabs.Activity',
        value: 'activity',
        subject: 'ACTIVITY',
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
      case 'termOfservice':
        return (
          <TermeOfServiceList
            serviceId={service.id}
            contractId={service.contractId}
          />
        );
      case 'activity':
        return (
          <ActivityList objectId={service.id} relationType="ACTIVITY_SERVICE" />
        );
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={onClose}
      style={{ borderRadius: 0 }}
      variant="scrollable"
      scrollbuttons="auto"
    >
      <Can I="READ" a={'SERVICE'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container
              sx={{ py: 2, px: 0 }}
              maxWidth={themeStretch ? false : 'xl'}
            >
              <Grid
                container
                spacing={1}
                columns={{ xs: 4, sm: 12, md: 12 }}
                paddingBottom={2}
                paddingTop={3}
                paddingLeft={3}
              >
                <Grid item sm={6} md={7} lg={8}>
                  <ServiceDetail service={service} />
                </Grid>
                <Grid item sm={6} md={4} lg={4}>
                  <ServiceCharts service={service} />
                </Grid>
              </Grid>

              <Card>
                {service && filteredItems.length > 0 && (
                  <Card>
                    <TableTabs
                      items={filteredItems}
                      defaultValue={filteredItems[0]?.value || ''}
                      onChange={openTable}
                    />
                    {renderTable()}
                  </Card>
                )}
              </Card>
            </Container>
          ) : (
            <FallBacks errorCode={401} />
          )
        }
      </Can>
    </Dialog>
  );
}

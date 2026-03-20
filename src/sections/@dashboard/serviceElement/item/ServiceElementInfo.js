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
import { ServiceElementDetail } from '.';
import useSettings from '../../../../hooks/useSettings';
import ActivityList from '../../activity/item/ActivityList';
import { BillSegmentList } from '../../billSegment/item';
import ServiceElementCharts from './ServiceElementCharts';

import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';
// ----------------------------------------------------------------------

ServiceElementInfo.propTypes = {
  onClose: PropTypes.func,
  serviceElement: PropTypes.object,
  open: PropTypes.bool,
};

export default function ServiceElementInfo({ open, onClose, serviceElement }) {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
      {
        label: 'ServiceElement.billSegments',
        value: 'billSegment',
        subject: 'BILL_SEGMENT',
      },
      {
        label: 'ServiceElement.activities',
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
      case 'billSegment':
        return <BillSegmentList seId={serviceElement.id} />;
      case 'activity':
        return (
          <ActivityList
            objectId={serviceElement.id}
            relationType="ACTIVITY_SERVICE_ELEMENT"
          />
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
      <Can I="READ" a={'SERVICE_ELEMENT'} ability={ability} passThrough>
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
                  <ServiceElementDetail serviceElement={serviceElement} />
                </Grid>
                <Grid item sm={6} md={4} lg={4}>
                  <ServiceElementCharts serviceElement={serviceElement} />
                </Grid>
              </Grid>
              <Card>
                {serviceElement && filteredItems.length > 0 && (
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

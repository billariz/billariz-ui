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

//Hooks
import { useMemo, useState } from 'react';
import useSettings from 'src/hooks/useSettings';

// components
import { TableTabs } from 'src/components/table';
import { JournalList } from 'src/sections/@dashboard/event/item';
import { ActivityList } from '../../activity/item';
import { MeterReadList } from '../../meterRead';
import ConsumptionDetail from './ConsumptionDetail';
import MeterReadChart from './MeterReadChart';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

ConsumptionInfo.propTypes = {
  consumption: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ConsumptionInfo({ open, onClose, consumption }) {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.MeterReadDetail',
        value: 'meterRead',
        subject: 'METER_READ_DETAIL',
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
      case 'meterRead':
        return (
          <MeterReadList meterReadId={consumption.id} meterRead={consumption} />
        );
      case 'activity':
        return (
          <ActivityList
            objectId={consumption.id}
            relationType="ACTIVITY_METER_READ"
          />
        );
      case 'journal':
        return (
          <JournalList objectId={consumption.id} objectType={'METER_READ'} />
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
      <Can I="READ" a={'METER_READ'} ability={ability} passThrough>
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
                <Grid item sm={6} md={6} lg={8}>
                  {consumption && (
                    <ConsumptionDetail consumption={consumption} />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  {consumption && <MeterReadChart meterRead={consumption} />}
                </Grid>
              </Grid>
              <Card>
                {consumption && filteredItems.length > 0 && (
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

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
import { EventDetail } from '.';
import { TableTabs } from 'src/components/table';
import { useMemo, useState } from 'react';
import { JournalList } from 'src/sections/@dashboard/event/item';
import { ActivityRelationsChart } from '../../chart/item';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

EventInfo.propTypes = {
  event: PropTypes.object,
  activity: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function EventInfo({ open, onClose, event, activity }) {
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
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
      case 'journal':
        return <JournalList objectId={event.id} objectType="EVENT" />;
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      style={{ borderRadius: 0 }}
      variant="scrollable"
      scrollbuttons="auto"
    >
      <Can I="READ" a={'EVENT'} ability={ability} passThrough>
        {(allowed) =>
          allowed ? (
            <Container sx={{ py: 2, px: 0 }}>
              <Grid
                container
                spacing={1}
                columns={{ xs: 4, sm: 12, md: 12 }}
                paddingBottom={3}
                paddingTop={3}
                paddingLeft={3}
                paddingRight={3}
                style={{ display: 'flex', alignItems: 'stretch' }}
              >
                <Grid
                  item
                  sm={6}
                  md={7}
                  lg={8}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {event && <EventDetail event={event} activity={activity} />}
                </Grid>
                <Grid
                  item
                  sm={6}
                  md={5}
                  lg={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                  }}
                >
                  {activity && <ActivityRelationsChart activity={activity} />}
                </Grid>
              </Grid>
              <Card>
                {event && filteredItems.length > 0 && (
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

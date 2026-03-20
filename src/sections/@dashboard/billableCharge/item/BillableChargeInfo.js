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
import { BillableChargeDetail } from '.';
import { TableTabs } from 'src/components/table';
import { useMemo, useState } from 'react';
import { JournalList } from 'src/sections/@dashboard/event/item';
import useSettings from 'src/hooks/useSettings';
import { ActivityList } from '../../activity/item';
import { ArticleList } from '../../ArticleList';
import BillableChargeChart from './BillableChargeChart';
import FallBacks from 'src/components/fallbacks';

//Permissions
// eslint-disable-next-line import/no-extraneous-dependencies
import { Can } from '@casl/react';
import abilityManager from 'src/permissions/ability';

// ----------------------------------------------------------------------

BillableChargeInfo.propTypes = {
  billableCharge: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function BillableChargeInfo({ open, onClose, billableCharge }) {
  const { themeStretch } = useSettings();
  const ability = abilityManager.getAbility();

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.ArticleList',
        value: 'article',
        subject: 'ARTICLE',
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
      case 'article':
        return <ArticleList billableChargeId={billableCharge.id} />;
      case 'activity':
        return (
          <ActivityList
            objectId={billableCharge.id}
            relationType="ACTIVITY_BILLABLE_CHARGE"
          />
        );
      case 'journal':
        return (
          <JournalList
            objectId={billableCharge.id}
            objectType={'BILLABLE_CHARGE'}
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
      <Can I="READ" a={'BILLABLE_CHARGE'} ability={ability} passThrough>
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
                  {billableCharge && (
                    <BillableChargeDetail billableCharge={billableCharge} />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={8}>
                  {billableCharge && (
                    <BillableChargeChart billableCharge={billableCharge} />
                  )}
                </Grid>
              </Grid>
              <Card>
                {billableCharge && filteredItems.length > 0 && (
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

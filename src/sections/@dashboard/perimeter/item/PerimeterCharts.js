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

import { Box, Card, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { TableTabs } from 'src/components/table';
import ActivitiesTimeLines from '../../chart/item/ActivitiesTimelinesChart';
import useSettings from '../../../../hooks/useSettings';

//Permissions
import abilityManager from 'src/permissions/ability';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ContractChart.propTypes = {
  perimeter: PropTypes.object,
};
export default function ContractChart({ perimeter }) {
  const { themeStretch } = useSettings();
  const openTable = (value) => {
    setCurrentTable(value);
  };

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.Events',
        value: 'events',
        subject: 'EVENT',
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
  const renderTable = () => {
    switch (currentTable) {
      case 'events':
        return (
          <ActivitiesTimeLines
            objectId={perimeter.id}
            relationType={'ACTIVITY_PERIMETER'}
          />
        );
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'lg'} sx={{ height: '100%' }}>
      {perimeter && filteredItems.length > 0 && (
        <Card sx={{ height: '100%' }}>
          <TableTabs
            items={filteredItems}
            defaultValue={filteredItems[0]?.value || ''}
            onChange={openTable}
            sx={{ pt: 5, px: 5 }}
          />
          <Box sx={{ height: '100%' }}>{renderTable()}</Box>
        </Card>
      )}
    </Container>
  );
}

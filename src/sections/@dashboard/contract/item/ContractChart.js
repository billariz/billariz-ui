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

import { Card, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { TableTabs } from 'src/components/table';
import ActivitiesTimeLines from '../../chart/item/ActivitiesTimelinesChart';

//Permissions
import abilityManager from 'src/permissions/ability';
import ChartCard from 'src/components/chart/chart';
import { getContractChart } from 'src/redux/slices/contract';

//Hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
import { useMemo, useState } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ContractChart.propTypes = {
  contract: PropTypes.object,
  chart: PropTypes.object,
};
export default function ContractChart({ contract, chart }) {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const openTable = (value) => {
    setCurrentTable(value);
  };

  const items = useMemo(
    () => [
      {
        label: 'TableTabs.Consumptions',
        value: 'consumptions',
        subject: 'METER_READ',
      },
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
      case 'consumptions':
        return (
          <ChartCard
            key={chart?.title}
            chart={chart}
            title={translate(
              `param_${chart?.meta?.titleTranslationKey}.${chart?.title}`
            )}
            dispatchChartAction={getContractChart}
            objectId={contract?.id}
          />
        );
      case 'events':
        return (
          <ActivitiesTimeLines
            objectId={contract.id}
            relationType={'ACTIVITY_CONTRACT'}
          />
        );
      default:
        return <div>NOT_IMPLEMENTED</div>;
    }
  };

  return (
    <Container sx={{ height: '100%' }} maxWidth={themeStretch ? false : 'lg'}>
      {contract && filteredItems.length > 0 && (
        <Card sx={{ height: '100%' }}>
          <TableTabs
            items={filteredItems}
            defaultValue={filteredItems[0]?.value || ''}
            onChange={openTable}
          />
          {renderTable()}
        </Card>
      )}
    </Container>
  );
}

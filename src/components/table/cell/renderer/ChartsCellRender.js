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

import { TableCell, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
//
import useLocales from "src/hooks/useLocales";
import ChartAnalytic from '../../../ChartAnalytic';


ChartsCellRenderer.propTypes = {
  row: PropTypes.object.isRequired,
  cellConfig: PropTypes.object,
};
export default function ChartsCellRenderer({row, cellConfig }) {
  const theme = useTheme();
  const { translate } = useLocales();
  const data = row.billOverview;
  let idx;
  let item;

  function sumColumn(array, columnName) {
    return array.reduce((accumulator, currentObject) => accumulator + currentObject[columnName], 0);
  }

  function getThematic() {

    switch (cellConfig.type) {
      case 'contract':
        return (<ChartAnalytic
          key={row.id}
          total={row.contractCount}
          percent={100}
          icon="ic:round-article"
          color={theme.palette.info.main}
          small
        />);
      case 'validated':
        idx = data.findIndex((input => input.status === 'VALIDATED'));
        item=idx===-1 ? null: data[idx];
        return (<ChartAnalytic
        key={item ? item.id_unique:2}
        total={item ? item.totalCount:0}
        percent={item ? item.totalCount/sumColumn(data, 'totalCount')*100:0}
        price={item ? item.totalAmount:null}
        priceVated={null}
        totalAll={item ? sumColumn(data, 'totalCount'):null}
        icon={"eva:clock-fill"}
        color={theme.palette.success.main}
        item={translate('Bill.Bills')}
        small
      />);
      case 'error':
        idx = data.findIndex((input => input.status === 'IN_FAILURE'));
        item=idx ? data[idx]:null
        return (<ChartAnalytic
          key={item ? item.id_unique:1}
          total={item ? item.totalCount:0}
          percent={item ? item.totalCount/sumColumn(data, 'totalCount')*100:0}
          price={item ? item.totalAmount:null}
          priceVated={item ? item.totalAmountVated:null}
          totalAll={item ? sumColumn(data, 'totalCount'):null}
          icon={"eva:bell-fill"}
          color={theme.palette.error.main}
          item={translate('Bill.Bills')}
          small
        />);
      default:
        return null;
    }
  }
  return (
    <TableCell>
    {getThematic()
    }
    </TableCell>
  );
}

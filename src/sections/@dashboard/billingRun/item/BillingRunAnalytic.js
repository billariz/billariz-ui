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
import { Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useLocales from "src/hooks/useLocales";
import ChartAnalytic from '../../../../components/ChartAnalytic';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

BillingRunAnalytic.propTypes = {
  data: PropTypes.array,
  contractCount: PropTypes.number,
};

export default function BillingRunAnalytic({ data, contractCount }) {
const { translate } = useLocales();
  const theme = useTheme();

  function sumColumn(array, columnName) {
    return array.reduce((accumulator, currentObject) => accumulator + currentObject[columnName], 0);
  }

  function getThematic(item) {

    switch (item.status) {
      case 'VALIDATED':
        return (<ChartAnalytic
        key={item.id_unique}
        title={translate(item.status)}
        total={item.totalCount}
        percent={item.totalCount/sumColumn(data, 'totalCount')*100}
        price={item.totalAmount}
        priceVated={item.totalAmountVated}
        totalAll={sumColumn(data, 'totalCount')}
        icon={"eva:clock-fill"}
        color={theme.palette.success.main}
        item={translate('Bill.Bills')}
      />);
      case 'DRAFT':
      case 'CANCELED':
        return (<ChartAnalytic
        key={item.id_unique}
        title={translate(item.status)}
        total={item.totalCount}
        percent={item.totalCount/sumColumn(data, 'totalCount')*100}
        price={item.totalAmount}
        priceVated={item.totalAmountVated}
        totalAll={sumColumn(data, 'totalCount')}
        icon={"eva:clock-fill"}
        color={theme.palette.error.main}
        item={translate('Bill.Bills')}
      />);
      case 'PRINTED':
        return (<ChartAnalytic
          key={item.id_unique}
          title={translate(item.status)}
          total={item.totalCount}
          percent={item.totalCount/sumColumn(data, 'totalCount')*100}
          price={item.totalAmount}
          priceVated={item.totalAmountVated}
          totalAll={sumColumn(data, 'totalCount')}
          icon={"eva:clock-fill"}
          color={theme.palette.info.main}
          item={translate('Bill.Bills')}
        />);
      case 'COMPUTED':
        return (<ChartAnalytic
          key={item.id_unique}
          title={translate(item.status)}
          total={item.totalCount}
          percent={item.totalCount/sumColumn(data, 'totalCount')*100}
          price={item.totalAmount}
          priceVated={item.totalAmountVated}
          totalAll={sumColumn(data, 'totalCount')}
          icon={"eva:clock-fill"}
          color={theme.palette.warning.main}
          item={translate('Bill.Bills')}
        />);
      case 'IN_FAILURE':
        return (<ChartAnalytic
          key={item.id_unique}
          title={translate(item.status)}
          total={item.totalCount}
          percent={item.totalCount/sumColumn(data, 'totalCount')*100}
          price={item.totalAmount}
          priceVated={item.totalAmountVated}
          totalAll={sumColumn(data, 'totalCount')}
          icon={"eva:bell-fill"}
          color={theme.palette.error.main}
          item={translate('Bill.Bills')}
        />);
      default:
        return (<ChartAnalytic
          key={item.id_unique}
          title={translate(item.status)}
          total={item.totalCount}
          percent={item.totalCount/sumColumn(data, 'totalCount')*100}
          price={item.totalAmount}
          priceVated={item.totalAmountVated}
          totalAll={sumColumn(data, 'totalCount')}
          icon={"eva:clock-fill"}
          color={theme.palette.error.main}
          item={translate('Bill.Bills')}
        />);
    }
  }

  return (
    <Scrollbar>
          {data && 
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <ChartAnalytic
                key={1}
                title={translate('Contract.Contracts')}
                total={contractCount}
                percent={100}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              {data.map((item) => (
                getThematic(item)
              ))}
            </Stack>
            }
          </Scrollbar>
  );
}

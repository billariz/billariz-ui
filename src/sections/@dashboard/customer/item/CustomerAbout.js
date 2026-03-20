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
import { Box, Card, Grid } from '@mui/material';
import CUSTOMERS_CONFIG from 'src/constants/customers';

// components
import BoxInfos from 'src/components/BoxInfos';
import Toolbar from 'src/components/view/Toolbar';
import EntityViewHeader from 'src/components/view/EntityViewHeader';

//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//Hooks
import { useSelector } from 'react-redux';
import useLocales from 'src/hooks/useLocales';

//Redux
import { dispatchCustomerEvent, resetEvent } from 'src/redux/slices/customer';

//Utils
import { FormatDateOrDefault } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

CustomerAbout.propTypes = {
  customer: PropTypes.object,
};
const configBox = CUSTOMERS_CONFIG.FORMS;

export default function CustomerAbout({ customer }) {
  const { currentEvent } = useSelector((state) => state.customers);

  const { translate } = useLocales();

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="customer"
          entity={customer}
          horizontalItems={[
            translate('param_customerType.' + customer.type),
            translate('param_customerCategory.' + customer.category),
            translate('param_language.' + customer.languageCode),
          ]}
          verticalItems={[
            {
              icon: (
                <CalendarMonthIcon
                  alt="date creation"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                customer.creationDate,
                translate,
                'date'
              ),
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos config={configBox} values={customer} />
          </Grid>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Toolbar
              entity={customer}
              dispatchEntityAction={dispatchCustomerEvent}
              resetEvent={resetEvent}
              form={configBox}
              currentEvent={currentEvent}
              subject="CUSTOMER"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

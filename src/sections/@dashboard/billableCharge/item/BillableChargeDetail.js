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

import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Grid } from '@mui/material';
// components
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import BoxInfos from 'src/components/BoxInfos';
import Toolbar from 'src/components/view/Toolbar';

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

//Icons
import TodayIcon from '@mui/icons-material/Today';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BILLABLE_CHARGE_CONFIG from 'src/constants/billableCharge';

//Utils
import { FormatDateOrDefault } from 'src/utils/formatTime';

//Actions
import {
  dispatchBillableChargeAction,
  resetEvent,
} from 'src/redux/slices/billableCharge';

BillableChargeDetail.propTypes = {
  billableCharge: PropTypes.object,
};

const configBox = BILLABLE_CHARGE_CONFIG.getConfig().FORMS;
const form = configBox.BILLABLE_CHARGE_ABOUT;

export default function BillableChargeDetail({ billableCharge }) {
  const { currentEvent } = useSelector((state) => state.billableCharges);

  const { translate } = useLocales();

  if (!billableCharge) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="billableCharge"
          entity={billableCharge}
          horizontalItems={[
            translate('param_meterReadType.' + billableCharge.type),
            translate('param_billableChargeContext.' + billableCharge.context),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="billable Charge start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                billableCharge.startDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="billable Charge end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                billableCharge.endDate,
                translate,
                'date'
              ),
              color: 'error',
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos config={configBox} values={billableCharge} />
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
              entity={billableCharge}
              dispatchEntityAction={dispatchBillableChargeAction}
              resetEvent={resetEvent}
              form={form}
              currentEvent={currentEvent}
              subject="BILLABLE_CHARGE"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

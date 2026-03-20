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
import CONSUMPTION_CONFIG from 'src/constants/consumption';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

//Components
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';
import EntityViewHeader from 'src/components/view/EntityViewHeader';

//Icons
import TodayIcon from '@mui/icons-material/Today';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

//Actions
import {
  dispatchConsumptionAction,
  resetEvent,
} from 'src/redux/slices/consumption';

ConsumptionDetail.propTypes = {
  consumption: PropTypes.object,
};

const configBox = CONSUMPTION_CONFIG.getConfig().FORMS;
const form = CONSUMPTION_CONFIG.getConfig().FORMS.CONSUMPTION_ABOUT;

export default function ConsumptionDetail({ consumption }) {
  const { currentEvent } = useSelector((state) => state.consumptions);

  const { translate } = useLocales();

  if (!consumption) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="meterRead"
          entity={consumption}
          horizontalItems={[
            translate('param_meterReadType.' + consumption.type),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="consumption start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                consumption.startDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="consumption end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              color: 'error',
              text: FormatDateOrDefault(consumption.endDate, translate, 'date'),
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos config={configBox} values={consumption} />
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
              entity={consumption}
              dispatchEntityAction={dispatchConsumptionAction}
              resetEvent={resetEvent}
              form={form}
              currentEvent={currentEvent}
              subject="METER_READ"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

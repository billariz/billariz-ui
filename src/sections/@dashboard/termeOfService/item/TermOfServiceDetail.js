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

// components
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Redux
import {
  dispatchTermOfServiceAction,
  resetEvent,
} from 'src/redux/slices/termeOfService';

//Consts
import TERME_OF_SERVICES_CONFIG from 'src/constants/termeOfServices';

//Hooks
import { useSelector } from 'react-redux';
import useLocales from 'src/hooks/useLocales';

//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// ----------------------------------------------------------------------

const configBoxTos = TERME_OF_SERVICES_CONFIG.FORMS;

TermOfServiceDetail.propTypes = {
  termeOfService: PropTypes.object.isRequired,
};

export default function TermOfServiceDetail({ termeOfService }) {
  const { currentEvent } = useSelector((state) => state.termeOfServices);

  const { translate } = useLocales();
  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          type="termOfService"
          entity={termeOfService}
          horizontalItems={[
            translate(
              'param_termOfServiceCategory.' + termeOfService?.tosType?.category
            ),
            translate(
              'param_termOfServiceSubCategory.' +
                termeOfService?.tosType?.subCategory
            ),
          ]}
          verticalItems={[
            {
              icon: (
                <CalendarMonthIcon
                  alt="TermeOfService start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                termeOfService.startDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="termeOfService end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                termeOfService.endDate,
                translate,
                'date'
              ),
              color: 'error',
            },
          ]}
        />
        <Grid item xs={12} sm={12} sx={{ mb: 0, spacing: 1, direction: 'row' }}>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ mb: 1, spacing: 1, direction: 'row' }}
          >
            <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
              <BoxInfos config={configBoxTos} values={termeOfService} />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Toolbar
                  entity={termeOfService}
                  dispatchEntityAction={dispatchTermOfServiceAction}
                  resetEvent={resetEvent}
                  form={configBoxTos}
                  currentEvent={currentEvent}
                  subject="TERM_OF_SERVICE"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

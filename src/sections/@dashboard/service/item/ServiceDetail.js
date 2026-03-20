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

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

//Actions
import { dispatchServiceAction, resetEvent } from 'src/redux/slices/service';

import SERVICES_CONFIG from 'src/constants/services';

// ----------------------------------------------------------------------

const configBoxService = SERVICES_CONFIG.FORMS;

ServiceDetail.propTypes = {
  service: PropTypes.object,
};

export default function ServiceDetail({ service }) {
  const { currentEvent } = useSelector((state) => state.services);

  const { translate } = useLocales();

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          type="service"
          entity={service}
          horizontalItems={[
            translate(
              'param_serviceCategory.' + service?.serviceType?.category
            ),
            translate(
              'param_serviceSubCategory.' + service?.serviceType?.subCategory
            ),
          ]}
          verticalItems={[
            {
              icon: (
                <CalendarMonthIcon
                  alt="Service start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(service.startDate, translate, 'date'),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="service end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(service.endDate, translate, 'date'),
              color: 'error',
            },
          ]}
        />
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos config={configBoxService} values={service} />
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
                entity={service}
                dispatchEntityAction={dispatchServiceAction}
                resetEvent={resetEvent}
                form={configBoxService}
                currentEvent={currentEvent}
                subject="SERVICE"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

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

//Consts
import SERVICE_ELEMENTS_CONFIG from 'src/constants/serviceElement';

// components
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';

//Actions
import {
  dispatchServiceElementAction,
  resetEvent,
} from 'src/redux/slices/serviceElement';

//Hooks
import { useSelector } from 'react-redux';
import useLocales from 'src/hooks/useLocales';

//Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

const configBoxServiceElement = SERVICE_ELEMENTS_CONFIG.FORMS;

ServiceElementDetail.propTypes = {
  serviceElement: PropTypes.object,
};

export default function ServiceElementDetail({ serviceElement }) {
  const { currentEvent } = useSelector((state) => state.serviceElements);

  const { translate } = useLocales();

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          type="serviceElement"
          entity={serviceElement}
          horizontalItems={[
            translate(
              'param_serviceElementCategory.' + serviceElement.category
            ),
            translate(
              'param_serviceElementSubCategory.' + serviceElement.subCategory
            ),
          ]}
          verticalItems={[
            {
              icon: (
                <CalendarMonthIcon
                  alt="perimeter start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                serviceElement.startDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="perimeter end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                serviceElement.endDate,
                translate,
                'date'
              ),
              color: 'error',
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <BoxInfos
              config={configBoxServiceElement}
              values={serviceElement}
            />
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
                entity={serviceElement}
                dispatchEntityAction={dispatchServiceElementAction}
                resetEvent={resetEvent}
                form={configBoxServiceElement}
                currentEvent={currentEvent}
                subject="SERVICE_ELEMENT"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

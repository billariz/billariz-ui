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
import Toolbar from 'src/components/view/Toolbar';
import EntityViewHeader from 'src/components/view/EntityViewHeader';

//hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

//icons
import BoxInfos from 'src/components/BoxInfos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

//utils
import { FormatDateOrDefault } from 'src/utils/formatTime';

//
import PERIMETERS_CONFIG from 'src/constants/perimeters';
import {
  dispatchPerimeterAction,
  resetEvent,
} from 'src/redux/slices/perimeter';

// ----------------------------------------------------------------------

const configBoxPerimeter = PERIMETERS_CONFIG.FORMS;

// ----------------------------------------------------------------------

PerimeterDetail.propTypes = {
  perimeter: PropTypes.object.isRequired,
};

export default function PerimeterDetail({ perimeter }) {
  const { currentEvent } = useSelector((state) => state.perimeters);

  const { translate, translateBackend } = useLocales();

  if (!perimeter) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="perimeter"
          entity={perimeter}
          horizontalItems={[translateBackend(perimeter.type)]}
          verticalItems={[
            {
              icon: (
                <CalendarMonthIcon
                  alt="perimeter start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(perimeter.startDate, translate, 'date'),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="perimeter end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              color: 'error',
              text: FormatDateOrDefault(perimeter.endDate, translate, 'date'),
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={configBoxPerimeter} values={perimeter} />
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
              entity={perimeter}
              dispatchEntityAction={dispatchPerimeterAction}
              resetEvent={resetEvent}
              form={configBoxPerimeter}
              currentEvent={currentEvent}
              subject="PERIMETER"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

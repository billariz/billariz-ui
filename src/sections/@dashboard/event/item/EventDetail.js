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
import { Card, Grid, Stack } from '@mui/material';

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

// components
import EventTopic from './EventTopic';
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Icons
import TodayIcon from '@mui/icons-material/Today';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import EVENTS_CONFIG from 'src/constants/events';

//Actions
import { dispatchEventAction, resetEvent } from 'src/redux/slices/event';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

EventDetail.propTypes = {
  event: PropTypes.object,
};
const configBox = EVENTS_CONFIG.FORMS;
export default function EventDetail({ event }) {
  const { currentEvent } = useSelector((state) => state.events);
  const { translate } = useLocales();
  if (!event) {
    return null;
  }

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          type="event"
          entity={event}
          horizontalItems={[
            translate('param_eventCategory.' + event?.type?.category),
            translate('param_eventSubCategory.' + event?.type?.subCategory),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="Event start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(event?.triggerDate, translate, 'date'),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="Event execution date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                event.executionDate,
                translate,
                'datetime'
              ),
              color: 'error',
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ pt: 2, mb: 2 }}>
          <Grid item xs={12} sm={12}>
            {event && <EventTopic event={event} />}
          </Grid>
          <Stack
            direction="row"
            sx={{ width: '100%', justifyContent: 'center', mt: 2 }}
          >
            <Toolbar
              entity={event}
              dispatchEntityAction={dispatchEventAction}
              resetEvent={resetEvent}
              form={configBox}
              currentEvent={currentEvent}
              subject="EVENT"
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

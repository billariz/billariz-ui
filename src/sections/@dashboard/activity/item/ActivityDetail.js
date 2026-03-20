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
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';
import ActivityTopic from './ActivityTopic';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Icons
import TodayIcon from '@mui/icons-material/Today';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import ACTIVITIES_CONFIG from 'src/constants/activities';

//Actions
import { dispatchActivityAction, resetEvent } from 'src/redux/slices/activity';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ActivityDetail.propTypes = {
  activity: PropTypes.object,
};
const form = ACTIVITIES_CONFIG.FORMS.ACTIVITY_ABOUT;
export default function ActivityDetail({ activity }) {
  const { currentEvent } = useSelector((state) => state.activities);

  const { translate } = useLocales();

  if (!activity) {
    return null;
  }

  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <EntityViewHeader
          type="activity"
          entity={activity}
          horizontalItems={[
            translate('param_activityCategory.' + activity.category),
            translate('param_activitySubCategory.' + activity.subCategory),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="Activity start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                activity.startDate,
                translate,
                'datetime'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="activity end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                activity.endDate,
                translate,
                'datetime'
              ),
              color: 'error',
            },
          ]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 4 }}>
            {activity && <ActivityTopic activity={activity} />}
          </Grid>
          <Stack
            direction="row"
            sx={{ width: '100%', justifyContent: 'center', mt: 2 }}
          >
            <Toolbar
              entity={activity}
              dispatchEntityAction={dispatchActivityAction}
              resetEvent={resetEvent}
              form={form}
              currentEvent={currentEvent}
              subject="ACTIVITY"
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

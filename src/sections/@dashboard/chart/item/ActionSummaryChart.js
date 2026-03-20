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
// eslint-disable-next-line import/no-extraneous-dependencies
import { keyframes } from '@mui/system';

import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Collapse,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import { findEventsApi } from 'src/api/events';
import TABLE_EVENTS_ENUMS from 'src/components/table/enums/TableEventsEnum';

//Redux
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';
import { dispatchEventAction, resetEvent } from 'src/redux/slices/event';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Icons
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RowingIcon from '@mui/icons-material/Rowing';

//Components
import { EventInfo } from '../../event/item';
import StatusLabel from 'src/components/entityStatusListner/EntityStatusRender';
import ActivityInfo from '../../activity/item/ActivityInfo';

//Hooks
import useToggle from 'src/hooks/useToggle';

import useLocales from 'src/hooks/useLocales';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTheme, styled } from '@mui/material/styles';

const gradientMove = keyframes`
  0% { background-position: 300% 0; }
  50% { background-position: 50% 0; }
  100% { background-position: -200% 0; }
`;

const AnimatedLinearProgress = styled(LinearProgress)(({ theme }) => ({
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(
      90deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 25%, 
      ${theme.palette.warning.main} 50%, 
      ${theme.palette.error.main} 75%, 
      ${theme.palette.primary.main} 100%
    )`,
    backgroundSize: '400% 100%', // Accentue la transition
    animation: `${gradientMove} 5s ease-in-out infinite`,
  },
}));

const getEvents = async (filters) => {
  try {
    const params = {
      page: 0,
      size: 10,
      ...Object.fromEntries(filters),
    };
    const apiResponse = await findEventsApi(params);
    const events = apiResponse._embedded?.events.map(
      (event) => new Object(event)
    );
    return events;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching events:', error);
    return [];
  }
};

ActionSummary.propTypes = {
  activity: PropTypes.object.isRequired,
  summaryEvents: PropTypes.array.isRequired,
  updateEvents: PropTypes.func.isRequired,
};

export default function ActionSummary({
  activity,
  summaryEvents,
  updateEvents,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { translateBackend, translate } = useLocales();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (activity?.id) {
      setFilters([['activityId', activity.id]]);
    }
  }, [activity?.id]);

  useEffect(() => {
    let isActive = true;
    if (filters.length > 0) {
      const fetchEvents = async () => {
        const fetchedEvents = await getEvents(filters);
        if (isActive) {
          updateEvents(fetchedEvents);
        }
      };
      fetchEvents();
    }
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const totalEvents = summaryEvents.length;
  const completedEvents = summaryEvents.filter(
    (e) => e.status === 'COMPLETED'
  ).length;
  const progress = (completedEvents / totalEvents) * 100;

  const updateFilters = (newFilter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const getProgressComponent = () => {
    if (activity.status === 'BLOCKED') {
      return (
        <LinearProgress
          variant="buffer"
          color="error"
          value={progress}
          valueBuffer={100}
          sx={{ width: '60%', mx: 1 }}
          align="right"
        />
      );
    }
    if (activity.status === 'IN_PROGRESS') {
      return (
        <AnimatedLinearProgress
          variant="determinate"
          color="primary"
          value={progress}
          sx={{ width: '60%', mx: 1 }}
          align="right"
        />
      );
    }
    return (
      <LinearProgress
        variant="determinate"
        color="success"
        value={progress}
        align="right"
        sx={{ width: '60%', mx: 1 }}
      />
    );
  };

  const {
    toggle: openFrom,
    onOpen: onOpenFrom,
    onClose: onCloseFrom,
  } = useToggle();

  const {
    toggle: openFromEvent,
    onOpen: onOpenFromEvent,
    onClose: onCloseFromEvent,
  } = useToggle();

  const [currentActivity, setCurrentActivity] = useState(null);
  const handleViewActivity = (currentActivity) => {
    setCurrentActivity(currentActivity);
    onOpenFrom();
  };

  const [currentEvent, setCurrentEvent] = useState(null);
  const handleViewEvent = (currentEvent) => {
    setCurrentEvent(currentEvent);
    onOpenFromEvent();
  };

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          paddingLeft: 1,
          paddingRight: 0,
          paddingBottom: 0,
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Les deux premiers éléments alignés à gauche */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '50%',
              flexShrink: 0,
              justifyContent: 'flex-start',
            }}
          >
            <Tooltip title={activity.id}>
              <IconButton
                sx={{ width: 30, height: 30, mr: 1 }}
                onClick={() => handleViewActivity(activity)}
              >
                <RowingIcon size="small" alt="activity" color="primary" />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" noWrap>
              {translateBackend(activity.activityType)}
            </Typography>
          </Box>

          {/* Les éléments alignés à droite */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '50%',
              flexShrink: 0,
              justifyContent: 'flex-end',
            }}
          >
            <Tooltip
              title={`${completedEvents}/${totalEvents} ` + translate('Steps')}
            >
              {getProgressComponent()}
            </Tooltip>
            <Box>
              <StatusLabel
                key={activity.id}
                entity={activity}
                entityType={'activity'}
              />
            </Box>
            <Box>
              <IconButton onClick={handleToggle} size="small">
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Contenu détaillé (visible uniquement si déplié) */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Stepper activeStep={completedEvents} alternativeLabel>
            {summaryEvents.map((event) => (
              <Step key={event?.id} sx={{ pl: 5.5 }}>
                <StepLabel
                  onDoubleClick={() => handleViewEvent(event)}
                  StepIconComponent={() =>
                    GetEventToolTip(event, updateFilters)
                  }
                  sx={{
                    textAlign: 'center',
                    width: 100,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="caption">
                    {translateBackend(event.type)}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Collapse>
      <ActivityInfo
        open={openFrom}
        onClose={onCloseFrom}
        activity={currentActivity}
      />
      <EventInfo
        open={openFromEvent}
        onClose={onCloseFromEvent}
        event={currentEvent}
        activity={currentActivity}
      />
    </Card>
  );
}

function GetEventToolTip(step, updateFilters) {
  const { translateBackend, translate } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentEvent } = useSelector((state) => state.events);

  const handleExecuteStep = (step) => {
    dispatch(startLoading());
    dispatch(
      dispatchEventAction(
        'edit',
        `${'{"status":"IN_PROGRESS", "executionMode":"AUTO"}'}`,
        step.id
      )
    );
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleSuspendStep = (step) => {
    dispatch(startLoading());
    dispatch(
      dispatchEventAction('edit', `${'{"status":"SUSPENDED"}'}`, step.id)
    );
  };

  useEffect(() => {
    if (!currentEvent?.name) return;

    const handleSuccess = (message) => {
      dispatch(finishLoading());
      enqueueSnackbar(translate(message), { variant: 'success' });
      updateFilters(['activityId', step.activityId]);
    };

    const handleError = () => {
      dispatch(finishLoading());
    };

    switch (currentEvent.name) {
      case TABLE_EVENTS_ENUMS.ROW_ADDED:
        handleSuccess('Utilities.addSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_UPDATED:
      case TABLE_EVENTS_ENUMS.ROW_DELETED:
        handleSuccess('Utilities.updateSuccess');
        break;

      case TABLE_EVENTS_ENUMS.ROW_ADD_ERROR:
      case TABLE_EVENTS_ENUMS.ROW_UPDATE_ERROR:
      case TABLE_EVENTS_ENUMS.ROW_DELETE_ERROR:
        handleError();
        break;

      default:
        break;
    }

    dispatch(resetEvent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvent]);

  const renderTooltipContent = () => (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'block' }}>
        {translateBackend(step.type)}
      </Typography>
      <Divider />
      {step?.userHolder?.picture && (
        <Box>
          <Box>
            <Avatar
              src={step?.userHolder?.picture}
              sx={{ ml: 12, width: 24, height: 24 }}
            />
          </Box>
          <Box>{step?.userHolder?.userName}</Box>
        </Box>
      )}
      <Divider />
      <Typography
        variant="body2"
        sx={{ textAlign: 'left', fontWeight: 'bold', display: 'block' }}
      >
        {'Id: ' + step.id}
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'left', fontWeight: 'bold', display: 'block' }}
      >
        {`${translate('Event.TableHeader.status')}:  ${translate('param_eventStatus.' + step.status)}`}
      </Typography>
      {step.journal && (
        <Typography
          variant="body2"
          sx={{
            color: 'rosybrown',
            textAlign: 'left',
            fontWeight: 'bold',
            display: 'block',
          }}
        >
          {`${translate('Journal.TableHeader.messageCode')}:   ${step.journal?.comment}`}
        </Typography>
      )}
      {step.journal && (
        <Typography variant="body2" sx={{ textAlign: 'left' }}>
          {`${translate('Journal.TableHeader.messages')}:  ${step.journal?.messages}`}
        </Typography>
      )}
      {step.journal && (
        <Typography
          variant="body2"
          sx={{ textAlign: 'left', fontWeight: 'bold', color: 'rosybrown' }}
        >
          {`${translate('User.TableHeader.User')}:  ${step.journal?.userName}`}
        </Typography>
      )}
      <Divider />
      <Typography variant="body2" sx={{ textAlign: 'left' }}>
        {`${translate('Event.TableHeader.executionMode')}: ${translate('param_eventExecutionMode.' + step.executionMode)}`}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'left' }}>
        {`${translate('Event.TableHeader.triggerDate')}: ${FormatDateOrDefault(step.triggerDate, translate, 'date')}`}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'left' }}>
        {`${translate('Event.TableHeader.executionDate')}: ${FormatDateOrDefault(step.executionDate, translate, 'datetime')}`}
      </Typography>
      <Divider />
      {step.triggerDate &&
        new Date(step.triggerDate) <= new Date() &&
        step.status != 'IN_PROGRESS' &&
        step.status != 'COMPLETED' && (
          <IconButton
            size="small"
            onClick={() => handleExecuteStep(step)}
            sx={{ marginLeft: 1 }}
            ariant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          >
            <PlayCircleFilledIcon
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              fontSize="medium"
            />
          </IconButton>
        )}
      {step.status &&
        step.status != 'IN_PROGRESS' &&
        step.status != 'COMPLETED' &&
        step.status != 'SUSPENDED' && (
          <IconButton
            size="small"
            onClick={() => handleSuspendStep(step)}
            sx={{ marginLeft: 1 }}
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          >
            <StopCircleIcon
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              fontSize="medium"
            />
          </IconButton>
        )}
    </div>
  );
  return (
    <Tooltip title={renderTooltipContent()} arrow placement="top">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StatusLabel
          key={step.id}
          entity={step}
          entityType={'event'}
          iconMode={true}
        />
      </div>
    </Tooltip>
  );
}

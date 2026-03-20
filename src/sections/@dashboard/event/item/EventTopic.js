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
import {
  Collapse,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Tooltip,
} from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EVENTS_CONFIG from 'src/constants/events';

//Components
import BoxInfos from 'src/components/BoxInfos';

//Hooks
import { useState } from 'react';
import useLocales from 'src/hooks/useLocales';

EventTopic.propTypes = {
  event: PropTypes.object,
};

const configBox = EVENTS_CONFIG.FORMS;
export default function EventTopic({ event }) {
  const { translateBackend } = useLocales();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!event) return;

  // eslint-disable-next-line consistent-return
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          paddingBottom: 0,
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'right', flexGrow: 1 }}>
            <Tooltip title={event?.userHolder?.userName}>
              <Avatar src={event?.userHolder?.picture} />
            </Tooltip>
            <Typography sx={{ ml: 2, mt: 1 }}>
              {translateBackend(event.type)}
            </Typography>
          </Box>
          {expanded ? (
            <ExpandLess sx={{ ml: 2, mt: 1 }} onClick={handleExpandClick} />
          ) : (
            <ExpandMore sx={{ ml: 2, mt: 1 }} onClick={handleExpandClick} />
          )}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <BoxInfos config={configBox} values={event} />
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
}

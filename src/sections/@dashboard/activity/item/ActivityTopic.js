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
import ACTIVITIES_CONFIG from 'src/constants/activities';

//Components
import BoxInfos from 'src/components/BoxInfos';

//Hooks
import { useState } from 'react';
import useLocales from 'src/hooks/useLocales';

ActivityTopic.propTypes = {
  activity: PropTypes.object,
};

const configBox = ACTIVITIES_CONFIG.FORMS;
export default function ActivityTopic({ activity }) {
  const { translateBackend } = useLocales();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!activity) return;

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
            <Tooltip title={activity?.createdByUser?.userName}>
              <Avatar src={activity?.createdByUser?.picture} />
            </Tooltip>
            <Typography sx={{ ml: 2, mt: 1 }} noWrap>
              {translateBackend(activity.activityType)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              justifyContent: 'flex-end',
            }}
          >
            {expanded ? (
              <ExpandLess sx={{ ml: 2, mt: 1 }} onClick={handleExpandClick} />
            ) : (
              <ExpandMore sx={{ ml: 2, mt: 1 }} onClick={handleExpandClick} />
            )}
          </Box>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <BoxInfos config={configBox} values={activity} />
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
}

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
import { CircularProgress, useTheme, Stack, Tooltip } from '@mui/material';
import { getColors } from 'src/utils/getColors';
import useLocales from 'src/hooks/useLocales';
import getEntityStatusApi from 'src/api/entityStatus/getEntityStatus';
import Label from 'src/components/Label';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorIcon from '@mui/icons-material/Error';
import CircleIcon from '@mui/icons-material/Circle';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from '@tanstack/react-query';

// Function to return the correct icon based on status
const getEventIcon = (status) => {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircleIcon style={{ color: 'green' }} />;
    case 'PENDING':
      return <PendingActionsIcon style={{ color: 'orange' }} />;
    case 'IN_PROGRESS':
      return <CircularProgress style={{ color: 'blue' }} size={25} />;
    case 'IN_FAILURE':
      return <ErrorIcon style={{ color: 'red' }} />;
    default:
      return <CircleIcon style={{ color: 'gray' }} />;
  }
};

const StatusLabel = ({
  Component = 'div',
  row,
  cellConfig,
  entity,
  entityType,
  iconMode,
  isVisible = true,
}) => {
  // Dynamic prop handling
  if (row) entity = row;
  if (cellConfig) entityType = cellConfig[0]?.type;
  const translParam = cellConfig ? cellConfig[0]?.translParam : null;
  const theme = useTheme();
  const { translate } = useLocales();
  // Fetch entity status using React Query
  const { data: status = entity.status, isFetching } = useQuery({
    queryKey: ['entityStatus', entity?.id, entityType, entity.status],
    queryFn: () =>
      entity?.id ? getEntityStatusApi(entity.id, entityType) : 'Unknown',
    enabled:
      !!entity?.id && !!isVisible && entity.status?.includes('IN_PROGRESS'),
    refetchInterval: 5000,
    staleTime: 0, // Always fetch fresh data
  });

  return (
    <Component>
      {isVisible && !iconMode && (
        <Tooltip
          sx={{ color: 'red' }}
          title={
            entity.journal &&
            `${entity.journal.comment} / ${entity.journal.messages}`
          }
          arrow
          placement="top"
        >
          <Stack sx={{ paddingTop: cellConfig ? 3 : 0 }} direction="row">
            <Label
              variant={theme.palette.mode === 'light' ? 'filled' : 'outlined'}
              color={getColors(status)}
              sx={{ textTransform: 'uppercase', px: 1 }}
            >
              <div>
                {translate(
                  translParam
                    ? `param_${translParam}.${status}`
                    : `param_${entityType}Status.${status}`
                )}
              </div>
              {(isFetching || status?.includes('IN_PROGRESS')) && (
                <div>
                  <CircularProgress
                    sx={{ mt: 0.5, ml: 0.4 }}
                    color="inherit"
                    size={14}
                  />
                </div>
              )}
            </Label>
          </Stack>
        </Tooltip>
      )}
      {isVisible && iconMode && getEventIcon(status)}
    </Component>
  );
};

StatusLabel.propTypes = {
  Component: PropTypes.string,
  entity: PropTypes.object,
  entityType: PropTypes.string,
  row: PropTypes.object,
  iconMode: PropTypes.bool,
  cellConfig: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      translParam: PropTypes.string,
    })
  ),
  isVisible: PropTypes.bool,
};

export default StatusLabel;

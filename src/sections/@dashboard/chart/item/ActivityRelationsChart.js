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
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Typography } from '@mui/material';
// utils

import { FormatDateOrDefault } from '../../../../utils/formatTime';
import useLocales from 'src/hooks/useLocales';
import { renderIcon } from 'src/utils/renderIcon';
import Label from 'src/components/Label';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

ActivityRelation.propTypes = {
  activity: PropTypes.object,
};

export default function ActivityRelation({ activity }) {
  const theme = useTheme();
  const { translate } = useLocales();
  const relations = activity?.relations;
  function toCamelCase(input) {
    return input
      .toLowerCase()
      .split('_')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  }

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent sx={{ width: '100%' }}>
        {
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {relations.map((item) => (
              <ListItem key={item.id} item={item}>
                <ListItemAvatar>
                  <Avatar>{renderIcon(item)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <Label
                        variant={
                          theme.palette.mode === 'light' ? 'ghost' : 'filled'
                        }
                        color={'warning'}
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {translate(
                          'param_' + 'relationType' + '.' + item.relationType
                        )}
                      </Label>
                      {item.secondObject && (
                        <Label
                          variant={
                            theme.palette.mode === 'light' ? 'ghost' : 'filled'
                          }
                          color={'info'}
                        >
                          {(item.secondObject.reference ||
                            item.secondObject.id) +
                            ' / ' +
                            translate(
                              'param_' +
                                toCamelCase(item.secondObjectType) +
                                'Status' +
                                '.' +
                                item.secondObject.status
                            )}
                        </Label>
                      )}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      {item.secondObject.type && (
                        <Label
                          variant={
                            theme.palette.mode === 'light' ? 'ghost' : 'filled'
                          }
                          color={'info'}
                        >
                          {translate(
                            'param_' +
                              toCamelCase(item.secondObjectType) +
                              'Type' +
                              '.' +
                              item.secondObject.type
                          )}
                        </Label>
                      )}
                      {FormatDateOrDefault(
                        item.createdAt,
                        translate,
                        'datetime'
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        }
      </CardContent>
    </Card>
  );
}

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

import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { renderIcon } from 'src/utils/renderIcon';

RelationsCellRenderer.propTypes = {
  row: PropTypes.object.isRequired,
};
export default function RelationsCellRenderer({ row }) {
  const relations =
    typeof row.relations == 'function' ? row.relations() : row.relations;

  return (
    <td>
      <Stack width={100} direction="row" container="true" sx={{ mt: 2 }}>
        <Grid
          container
          justifyContent={relations?.length === 1 ? 'center' : 'flex-start'}
          alignItems="center"
        >
          {relations?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Stack direction="row" alignItems="center">
                <Grid direction="column" container sx={{ pb: 0 }}>
                  {renderIcon(item)}
                </Grid>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </td>
  );
}

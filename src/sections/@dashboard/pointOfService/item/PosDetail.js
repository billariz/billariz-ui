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
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';
import BoxInfos from 'src/components/BoxInfos';

//
import POS_CONFIG from 'src/constants/pos';

//Actions
import { dispatchPosAction, resetEvent } from 'src/redux/slices/pointOfService';

//Hooks
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

PosDetail.propTypes = {
  pos: PropTypes.object,
};

const configBoxPos = POS_CONFIG.FORMS;

export default function PosDetail({ pos }) {
  const { currentEvent } = useSelector((state) => state.pointOfServices);

  if (!pos) {
    return null;
  }
  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="pointOfService"
          entity={{ status: pos.deliveryStatus, ...pos }}
          horizontalItems={[]}
          verticalItems={[]}
        />

        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={configBoxPos} values={pos} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              mb: 2,
            }}
          >
            <Toolbar
              entity={pos}
              dispatchEntityAction={dispatchPosAction}
              resetEvent={resetEvent}
              form={configBoxPos}
              currentEvent={currentEvent}
              subject="POINT_OF_SERVICE"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

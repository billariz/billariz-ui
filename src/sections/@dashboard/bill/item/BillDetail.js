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
import BoxInfos from 'src/components/BoxInfos';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Hooks
import useLocales from 'src/hooks/useLocales';

//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TodayIcon from '@mui/icons-material/Today';
import BILLS_CONFIG from 'src/constants/bills';

// ----------------------------------------------------------------------

BillDetail.propTypes = {
  bill: PropTypes.object,
};

const configBox = BILLS_CONFIG.FORMS;
export default function BillDetail({ bill }) {
  const { translate } = useLocales();

  if (!bill) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="bill"
          entity={bill}
          horizontalItems={[
            translate('param_billNature.' + bill.nature),
            translate('param_billType.' + bill.type),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="bill start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(bill.startDate, translate, 'date'),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="bill end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(bill.endDate, translate, 'date'),
              color: 'error',
            },
          ]}
        />
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={configBox} values={bill} />

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              mb: 2,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Card>
  );
}

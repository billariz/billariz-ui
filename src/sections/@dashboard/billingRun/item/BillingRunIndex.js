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
import { Card, Grid } from '@mui/material';
// components
import BoxInfos from 'src/components/BoxInfos';
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import BillingRunToolBar from './BillingRunToolbar';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Hooks
import useLocales from 'src/hooks/useLocales';

//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TodayIcon from '@mui/icons-material/Today';

import BILLINGRUN_CONFIG from 'src/constants/billingRun';

// ----------------------------------------------------------------------

BillingRunIndex.propTypes = {
  billingRun: PropTypes.object.isRequired,
};

const configBox = BILLINGRUN_CONFIG.FORMS;

export default function BillingRunIndex({ billingRun }) {
  const { translate } = useLocales();

  if (!billingRun) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="billingRun"
          entity={billingRun}
          toolbar={<BillingRunToolBar billingRun={billingRun} />}
          horizontalItems={[translate('param_billType.' + billingRun.billType)]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="billing Run start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                billingRun.startDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="billing Run end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(billingRun.endDate, translate, 'date'),
              color: 'error',
            },
          ]}
        />
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={configBox} values={billingRun} />
        </Grid>
      </Grid>
    </Card>
  );
}

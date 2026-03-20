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
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

//Hooks
import useLocales from 'src/hooks/useLocales';
import InvoiceToolbar from './InvoiceToolbar';
import ActivitiesTimeLines from '../../chart/item/ActivitiesTimelinesChart';

// ----------------------------------------------------------------------

BillIndex.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function BillIndex({ invoice }) {
  const { translate } = useLocales();

  if (!invoice) {
    return null;
  }

  return (
    <Card sx={{ pt: 2 }}>
        <Grid container sx={{ px: 2 }}>
        <InvoiceToolbar invoice={invoice} />
        </Grid>
        <Grid container sx={{ pb: 1 }}>
        <ActivitiesTimeLines objectId={invoice.id} relationType='ACTIVITY_INVOICE' />
        </Grid>
        <Divider/>
        <Grid container sx={{ px: 1 }}>
        <CardContent
          sx={{
            pt: 1,
            width: 1,
            spacing: 0,
          }}
        >
          <Stack spacing={0}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {translate('Bill.SubTotal')}
              </Typography>
              <Typography variant="subtitle2">
                {invoice.totalWithoutVat}
              </Typography>
            </Stack>

            {invoice?.vatDetails?.map((e) => (
              <Stack
                key={e.id}
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 0.5 }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {translate('param_vatRate.' + e.vatRate)}
                </Typography>
                <Typography variant="subtitle2">
                  {e.totalVat}{' '}
                </Typography>
              </Stack>
            ))}

            <Divider sx={{ mt: 0.5 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 1 }}
            >
              <Typography variant="subtitle1">
                {translate('Bill.Total')}
              </Typography>

              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {invoice.totalAmount}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Grid>
    </Card>
  );
}

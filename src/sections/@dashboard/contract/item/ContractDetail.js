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
import BoxInfos from 'src/components/BoxInfos';
import EntityViewHeader from 'src/components/view/EntityViewHeader';
import Toolbar from 'src/components/view/Toolbar';

//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TodayIcon from '@mui/icons-material/Today';

//Hooks
import useLocales from 'src/hooks/useLocales';
import { useSelector } from 'react-redux';

//Utils
import { FormatDateOrDefault } from '../../../../utils/formatTime';

//Const
import CONTRACTS_CONFIG from 'src/constants/contracts';

//Redux
import { dispatchContractAction, resetEvent } from 'src/redux/slices/contract';

// ----------------------------------------------------------------------

ContractDetail.propTypes = {
  contract: PropTypes.object,
};
const configBoxContract = CONTRACTS_CONFIG.FORMS;

export default function ContractDetail({ contract }) {
  const { translate } = useLocales();
  const { currentEvent } = useSelector((state) => state.contracts);

  if (!contract) {
    return null;
  }

  return (
    <Card sx={{ pt: 2, px: 5 }}>
      <Grid container>
        <EntityViewHeader
          type="contract"
          entity={contract}
          horizontalItems={[
            translate('param_serviceCategory.' + contract.serviceCategory),
            translate(
              'param_serviceSubCategory.' + contract.serviceSubCategory
            ),
          ]}
          verticalItems={[
            {
              icon: (
                <TodayIcon
                  alt="contract start date"
                  color="primary"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                contract.contractualStartDate,
                translate,
                'date'
              ),
            },
            {
              icon: (
                <EventAvailableIcon
                  alt="contract end date"
                  color="error"
                  sx={{ fontSize: 20 }}
                />
              ),
              text: FormatDateOrDefault(
                contract.contractualEndDate,
                translate,
                'date'
              ),
              color: 'error',
            },
          ]}
        />
        <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
          <BoxInfos config={configBoxContract} values={contract} />

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
              entity={contract}
              dispatchEntityAction={dispatchContractAction}
              resetEvent={resetEvent}
              form={configBoxContract}
              currentEvent={currentEvent}
              subject="CONTRACT"
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

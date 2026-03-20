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

// @mui
import { styled } from '@mui/material/styles';
// components
import Page from 'src/components/Page';
import FallBacks from 'src/components/fallbacks';

// hooks
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const { translate } = useLocales();
  return (
    <Page title={translate('Error.404.title')} sx={{ height: 1 }}>
      <RootStyle>
        <FallBacks errorCode={404} />
      </RootStyle>
    </Page>
  );
}

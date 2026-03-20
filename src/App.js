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

import Router from './routes';
import ThemeProvider from './theme';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import LoadingOverlay from './components/loading-overlay';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/toast';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <MotionLazyContainer>
                <LoadingOverlay />
                <ProgressBarStyle />
                <ScrollToTop />
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <SnackbarUtilsConfigurator />
                  <Router />
                </SnackbarProvider>
              </MotionLazyContainer>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

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

import { useState } from 'react';

// components
import Footer from 'src/sections/auth/Footer';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import ResetPasswordForm from 'src/sections/auth/forgotPassword/ResetPasswordForm';
import SendCode from 'src/sections/auth/forgotPassword/sendCode';

import { Container, styled } from '@mui/material';
import useLocales from 'src/hooks/useLocales';

const RootStyle = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#07112b',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentWrapper = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const { translate } = useLocales();

  return (
    <Page title={translate('forgotPassword.forgotPassword')}>
      <RootStyle>
        <HeaderStyle>
          <Logo
            defaultColor="#E2F3FC"
            sx={{ ml: { xs: 8, lg: 0 }, mt: { xs: 1, lg: 0 } }}
          />
        </HeaderStyle>

        <ContentWrapper>
          <Container>
            <ContentStyle>
              {step === 1 && <SendCode setEmail={setEmail} setStep={setStep} />}
              {step === 2 && (
                <ResetPasswordForm email={email} setStep={setStep} />
              )}
            </ContentStyle>
          </Container>
        </ContentWrapper>
        <Footer />
      </RootStyle>
    </Page>
  );
}

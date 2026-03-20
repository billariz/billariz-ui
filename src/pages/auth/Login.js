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
import { Container } from '@mui/material';
// hooks
import { useState } from 'react';
import useLocales from 'src/hooks/useLocales';
// components
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
// sections
import { LoginForm } from 'src/sections/auth/login';
import { ResetPasswordForm } from 'src/sections/auth/resetPassword';
import Footer from 'src/sections/auth/Footer';

// ----------------------------------------------------------------------

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
  flex: 1, // Makes the content expand and push the footer down
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

// ----------------------------------------------------------------------

export default function Login() {
  const [type, setType] = useState('Connexion');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState();
  const { translate } = useLocales();

  return (
    <Page title={translate('login.connect')}>
      <RootStyle>
        <HeaderStyle>
          <Logo
            defaultColor="#E2F3FC"
            sx={{
              ml: { xs: type != 'Connexion' ? 8 : 0, lg: 0 },
              mt: { xs: type != 'Connexion' ? 1 : 0, lg: 0 },
            }}
          />
        </HeaderStyle>

        <ContentWrapper>
          <Container>
            <ContentStyle>
              {type === 'Connexion' ? (
                <LoginForm
                  setType={setType}
                  setEmail={setEmail}
                  setUser={setUser}
                />
              ) : (
                <ResetPasswordForm
                  email={email}
                  user={user}
                  setType={setType}
                />
              )}
            </ContentStyle>
          </Container>
        </ContentWrapper>
        <Footer />
      </RootStyle>
    </Page>
  );
}

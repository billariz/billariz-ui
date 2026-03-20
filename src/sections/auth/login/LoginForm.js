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

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

//Hooks
import { useAuth } from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { COGNITO_API } from 'src/config';
//Icons
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

Login.propTypes = {
  setType: PropTypes.func,
  setEmail: PropTypes.func,
  setUser: PropTypes.func,
};

function Login({ setType, setEmail, setUser }) {
  const { login } = useAuth();
  const location = useLocation();
  const idPloginError = location.state?.authError;
  const { translate } = useLocales();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  if(idPloginError) console.error('IdP login error:',idPloginError );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      stayConnected: false,
    },
  });

  const onSubmit = async (data) => {
    setIsError(false);
    const res = await login(data.email, data.password);
    if (res.message === 'newPasswordRequired') {
      setType('resetPassword');
      setEmail(data.email);
      setUser(res.user);
    } else if (res.message === 'userNotFound') {
      setIsError(true);
    }
  };

  // Fonction pour gérer la connexion avec Google
  const handleGoogleLogin = () => {
    setIsError(false);
    const domainPart = COGNITO_API.domain;
    const clientId = COGNITO_API.clientId;
    const redirectUri = COGNITO_API.redirectUri;
    const region = COGNITO_API.region;
    const responseType = 'code';
    const scope = 'openid+email+profile';
    const identityProvider = 'Google';
    const domain = `https://${domainPart}.auth.${region}.amazoncognito.com`;
    const url = `${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri)}&scope=${scope}&identity_provider=${identityProvider}`;
    console.log("url", url);
    window.location.href = url;
  };


  return (
    <Container maxWidth="lg">
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}
      <Box
        sx={{ mt: { xs: 5, lg: 10 } }}
        display="grid"
        gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
        gap={8}
      >
        <Box maxWidth={500} mx="auto">
          <Box mb={3}>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#D5ECF8"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: {
                  xs: '28px',
                  lg: '2.25rem',
                },
              }}
            >
              {translate('login.connect')}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: {
                  xs: '1rem',
                  lg: '1.125rem',
                },
                color: '#D5ECF8',
                mt: {
                  xs: '0.5rem',
                  lg: '0.75rem',
                },
              }}
            >
              {translate('login.description')}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translate('login.email')}
                  fullWidth
                  margin="normal"
                  error={!!errors.email || isError}
                  helperText={
                    errors.email ? translate('login.emailRequired') : ''
                  }
                  sx={{
                    input: {
                      color: '#D5ECF8',
                    },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translate('login.password')}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  error={!!errors.password || isError}
                  helperText={
                    errors.password
                      ? translate('login.passwordRequired')
                      : isError
                        ? translate('login.wrongPassword')
                        : ''
                  }
                  sx={{
                    input: {
                      color: '#D5ECF8',
                    },
                    backgroundColor: 'transparent',
                    '& label.Mui-focused': {
                      color: '#47b9f7', // when focused
                    },
                    '& label.MuiInputLabel-shrink': {
                      color: '#47b9f7', // when floating (shrinked)
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon size={20} />
                          ) : (
                            <VisibilityOutlinedIcon size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <FormControlLabel
                control={
                  <Controller
                    name="stayConnected"
                    control={control}
                    render={({ field }) => <Checkbox {...field} />}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: {
                        xs: '0.75rem',
                        lg: '1rem',
                      },
                      color: '#D5ECF8',
                    }}
                  >
                    {translate('login.stayConnected')}
                  </Typography>
                }
              />
              <Link
                to="/auth/forgot-password"
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: {
                      xs: '0.75rem',
                      lg: '1rem',
                    },
                    color: '#47b9f7',
                  }}
                >
                  {translate('login.forgotPassword')}
                </Typography>
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: { xs: 2.5, lg: 5 },
                py: { xs: 1.5, lg: 2 },
                fontWeight: 600,
                fontSize: { xs: '16px', lg: '1.125rem' },
                borderRadius: '10px',
                width: '100%',
                bgcolor: '#47b9f7',
                color: '#D5ECF8',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {translate('login.connect')}
            </Button>
          </form>
          <Typography
            textAlign="center"
            display={{ lg: 'none' }}
            fontFamily="Inter, sans-serif"
            fontWeight={500}
            color="#D5ECF8"
            sx={{ fontSize: '12px', mt: { xs: 1.5, lg: 2 } }}
          >
            {translate('login.notRegistred')}{' '}
            <Link to="/pricing" style={{ color: '#47b9f7', fontWeight: 600 }}>
              {translate('login.discoverOurOffers')}
            </Link>
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{ my: { xs: 5, lg: 2.5 } }}
          >
            <hr width="45%" style={{ backgroundColor: '#D5ECF8' }} />
            <Typography
              mx={2}
              variant="body2"
              color="#D5ECF8"
              sx={{ fontSize: { lg: '16px' } }}
            >
              {translate('login.ou')}
            </Typography>
            <hr width="45%" />
          </Box>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<img src="/icons/google.svg" alt="Google" width={30} />}
            sx={{
              mt: { lg: 2 },
              py: { xs: 1.5, lg: 2 },
              borderColor: '#D5ECF8',
              color: '#D5ECF8',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', lg: '1.125rem' },
              borderRadius: '10px',
              textTransform: 'none',
              width: '100%',
            }}
            onClick={handleGoogleLogin}
          >
            {translate('login.connectWithGoogle')}
          </Button>
          {idPloginError &&
            <Typography
              textAlign="center"
              mt={2}
              display={{ xs: 'none', lg: 'block' }}
              fontFamily="Inter, sans-serif"
              fontWeight={300}
              color="#ee0808ff"
            >
              {idPloginError}
            </Typography>
          }
          <Button
            variant="outlined"
            fullWidth
            startIcon={
              <img src="/icons/microsoft.svg" alt="Microsoft" width={24} />
            }
            sx={{
              mt: { xs: 1, lg: 2.5 },
              py: { xs: 1.5, lg: 2 },
              borderColor: '#D5ECF8',
              color: '#D5ECF8',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', lg: '1.125rem' },
              borderRadius: '10px',
              textTransform: 'none',
              width: '100%',
            }}
          >
            {translate('login.connectWithMicrosoft')}
          </Button>
          <Typography
            textAlign="center"
            mt={4}
            display={{ xs: 'none', lg: 'block' }}
            fontFamily="Inter, sans-serif"
            fontWeight={500}
            color="#D5ECF8"
          >
            {translate('login.notRegistred')}{' '}
            <a
              href={`${process.env.REACT_APP_LANDING_PAGE_URL}/pricing`}
              style={{ color: '#47b9f7', fontWeight: 600 }}
            >
              {translate('login.discoverOurOffers')}
            </a>
          </Typography>
        </Box>

        {/* Right Side Image */}
        <Box display={{ xs: 'none', lg: 'block' }} alignSelf="center">
          <img
            src="/hero.webp"
            alt="Billariz"
            style={{ maxWidth: '170%', height: '700px' }}
          />
        </Box>
        <Box display={{ lg: 'none' }} alignSelf="center">
          <img src="/hero.webp" alt="Billariz" />
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

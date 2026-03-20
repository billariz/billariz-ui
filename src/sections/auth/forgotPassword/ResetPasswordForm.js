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

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';

//Hooks
import { useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

//Icons
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowLeft from '@mui/icons-material/ArrowBack'; // You can swap this with your custom icon if needed

ResetPasswordForm.propTypes = {
  email: PropTypes.string,
  setStep: PropTypes.func,
};

export default function ResetPasswordForm({ email, setStep }) {
  const { confirmNewPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const { translate } = useLocales();

  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      code: '',
    },
  });

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      setIsError(false);
      try {
        await confirmNewPassword(email, data.code, data.password).then(() =>
          enqueueSnackbar(translate('passwordReset.resetPasswordSuccess'), {
            variant: 'success',
          })
        );

        navigate(PATH_AUTH.login);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        enqueueSnackbar(translate('passwordReset.error'), { variant: 'error' });
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <Container maxWidth="lg">
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}
      <Box
        sx={{ mt: { xs: 5, lg: 5 } }}
        display="grid"
        alignItems={'center'}
        gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
        gap={8}
      >
        <Box maxWidth={500} mx="auto">
          <Box mb={3}>
            <Box
              onClick={() => {
                setStep(1);
              }}
              sx={{
                position: { xs: 'absolute', lg: 'relative' },
                top: { xs: 28, lg: 0 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: 40, lg: 56 },
                height: { xs: 40, lg: 56 },
                bgcolor: { xs: '#d5ecf8', lg: 'transparent' },
                borderRadius: { xs: 1, lg: '50%' },
                border: '1px solid',
                borderColor: '#d5ecf8',
                cursor: 'pointer',
              }}
            >
              {/* Desktop icon */}
              <ArrowLeft
                sx={{
                  display: { xs: 'none', lg: 'block' },
                  color: '#d5ecf8',
                  fontSize: 24,
                }}
              />
              {/* Mobile icon */}
              <ArrowLeft
                sx={{
                  display: { xs: 'block', lg: 'none' },
                  color: '#07112b',
                  fontSize: 24,
                }}
              />
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#D5ECF8"
              sx={{
                mt: { lg: 4 },
                fontFamily: 'Inter, sans-serif',
                fontSize: {
                  xs: '28px',
                  lg: '2.25rem',
                },
              }}
            >
              {translate('passwordReset.passwordReset')}
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
              {translate('passwordReset.description')}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="code"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translate('passwordReset.code')}
                  fullWidth
                  margin="normal"
                  error={!!errors.code}
                  helperText={
                    errors.code ? translate('passwordReset.codeRequired') : ''
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
                  label={translate('passwordReset.password')}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  error={!!errors.password || isError}
                  helperText={
                    errors.password ? translate('login.passwordRequired') : ''
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

            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translate('passwordReset.confirmPassword')}
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  margin="normal"
                  error={!!errors.confirmPassword || isError}
                  helperText={
                    errors.password
                      ? translate('login.passwordRequired')
                      : isError
                        ? translate('passwordReset.errorMismatch')
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
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
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
              {translate('passwordReset.resetPassword')}
            </Button>
          </form>
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

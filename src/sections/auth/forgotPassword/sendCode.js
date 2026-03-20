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
  TextField,
  Alert,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

//Hooks
import { useAuth } from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

//Icons
import ArrowLeft from '@mui/icons-material/ArrowBack'; // You can swap this with your custom icon if needed

SendCode.propTypes = {
  setEmail: PropTypes.func,
  setStep: PropTypes.func,
};

export default function SendCode({ setEmail, setStep }) {
  const { forgotPassword } = useAuth();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      setStep(2);
      setEmail(data.email);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (
        error.name === 'UserNotFoundException' ||
        error.code === 'UserNotFoundException'
      ) {
        enqueueSnackbar(translate('forgotPassword.userNotFound'), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(translate('forgotPassword.error'), {
          variant: 'error',
        });
      }
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
              component={RouterLink}
              to="/"
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
              {translate('forgotPassword.forgotPassword')}
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
              {translate('forgotPassword.description')}
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
                  label={translate('forgotPassword.email')}
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
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
              {translate('forgotPassword.continue')}
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

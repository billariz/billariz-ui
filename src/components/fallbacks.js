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
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import useLocales from 'src/hooks/useLocales';
import {
  SeverErrorIllustration,
  PageNotFoundIllustration,
  NotAuthorizedIllustration,
  BadRequestIllustration,
  ServiceUnavailableIllustration,
} from 'src/assets';

const ERROR_MESSAGES = {
  400: {
    title: 'Error.400.title',
    message: 'Error.400.message',
    cta: 'Error.400.cta',
    Illustration: BadRequestIllustration,
  },
  401: {
    title: 'Error.401.title',
    message: 'Error.401.message',
    cta: 'Error.401.cta',
    Illustration: NotAuthorizedIllustration,
  },
  403: {
    title: 'Error.403.title',
    message: 'Error.403.message',
    cta: 'Error.403.cta',
    Illustration: NotAuthorizedIllustration,
  },
  404: {
    title: 'Error.404.title',
    message: 'Error.404.message',
    cta: 'Error.404.cta',
    Illustration: PageNotFoundIllustration,
  },
  429: {
    title: 'Error.429.title',
    message: 'Error.429.message',
    cta: 'Error.429.cta',
    Illustration: SeverErrorIllustration,
  },
  500: {
    title: 'Error.500.title',
    message: 'Error.500.message',
    cta: 'Error.500.cta',
    Illustration: SeverErrorIllustration,
  },
  502: {
    title: 'Error.502.title',
    message: 'Error.502.message',
    cta: 'Error.502.cta',
    Illustration: SeverErrorIllustration,
  },
  503: {
    title: 'Error.503.title',
    message: 'Error.503.message',
    cta: 'Error.503.cta',
    Illustration: ServiceUnavailableIllustration,
  },
  default: {
    title: 'Error.default.title',
    message: 'Error.default.message',
    cta: 'Error.default.cta',
    Illustration: SeverErrorIllustration,
  },
};

export default function FallBacks({ errorCode = 404 }) {
  const { title, message, cta, Illustration } =
    ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;

  const { translate } = useLocales();

  return (
    <Container component={MotionContainer} sx={{ mt: 10 }}>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {translate(title)}
          </Typography>
        </m.div>
        <Typography sx={{ color: 'text.secondary' }}>
          {translate(message)}
        </Typography>
        <m.div variants={varBounce().in}>
          <Illustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button
          to="/"
          size="large"
          variant="contained"
          sx={{ mt: 4 }}
          component={RouterLink}
        >
          {translate(cta)}
        </Button>
      </Box>
    </Container>
  );
}

FallBacks.propTypes = {
  errorCode: PropTypes.number,
};

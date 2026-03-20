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
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

//Hooks
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

SmallLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SmallLogo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const color = theme.palette.mode === 'light' ? '#003958' : '#296FD7';

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg
        width="45"
        height="45"
        viewBox="0 0 185 185"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="185" height="185" rx="18.3698" fill={color} />
        <path
          d="M77.636 63.9483V83.2399H91.5747C95.4132 83.2399 98.5197 82.5276 100.894 81.103C103.308 79.6388 104.515 77.0666 104.515 73.3863C104.515 69.3104 102.932 66.6194 99.7662 65.3135C97.0357 64.4034 93.5533 63.9483 89.3191 63.9483H77.636ZM77.636 97.7234V121.051H91.5747C95.4132 121.051 98.4009 120.537 100.538 119.508C104.416 117.609 106.355 113.968 106.355 108.586C106.355 104.035 104.475 100.909 100.716 99.2074C98.6186 98.2577 95.6704 97.763 91.8715 97.7234H77.636ZM95.1362 48.7524C105.86 48.9107 113.458 52.0172 117.93 58.0718C120.621 61.7916 121.966 66.2435 121.966 71.4275C121.966 76.7698 120.621 81.0634 117.93 84.3083C116.426 86.1287 114.21 87.7907 111.282 89.2945C115.754 90.9169 119.117 93.4892 121.373 97.0111C123.668 100.533 124.816 104.807 124.816 109.833C124.816 115.017 123.51 119.666 120.898 123.782C119.236 126.512 117.158 128.808 114.665 130.667C111.856 132.804 108.532 134.269 104.693 135.06C100.894 135.851 96.7587 136.247 92.287 136.247H60.1846V48.7524H95.1362Z"
          fill="#E2F3FC"
        />
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/dashboard/app">{logo}</RouterLink>;
}

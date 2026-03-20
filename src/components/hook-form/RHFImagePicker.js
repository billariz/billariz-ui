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
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Avatar,
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import API_SERVICE from 'src/utils/apiService';
import { useTheme } from '@mui/material/styles';
import useLocales from 'src/hooks/useLocales';
import { GOOGLE_CXID, GOOGLE_API_KEY } from 'src/config';

// ----------------------------------------------------------------------

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const defaultAvatarCover = [
  'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg',
  'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671136.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671151.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671118.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671157.jpg',
  'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg',
  'https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671136.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671151.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671118.jpg',
  'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671157.jpg',
];

const blackList = [
  'www.facebook.com',
  'www.instagram.com',
  'fr-fr.facebook.com',
];

RHFImagePicker.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  label: PropTypes.string,
  userFullName: PropTypes.string,
};
async function getImageFromGoogle(search, start) {
  const cxId = GOOGLE_CXID;
  const apiKey = GOOGLE_API_KEY;
  let urls = [];
  try {
    const response = await API_SERVICE.get(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cxId}&q=${search}&start=${start}&searchType=image&lr=lang_fr`
    );
    urls = response.items.map((item) =>
      blackList.includes(item.displayLink)
        ? item.image.thumbnailLink
        : item.link
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch images:', error);
  }
  return urls;
}

export default function RHFImagePicker({ name, userFullName, label }) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [imageSearchResults, setImageSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [apiError, setApiError] = useState(false);
  const theme = useTheme();
  const { translate } = useLocales();

  async function launchImageSearch(reset) {
    if (!imageSearch || page > 9) return;
    if (reset) {
      const results = await getImageFromGoogle(imageSearch, 1).catch(() =>
        setApiError(true)
      );
      setImageSearchResults(results);
      setPage(1);
    } else {
      const results = await getImageFromGoogle(
        imageSearch,
        page * 10 + 1
      ).catch(() => setApiError(true));
      setPage(page + 1);
      setImageSearchResults([...imageSearchResults, ...results]);
    }
  }

  DisplayAvatar.propTypes = {
    url: PropTypes.string,
    setField: PropTypes.func,
  };
  function DisplayAvatar({ url, setField }) {
    return (
      <Box
        sx={[
          {
            '&:hover': {
              color: 'red',
              backgroundColor: theme.palette.grey[500_12],
              boxShadow: 3,
            },
          },
          { padding: 1, borderRadius: 3, cursor: 'pointer' },
        ]}
        onClick={() => {
          setField(url);
          setOpen(false);
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }} src={url} />
      </Box>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="20px"
        >
          <Avatar
            alt={userFullName}
            src={field.value}
            sx={{ width: 150, height: 150 }}
            {...(field.value === undefined && stringAvatar(userFullName))}
          />
          <Button onClick={() => setOpen(true)} variant="outlined">
            {translate(label || 'ImagePicker.ProfilePicture')}
          </Button>
          <Dialog
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth="lg"
          >
            <Box display="flex" gap={2} borderRadius={2} padding={3}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={1}
                borderRadius={2}
                bgcolor={theme.palette.grey[500_8]}
                padding={2}
                minWidth="max-content"
              >
                <Typography variant="h6">
                  {translate('ImagePicker.DefaultAvatar')}
                </Typography>
                <Box display="flex" gap={1}>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap={1}
                  >
                    {defaultAvatarCover.map((avatar, index) => (
                      <DisplayAvatar
                        key={avatar + index}
                        url={avatar}
                        setField={field.onChange}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={1}
                borderRadius={2}
                bgcolor={theme.palette.grey[500_8]}
                padding={2}
                width="100%"
              >
                <Typography variant="h6">
                  {translate('ImagePicker.SearchImage')}
                </Typography>
                <Box gap={2} width="100%" display="flex">
                  <TextField
                    size="small"
                    fullWidth
                    label={translate('ImagePicker.Search')}
                    value={imageSearch}
                    onChange={(event) => {
                      setImageSearch(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        launchImageSearch(true);
                      }
                    }}
                  />
                  <Button
                    onClick={() => launchImageSearch(true)}
                    variant="contained"
                  >
                    {translate('ImagePicker.Search')}
                  </Button>
                </Box>
                <Box
                  display="flex"
                  gap={1}
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {imageSearchResults.map((url) => (
                    <DisplayAvatar
                      key={url}
                      url={url}
                      setField={field.onChange}
                    />
                  ))}
                </Box>
                {imageSearchResults.length === 0 && (
                  <Typography>{translate('ImagePicker.NoResult')}</Typography>
                )}
                {apiError && (
                  <Typography>{translate('ImagePicker.APIError')}</Typography>
                )}
                {imageSearchResults.length > 0 && page <= 9 && (
                  <Button
                    variant="contained"
                    onClick={() => launchImageSearch(false)}
                  >
                    {translate('ImagePicker.SeeMore')}
                  </Button>
                )}
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    />
  );
}

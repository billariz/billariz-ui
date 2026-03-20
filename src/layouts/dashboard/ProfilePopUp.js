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
// @mui
import { Dialog, Box } from '@mui/material';

//Components
import AddOrEditRowTablePopup from 'src/components/table/popups/AddOrEditRowTablePopup';
import LoadingScreen from 'src/components/LoadingScreen';

import PROFILE_CONFIG from 'src/constants/profile';

//Actions
import { findUsersApi, updateUserApi } from 'src/api/users';
import { finishLoading, startLoading } from 'src/redux/slices/gloablLoading';

//Hooks
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

ProfilePopUp.propTypes = {
  userName: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

const form = PROFILE_CONFIG.FORMS;

export default function ProfilePopUp({ open, onClose, userName }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate, onChangeLang } = useLocales();

  const [currentProfile, setCurrentProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (open) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userName]); // Fetch when popup opens or userName changes

  async function fetchUser() {
    try {
      const {
        _embedded: { users },
      } = await findUsersApi({ userName });
      const currentUser = users[0];
      setCurrentProfile(currentUser);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user profile', error);
      enqueueSnackbar('Error fetching user profile', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = async (action, args) => {
    dispatch(startLoading());
    const updateResponse = await updateUserApi(currentProfile?.id, {
      ...args,
      status: args.status ? 'ACTIVE' : 'INACTIVE',
    }).finally(() => {
      dispatch(finishLoading());
    });
    if (updateResponse) {
      localStorage.setItem('i18nextLng', updateResponse?.defaultLanguage);
      onChangeLang(updateResponse?.defaultLanguage);
      enqueueSnackbar(translate('Utilities.updateSuccess'), {
        variant: 'success',
      });
      onClose();
      fetchUser();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={onClose}
      style={{ borderRadius: 0 }}
      variant="scrollable"
      scrollbuttons="auto"
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 200,
          }}
        >
          <LoadingScreen />
        </Box>
      ) : (
        <AddOrEditRowTablePopup
          open={open}
          onClose={onClose}
          form={form}
          action={'edit'}
          currentObject={currentProfile}
          onSubmit={onSubmit}
        />
      )}
    </Dialog>
  );
}

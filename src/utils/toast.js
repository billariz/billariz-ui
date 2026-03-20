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

import { useSnackbar } from 'notistack'

let useSnackbarRef = null

// SnackbarUtilsConfigurator component initializes the snackbar hook
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar()

  // Ensure the ref is available for toasts
  return null
}

// eslint-disable-next-line import/no-unused-modules
export default {
  success(msg) {
    this.toast(msg, 'success')
  },
  warning(msg) {
    this.toast(msg, 'warning')
  },
  info(msg) {
    this.toast(msg, 'info')
  },
  error(msg) {
    this.toast(msg, 'error')
  },
  toast(msg, variant = 'default') {
    if (useSnackbarRef) {
      useSnackbarRef.enqueueSnackbar(msg, { variant })
    }
  }
}

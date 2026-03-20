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

import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varFlip = (props) => {
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    // IN
    inX: {
      initial: { rotateX: -180, opacity: 0 },
      animate: { rotateX: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { rotateX: -180, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    inY: {
      initial: { rotateY: -180, opacity: 0 },
      animate: { rotateY: 0, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { rotateY: -180, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    // OUT
    outX: {
      initial: { rotateX: 0, opacity: 1 },
      animate: { rotateX: 70, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    outY: {
      initial: { rotateY: 0, opacity: 1 },
      animate: { rotateY: 70, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    }
  };
};

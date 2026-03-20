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

//
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varScale = (props) => {
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    // IN
    inX: {
      initial: { scaleX: 0, opacity: 0 },
      animate: { scaleX: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scaleX: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    inY: {
      initial: { scaleY: 0, opacity: 0 },
      animate: { scaleY: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scaleY: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) }
    },

    // OUT
    outX: {
      initial: { scaleX: 1, opacity: 1 },
      animate: { scaleX: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) }
    },
    outY: {
      initial: { scaleY: 1, opacity: 1 },
      animate: { scaleY: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) }
    }
  };
};

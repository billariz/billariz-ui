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

export const varZoom = (props) => {
  const distance = props?.distance || 720;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    // IN
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { scale: 0, opacity: 0, transition: varTranExit({ durationOut, easeOut }) },
    },
    inUp: {
      initial: { scale: 0, opacity: 0, translateY: distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateY: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateY: distance,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inDown: {
      initial: { scale: 0, opacity: 0, translateY: -distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateY: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateY: -distance,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inLeft: {
      initial: { scale: 0, opacity: 0, translateX: -distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateX: -distance,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },
    inRight: {
      initial: { scale: 0, opacity: 0, translateX: distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        transition: varTranEnter({ durationIn, easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateX: distance,
        transition: varTranExit({ durationOut, easeOut }),
      },
    },

    // OUT
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0, transition: varTranEnter({ durationIn, easeIn }) },
    },
    outUp: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateY: -distance,
        transition: varTranEnter({ durationIn, easeIn }),
      },
    },
    outDown: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateY: distance,
        transition: varTranEnter({ durationIn, easeIn }),
      },
    },
    outLeft: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateX: -distance,
        transition: varTranEnter({ durationIn, easeIn }),
      },
    },
    outRight: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateX: distance,
        transition: varTranEnter({ durationIn, easeIn }),
      },
    },
  };
};

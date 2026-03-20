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

export const varSlide = (props) => {
  const distance = props?.distance || 160;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  return {
    // IN
    inUp: {
      initial: { y: distance },
      animate: { y: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: distance, transition: varTranExit({ durationOut, easeOut }) }
    },
    inDown: {
      initial: { y: -distance },
      animate: { y: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },
    inLeft: {
      initial: { x: -distance },
      animate: { x: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: -distance, transition: varTranExit({ durationOut, easeOut }) }
    },
    inRight: {
      initial: { x: distance },
      animate: { x: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: distance, transition: varTranExit({ durationOut, easeOut }) }
    },

    // OUT
    outUp: {
      initial: { y: 0 },
      animate: { y: -distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    outDown: {
      initial: { y: 0 },
      animate: { y: distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { y: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    outLeft: {
      initial: { x: 0 },
      animate: { x: -distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, transition: varTranExit({ durationOut, easeOut }) }
    },
    outRight: {
      initial: { x: 0 },
      animate: { x: distance, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { x: 0, transition: varTranExit({ durationOut, easeOut }) }
    }
  };
};

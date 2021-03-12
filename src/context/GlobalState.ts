import { useReducer } from 'react';
import * as Tone from 'tone';
import stateReducer, { IInstrument } from './stateReducer';

import effectsList from '../components/effects';
import { IEffectsList } from './GlobalState.context';

interface IState {
  Tone: typeof Tone,
  master: {
    effects: any[],
    volume: number,
    bpm: number,
    metronome: boolean,
    metronomeVol: number,
  },
  instruments: IInstrument[],
  activeInstrumentId: string | boolean | null,
  maxBars: number,
  effectsList: IEffectsList | string[],
  categoryErrorFlag?: boolean,
}

const keys: string[] = Object.keys(effectsList);

function useGlobalState() {
  const [state, dispatch] = useReducer(stateReducer, {
    Tone: Tone,
    master: {
      effects: [],
      volume: -10,
      bpm: 120,
      metronome: true,
      metronomeVol: -20,
    },
    instruments: [],
    activeInstrumentId: null,
    maxBars: 1,
    effectsList: keys,
    categoryErrorFlag: false,
  });

  return { state, dispatch };
}

export { useGlobalState, IState };

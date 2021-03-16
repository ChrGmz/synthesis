import { useReducer } from 'react';
import * as Tone from 'tone';
import stateReducer, { IInstrument } from './stateReducer';

import effectsList from '../components/effects';
import { IEffectsList } from './GlobalState.context';

interface IState {
  master: {
    effects: any[],
    volume: number,
    bpm: number,
    metronome: boolean,
    metronomeVol: number,
  },
  instruments: IInstrument[],
  activeInstrumentId: string | null,
  maxBars: number,
  effectsList: IEffectsList,
  categoryErrorFlag?: boolean,
}

const keys: string[] = Object.keys(effectsList);

export { IState };

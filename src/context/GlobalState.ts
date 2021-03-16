import { IInstrument } from './stateReducer';

import effectsList from '../components/effects';
import { IEffectsList } from './GlobalState.context';

export interface IState {
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

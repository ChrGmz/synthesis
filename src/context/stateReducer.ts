import { v4 as uuidv4 } from 'uuid';
import effectsList, { IEffectsListConfig } from '../components/effects';
import { IState } from './GlobalState';
import * as Tone from 'tone';

import synthSubCategoryOptions from '../components/instruments/Synth/synthOptions';
import { resolveEffect } from '../utils';

type Effect = 
  'AutoFilter'
| 'AutoPanner'
| 'AutoWah'
| 'BitCrusher'
| 'Chebyshev'
| 'Chorus'
| 'Compressor'
| 'Delay'
| 'Distortion'
| 'FeedbackDelay'
| 'Filter'
| 'FrequencyShifter'
| 'Freeverb'
| 'JCReverb'
| 'PingPongDelay'
| 'PitchShift'
| 'Phaser'
| 'Reverb'
| 'StereoWidener'
| 'Tremolo'
| 'Vibrato';


interface IAction {
  type: string,
  category?: string,
  subCategory?: string,
  instrument?: string,
  value?: number,
  values?: number,
  effect?: Effect,
  volume?: number,
  id?: string,
  bars?: string,
  octave?: number
}

interface IInstrument {
  category?: string,
  subCategory?: string,
  instrument?: string,
  id: string;
  defaultSettings?: IDefaultSettings,
  synthOptions?: {[key: string]: object},
  effects: IEffects[],
  oscillator?: IOscillator
}

interface IEnvelope {
  attack?: number,
  decay?: number,
  sustain?: number,
  release?: number,
}

// TODO: Made optional to fix InstrumentPanel on Dashboard
interface ActiveInstrument extends IInstrument {
  volume?: number,
  bars?: string,
  octave?: number,
  envelope?: IEnvelope,
}

interface IDefaultSettings {
  effects: string[],
  volume: number,
  subdivisions: number,
  bars: number,
  octave: number,
}

interface IOscillator {
  volume: number,
  type?: string
}

interface IEffects {
  name: string,
  method: Effect
}

export default function stateReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'CREATE_INSTRUMENT': {
      const id: string = uuidv4();
      const { category, subCategory, instrument } = action;

      const defaultSettings = {
        effects: [],
        volume: -25,
        subdivisions: 16,
        bars: 1,
        octave: 2,
      };

      const synthOptions =
        instrument &&
        (category === 'synth' || category === 'polySynth')
          ? synthSubCategoryOptions[instrument]
          : {};

      console.log(synthOptions);


      const newInstrument: IInstrument = {
        category,
        subCategory,
        instrument,
        id,
        ...defaultSettings,
        ...synthOptions,
      };

      return {
        ...state,
        instruments: [...state.instruments, newInstrument],
      };
    }

    case 'UPDATE_ACTIVE_INSTRUMENT': {
      const { type, category, ...otherProperties } = action;
      const { instruments, activeInstrumentId } = state;
      let categoryErrorFlag = false;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;
        if (_instrument.category !== category) {
          categoryErrorFlag = true;
          return _instrument;
        } else return { ..._instrument, ...otherProperties };
      });

      if (categoryErrorFlag) {
        return { ...state, categoryErrorFlag: true };
      } else
        return {
          ...state,
          instruments: _instruments,
        };
    }

    case 'DELETE_INSTRUMENT': {
      const { id } = action;
      const _instruments = [...state.instruments];

      const filteredInstruments = _instruments.filter((instrument) => {
        return instrument.id !== id;
      });

      return {
        ...state,
        instruments: filteredInstruments,
        activeInstrumentId: state.activeInstrumentId === id && null,
      };
    }

    case 'UPDATE_INSTRUMENT_VOLUME': {
      const { volume } = action;
      const { instruments, activeInstrumentId } = state;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;

        return { ..._instrument, volume: volume };
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'SET_ACTIVE_INSTRUMENT': {
      const { id } = action;

      if (id) {
        return {
          ...state,
          activeInstrumentId: id,
        };
      } else {
        return {
          ...state
        }
      }
    }

    case 'REMOVE_ACTIVE_INSTRUMENT': {
      return {
        ...state,
        activeInstrumentId: null,
      };
    }

    case 'SET_BARS': {
      const { bars } = action;
      const { instruments, activeInstrumentId, maxBars } = state;
      const _bars: number = fractionStrToDecimal(bars);

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;

        return { ..._instrument, bars: _bars };
      });

      return {
        ...state,
        instruments: _instruments,
        maxBars: _bars > maxBars ? _bars : maxBars,
      };
    }

    case 'SET_OCTAVE': {
      const { octave } = action;
      const { instruments, activeInstrumentId } = state;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;

        return { ..._instrument, octave: octave };
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'SET_ENVELOPE': {
      const { values } = action;
      const { instruments, activeInstrumentId } = state;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;

        return { ..._instrument, envelope: values };
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'ADD_EFFECT_TO_INSTRUMENT': {
      const { effect } = action;
      const { instruments, activeInstrumentId, Tone } = state;

      const _effect = effect && resolveEffect(effect);

      

      // console.log(_effect);

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;
        const { effects } = _instrument;

        // TODO: changed from effects: [...effects, _effect]
        return { ..._instrument, effects: {...effects, _effect} };
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'UPDATE_OSCILLATOR': {
      const { type, ...oscProps } = action;
      const { activeInstrumentId, instruments } = state;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;
        const { oscillator } = _instrument;

        if (oscillator) {
          return {
            ..._instrument,
            oscillator: { ...oscillator, ...oscProps },
          };
        } else {
          return {
            ..._instrument,
          }
        }
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'REMOVE_EFFECT_FROM_INSTRUMENT': {
      const { effect } = action;
      const { instruments, activeInstrumentId } = state;

      const _instruments = instruments.map((_instrument) => {
        if (_instrument.id !== activeInstrumentId) return _instrument;
        const { effects } = _instrument;

        const _effects = effects.filter((_effect) => _effect.name !== effect);

        return { ..._instrument, effects: _effects };
      });

      return {
        ...state,
        instruments: _instruments,
      };
    }

    case 'UPDATE_BPM': {
      const { value } = action;
      const { master } = state;

      if (value) {
        return { ...state, master: { ...master, bpm: value } };
      } else {
        return { ...state };
      }
    }

    case 'UPDATE_METRONOME_VOL': {
      const { value } = action;
      const { master } = state;

      if (value) {
        return { ...state, master: { ...master, metronomeVol: value } };
      } else {
        return { ...state };
      }
    }

    case 'UPDATE_MASTER_VOLUME': {
      const { value } = action;
      const { master } = state;

      if (value) {
        return { ...state, master: { ...master, volume: value } };
      } else {
        return { ...state };
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function fractionStrToDecimal(str: any): number {
  return str.split('/').reduce((p: number, c: number) => p / c);
}

export { IInstrument, IAction, Effect, ActiveInstrument, IEffects, IEnvelope, IOscillator };

import React, { createContext, useContext, useReducer } from 'react';
import stateReducer from './stateReducer';
import { IState } from './GlobalState';
import { IAction } from './stateReducer';
import * as Tone from 'tone';

interface IStateContext {
  state: IState,
  dispatch: React.Dispatch<IAction>
}

export type AnyEffect = Tone.Distortion | Tone.Phaser | Tone.Compressor | Tone.Filter | Tone.Tremolo | Tone.PitchShift | Tone.Reverb | Tone.Delay | Tone.Freeverb | Tone.FeedbackDelay | Tone.Volume | Tone.Vibrato;

export interface IEffectsList {
  distortion?: Tone.Distortion,
  phaser?: Tone.Phaser,
  compressor?: Tone.Compressor,
  hipass?: Tone.Filter,
  tremolo?: Tone.Tremolo,
  pitchShift?: Tone.PitchShift,
  reverb?: Tone.Reverb,
  delay?: Tone.PingPongDelay,
  freeverb?: Tone.Freeverb,
  feedback?: Tone.FeedbackDelay,
  volume?: Tone.Volume,
  vibrato?: Tone.Vibrato
}

const StateContext = createContext<IStateContext | null>(null);
StateContext.displayName = 'StateContext';

function StateProvider({ children }: {[key: string] : [value: any]}) {
  const [state, dispatch] = useReducer(stateReducer, {
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
    effectsList: {
      distortion: new Tone.Distortion(0.8),
      phaser: new Tone.Phaser({
        frequency: 1,
        octaves: 1,
        baseFrequency: 100,
      }),
      compressor: new Tone.Compressor(-30, 3),
      hipass: new Tone.Filter(1500, 'highpass'),
      tremolo: new Tone.Tremolo(9, 0.75),
      pitchShift: new Tone.PitchShift(4),
      reverb: new Tone.Reverb(1),
      delay: new Tone.PingPongDelay('4n', 0.2),
      freeverb: new Tone.Freeverb(),
      feedback: new Tone.FeedbackDelay('8n', 0.5),
    },
  });

  const value = { state, dispatch };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

function useGlobalState() {
  const context = useContext(StateContext);

  // if (!context) {
  //   throw new Error(
  //     `useGlobalState must be used within a component in the StateProvider tree`
  //   );
  // }

  const [state, dispatch] = useReducer(stateReducer, {
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
    effectsList: {
      distortion: new Tone.Distortion(0.8),
      phaser: new Tone.Phaser({
        frequency: 1,
        octaves: 1,
        baseFrequency: 100,
      }),
      compressor: new Tone.Compressor(-30, 3),
      hipass: new Tone.Filter(1500, 'highpass'),
      tremolo: new Tone.Tremolo(9, 0.75),
      pitchShift: new Tone.PitchShift(4),
      reverb: new Tone.Reverb(1),
      delay: new Tone.PingPongDelay('4n', 0.2),
      freeverb: new Tone.Freeverb(),
      feedback: new Tone.FeedbackDelay('8n', 0.5),
    },
  });

  // return context;
  return { state, dispatch };
}

export { StateProvider, useGlobalState };

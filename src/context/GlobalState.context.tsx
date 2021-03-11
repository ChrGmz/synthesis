import React, { createContext, useContext, useReducer } from 'react';
import stateReducer from './stateReducer';
import * as Tone from 'tone';

const StateContext = createContext(null);
StateContext.displayName = 'StateContext';

function StateProvider({ children }: {[key: string] : [value: any]}) {
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
    effectsList: {
      distortion: new Tone.Distortion(0.8),
      phaser: new Tone.Phaser({
        frequency: 1,
        // changed this to to number as Type Definition states octaves should be a number
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

  const value = [state, dispatch];

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

function useGlobalState() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error(
      `useGlobalState must be used within a component in the StateProvider tree`
    );
  }

  return context;
}

export { StateProvider, useGlobalState };

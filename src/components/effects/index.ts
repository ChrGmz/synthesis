import { Effect } from '../../context/stateReducer';
import * as Tone from 'tone';

type IFilter = 
'lowpass'
| 'highpass'
| 'bandpass'
| 'lowshelf'
| 'highshelf'
| 'notch'
| 'allpass'
| 'peaking';


export interface IEffectsListConfig {
  Distortion: [number] | undefined[],
  Phaser: [Partial<Tone.PhaserOptions>] | [undefined],
  Compressor: [number, number] | [undefined],
  Filter: [number, IFilter],
  Tremolo: [number, number],
  PitchShift: [number],
  Reverb: [number],
  Delay: [string, number],
  Freeverb: [number] | [],
  FeedbackDelay: [string, number]
}

const effectsList: IEffectsListConfig = {
  Distortion: [0.8],
  Phaser: [
    {
      frequency: 1,
      octaves: 1,
      baseFrequency: 100,
    },
  ],
  Compressor: [-30, 3],
  Filter: [1500, 'highpass'],
  Tremolo: [9, 0.75],
  PitchShift: [4],
  Reverb: [1],
  Delay: ['4n', 0.2],
  Freeverb: [],
  FeedbackDelay: ['8n', 0.5],
};

export default effectsList;



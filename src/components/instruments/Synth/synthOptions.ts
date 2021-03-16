const synthOptions = {};
import { IEnvelope } from '../../../context/stateReducer';
import { EnumSynth } from '../PolySynth/polySynthBuilder';
import { ISynthOscillator } from './synthBuilder';

export type ADSREnvelope = [number, number, number, number];

export interface SynthOptions {
  envelope: ADSREnvelope;
  oscillator: ISynthOscillator;
}

export enum FilterType {
  lowpass = 'lowpass',
  highpass = 'highpass',
}

export interface FilterOptions {
  Q: number;
  type: FilterType;
  rolloff: number;
}

export interface AMFMSynthOptions extends SynthOptions {
  harmonicity: number;
  detune: number;
  modulation: ISynthOscillator;
  modulationIndex?: number;
  modulationEnvelope: ADSREnvelope;
}

export interface SynthVoiceOptions extends SynthOptions {
  volume: number;
  portamento: number;
  filterEnvelope: ADSREnvelope;
}

export interface DuoSynthOptions {
  vibratoRate: number;
  vibratoAmount: number;
  harmonicity: number;
  voice0: SynthVoiceOptions;
  voice1: SynthVoiceOptions;
}

export interface MembraneSyntOptions extends SynthOptions {
  pitchDecay: number;
  octaves: number;
}

export interface MetalSynthOptions {
  frequency: number;
  envelope: IEnvelope;
  harmonicity: number;
  modulationIndex: number;
  resonance: number;
  octaves: number;
}

export interface MonoSynthOptions extends SynthOptions {
  frequency: string;
  detune: number;
  filter: FilterOptions;
  filterEnvelope: ADSREnvelope;
}

export type AnySynthOptions = SynthOptions | AMFMSynthOptions | DuoSynthOptions | MembraneSyntOptions | MetalSynthOptions | MonoSynthOptions;

export interface SynthSubcategoryoptions {
  Synth: SynthOptions;
  AMSynth: AMFMSynthOptions;
  FMSynth: AMFMSynthOptions;
  DuoSynth: DuoSynthOptions;
  MembraneSynth: MembraneSyntOptions;
  MetalSynth: MetalSynthOptions;
  MonoSynth: MonoSynthOptions;
}

const synthSubCategoryOptions: {[key: string]: any} = {
  Synth: {
    envelope: [0.01, 0.01, 1, 0.5],
    oscillator: {
      oscType: 'sine',
      oscVol: 10,
    },
  },
  AMSynth: {
    harmonicity: 3,
    detune: 0,
    oscillator: {
      oscType: 'sine',
      oscVol: 10,
    },
    envelope: [0.01, 0.01, 1, 0.5],
    modulation: {
      oscType: 'sine',
      oscVol: 10,
    },
    modulationEnvelope: [0.01, 0.01, 1, 0.5],
  },
  FMSynth: {
    harmonicity: 3,
    modulationIndex: 10,
    detune: 0,
    oscillator: {
      oscType: 'sine',
      oscVol: 10,
    },
    envelope: [0.01, 0.01, 1, 0.5],
    modulation: {
      oscType: 'square',
    },
    modulationEnvelope: [0.01, 0.01, 1, 0.5],
  },
  DuoSynt: {
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
      volume: -10,
      portamento: 0,
      oscillator: {
        oscType: 'sine',
        oscVol: 10,
      },
      filterEnvelope: [0.01, 0.01, 1, 0.5],
      envelope: [0.01, 0.01, 1, 0.5],
    },
    voice1: {
      volume: -10,
      portamento: 0,
      oscillator: {
        oscType: 'sine',
        oscVol: 10,
      },
      filterEnvelope: [0.01, 0.01, 1, 0.5],
      envelope: [0.01, 0.01, 1, 0.5],
    },
  },
  MembraneSynt: {
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: {
      oscType: 'sine',
      oscVol: 10,
    },
    envelope: [0.01, 0.01, 1, 0.5],
  },
  MetalSynt: {
    frequency: 200,
    envelope: {
      attack: 0.001,
      decay: 1.4,
      release: 0.2,
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  },
  MonoSynt: {
    frequency: 'C4',
    detune: 0,
    oscillator: {
      oscType: 'sine',
      oscVol: 10,
    },
    filter: {
      Q: 6,
      type: 'lowpass',
      rolloff: -24,
    },
    envelope: [0.01, 0.01, 1, 0.5],
    filterEnvelope: [0.01, 0.01, 1, 0.5],
  },
};

export const getSynthSubcategoryOptions = (type: EnumSynth): AnySynthOptions | null => {
  switch (type) {
    case EnumSynth.AMSynth:
      return synthSubCategoryOptions.AMSynth;
    case EnumSynth.FMSynth:
      return synthSubCategoryOptions.FMSynth;
    case EnumSynth.DuoSynth:
      return synthSubCategoryOptions.DuoSynth;
    case EnumSynth.MembraneSynth:
      return synthSubCategoryOptions.MembraneSynth;
    case EnumSynth.MetalSynth:
      return synthSubCategoryOptions.MetalSynth;
    case EnumSynth.MonoSynth:
      return synthSubCategoryOptions.MonoSynth;
    case EnumSynth.Synth:
      return synthSubCategoryOptions.Synth;
    default:
      return null;
  }
};

export default synthSubCategoryOptions;

import Synth from './Synth/Synth';
import Sampler from './Sampler/Sampler';
import PolySynth from './PolySynth/PolySynth';
import { EnumSynth } from '../instruments/PolySynth/polySynthBuilder'

const instrumentComponents = {
  sampler: Sampler,
  synth: Synth,
  polySynth: PolySynth,
};

const synths = [
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.Synth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.AMSynth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.DuoSynth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.FMSynth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.MembraneSynth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.MetalSynth },
  { category: 'synth', subCategory: 'synth', instrument: EnumSynth.MonoSynth },
  //getting a weird bug with the pluck synth so will leave it out until it is resolved
  // { category: 'synth', subCategory: 'synth', instrument: 'PluckSynth' },
];

const polySynths = [
  { category: 'polySynth', subCategory: 'polySynth', instrument: EnumSynth.Synth },
  { category: 'polySynth', subCategory: 'polySynth', instrument: EnumSynth.AMSynth },
  { category: 'polySynth', subCategory: 'polySynth', instrument: EnumSynth.DuoSynth },
  { category: 'polySynth', subCategory: 'polySynth', instrument: EnumSynth.FMSynth },
  {
    category: 'polySynth',
    subCategory: 'polySynth',
    instrument: EnumSynth.MembraneSynth,
  },
];

export { instrumentComponents, synths, polySynths };

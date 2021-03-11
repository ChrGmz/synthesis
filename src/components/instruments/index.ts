import Synth from './Synth/Synth';
import Sampler from './Sampler/Sampler';
import PolySynth from './PolySynth/PolySynth';

const instrumentComponents = {
  sampler: Sampler,
  synth: Synth,
  polySynth: PolySynth,
};

const synths = [
  { category: 'synth', subCategory: 'synth', instrument: 'Synth' },
  { category: 'synth', subCategory: 'synth', instrument: 'AMSynth' },
  { category: 'synth', subCategory: 'synth', instrument: 'DuoSynth' },
  { category: 'synth', subCategory: 'synth', instrument: 'FMSynth' },
  { category: 'synth', subCategory: 'synth', instrument: 'MembraneSynth' },
  { category: 'synth', subCategory: 'synth', instrument: 'MetalSynth' },
  { category: 'synth', subCategory: 'synth', instrument: 'MonoSynth' },
  //getting a weird bug with the pluck synth so will leave it out until it is resolved
  // { category: 'synth', subCategory: 'synth', instrument: 'PluckSynth' },
];

const polySynths = [
  { category: 'polySynth', subCategory: 'polySynth', instrument: 'Synth' },
  { category: 'polySynth', subCategory: 'polySynth', instrument: 'AMSynth' },
  { category: 'polySynth', subCategory: 'polySynth', instrument: 'DuoSynth' },
  { category: 'polySynth', subCategory: 'polySynth', instrument: 'FMSynth' },
  {
    category: 'polySynth',
    subCategory: 'polySynth',
    instrument: 'MembraneSynth',
  },
];

export { instrumentComponents, synths, polySynths };

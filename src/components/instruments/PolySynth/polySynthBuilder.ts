import { IEffects, IEnvelope, IInstrument, IOscillator } from '../../../context/stateReducer';
import { createArr } from '../../../utils';
import * as Tone from 'tone';
import { ISynth } from '../Synth/Synth';

export enum EnumSynth {
  Synth = 'Synth',
  AMSynth = 'AMSynth',
  DuoSynth = 'DuoSynth',
  FMSynth = 'FMSynth',
  MembraneSynth = 'MembraneSynth',
  MetalSynth = 'MetalSynth',
  MonoSynth = 'MonoSynth'
}

// TODO: Tone not taking typeof Tone
export default function synthBuilder(Tone) {
  const synths = ['Synth', 'AMSynth', 'DuoSynth', 'MembraneSynth'];

  return {
    createSynth,
    createSynthSequence,
    addNoteToChord,
    removeNoteFromChord,
    setNewOctaveToChords,
    options: synths,
  };

  function createSynth(
    instrument: EnumSynth,
    // TODO: took out '= []' from envelope
    envelope: IEnvelope[],
    volume: number,
    effects: IEffects[],
    oscillators: IOscillator
  ) {
    const [attack, decay, sustain, release] = envelope;
    const _synth = new Tone.PolySynth(Tone[instrument], {
      volume: volume,
      portamento: 0.005,
      oscillator: { volume: 12, type: 'sine' },
      envelope: { attack, decay, sustain, release },
    });

    const _effects = mapEffects(effects);

    // const lfo = new Tone[oscillators]('4n', 400, 4000);

    // lfo.connect(_synth.frequency).toDestination();

    _synth.chain(..._effects, Tone.Destination);

    return _synth;
  }

  function createSynthSequence(synth: typeof Tone.Synth, chords: string[][], bars: number, subdivisions: number) {
    const totalTiles = bars * subdivisions;

    const sequence = new Tone.Sequence(
      (time: number, col: number) => {
        if (chords[col].length < 1) return;
        synth.triggerAttackRelease(chords[col], '8n', time);
      },

      createArr(totalTiles, null, (_, idx) => idx),
      `${subdivisions}n`
    );

    sequence.loop = true;
    sequence.start(0);

    return sequence;
  }
  function addNoteToChord(chords: string[][], note: string, col: number) {
    return chords.map((chord, idx) => {
      if (idx !== col) return chord;
      else return [...chord, note];
    });
  }

  function removeNoteFromChord(chords: string[][], note: string, col: number) {
    return chords.map((chord, idx) => {
      if (idx !== col) return chord;
      else return chord.filter((_note) => _note !== note);
    });
  }

  function setNewOctaveToChords(chords: string[][], octave: number) {
    return chords.map((chord) =>
      chord.map((el) => el.replace(/[0-9]/g, String(octave)))
    );
  }

  function mapEffects(effects: IEffects[]) {
    return effects.map((_effect) => _effect.method);
  }
}

const savedPattern = [
  ['C5', 'G5'],
  [],
  [],
  [],
  ['D5', 'F#5', 'A5'],
  [],
  [],
  [],
  ['E5', 'G#5', 'B5', 'C#5'],
  [],
  [],
  [],
  ['G5', 'A5', 'D5'],
  [],
  [],
  [],
];

// const savedMatrix = [
//   [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

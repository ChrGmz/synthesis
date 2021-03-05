import { createArr } from '@utils';

export default function synthBuilder(Tone) {
  const synths = ['Synth', 'AMSynth', 'DuoSynth', 'MembraneSynth'];

  return {
    createSynth,
    createSynthSequence,
    addNoteToChord,
    removeNoteFromChord,
    setNewPitchToChords,
    options: synths,
  };

  function createSynth(instrument, envelope, volume, effects, oscillators) {
    const [attack, decay, sustain, release] = envelope;
    const _synth = new Tone.PolySynth(Tone[instrument], {
      volume: volume,
      portamento: 0.005,
      oscillator: { volume: 12, type: 'sine' },
      envelope: { attack, decay, sustain, release },
    });

    const _effects = mapEffects(effects);

    console.log(_synth.frequency);
    // const lfo = new Tone[oscillators]('4n', 400, 4000);

    // lfo.connect(_synth.frequency).toDestination();

    _synth.chain(..._effects, Tone.Destination);

    return _synth;
  }

  function createSynthSequence(synth, chords, bars, subdivisions) {
    const totalTiles = bars * subdivisions;

    const sequence = new Tone.Sequence(
      (time, col) => {
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
  function addNoteToChord(chords, note, col) {
    return chords.map((chord, idx) => {
      if (idx !== col) return chord;
      else return [...chord, note];
    });
  }

  function removeNoteFromChord(chords, note, col) {
    return chords.map((chord, idx) => {
      if (idx !== col) return chord;
      else return chord.filter((_note) => _note !== note);
    });
  }

  function setNewPitchToChords(chords, pitch) {
    return chords.map((chord) =>
      chord.map((el) => el.replace(/[0-9]/g, pitch))
    );
  }

  function mapEffects(effects) {
    return effects.map((_effect) => _effect.method);
  }
}

// const savedPattern = [
//   ['D#2'],
//   [],
//   [],
//   ['C2'],
//   [],
//   [],
//   ['G2'],
//   [],
//   [],
//   [],
//   ['D#2'],
//   [],
//   ['C2'],
//   [],
//   [],
//   [],
// ];

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

import { createArr } from '@utils';

export default function synthBuilder(Tone) {
  return {
    createSynth,
    createSynthSequence,
    createArpeggiatorSequence,
    setNewOctaveToProgression,
  };

  function createSynth(
    instrument,
    envelope = [],
    volume,
    effects,
    oscillator,
    mute
  ) {
    const [attack, decay, sustain, release] = envelope;
    const { oscVol, oscType } = oscillator;

    const _synth = new Tone[instrument]({
      volume: volume,
      portamento: 0.1,
      oscillator: oscType ? { volume: oscVol, type: oscType } : null,
      envelope: { attack, decay, sustain, release },
    });

    let _effects = mapEffects(effects);

    if (mute) {
      console.log('hiya');

      const vol = new Tone.Volume();
      vol.mute = true;
      _effects = [vol];
    }

    _synth.chain(..._effects, Tone.Destination);

    return _synth;
  }

  function createSynthSequence(synth, progression, bars, subdivisions) {
    const totalTiles = bars * subdivisions;

    const sequence = new Tone.Sequence(
      (time, col) => {
        if (!progression[col]) return;
        synth.triggerAttackRelease(progression[col], '8n', time);
      },

      createArr(totalTiles, null, (_, idx) => idx),
      `${subdivisions}n`
    );

    sequence.playbackRate = 0.5;

    sequence.loop = true;
    sequence.start(0);

    return sequence;
  }

  function createArpeggiatorSequence(synth, progression) {
    const sequence = new Tone.Pattern(
      (time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
      },
      progression,
      'alternateUp'
    );

    sequence.playbackRate = 2;
    sequence.loop = true;
    sequence.start(0);

    return sequence;
  }

  // function createArpeggiatorSequence(synth, progression) {
  //   const sequence = new Tone.Sequence((time, note) => {
  //     synth.triggerAttackRelease(note, '8n', time);
  //   }, progression);

  //   sequence.playbackRate = 2;
  //   sequence.loop = true;
  //   sequence.start(0);

  //   return sequence;
  // }

  function setNewOctaveToProgression(progression, octave) {
    return progression.map(
      (note) => typeof note === 'string' && note.replace(/[0-9]/g, octave)
    );
  }

  function mapEffects(effects) {
    return effects.map((_effect) => _effect.method);
  }
}

/* additional configs
  -----
  Synths
  Scale and Key for random pattern
  -----
  Sequencer/Arpeggiator
  humanize
  -----
  Arpeggiator
  CtrlPattern - options: down, up, upDown, downUp, alternateUp, alternateDown, random, randomWalk, randomOnce
  -----
  AMSynth
  harmonicity : 3 ,
  detune : 0 ,
  oscillator : {
  type : sine
  } ,
  envelope : {
  attack : 0.01 ,
  decay : 0.01 ,
  sustain : 1 ,
  release : 0.5
  } ,
  modulation : {
  type : square
  } ,
  modulationEnvelope : {
  attack : 0.5 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  }
  -----
  FMSynth
  {
  harmonicity : 3 ,
  modulationIndex : 10 ,
  detune : 0 ,
  oscillator : {
  type : sine
  } ,
  envelope : {
  attack : 0.01 ,
  decay : 0.01 ,
  sustain : 1 ,
  release : 0.5
  } ,
  modulation : {
  type : square
  } ,
  modulationEnvelope : {
  attack : 0.5 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  }
  }
  -----
  DuoSynth
  {
  vibratoAmount : 0.5 ,
  vibratoRate : 5 ,
  harmonicity : 1.5 ,
  voice0 : {
  volume : -10 ,
  portamento : 0 ,
  oscillator : {
  type : sine
  } ,
  filterEnvelope : {
  attack : 0.01 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  } ,
  envelope : {
  attack : 0.01 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  }
  } ,
  voice1 : {
  volume : -10 ,
  portamento : 0 ,
  oscillator : {
  type : sine
  } ,
  filterEnvelope : {
  attack : 0.01 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  } ,
  envelope : {
  attack : 0.01 ,
  decay : 0 ,
  sustain : 1 ,
  release : 0.5
  }
  }
  }
  -----
  MembraneSynth
  {
  pitchDecay : 0.05 ,
  octaves : 10 ,
  oscillator : {
  type : sine
  } ,
  envelope : {
  attack : 0.001 ,
  decay : 0.4 ,
  sustain : 0.01 ,
  release : 1.4 ,
  attackCurve : exponential
  }
  }
  -----
  MetalSynth
  {
  frequency : 200 ,
  envelope : {
  attack : 0.001 ,
  decay : 1.4 ,
  release : 0.2
  } ,
  harmonicity : 5.1 ,
  modulationIndex : 32 ,
  resonance : 4000 ,
  octaves : 1.5
  }
  -----
  MonoSynth
  {
  frequency : C4 ,
  detune : 0 ,
  oscillator : {
  type : square
  } ,
  filter : {
  Q : 6 ,
  type : lowpass ,
  rolloff : -24
  } ,
  envelope : {
  attack : 0.005 ,
  decay : 0.1 ,
  sustain : 0.9 ,
  release : 1
  } ,
  filterEnvelope : {
  attack : 0.06 ,
  decay : 0.2 ,
  sustain : 0.5 ,
  release : 2 ,
  baseFrequency : 200 ,
  octaves : 7 ,
  exponent : 2
  }
  }
*/

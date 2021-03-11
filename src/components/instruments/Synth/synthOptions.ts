const synthOptions = {};

const synthSubCategoryOptions = {
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

export default synthSubCategoryOptions;

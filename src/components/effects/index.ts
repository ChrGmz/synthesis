interface EffectsList {
  Distortion: number[];
  Phaser: PhaserObject[];
  Compressor: [number, number];
  Filter: [number, String];
  Tremolo: [number, number];
  PitchShift: [number];
  Reverb: [number];
  Delay: [string, number];
  Freeverb: [];
  FeedbackDelay: [string, number];
}

interface PhaserObject {
  frequency: number;
  // changed the octaves type to number as per the Tone docs.
  octaves: number;
  baseFrequency: number;
}

const effectsList: EffectsList = {
  Distortion: [0.8],
  Phaser: [
    {
      frequency: 1,
      // changed to number as per Tone documentation
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

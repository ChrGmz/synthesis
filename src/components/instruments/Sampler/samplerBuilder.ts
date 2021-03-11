import { createArr } from '@utils';

export default function samplerBuilder(Tone) {
  return {
    createSample,
    createSequence,
    activeTilesByStep,
  };

  function createSample(instrument, subCategory, volume, effects, mute) {
    const _sample = new Tone.Sampler({
      urls: {
        A1: `http://localhost:3001/samples/${subCategory}/${instrument}`,
      },
      onload: () => {
        console.log(`${instrument} loaded`);
      },
      volume: volume,
    });

    //add effects to sample, if any
    const _effects = effects.map((_effect) => _effect.method);

    if (mute) {
      const vol = new Tone.Volume();
      vol.mute = true;
      _effects.push(vol);
    }
    _sample.chain(..._effects, Tone.Destination);

    return _sample;
  }

  function activeTilesByStep(totalTiles, step) {
    return createArr(totalTiles, null, (_, idx) => {
      return idx % step === 0 ? 1 : 0;
    });
  }

  function createSequence(sample, pattern, bars, subdivisions, humanize) {
    const totalTiles = bars * subdivisions;
    const note = 'F1';

    const sequence = new Tone.Sequence(
      (time, col) => {
        if (pattern[col] !== 0) sample.triggerAttackRelease(note, '1n', time);
      },
      createArr(totalTiles, null, (_, idx) => idx),
      `${subdivisions}n`
    );

    sequence.humanize = humanize;
    sequence.loop = true;
    sequence.start(0);

    return sequence;
  }
}

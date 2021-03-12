import React, { useRef } from 'react';

import { useDebounce } from '@utils';

import styles from './SelectionItems.module.scss';

function SelectionItems({
  Tone,
  volume,
  category,
  subCategory,
  instrument,
  handleSelectInstrument,
}) {
  const prevSample = useRef(null);

  const handleClick = useDebounce(
    category === 'sampler' ? handleSample : handleSynth,
    250
  );

  function handleDoubleClick() {
    handleSelectInstrument(category, subCategory, instrument);
  }

  function handleSample() {
    prevSample.current && prevSample.current.dispose();
    const _sample = new Tone.Sampler({
      urls: {
        A1: `http://localhost:3001/samples/${subCategory}/${instrument}`,
      },
      onload: () => {
        _sample.triggerAttackRelease('F1', 2.5);
        prevSample.current = _sample;
      },
      volume: volume,
    }).toDestination();
  }

  function handleSynth() {
    const _synth = new Tone[instrument]({
      volume: volume,
    }).toDestination();

    _synth.triggerAttackRelease('C4', 0.25);

    prevSample.current && prevSample.current.dispose();
  }

  return (
    <div
      className={styles.container}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <p className={styles.name}>{instrument.replace(/(wav|aif)$/, '')}</p>
    </div>
  );
}

export default SelectionItems;

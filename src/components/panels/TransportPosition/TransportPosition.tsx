import React, { useState, useEffect, useRef } from 'react';
import { createArr } from '@utils';

import styles from './TransportPosition.module.scss';

function TransportPosition({ Tone, maxBars, metronomeVol }) {
  const [activeCol, setActiveCol] = useState(Tone.Transport.position);

  const tiles = maxBars * 16;

  useEffect(() => {
    const sample = new Tone.Sampler({
      urls: {
        A1: `assets/samples/metronome.wav`,
      },
      onload: () => {
        console.log(`metronome loaded`);
      },
      volume: metronomeVol,
    }).toDestination();

    const sequence = new Tone.Sequence(
      (_, col) => {
        // col % 4 === 0 && sample.triggerAttackRelease('F1', 0.5);
        setActiveCol(col);
      },
      createArr(tiles, null, (_, idx) => idx),
      `16n`
    );

    sequence.loop = true;
    sequence.start(0);

    return () => {
      sequence.dispose();
      sample.dispose();
      console.log(`metronome disposed`);
    };
  }, [Tone.Sampler, Tone.Sequence, tiles, metronomeVol]);

  function renderTiles() {
    return createArr(tiles, null, (_, idx) => {
      return (
        <div
          className={`${styles.tile} ${
            idx === activeCol ? styles.active : null
          }`}
          key={idx}
        >
          {idx + 1}
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>
      <div className={styles.noteSeparator}></div>
      <div className={styles.sequence}>{renderTiles()}</div>
    </div>
  );
}

export default TransportPosition;

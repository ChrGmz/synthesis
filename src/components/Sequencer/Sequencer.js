import React, { useState } from 'react';
import Tile from '../Tile/Tile';
import { useDebounce } from 'utils/index';

import styles from './Sequencer.module.scss';

const Sequencer = React.memo(function Sequencer({
  instrument,
  pattern,
  toggleActive,
  note,
  keyboard,
  pitch = 4,
}) {
  const [isPainting, setIsPainting] = useState(false);

  function handlePainting() {
    setIsPainting(!isPainting);
  }

  function renderKeyboard() {
    const notes = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ];

    const length = notes.length;
    return pattern.map((_pattern, row) => {
      const note = notes[row % length] + String(pitch);
      return renderSequence(_pattern, note, row);
    });
  }

  function renderSequence(_pattern = pattern, _note = note, row = 0) {
    return (
      <div className={styles.sequence} key={`R-${row}-N${note}`}>
        <div className={styles.noteTile}>
          <h3>{_note.replace(/[0-9]/g, '')}</h3>
        </div>
        {_pattern.map((active, col) => {
          return (
            <Tile
              instrument={instrument}
              note={_note}
              key={`R${row}-C${col}-N${_note}`}
              active={active !== 0}
              row={row}
              col={col}
              toggleActive={toggleActive}
              handlePainting={handlePainting}
              isPainting={isPainting}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.sequencer} onMouseLeave={() => setIsPainting(false)}>
      {keyboard ? renderKeyboard() : renderSequence()}
    </div>
  );
},
compareChangeInPattern);

function compareChangeInPattern(prevProps, newProps) {
  return (
    prevProps.pattern === newProps.pattern &&
    prevProps.instrument === newProps.instrument
  );
}

export default Sequencer;

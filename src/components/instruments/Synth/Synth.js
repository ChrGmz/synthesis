import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import Sequencer from '@components/Sequencer/Sequencer';
import Select from '@components/Select/Select';

import { createArr, createMatrix } from '@utils';
import synthBuilder from './synthBuilder';
import styles from './Synth.module.scss';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function Synth({ Tone, dispatch, active, properties }) {
  const {
    effects,
    id,
    volume,
    bars,
    subdivisions,
    pitch,
    envelope,
    savedChords = [],
    savedPattern = [],
  } = properties;

  const {
    createSynth,
    createSynthSequence,
    addNoteToChord,
    removeNoteFromChord,
    setNewPitchToChords,
    options,
  } = synthBuilder(Tone);

  const [instrument, setInstrument] = useState('Synth');
  const [synth, setSynth] = useState(null);
  const [chords, setChords] = useState(savedChords);
  const [pattern, setPattern] = useState(savedPattern);
  const [name, setName] = useState('synth');

  const totalTiles = bars * subdivisions;

  useEffect(() => {
    const _synth = createSynth(instrument, envelope, volume, effects);
    setSynth(_synth);

    return () => {
      console.log('disposing synth');
      synth && synth.dispose();
    };
    //eslint-disable-next-line
  }, [Tone.PolySynth, Tone.Synth, volume, envelope, effects, instrument]);

  const toggleActive = (col, row, note) => {
    const _pattern = [...pattern];
    let _chords;

    if (_pattern[row][col] === 0) {
      _chords = addNoteToChord(chords, note, col);
      _pattern[row][col] = 1;
    } else {
      _chords = removeNoteFromChord(chords, note, col);
      _pattern[row][col] = 0;
    }

    setPattern(_pattern);
    setChords(_chords);
  };

  //TODO: decide if this feature is worth it or not
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (chords && !isInitialMount.current) {
      const _chords = setNewPitchToChords(chords, pitch);
      setChords(_chords);
    }

    //eslint-disable-next-line
  }, [pitch]);

  useEffect(() => {
    const sequence = createSynthSequence(synth, chords, bars, subdivisions);

    return () => {
      console.log('disposing sequence');
      sequence.dispose();
    };
  }, [Tone, bars, chords, createSynthSequence, subdivisions, synth]);

  //rerender pattern if the amount of bars changes
  useLayoutEffect(() => {
    setPattern(createMatrix(notes.length, totalTiles));
    setChords(createArr(totalTiles, []));
  }, [totalTiles]);

  const handleSetActiveInstrument = () =>
    dispatch({ type: 'SET_ACTIVE_INSTRUMENT', id });

  const handleDeleteInstrument = () =>
    dispatch({ type: 'DELETE_INSTRUMENT', id });

  const handleSelectInstrument = (option) => setInstrument(option);

  return (
    <>
      <div className={styles.instrument}>
        <div className={`${styles.panel} ${active && styles.activePanel}`}>
          <h1 className={styles.delete} onClick={handleDeleteInstrument}>
            X
          </h1>
          <p>{name}</p>
          <span>|</span>
          <Select onChangeFn={handleSelectInstrument} options={options} />
          <div
            className={`${styles.fxButton} ${active && styles.activeButton}`}
            onClick={handleSetActiveInstrument}
          >
            FX
          </div>
        </div>
        <div className={styles.keyboard}>
          <Sequencer
            instrument={synth}
            pattern={pattern}
            toggleActive={toggleActive}
            keyboard={true}
            pitch={pitch}
          />
        </div>
      </div>
    </>
  );
}

export default Synth;

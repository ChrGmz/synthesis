import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import * as Tone from 'tone';
import { IAction, IEffects, IEnvelope, IInstrument, IOscillator } from '../../../context/stateReducer';
import { IMenuOptions } from '../InstrumentContainer/InstrumentContainer';

import InstrumentContainer from '../InstrumentContainer/InstrumentContainer';
import Sequencer from '../../Sequencer/Sequencer';
import Select from '../../Select/Select';

import { createArr, createMatrix, compareChanges } from '../../../utils';
import polySynth from './polySynthBuilder';

import styles from './PolySynth.module.scss';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface IPolySynth {
  Tone: typeof Tone,
  dispatch: React.Dispatch<IAction>,
  active: boolean,
  properties: IProperties,
  instrument: IInstrument,
  subCategory: string
}

export interface IProperties {
  effects: IEffects[],
  id: string,
  volume: number,
  bars: number,
  subdivisions: number,
  octave: number,
  envelope: IEnvelope[],
  oscillators: IOscillator[],
  savedChords: string[][],
  savedPattern: number[][]
}

export type SynthRefLike = {
  dispose:  | null,
}

const PolySynth = React.memo(function PolySynth({
  Tone,
  dispatch,
  active,
  properties,
  instrument: _instrument,
  subCategory,
}: IPolySynth) {
  const {
    effects,
    id,
    volume,
    bars,
    subdivisions,
    octave,
    envelope,
    oscillators,
    savedChords = [],
    savedPattern = [],
  } = properties;

  const {
    createSynth,
    createSynthSequence,
    addNoteToChord,
    removeNoteFromChord,
    setNewOctaveToChords,
    options,
  } = polySynth(Tone);

  const [instrument, setInstrument] = useState(_instrument);
  // TODO: Help request
  const [synth, setSynth]: [Tone.PolySynth | null, React.Dispatch<any>] = useState(null);
  const [chords, setChords] = useState(savedChords);
  const [pattern, setPattern] = useState(savedPattern);

  const totalTiles = bars * subdivisions;

  useEffect(() => {
    const _synth = createSynth(
      instrument,
      envelope,
      volume,
      effects,
      oscillators
    );
    setSynth(_synth);

    return () => {
      console.log('disposing synth');
      synth && synth.dispose();
    };
    //eslint-disable-next-line
  }, [
    Tone.PolySynth,
    Tone.Synth,
    volume,
    envelope,
    effects,
    instrument,
    octave,
  ]);

  const toggleActive = (col: number, row: number, note: string) => {
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
      const _chords = setNewOctaveToChords(chords, octave);
      setChords(_chords);
    }

    //eslint-disable-next-line
  }, [octave]);

  useEffect(() => {
    const sequence = createSynthSequence(synth, chords, bars, subdivisions);

    return () => {
      console.log('disposing sequence');
      sequence.dispose();
    };
  }, [Tone, bars, chords, createSynthSequence, subdivisions, synth]);

  //rerender pattern if the amount of bars changes
  useLayoutEffect(() => {
    setPattern([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    // setChords(createArr(totalTiles, []));
    setChords([
      [],
      [],
      ['D3', 'F3', 'A3'],
      [],
      ['D3', 'F3', 'A3'],
      [],
      [],
      ['E3', 'G3', 'B3'],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
  }, [totalTiles]);

  function handleActiveInstrument() {
    active
      ? dispatch({ type: 'REMOVE_ACTIVE_INSTRUMENT' })
      : dispatch({ type: 'SET_ACTIVE_INSTRUMENT', id });
  }

  const handleDeleteInstrument = () =>
    dispatch({ type: 'DELETE_INSTRUMENT', id });

  const handleSelectInstrument = (option) => setInstrument(option);

  // TODO: Help request
  const menuOptions: IMenuOptions = [];

  return (
    <>
      <div className={styles.instrument}>
        <InstrumentContainer
          handleSelectInstrument={handleSelectInstrument}
          handleActiveInstrument={handleActiveInstrument}
          handleDeleteInstrument={handleDeleteInstrument}
          menuOptions={menuOptions}
          options={options}
          name={`${subCategory} | ${_instrument}`}
          active={active}
        />
        <div className={styles.keyboard}>
          <Sequencer
            instrument={synth}
            pattern={pattern}
            toggleActive={toggleActive}
            keyboard={true}
            octave={octave}
          />
        </div>
      </div>
    </>
  );
},
compareChanges);

export default PolySynth;

// [["D3","F3","A3"],[],["D3","F3","A3"],[],[],["E3","G3","B3"],[],[],[],[],[],[],[],[],[],[]]

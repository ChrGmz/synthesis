import React from 'react';
import { AnySynth } from '../instruments/Synth/Synth';
import styles from './Tile.module.scss';
import * as Tone from 'tone';

interface ITile {
  instrument: AnySynth | Tone.PolySynth | Tone.Sampler | null,
  note?: string,
  active: boolean,
  row: number,
  col: number,
  toggleActive: (col: number, row: number, note: string) => void,
  handlePainting: () => void,
  isPainting: boolean,
}

function Tile({
  instrument,
  note,
  active,
  row,
  col,
  toggleActive,
  handlePainting,
  isPainting,
}: ITile) {
  function handlePlay() {
    if (active) return;
    if (note) {
      instrument?.triggerAttackRelease(note, 0.5);
    }
  }

  function handleMouseDown() {
    if (note) {
      handlePlay();
      toggleActive(col, row, note);
      handlePainting();
    } else {
      handlePlay();
      handlePainting();
    }
  }

  function handleMouseEnter() {
    if (isPainting === false) return;
    if (note) {
      toggleActive(col, row, note);
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handlePainting}
      className={`${active ? styles.active : null} ${styles.tile}`}
    ></div>
  );
}

export default Tile;

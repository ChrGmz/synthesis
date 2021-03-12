import React from 'react';
import styles from './Tile.module.scss';

function Tile({
  instrument,
  note,
  active,
  row,
  col,
  toggleActive,
  handlePainting,
  isPainting,
}) {
  function handlePlay() {
    if (active) return;
    instrument.triggerAttackRelease(note, 0.5);
  }

  function handleMouseDown() {
    handlePlay();
    toggleActive(col, row, note);
    handlePainting();
  }

  function handleMouseEnter() {
    if (isPainting === false) return;
    toggleActive(col, row, note);
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

import React from 'react';

import Select from '@components/Select/Select';

import styles from './Oscillator.module.scss';

function Oscillator({ dispatch }) {
  const options = ['sine', 'square', 'sawtooth', 'triangle'];

  function handleOscillator(oscType) {
    dispatch({ type: 'UPDATE_OSCILLATOR', oscType });
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>1</h3>
      <Select options={options} onChangeFn={handleOscillator} />
      <h3 className={styles.title}>2</h3>
      <Select options={options} onChangeFn={handleOscillator} />
    </div>
  );
}

export default Oscillator;

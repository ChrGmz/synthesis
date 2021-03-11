import React from 'react';
import Select from '@components/Select/Select';

import styles from './BarsPanelModule.module.scss';

function BarsPanelModule({
  handleMaxTiles,
  barsOptions,
  getOptionsIdx,
  bars,
  handleOctave,
  octaveOptions,
  octave,
}) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Bars</label>
      <Select
        onChangeFn={handleMaxTiles}
        options={barsOptions}
        initialOption={barsOptions[getOptionsIdx(bars)]}
      />
      <label className={styles.label}>Octave</label>
      <Select
        onChangeFn={handleOctave}
        options={octaveOptions}
        initialOption={octave}
      />
    </div>
  );
}

export default BarsPanelModule;

import React from 'react';
import Select from '../../Select/Select';

import styles from './BarsPanelModule.module.scss';

interface IBarsPanelArguments {
  handleMaxTiles: (a: string) => void,
  barsOptions: string[],
  getOptionsIdx: (a: number) => number,
  bars: string,
  handleOctave: (a: number) => void,
  octaveOptions: number[],
  octave: number
}

function BarsPanelModule({
  handleMaxTiles,
  barsOptions,
  getOptionsIdx,
  bars,
  handleOctave,
  octaveOptions,
  octave,
}: IBarsPanelArguments): JSX.Element {
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

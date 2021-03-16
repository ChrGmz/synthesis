import React from 'react';
import Select from '../../Select/Select';

import styles from './BarsPanelModule.module.scss';

interface IBarsPanelArguments {
  handleMaxTiles: (_bars: string) => void,
  barsOptions: string[],
  getOptionsIdx: (num: number) => number,
  bars: number,
  handleOctave: (_octave: number) => void,
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
      {/* <Select
        onChangeFn={handleOctave}
        options={octaveOptions}
        initialOption={octave}
      /> */}
    </div>
  );
}

export default BarsPanelModule;

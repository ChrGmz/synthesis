import React from 'react';
import Slider from '../Slider/Slider';

import styles from './VolumePanelModule.module.scss';

interface IVolumePanelArguments {
  handleVolume: (a: number) => void,
  volume: number
}

function VolumePanelModule({ handleVolume, volume }: IVolumePanelArguments): JSX.Element {
  return (
    <div className={styles.container}>
      <Slider
        handleChangeFn={() => null}
        min={-60}
        max={10}
        defaultVal={-25}
        label="GAIN"
      />
      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        defaultVal={+volume}
        label="VOL"
      />
    </div>
  );
}

export default VolumePanelModule;

import React from 'react';
import Slider from '../Slider/Slider';

import styles from './EnvelopePanel.module.scss';

interface IEnvelopePanel {
  handleVolume: ((a: number) => void) | (() => null),
  volume: number,
} 

function EnvelopePanel({ handleVolume, volume }: IEnvelopePanel) {
  return (
    <div className={styles.subPanelContainer}>
      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        defaultVal={volume}
        label="A"
      />
      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        defaultVal={volume}
        label="D"
      />
      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        defaultVal={volume}
        label="S"
      />
      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        defaultVal={volume}
        label="R"
      />
    </div>
  );
}

export default EnvelopePanel;

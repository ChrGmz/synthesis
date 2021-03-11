import React, { useEffect } from 'react';

import PanelModuleContainer from '@panels/PanelModuleContainer/PanelModuleContainer';
import Visualizer from '@panels/Visualizer/Visualizer';
import Slider from '@panels/Slider/Slider';

import { Play, Pause } from '@resources/icons';
import styles from './MasterPanel.module.scss';

function MasterPanel({
  Tone,
  dispatch,
  playState,
  handleTransport,
  masterProperties,
}) {
  const { metronomeVol, bpm, volume } = masterProperties;

  const handleBPM = (value) => dispatch({ type: 'UPDATE_BPM', value });

  const handleBPMVol = (value) =>
    dispatch({ type: 'UPDATE_METRONOME_VOL', value });

  const handleVolume = (value) =>
    dispatch({ type: 'UPDATE_MASTER_VOLUME', value });

  return (
    <div className={styles.container}>
      <div className={styles.panelTitle}>
        <h2>Master</h2>
      </div>

      <div onClick={handleTransport} className={styles.transportButton}>
        {playState === 'stopped' ? <Play /> : <Pause />}
      </div>

      <Slider
        handleChangeFn={handleVolume}
        min={-60}
        max={10}
        step={1}
        label={`MST VOL`}
        defaultVal={volume}
        noRotate={true}
      />
      <Slider
        handleChangeFn={handleBPM}
        min={60}
        max={240}
        step={5}
        label={`BPM-${bpm}`}
        defaultVal={bpm}
        noRotate={true}
      />
      <Slider
        handleChangeFn={handleBPMVol}
        min={-60}
        max={10}
        step={1}
        label={`BPM VOL`}
        defaultVal={metronomeVol}
        noRotate={true}
      />
    </div>
  );
}

export default MasterPanel;

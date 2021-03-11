import React, { useState } from 'react';

import panelModules from '@panels/index.PanelModule';
import PanelModuleContainer from '@panels/PanelModuleContainer/PanelModuleContainer';
import { createArr } from '@utils/';

import { ArrowL, ArrowR } from '@resources/icons';

import styles from './InstrumentPanel.module.scss';

function InstrumentPanel({ dispatch, activeInstrument, effectsList }) {
  const panels =
    activeInstrument?.category === 'sampler'
      ? ['bars', 'effects', 'volume', 'oscillator', 'adsr']
      : ['adsr', 'oscillator', 'effects', 'volume', 'bars'];

  const [activePanels, setActivePanels] = useState(panels);

  if (!activeInstrument) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.title} style={{ alignSelf: 'center' }}>
          Select your instrument
        </h1>
      </div>
    );
  }

  const { effects, volume, bars, octave, envelope } = activeInstrument;

  const handleVolume = (_volume) =>
    dispatch({ type: 'UPDATE_INSTRUMENT_VOLUME', volume: _volume });

  const handleMaxTiles = (_bars) => dispatch({ type: 'SET_BARS', bars: _bars });

  const handleOctave = (_octave) =>
    dispatch({ type: 'SET_OCTAVE', octave: _octave });

  const barsOptions = ['1/4', '1/2', '1', '2'];
  const octaveOptions = createArr(7, null, (_, idx) => idx + 1);

  const moduleProps = {
    adsr: {
      envelope,
      dispatch,
    },
    effects: {
      activeInstrumentEffects: effects,
      effectsList,
      dispatch,
    },
    bars: {
      handleMaxTiles,
      barsOptions,
      getOptionsIdx,
      bars,
      handleOctave,
      octaveOptions,
      octave,
    },
    volume: {
      handleVolume,
      volume,
    },
    oscillator: {
      dispatch,
    },
  };

  function handleRight() {
    const _panels = [...activePanels];
    const _panel = _panels.shift();
    _panels.push(_panel);

    setActivePanels(_panels);
  }

  function handleLeft() {
    const _panels = [...activePanels];
    const _panel = _panels.pop();
    _panels.unshift(_panel);

    setActivePanels(_panels);
  }

  function renderPanels() {
    return activePanels.slice(0, 4).map((_panel, idx) => {
      const newPanel = React.createElement(panelModules[_panel], {
        ...moduleProps[_panel],
        key: _panel,
      });

      return (
        <PanelModuleContainer name={_panel} key={_panel} border={true}>
          {newPanel}
        </PanelModuleContainer>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrow} style={{ left: -15 }} onClick={handleLeft}>
        <ArrowL className={styles.svg} />
      </div>
      {renderPanels()}
      <div
        className={styles.arrow}
        style={{ right: -15 }}
        onClick={handleRight}
      >
        <ArrowR className={styles.svg} />
      </div>
    </div>
  );
}

export default InstrumentPanel;

function getOptionsIdx(num) {
  if (num >= 1) return num + 1;
  else return num * 4 - 1;
}

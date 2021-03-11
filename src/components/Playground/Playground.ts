import React from 'react';

import { instrumentComponents } from './instruments';
import TransportPosition from '@panels/TransportPosition/TransportPosition';

import styles from './Playground.module.scss';

function Playground({
  Tone,
  maxBars,
  dispatch,
  instruments,
  metronomeVol,
  activeInstrumentId,
}) {
  // Create component dynamically, based on the instrument that the user selects
  function renderInstruments() {
    return instruments.map((_instrument) => {
      const { id, category, subCategory, instrument } = _instrument;

      const newInstrument = React.createElement(
        instrumentComponents[category],
        {
          Tone,
          dispatch,
          subCategory,
          instrument,
          key: id,
          properties: _instrument,
          active: id === activeInstrumentId,
        }
      );

      return newInstrument;
    });
  }

  return (
    <div className={styles.playground}>
      {instruments.length > 0 && (
        <div className={styles.playgroundSub}>
          <TransportPosition
            Tone={Tone}
            maxBars={maxBars}
            metronomeVol={metronomeVol}
          />
          <div className={styles.instruments}>{renderInstruments()}</div>
        </div>
      )}
    </div>
  );
}

export default Playground;

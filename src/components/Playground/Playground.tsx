import React from 'react';
import * as Tone from 'tone';

import { instrumentComponents } from '../instruments';
import TransportPosition from '../panels/TransportPosition/TransportPosition';

import styles from './Playground.module.scss';
import { IAction, IInstrument, IInstrumentPolySynth, IInstrumentSampler, IInstrumentSynth } from '../../context/stateReducer';

interface IPlayground {
  maxBars: number,
  dispatch: React.Dispatch<IAction>,
  instruments: IInstrument[],
  metronomeVol: number,
  activeInstrumentId: string | boolean | null,
  categoryErrorFlag?: boolean
}

function getInstrumentComponent(category?: string) {
  if (!category) return undefined;

  switch (category) {
    case 'sampler':
      return instrumentComponents.sampler;
     
    case 'synth':
      return instrumentComponents.synth;

    case 'polySynth':
      return instrumentComponents.polySynth;
  }
}

function Playground({
  maxBars,
  dispatch,
  instruments,
  metronomeVol,
  activeInstrumentId,
}: IPlayground) {
  // Create component dynamically, based on the instrument that the user selects
  function renderInstruments() {
    return instruments.map((_instrument: IInstrument) => {
      if (_instrument) {
        const { id, category, subCategory, instrument } = _instrument;
        const Component = getInstrumentComponent(category);
        
        const newInstrument = Component && <Component
          dispatch={dispatch}
          subCategory={subCategory}
          instrument={instrument}
          key={id}
          properties={_instrument}
          active={id === activeInstrumentId}
        />;
        
        return newInstrument;  
      }
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

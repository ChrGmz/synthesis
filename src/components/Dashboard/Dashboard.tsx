import { useState, useCallback, useEffect } from 'react';
import { useGlobalState } from '../../context/GlobalState';
import InstrumentPanel from '../InstrumentPanel/InstrumentPanel';
import SelectionPanel from '../library/SelectionPanel/SelectionPanel';
import MasterPanel from '../MasterPanel/MasterPanel';

import styles from './Dashboard.module.scss';

import { IInstrument } from '../../context/stateReducer';
import Playground from '../Playground/Playground';

function Dashboard() {
  const { state, dispatch } = useGlobalState();
  const {
    Tone,
    maxBars,
    master,
    effectsList,
    instruments,
    categoryErrorFlag,
    activeInstrumentId,
  } = state;

  const { bpm, volume, metronomeVol } = master;
  const [playState, setPlayState] = useState(Tone.Transport.state);

  useEffect(() => {
    Tone.Transport.set({
      bpm: bpm,
    });
  }, [Tone.Transport, Tone.Transport.bpm, bpm]);

  useEffect(() => {
    Tone.Master.set({
      volume: volume,
    });
  }, [Tone.Master, volume]);

  // Play/Pause master
  const handleTransport: () => void = useCallback(() => {
    if (playState === 'started') Tone.Transport.stop();
    else Tone.Transport.start();

    setPlayState(Tone.Transport.state);
  }, [Tone.Transport, playState]);

  // const activeInstrument = 
  //   activeInstrumentId && getActiveInstrument(instruments, activeInstrumentId);
    
  // TODO : Fixed our issue...but
  const activeInstrument = getActiveInstrument(instruments, activeInstrumentId) || null

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // changed 'which' to 'key' on lines 48 and 51 as ts stated KeyboardEvent.which is deprecated
      const { key } = event;

      // changed 
      switch (key) {
        case ' ': {
          event.preventDefault();
          handleTransport();
          return;
        }
        default: {
          return;
        }
      }
    },
    [handleTransport]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.heading}>
          <h3>SYNTHESIS</h3>
        </div>
        <SelectionPanel
          Tone={Tone}
          dispatch={dispatch}
          categoryErrorFlag={categoryErrorFlag}
          activeInstrumentId={activeInstrumentId}
        />
      </div>
      <div className={styles.panels}>
        <MasterPanel
          Tone={Tone}
          dispatch={dispatch}
          playState={playState}
          masterProperties={master}
          handleTransport={handleTransport}
        />

        <InstrumentPanel
          Tone={Tone}
          dispatch={dispatch}
          effectsList={effectsList}
          activeInstrument={activeInstrument}
        />
        <Playground
          Tone={Tone}
          maxBars={maxBars}
          dispatch={dispatch}
          instruments={instruments}
          metronomeVol={metronomeVol}
          categoryErrorFlag={categoryErrorFlag}
          activeInstrumentId={activeInstrumentId}
        />
      </div>
    </div>
  );
}

export default Dashboard;

//Helper functions
function getActiveInstrument(instruments: IInstrument[], activeInstrumentId: string | boolean | null) {
  const instrument = instruments.find((_instrument) => {
    return _instrument.id === activeInstrumentId;
  });

  return instrument;
}

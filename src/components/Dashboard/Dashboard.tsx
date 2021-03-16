import { useState, useCallback, useEffect } from 'react';
import { useGlobalState } from '../../context/GlobalState.context';
import InstrumentPanel from '../InstrumentPanel/InstrumentPanel';
import SelectionPanel from '../library/SelectionPanel/SelectionPanel';
import MasterPanel from '../MasterPanel/MasterPanel';
import * as Tone from 'tone';

import styles from './Dashboard.module.scss';

import { IInstrument } from '../../context/stateReducer';
import Playground from '../Playground/Playground';

function Dashboard() {
  const { state, dispatch } = useGlobalState();
  const {
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
      bpm,
    });
  }, [Tone.Transport, Tone.Transport.bpm, bpm]);

  useEffect(() => {
    Tone.Master.set({
      volume,
    });
  }, [Tone.Master, volume]);

  // Play/Pause master
  const handleTransport: () => void = useCallback(() => {
    if (playState === 'started') Tone.Transport.stop();
    else Tone.Transport.start();

    setPlayState(Tone.Transport.state);
  }, [Tone.Transport, playState]);

  const activeInstrument = getActiveInstrument(instruments, activeInstrumentId);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // changed 'which' to 'key' on lines 48 and 51 as ts stated KeyboardEvent.which is deprecated
      event.preventDefault();
      const { key } = event;

      // changed 
      switch (key) {
        case ' ': {
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
          dispatch={dispatch}
          categoryErrorFlag={categoryErrorFlag}
          activeInstrumentId={activeInstrumentId}
        />
      </div>
      <div className={styles.panels}>
        <MasterPanel
          dispatch={dispatch}
          playState={playState}
          masterProperties={master}
          handleTransport={handleTransport}
        />

        <InstrumentPanel
          dispatch={dispatch}
          effectsList={effectsList}
          activeInstrument={activeInstrument}
        />
        <Playground
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
function getActiveInstrument(instruments: IInstrument[], activeInstrumentId: string | null) {
  const instrument = instruments.find((_instrument) => {
    return _instrument.id === activeInstrumentId;
  });

  if (instrument) {
    return instrument;
  } else {
    return null;
  }
}

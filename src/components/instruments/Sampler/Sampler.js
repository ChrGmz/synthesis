import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';

import Sequencer from '@components/Sequencer/Sequencer';
import Select from '@components/Select/Select';

import { createArr } from '@utils';
import samplerBuilder from './samplerBuilder';
import styles from './Sampler.module.scss';

function Sampler({ Tone, dispatch, active, properties }) {
  const {
    effects,
    id,
    volume,
    bars,
    subdivisions,
    savedPattern = [],
  } = properties;

  const {
    createSample,
    createSequence,
    activeTilesByStep,
    options,
  } = samplerBuilder(Tone);

  const [instrument, setInstrument] = useState('kick');
  const [sample, setSample] = useState(null);
  const [pattern, setPattern] = useState(savedPattern);

  const totalTiles = bars * subdivisions;
  const note = 'C1';

  // get and update the sample with the correct instrument
  useEffect(() => {
    const _sample = createSample(instrument, volume, effects);
    setSample(_sample);

    return () => _sample.dispose();
    //eslint-disable-next-line
  }, [effects, instrument, volume]);

  useEffect(() => {
    const sequence = createSequence(sample, pattern, bars, subdivisions);

    return () => {
      console.log(`disposing ${instrument} sequence`);
      sequence.dispose();
    };
  }, [bars, createSequence, instrument, pattern, sample, subdivisions]);

  useLayoutEffect(() => {
    setPattern(createArr(totalTiles));
  }, [totalTiles]);

  const toggleActive = useCallback(
    (col) => {
      const _pattern = [...pattern];

      _pattern[col] = _pattern[col] === 0 ? 1 : 0;
      setPattern(_pattern);
    },
    [pattern]
  );

  function setActiveTilesByStep(step) {
    setPattern(activeTilesByStep(totalTiles, step));
  }

  const handleSetActiveInstrument = () =>
    dispatch({ type: 'SET_ACTIVE_INSTRUMENT', id });

  const handleDeleteInstrument = () =>
    dispatch({ type: 'DELETE_INSTRUMENT', id });

  const handleSelectInstrument = (option) => setInstrument(option);

  return (
    <>
      <div className={styles.instrument}>
        <div className={`${styles.panel} ${active && styles.activePanel}`}>
          <h1 className={styles.delete} onClick={handleDeleteInstrument}>
            X
          </h1>
          <p>sampler</p>
          <span>|</span>
          <Select onChangeFn={handleSelectInstrument} options={options} />
          <div
            className={`${styles.fxButton} ${active && styles.activeButton}`}
            onClick={handleSetActiveInstrument}
          >
            FX
          </div>
          <Select
            onChangeFn={setActiveTilesByStep}
            options={[1, 2, 4, 8, 16]}
          />
        </div>
        <Sequencer
          instrument={sample}
          pattern={pattern}
          toggleActive={toggleActive}
          note={note}
        />
      </div>
    </>
  );
}

export default Sampler;

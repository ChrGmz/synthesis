import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';

import Sequencer from '@components/Sequencer/Sequencer';
import InstrumentContainer from '../InstrumentContainer/InstrumentContainer';

import { createArr, compareChanges } from '@utils';
import samplerBuilder from './samplerBuilder';
import styles from './Sampler.module.scss';

const Sampler = React.memo(function Sampler({
  Tone,
  dispatch,
  active,
  properties,
}) {
  const {
    id,
    effects,
    subCategory,
    instrument,
    volume,
    bars,
    subdivisions,
    savedPattern = [],
  } = properties;

  const { createSample, createSequence, activeTilesByStep } = samplerBuilder(
    Tone
  );

  const [sample, setSample] = useState(null);
  const [pattern, setPattern] = useState(savedPattern);

  const [humanize, setHumanize] = useState(false);
  const [mute, setMute] = useState(false);

  const totalTiles = bars * subdivisions;
  const note = 'C1';

  // get and update the sample with the correct instrument
  useEffect(() => {
    const _sample = createSample(
      instrument,
      subCategory,
      volume,
      effects,
      mute
    );

    setSample(_sample);
    return () => {
      console.log('disposing sample');
      sample?.dispose();
    };
    //eslint-disable-next-line
  }, [effects, instrument, volume, mute]);

  useEffect(() => {
    const sequence = createSequence(
      sample,
      pattern,
      bars,
      subdivisions,
      humanize
    );

    return () => {
      console.log(`disposing ${instrument} sequence`);
      sequence.dispose();
    };
  }, [
    bars,
    createSequence,
    instrument,
    pattern,
    sample,
    subdivisions,
    humanize,
  ]);

  useLayoutEffect(() => {
    setInitialPattern();
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

  function handleActiveInstrument() {
    active
      ? dispatch({ type: 'REMOVE_ACTIVE_INSTRUMENT', id })
      : dispatch({ type: 'SET_ACTIVE_INSTRUMENT', id });
  }

  const handleDeleteInstrument = () =>
    dispatch({ type: 'DELETE_INSTRUMENT', id });

  // const handleSelectInstrument = (option) => setInstrument(option);
  function shiftPatternRight() {
    const _pattern = _shiftPatternRight(pattern);
    setPattern(_pattern);
  }

  function shiftPatternLeft() {
    const _pattern = _shiftPatternLeft(pattern);
    setPattern(_pattern);
  }

  const setInitialPattern = () => setPattern(createArr(totalTiles));

  const toggleHumanize = () => setHumanize(!humanize);

  const handleMute = () => setMute(!mute);

  const menuOptions = [
    { name: 'Shift Pattern Left', method: shiftPatternLeft },
    { name: 'Shift Pattern Right', method: shiftPatternRight },
    {
      name: 'Set Every 1 Tile',
      method: setActiveTilesByStep,
      args: [1],
    },
    {
      name: 'Set Every 2 Tiles',
      method: setActiveTilesByStep,
      args: [2],
    },
    {
      name: 'Set Every 4 Tiles',
      method: setActiveTilesByStep,
      args: [4],
    },
    {
      name: 'Set Every 8 Tiles',
      method: setActiveTilesByStep,
      args: [8],
    },
    {
      name: 'Set Every 16 Tiles',
      method: setActiveTilesByStep,
      args: [16],
    },
    {
      name: 'Reset Pattern',
      method: setInitialPattern,
    },
    {
      name: `Turn Humanize ${humanize ? 'Off' : 'On'}`,
      method: toggleHumanize,
    },
  ];

  return (
    <>
      <div className={styles.instrument}>
        <InstrumentContainer
          handleMute={handleMute}
          mute={mute}
          handleDeleteInstrument={handleDeleteInstrument}
          handleActiveInstrument={handleActiveInstrument}
          setActiveTilesByStep={setActiveTilesByStep}
          name={instrument}
          active={active}
          menuOptions={menuOptions}
        />
        <Sequencer
          instrument={sample}
          pattern={pattern}
          toggleActive={toggleActive}
          note={note}
        />
      </div>
    </>
  );
},
compareChanges);

export default Sampler;

function _shiftPatternRight(pattern) {
  const _pattern = [...pattern];

  const lastEl = _pattern.pop();

  _pattern.unshift(lastEl);

  return _pattern;
}

function _shiftPatternLeft(pattern) {
  const _pattern = [...pattern];

  const firstEl = _pattern.shift();

  _pattern.push(firstEl);

  return _pattern;
}

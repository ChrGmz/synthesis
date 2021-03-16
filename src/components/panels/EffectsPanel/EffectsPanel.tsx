import React, { useState } from 'react';
import { IEffectsList } from '../../../context/GlobalState.context';
import { IAction, IEffects, Effect } from '../../../context/stateReducer';

import { ArrowU, ArrowD } from '../../../resources/icons';

import styles from './EffectsPanel.module.scss';


interface IEffectsPanelArguments {
  activeInstrumentEffects: IEffects[],
  dispatch: React.Dispatch<IAction>,
  effectsList: Effect[] | string
}

function EffectsPanel({ activeInstrumentEffects, dispatch, effectsList }: IEffectsPanelArguments): JSX.Element {
  
  const [effects, setActiveEffects] = useState(Object.keys(effectsList) as Effect[]);

  function handleEffect(effect: Effect, active: boolean) {
    active ? handleRemoveEffect(effect) : handleAddEffect(effect);
  }

  function handleAddEffect(effect: Effect) {
    dispatch({ type: 'ADD_EFFECT_TO_INSTRUMENT', effect });
  }

  function handleRemoveEffect(effect: Effect) {
    dispatch({ type: 'REMOVE_EFFECT_FROM_INSTRUMENT', effect });
  }

  function renderEffects() {
    console.log(effects, 'que es effects');
    return effects.slice(0, 3).map((_effect, idx: number) => {
      //check if effect is included in the effects of the active instrument and if so set it to active
      const active =
        activeInstrumentEffects &&
        activeInstrumentEffects.some((_eff) => _eff.name === _effect);

      return (
        <div className={styles.effect} key={`${_effect}+1`}>
          <p
            onClick={() => handleEffect(_effect, active)}
            className={active ? styles.activeTitle : null}
            key={`${_effect}+2`}
          >
            {_effect}
          </p>
        </div>
      );
    });
  }

  function handleUp() {
    const _effects = [...effects];
    const _effect = _effects.pop();
    if (_effect)
    _effects.unshift(_effect);

    setActiveEffects(_effects);
  }

  function handleDown() {
    const _effects = [...effects];
    const _effect = _effects.shift();
    if (_effect)
    _effects.push(_effect);

    setActiveEffects(_effects);
  }

  return (
    <>
      <ArrowU className={styles.svg} onClick={handleUp} style={{ top: 5 }} />
      {renderEffects()}
      <ArrowD
        className={styles.svg}
        onClick={handleDown}
        style={{ bottom: 5 }}
      />
    </>
  );
}

export default EffectsPanel;

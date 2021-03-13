import BarsPanelModule from './BarsPanelModule/BarsPanelModule';
import ChartADSR from './ChartADSR/ChartADSR';
import EffectsPanel from './EffectsPanel/EffectsPanel';
import VolumePanelModule from './VolumePanelModule/VolumePanelModule';
import Oscillator from './Oscillator/Oscillator';
import { IAction, IEffects, IEnvelope } from '../../context/stateReducer';
import { IEffectsList } from '../../context/GlobalState.context';

// interface IPanelModules {
//   adsr: (a: IEnvelope, b: React.Dispatch<IAction>) => JSX.Element,
//   effects: () => JSX.Element,
//   bars: () => JSX.Element,
//   volume: () => JSX.Element,
//   oscillator: () => JSX.Element,
// }

const panelModules = {
  adsr: ChartADSR,
  effects: EffectsPanel,
  bars: BarsPanelModule,
  volume: VolumePanelModule,
  oscillator: Oscillator,
};

export default panelModules;


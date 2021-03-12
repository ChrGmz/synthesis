import BarsPanelModule from './BarsPanelModule/BarsPanelModule';
import ChartADSR from './ChartADSR/ChartADSR';
import EffectsPanel from './EffectsPanel/EffectsPanel';
import VolumePanelModule from './VolumePanelModule/VolumePanelModule';
import Oscillator from './Oscillator/Oscillator';

const panelModules = {
  adsr: ChartADSR,
  effects: EffectsPanel,
  bars: BarsPanelModule,
  volume: VolumePanelModule,
  oscillator: Oscillator,
};

export default panelModules;

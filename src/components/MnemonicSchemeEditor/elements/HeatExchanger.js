import heatExchanger, {ReactComponent as heatExchangerSvg} from '.../../../assets/images/HeatExchanger.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class HeatExchanger extends AbstractSimpleFigure {
  code = () => {
    return 'HeatExchanger'
  };

  groupCode = () => {
    return 'heatExchangers'
  };

  name = () => {
    return 'Аппарат теплообменный листовой спиральный'
  };

  image = () => {
    return heatExchanger
  };

  svgImage = () => {
    return heatExchangerSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [
    [{rotate: 90}],
    [{rotate: 180}],
    [{rotate: 270}]
  ];
}

export default HeatExchanger

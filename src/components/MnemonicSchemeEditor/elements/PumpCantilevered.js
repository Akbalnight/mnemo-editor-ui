import pumpCantilevered, {ReactComponent as pumpCantileveredSvg} from '.../../../assets/images/PumpCantilevered.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpCantilevered extends AbstractSimpleFigure {
  code = () => {
    return 'PumpCantilevered'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос консольный'
  };

  image = () => {
    return pumpCantilevered
  };

  svgImage = () => {
    return pumpCantileveredSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default PumpCantilevered

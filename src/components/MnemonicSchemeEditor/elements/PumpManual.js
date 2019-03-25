import pumpManual, {ReactComponent as pumpManualSvg} from '.../../../assets/images/PumpManual.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpManual extends AbstractSimpleFigure {
  code = () => {
    return 'PumpManual'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос ручной'
  };

  image = () => {
    return pumpManual
  };

  svgImage = () => {
    return pumpManualSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default PumpManual

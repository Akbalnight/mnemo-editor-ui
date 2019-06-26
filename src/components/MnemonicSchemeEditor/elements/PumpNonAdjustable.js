import pumpNonAdjustable, {ReactComponent as pumpNonAdjustableSvg} from '../../../assets/images/PumpNonAdjustable.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpNonAdjustable extends AbstractSimpleFigure {
  code = () => {
    return 'PumpNonAdjustable'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос нерегулируемый с нереверсивным потоком'
  };

  image = () => {
    return pumpNonAdjustable
  };

  svgImage = () => {
    return pumpNonAdjustableSvg
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

export default PumpNonAdjustable

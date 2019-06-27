import pumpNonAdjustableReverse, {ReactComponent as pumpNonAdjustableReverseSvg} from '../../../assets/images/PumpNonAdjustableReverse.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpNonAdjustableReverse extends AbstractSimpleFigure {
  code = () => {
    return 'PumpNonAdjustableReverse'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос нерегулируемый с реверсивным потоком'
  };

  image = () => {
    return pumpNonAdjustableReverse
  };

  svgImage = () => {
    return pumpNonAdjustableReverseSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [
    [{rotate: 90}]
  ];
}

export default PumpNonAdjustableReverse

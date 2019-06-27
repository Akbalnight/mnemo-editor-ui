import latch, {ReactComponent as latchSvg} from '../../../assets/images/Latch.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class Latch extends AbstractSimpleFigure {
  code = () => {
    return 'Latch'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Задвижка'
  };

  image = () => {
    return latch
  };

  svgImage = () => {
    return latchSvg
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

export default Latch

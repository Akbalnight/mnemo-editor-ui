import throttle, {ReactComponent as throttleSvg} from '../../../assets/images/Throttle.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class Throttle extends AbstractSimpleFigure {
  code = () => {
    return 'Throttle'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Клапан дроссельный'
  };

  image = () => {
    return throttle
  };

  svgImage = () => {
    return throttleSvg
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

export default Throttle

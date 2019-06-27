import fanCentrifugal, {ReactComponent as fanCentrifugalSvg} from '../../../assets/images/FanCentrifugal.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FanCentrifugal extends AbstractSimpleFigure {
  code = () => {
    return 'FanCentrifugal'
  };

  groupCode = () => {
    return 'fans'
  };

  name = () => {
    return 'Вентилятор центробежный'
  };

  image = () => {
    return fanCentrifugal
  };

  svgImage = () => {
    return fanCentrifugalSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default FanCentrifugal

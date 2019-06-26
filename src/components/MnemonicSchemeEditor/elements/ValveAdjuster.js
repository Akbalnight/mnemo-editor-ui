import valveAdjuster, {ReactComponent as valveAdjusterSvg} from '../../../assets/images/ValveAdjuster.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class ValveAdjuster extends AbstractSimpleFigure {
  code = () => {
    return 'ValveAdjuster'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Вентиль, клапан регулирующий проходной'
  };

  image = () => {
    return valveAdjuster
  };

  svgImage = () => {
    return valveAdjusterSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default ValveAdjuster

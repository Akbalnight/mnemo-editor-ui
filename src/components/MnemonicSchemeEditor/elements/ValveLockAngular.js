import valveLockAngular, {ReactComponent as valveLockAngularSvg} from '../../../assets/images/ValveLockAngular.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class ValveLockAngular extends AbstractSimpleFigure {
  code = () => {
    return 'ValveLockAngular'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Клапан (вентиль) запорный угловой'
  };

  image = () => {
    return valveLockAngular
  };

  svgImage = () => {
    return valveLockAngularSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default ValveLockAngular

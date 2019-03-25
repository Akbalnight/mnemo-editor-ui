import valveReverseAngular, {ReactComponent as valveReverseAngularSvg} from '.../../../assets/images/ValveReverseAngular.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class ValveReverseAngular extends AbstractSimpleFigure {
  code = () => {
    return 'ValveReverseAngular'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Клапан обратный угловой'
  };

  image = () => {
    return valveReverseAngular
  };

  svgImage = () => {
    return valveReverseAngularSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default ValveReverseAngular

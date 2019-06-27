import valveLockPassthrough, {ReactComponent as valveLockPassthroughSvg} from '../../../assets/images/ValveLockPassthrough.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class ValveLockPassthrough extends AbstractSimpleFigure {
  code = () => {
    return 'ValveLockPassthrough'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Клапан (вентиль) запорный проходной'
  };

  image = () => {
    return valveLockPassthrough
  };

  svgImage = () => {
    return valveLockPassthroughSvg
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

export default ValveLockPassthrough

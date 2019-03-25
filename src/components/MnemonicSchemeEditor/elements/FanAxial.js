import fanAxial, {ReactComponent as fanAxialSvg} from '.../../../assets/images/FanAxial.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FanAxial extends AbstractSimpleFigure {
  code = () => {
    return 'FanAxial'
  };

  groupCode = () => {
    return 'fans'
  };

  name = () => {
    return 'Вентилятор осевой'
  };

  image = () => {
    return fanAxial
  };

  svgImage = () => {
    return fanAxialSvg
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

export default FanAxial

import pumpCircular, {ReactComponent as pumpCircularSvg} from '.../../../assets/images/PumpCircular.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpCircular extends AbstractSimpleFigure {
  code = () => {
    return 'PumpCircular'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос циркуляционный'
  };

  image = () => {
    return pumpCircular
  };

  svgImage = () => {
    return pumpCircularSvg
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

export default PumpCircular

import flowDirectionGas, {ReactComponent as flowDirectionGasSvg} from '.../../../assets/images/FlowDirectionGas.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FlowDirectionGas extends AbstractSimpleFigure {
  code = () => {
    return 'FlowDirectionGas'
  };

  groupCode = () => {
    return 'directionArrows'
  };

  name = () => {
    return 'Направление потока газа'
  };

  image = () => {
    return flowDirectionGas
  };

  svgImage = () => {
    return flowDirectionGasSvg
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

export default FlowDirectionGas

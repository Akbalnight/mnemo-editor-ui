import flowDirectionWater, {ReactComponent as flowDirectionWaterSvg} from '.../../../assets/images/FlowDirectionWater.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FlowDirectionWater extends AbstractSimpleFigure {
  code = () => {
    return 'FlowDirectionWater'
  };

  groupCode = () => {
    return 'directionArrows'
  };

  name = () => {
    return 'Направление потока жидкости'
  };

  image = () => {
    return flowDirectionWater
  };

  svgImage = () => {
    return flowDirectionWaterSvg
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

export default FlowDirectionWater

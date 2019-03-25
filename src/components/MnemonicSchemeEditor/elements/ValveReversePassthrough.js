import valveReversePassthrough, {ReactComponent as valveReversePassthroughSvg} from '.../../../assets/images/ValveReversePassthrough.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class ValveReversePassthrough extends AbstractSimpleFigure {
  code = () => {
    return 'ValveReversePassthrough'
  };

  groupCode = () => {
    return 'valves'
  };

  name = () => {
    return 'Клапан обратный проходной'
  };

  image = () => {
    return valveReversePassthrough
  };

  svgImage = () => {
    return valveReversePassthroughSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [
    [{flip: 'horizontal'}],
    [{rotate: 90}],
    [{flip: 'vertical'}, {rotate: 90}]
  ];
}

export default ValveReversePassthrough

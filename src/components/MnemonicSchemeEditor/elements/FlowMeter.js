import flowMeter, {ReactComponent as flowMeterSvg} from '.../../../assets/images/FlowMeter.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FlowMeter extends AbstractSimpleFigure {
  code = () => {
    return 'FlowMeter'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Расходометр'
  };

  image = () => {
    return flowMeter
  };

  svgImage = () => {
    return flowMeterSvg
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

export default FlowMeter

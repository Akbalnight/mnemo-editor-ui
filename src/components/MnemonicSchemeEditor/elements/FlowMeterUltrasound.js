import flowMeterUltrasound, {ReactComponent as flowMeterUltrasoundSvg} from '.../../../assets/images/FlowMeterUltrasound.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class FlowMeterUltrasound extends AbstractSimpleFigure {
  code = () => {
    return 'FlowMeterUltrasound'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Расходомер ультразвуковой'
  };

  image = () => {
    return flowMeterUltrasound
  };

  svgImage = () => {
    return flowMeterUltrasoundSvg
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

export default FlowMeterUltrasound

import pressureChangeDetector, {ReactComponent as pressureChangeDetectorSvg} from '.../../../assets/images/PressureChangeDetector.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PressureChangeDetector extends AbstractSimpleFigure {
  code = () => {
    return 'PressureChangeDetector'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Датчик перепада давления'
  };

  image = () => {
    return pressureChangeDetector
  };

  svgImage = () => {
    return pressureChangeDetectorSvg
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

  measures = () => [
    '𝚫P, МПа',
    '𝚫P, ат'
  ]
}

export default PressureChangeDetector

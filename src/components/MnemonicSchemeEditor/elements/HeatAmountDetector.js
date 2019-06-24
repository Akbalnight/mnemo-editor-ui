import heatAmountDetector, {ReactComponent as heatAmountDetectorSvg} from '.../../../assets/images/HeatAmountDetector.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class HeatAmountDetector extends AbstractSimpleFigure {
  code = () => {
    return 'HeatAmountDetector'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Датчик количества теплоты'
  };

  image = () => {
    return heatAmountDetector
  };

  svgImage = () => {
    return heatAmountDetectorSvg
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
    'Q, Гкал'
  ]
}

export default HeatAmountDetector

import temperatureConverter, {ReactComponent as temperatureConverterSvg} from '../../../assets/images/TemperatureConverter.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class TemperatureConverter extends AbstractSimpleFigure {
  code = () => {
    return 'TemperatureConverter'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Термопреобразователь'
  };

  image = () => {
    return temperatureConverter
  };

  svgImage = () => {
    return temperatureConverterSvg
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
    't1, гр.C',
    't2, гр.C',
    't3, гр.C',
    't4, гр.C',
    't7, гр.C',
    't13, гр.C'
  ]
}

export default TemperatureConverter

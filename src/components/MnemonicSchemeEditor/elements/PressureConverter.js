import pressureConverter, {ReactComponent as pressureConverterSvg} from '.../../../assets/images/PressureConverter.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PressureConverter extends AbstractSimpleFigure {
  code = () => {
    return 'PressureConverter'
  };

  groupCode = () => {
    return 'measuringInstruments'
  };

  name = () => {
    return 'Преобразователь давления '
  };

  image = () => {
    return pressureConverter
  };

  svgImage = () => {
    return pressureConverterSvg
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

export default PressureConverter

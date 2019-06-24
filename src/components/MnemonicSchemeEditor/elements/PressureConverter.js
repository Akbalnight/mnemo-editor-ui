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
    return 'Преобразователь давления'
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

  measures = () => [
    'P1, МПа',
    'P2, МПа',
    'P3, МПа',
    'P4, МПа',
    'P7, МПа',
    'P13, МПа',
    'P1, ат',
    'P2, ат',
    'P3, ат',
    'P4, ат',
    'P7, ат',
    'P13, ат'
  ]
}

export default PressureConverter

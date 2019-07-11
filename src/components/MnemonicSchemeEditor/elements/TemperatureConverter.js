import temperatureConverter, {ReactComponent as temperatureConverterSvg} from '../../../assets/images/TemperatureConverter.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class TemperatureConverter extends AbstractSimpleFigure {
	code = () => 'TemperatureConverter';

	groupCode = () => 'measuringInstruments';

	name = () => 'Термопреобразователь';

	image = () => temperatureConverter;

	svgImage = () => temperatureConverterSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];

	measures = () => [
		't1, гр.C',
		't2, гр.C',
		't3, гр.C',
		't4, гр.C',
		't7, гр.C',
		't13, гр.C',
	];
}

export default TemperatureConverter;

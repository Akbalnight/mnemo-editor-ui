import heatAmountDetector, {ReactComponent as heatAmountDetectorSvg} from '../../../assets/images/HeatAmountDetector.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class HeatAmountDetector extends AbstractSimpleFigure {
	code = () => 'HeatAmountDetector';

	groupCode = () => 'measuringInstruments';

	name = () => 'Датчик количества теплоты';

	image = () => heatAmountDetector;

	svgImage = () => heatAmountDetectorSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];

	measures = () => [
		'Q, Гкал',
	];
}

export default HeatAmountDetector;

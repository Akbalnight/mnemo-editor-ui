import pressureChangeDetector, {ReactComponent as pressureChangeDetectorSvg} from '../../../assets/images/PressureChangeDetector.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PressureChangeDetector extends AbstractSimpleFigure {
	code = () => 'PressureChangeDetector';

	groupCode = () => 'measuringInstruments';

	name = () => 'Датчик перепада давления';

	image = () => pressureChangeDetector;

	svgImage = () => pressureChangeDetectorSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];

	measures = () => [
		'𝚫P, МПа',
		'𝚫P, ат',
	];
}

export default PressureChangeDetector;

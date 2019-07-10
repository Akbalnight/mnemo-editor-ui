import flowMeter, {ReactComponent as flowMeterSvg} from '../../../assets/images/FlowMeter.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class FlowMeter extends AbstractSimpleFigure {
	code = () => 'FlowMeter';

	groupCode = () => 'measuringInstruments';

	name = () => 'Расходометр';

	image = () => flowMeter;

	svgImage = () => flowMeterSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];

	measures = () => [
		'M1, т',
		'M2, т',
		'M3, т',
		'M4, т',
		'M7, т',
		'M13, т',
		'V1, м3',
		'V2, м3',
		'V3, м3',
		'V4, м3',
		'V7, м3',
		'V13, м3',
	];
}

export default FlowMeter;

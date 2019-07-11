import pumpNonAdjustableReverse, {ReactComponent as pumpNonAdjustableReverseSvg} from '../../../assets/images/PumpNonAdjustableReverse.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpNonAdjustableReverse extends AbstractSimpleFigure {
	code = () => 'PumpNonAdjustableReverse';

	groupCode = () => 'pumps';

	name = () => 'Насос нерегулируемый с реверсивным потоком';

	image = () => pumpNonAdjustableReverse;

	svgImage = () => pumpNonAdjustableReverseSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default PumpNonAdjustableReverse;

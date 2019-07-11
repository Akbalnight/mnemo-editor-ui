import pumpNonAdjustable, {ReactComponent as pumpNonAdjustableSvg} from '../../../assets/images/PumpNonAdjustable.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpNonAdjustable extends AbstractSimpleFigure {
	code = () => 'PumpNonAdjustable';

	groupCode = () => 'pumps';

	name = () => 'Насос нерегулируемый с нереверсивным потоком';

	image = () => pumpNonAdjustable;

	svgImage = () => pumpNonAdjustableSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];
}

export default PumpNonAdjustable;

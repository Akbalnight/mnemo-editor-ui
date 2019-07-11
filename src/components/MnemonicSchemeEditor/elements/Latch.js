import latch, {ReactComponent as latchSvg} from '../../../assets/images/Latch.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class Latch extends AbstractSimpleFigure {
	code = () => 'Latch';

	groupCode = () => 'valves';

	name = () => 'Задвижка';

	image = () => latch;

	svgImage = () => latchSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default Latch;

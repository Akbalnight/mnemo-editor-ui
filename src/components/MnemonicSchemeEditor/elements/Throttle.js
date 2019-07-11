import throttle, {ReactComponent as throttleSvg} from '../../../assets/images/Throttle.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class Throttle extends AbstractSimpleFigure {
	code = () => 'Throttle';

	groupCode = () => 'valves';

	name = () => 'Клапан дроссельный';

	image = () => throttle;

	svgImage = () => throttleSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default Throttle;

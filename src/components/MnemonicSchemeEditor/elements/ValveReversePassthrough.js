import valveReversePassthrough, {ReactComponent as valveReversePassthroughSvg} from '../../../assets/images/ValveReversePassthrough.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class ValveReversePassthrough extends AbstractSimpleFigure {
	code = () => 'ValveReversePassthrough';

	groupCode = () => 'valves';

	name = () => 'Клапан обратный проходной';

	image = () => valveReversePassthrough;

	svgImage = () => valveReversePassthroughSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}]
	];
}

export default ValveReversePassthrough;

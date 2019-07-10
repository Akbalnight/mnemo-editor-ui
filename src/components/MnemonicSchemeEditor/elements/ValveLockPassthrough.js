import valveLockPassthrough, {ReactComponent as valveLockPassthroughSvg} from '../../../assets/images/ValveLockPassthrough.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class ValveLockPassthrough extends AbstractSimpleFigure {
	code = () => 'ValveLockPassthrough';

	groupCode = () => 'valves';

	name = () => 'Клапан (вентиль) запорный проходной';

	image = () => valveLockPassthrough;

	svgImage = () => valveLockPassthroughSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default ValveLockPassthrough;

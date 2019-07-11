import valveLockAngular, {ReactComponent as valveLockAngularSvg} from '../../../assets/images/ValveLockAngular.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class ValveLockAngular extends AbstractSimpleFigure {
	code = () => 'ValveLockAngular';

	groupCode = () => 'valves';

	name = () => 'Клапан (вентиль) запорный угловой';

	image = () => valveLockAngular;

	svgImage = () => valveLockAngularSvg;

	width = () => 4;

	height = () => 4;
}

export default ValveLockAngular;

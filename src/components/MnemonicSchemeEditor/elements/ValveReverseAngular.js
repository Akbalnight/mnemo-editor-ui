import valveReverseAngular, {ReactComponent as valveReverseAngularSvg} from '../../../assets/images/ValveReverseAngular.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class ValveReverseAngular extends AbstractSimpleFigure {
	code = () => 'ValveReverseAngular';

	groupCode = () => 'valves';

	name = () => 'Клапан обратный угловой';

	image = () => valveReverseAngular;

	svgImage = () => valveReverseAngularSvg;

	width = () => 4;

	height = () => 4;
}

export default ValveReverseAngular;

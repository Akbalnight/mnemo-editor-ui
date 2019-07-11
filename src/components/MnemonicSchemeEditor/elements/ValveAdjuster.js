import valveAdjuster, {ReactComponent as valveAdjusterSvg} from '../../../assets/images/ValveAdjuster.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class ValveAdjuster extends AbstractSimpleFigure {
	code = () => 'ValveAdjuster';

	groupCode = () => 'valves';

	name = () => 'Вентиль, клапан регулирующий проходной';

	image = () => valveAdjuster;

	svgImage = () => valveAdjusterSvg;

	width = () => 4;

	height = () => 4;
}

export default ValveAdjuster;

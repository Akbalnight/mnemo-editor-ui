import fanAxial, {ReactComponent as fanAxialSvg} from '../../../assets/images/FanAxial.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class FanAxial extends AbstractSimpleFigure {
	code = () => 'FanAxial';

	groupCode = () => 'fans';

	name = () => 'Вентилятор осевой';

	image = () => fanAxial;

	svgImage = () => fanAxialSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default FanAxial;

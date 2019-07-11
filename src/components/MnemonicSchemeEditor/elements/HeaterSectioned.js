import heaterSectioned, {ReactComponent as heaterSectionedSvg} from '../../../assets/images/HeaterSectioned.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class HeaterSectioned extends AbstractSimpleFigure {
	code = () => 'HeaterSectioned';

	groupCode = () => 'heaters';

	name = () => 'Радиатор отопительный секционный';

	image = () => heaterSectioned;

	svgImage = () => heaterSectionedSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default HeaterSectioned;

import pumpCircular, {ReactComponent as pumpCircularSvg} from '../../../assets/images/PumpCircular.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpCircular extends AbstractSimpleFigure {
	code = () => 'PumpCircular';

	groupCode = () => 'pumps';

	name = () => 'Насос циркуляционный';

	image = () => pumpCircular;

	svgImage = () => pumpCircularSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];
}

export default PumpCircular;

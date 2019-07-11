import pumpCantilevered, {ReactComponent as pumpCantileveredSvg} from '../../../assets/images/PumpCantilevered.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpCantilevered extends AbstractSimpleFigure {
	code = () => 'PumpCantilevered';

	groupCode = () => 'pumps';

	name = () => 'Насос консольный';

	image = () => pumpCantilevered;

	svgImage = () => pumpCantileveredSvg;

	width = () => 4;

	height = () => 4;
}

export default PumpCantilevered;

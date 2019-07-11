import pumpManual, {ReactComponent as pumpManualSvg} from '../../../assets/images/PumpManual.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpManual extends AbstractSimpleFigure {
	code = () => 'PumpManual';

	groupCode = () => 'pumps';

	name = () => 'Насос ручной';

	image = () => pumpManual;

	svgImage = () => pumpManualSvg;

	width = () => 4;

	height = () => 4;
}

export default PumpManual;

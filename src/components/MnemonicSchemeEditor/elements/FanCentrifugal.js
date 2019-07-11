import fanCentrifugal, {ReactComponent as fanCentrifugalSvg} from '../../../assets/images/FanCentrifugal.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class FanCentrifugal extends AbstractSimpleFigure {
	code = () => 'FanCentrifugal';

	groupCode = () => 'fans';

	name = () => 'Вентилятор центробежный';

	image = () => fanCentrifugal;

	svgImage = () => fanCentrifugalSvg;

	width = () => 4;

	height = () => 4;
}

export default FanCentrifugal;

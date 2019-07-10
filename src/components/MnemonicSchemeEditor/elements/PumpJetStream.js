import pumpJetStream, {ReactComponent as pumpJetStreamSvg} from '../../../assets/images/PumpJetStream.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PumpJetStream extends AbstractSimpleFigure {
	code = () => 'PumpJetStream';

	groupCode = () => 'pumps';

	name = () => 'Насос струйный (эжектор, инжектор, элеватор)';

	image = () => pumpJetStream;

	svgImage = () => pumpJetStreamSvg;

	width = () => 4;

	height = () => 4;
}

export default PumpJetStream;

import pipelineConnection, {ReactComponent as pipelineConnectionSvg} from '../../../assets/images/PipelineConnection.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PipelineConnection extends AbstractSimpleFigure {
	code = () => 'PipelineConnection';

	groupCode = () => 'pipes';

	name = () => 'Соединение трубопроводов';

	image = () => pipelineConnection;

	svgImage = () => pipelineConnectionSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [];
}

export default PipelineConnection;

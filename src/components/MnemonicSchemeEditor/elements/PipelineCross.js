import pipelineCross, {ReactComponent as pipelineCrossSvg} from '../../../assets/images/PipelineCross.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class PipelineCross extends AbstractSimpleFigure {
	code = () => 'PipelineCross';

	groupCode = () => 'pipes';

	name = () => 'Перекрещивание трубопроводов (без соединения)';

	image = () => pipelineCross;

	svgImage = () => pipelineCrossSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];
}

export default PipelineCross;

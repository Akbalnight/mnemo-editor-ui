import flowDirectionGas, {ReactComponent as flowDirectionGasSvg} from '../../../assets/images/FlowDirectionGas.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class FlowDirectionGas extends AbstractSimpleFigure {
	code = () => 'FlowDirectionGas';

	groupCode = () => 'directionArrows';

	name = () => 'Направление потока газа';

	image = () => flowDirectionGas;

	svgImage = () => flowDirectionGasSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];
}

export default FlowDirectionGas;

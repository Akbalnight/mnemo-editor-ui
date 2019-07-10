import heatExchanger, {ReactComponent as heatExchangerSvg} from '../../../assets/images/HeatExchanger.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class HeatExchanger extends AbstractSimpleFigure {
	code = () => 'HeatExchanger';

	groupCode = () => 'heatExchangers';

	name = () => 'Аппарат теплообменный листовой спиральный';

	image = () => heatExchanger;

	svgImage = () => heatExchangerSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
	];
}

export default HeatExchanger;

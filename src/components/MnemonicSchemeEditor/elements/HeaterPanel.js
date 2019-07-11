import heaterPanel, {ReactComponent as heaterPanelSvg} from '../../../assets/images/HeaterPanel.svg';
import AbstractSimpleFigure from './AbstractSimpleFigure';


class HeaterPanel extends AbstractSimpleFigure {
	code = () => 'HeaterPanel';

	groupCode = () => 'heaters';

	name = () => 'Радиатор отопительный панельный';

	image = () => heaterPanel;

	svgImage = () => heaterPanelSvg;

	width = () => 4;

	height = () => 4;

	canBeTransformed = () => [
		[{rotate: 90}],
	];
}

export default HeaterPanel;

import heaterPanel, {ReactComponent as heaterPanelSvg} from '../../../assets/images/HeaterPanel.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class HeaterPanel extends AbstractSimpleFigure {
  code = () => {
    return 'HeaterPanel'
  };

  groupCode = () => {
    return 'heaters'
  };

  name = () => {
    return 'Радиатор отопительный панельный'
  };

  image = () => {
    return heaterPanel
  };

  svgImage = () => {
    return heaterPanelSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [
    [{rotate: 90}]
  ];
}

export default HeaterPanel

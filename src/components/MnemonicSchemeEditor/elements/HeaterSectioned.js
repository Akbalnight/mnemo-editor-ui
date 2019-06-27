import heaterSectioned, {ReactComponent as heaterSectionedSvg} from '../../../assets/images/HeaterSectioned.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class HeaterSectioned extends AbstractSimpleFigure {
  code = () => {
    return 'HeaterSectioned'
  };

  groupCode = () => {
    return 'heaters'
  };

  name = () => {
    return 'Радиатор отопительный секционный'
  };

  image = () => {
    return heaterSectioned
  };

  svgImage = () => {
    return heaterSectionedSvg
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

export default HeaterSectioned

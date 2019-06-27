import pipelineCross, {ReactComponent as pipelineCrossSvg} from '../../../assets/images/PipelineCross.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PipelineCross extends AbstractSimpleFigure {
  code = () => {
    return 'PipelineCross'
  };

  groupCode = () => {
    return 'pipes'
  };

  name = () => {
    return 'Перекрещивание трубопроводов (без соединения)'
  };

  image = () => {
    return pipelineCross
  };

  svgImage = () => {
    return pipelineCrossSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [
    [{rotate: 90}],
    [{rotate: 180}],
    [{rotate: 270}]
  ];
}

export default PipelineCross

import pipelineConnection, {ReactComponent as pipelineConnectionSvg} from '.../../../assets/images/PipelineConnection.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PipelineConnection extends AbstractSimpleFigure {
  code = () => {
    return 'PipelineConnection'
  };

  groupCode = () => {
    return 'pipes'
  };

  name = () => {
    return 'Соединение трубопроводов'
  };

  image = () => {
    return pipelineConnection
  };

  svgImage = () => {
    return pipelineConnectionSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };

  canBeTransformed = () => [];
}

export default PipelineConnection

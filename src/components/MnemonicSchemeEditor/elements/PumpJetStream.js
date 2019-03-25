import pumpJetStream, {ReactComponent as pumpJetStreamSvg} from '.../../../assets/images/PumpJetStream.svg'
import AbstractSimpleFigure from './AbstractSimpleFigure'

class PumpJetStream extends AbstractSimpleFigure {
  code = () => {
    return 'PumpJetStream'
  };

  groupCode = () => {
    return 'pumps'
  };

  name = () => {
    return 'Насос струйный (эжектор, инжектор, элеватор)'
  };

  image = () => {
    return pumpJetStream
  };

  svgImage = () => {
    return pumpJetStreamSvg
  };

  width = () => {
    return 4
  };

  height = () => {
    return 4
  };
}

export default PumpJetStream

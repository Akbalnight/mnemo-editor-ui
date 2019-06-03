import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Pipeline from '../MnemonicSchemeEditor/elements/Pipeline'
import Text from '../MnemonicSchemeEditor/elements/Text'
import PipelineConnection from '../MnemonicSchemeEditor/elements/PipelineConnection'
import PipelineCross from '../MnemonicSchemeEditor/elements/PipelineCross'
import FlowDirectionWater from '../MnemonicSchemeEditor/elements/FlowDirectionWater'
import FlowDirectionGas from '../MnemonicSchemeEditor/elements/FlowDirectionGas'
import TemperatureConverter from '../MnemonicSchemeEditor/elements/TemperatureConverter'
import FlowMeter from '../MnemonicSchemeEditor/elements/FlowMeter'
import PressureConverter from '../MnemonicSchemeEditor/elements/PressureConverter'
import PressureChangeDetector from '../MnemonicSchemeEditor/elements/PressureChangeDetector'
import HeatAmountDetector from '../MnemonicSchemeEditor/elements/HeatAmountDetector'
import FlowMeterUltrasound from '../MnemonicSchemeEditor/elements/FlowMeterUltrasound'
import ValveLockPassthrough from '../MnemonicSchemeEditor/elements/ValveLockPassthrough'
import ValveLockAngular from '../MnemonicSchemeEditor/elements/ValveLockAngular'
import ValveReversePassthrough from '../MnemonicSchemeEditor/elements/ValveReversePassthrough'
import ValveReverseAngular from '../MnemonicSchemeEditor/elements/ValveReverseAngular'
import Latch from '../MnemonicSchemeEditor/elements/Latch'
import ValveAdjuster from '../MnemonicSchemeEditor/elements/ValveAdjuster'
import Throttle from '../MnemonicSchemeEditor/elements/Throttle'
import PumpManual from '../MnemonicSchemeEditor/elements/PumpManual'
import PumpNonAdjustable from '../MnemonicSchemeEditor/elements/PumpNonAdjustable'
import PumpJetStream from '../MnemonicSchemeEditor/elements/PumpJetStream'
import PumpCantilevered from '../MnemonicSchemeEditor/elements/PumpCantilevered'
import PumpCircular from '../MnemonicSchemeEditor/elements/PumpCircular'
import PumpNonAdjustableReverse from '../MnemonicSchemeEditor/elements/PumpNonAdjustableReverse'
import FanCentrifugal from '../MnemonicSchemeEditor/elements/FanCentrifugal'
import FanAxial from '../MnemonicSchemeEditor/elements/FanAxial'
import HeatExchanger from '../MnemonicSchemeEditor/elements/HeatExchanger'
import HeaterPanel from '../MnemonicSchemeEditor/elements/HeaterPanel'
import HeaterSectioned from '../MnemonicSchemeEditor/elements/HeaterSectioned'
import './MnemonicSchemeViewer.css'

const FIGURES = [
  new Pipeline(),
  new Text(),
  new PipelineConnection(),
  new PipelineCross(),
  new FlowDirectionWater(),
  new FlowDirectionGas(),
  new TemperatureConverter(),
  new FlowMeter(),
  new PressureConverter(),
  new PressureChangeDetector(),
  new HeatAmountDetector(),
  new FlowMeterUltrasound(),
  new ValveLockPassthrough(),
  new ValveLockAngular(),
  new ValveReversePassthrough(),
  new ValveReverseAngular(),
  new Latch(),
  new ValveAdjuster(),
  new Throttle(),
  new PumpManual(),
  new PumpNonAdjustable(),
  new PumpJetStream(),
  new PumpCantilevered(),
  new PumpCircular(),
  new PumpNonAdjustableReverse(),
  new FanCentrifugal(),
  new FanAxial(),
  new HeatExchanger(),
  new HeaterPanel(),
  new HeaterSectioned()
]

const MnemonicSchemeViewer = ({
  className,
  mnemoschemeData
}) => {
  const width = 124
  const height = 76

  const elements = mnemoschemeData.map(d => FIGURES.find(f => f.code() === d.code).deserialize(d))

  let grid = []
  for (let i = 1; i <= width - 1; i++) {
    grid.push(
      <line
        key={'grid-x-' + i}
        x1={i}
        x2={i}
        y1='0'
        y2={height}
        vectorEffect={'non-scaling-stroke'}
        strokeWidth='1px'
        strokeDasharray={i % 4 !== 0 ? 1 : undefined}
        stroke={'#eee'}
      />
    )
  }
  for (let i = 1; i <= height - 1; i++) {
    grid.push(
      <line
        key={'grid-y-' + i}
        y1={i}
        y2={i}
        x1='0'
        x2={width}
        vectorEffect={'non-scaling-stroke'}
        strokeWidth='1px'
        strokeDasharray={i % 4 !== 0 ? 1 : undefined}
        stroke={'#eee'}
      />
    )
  }

  return (
    <div
      className={classnames('mnemonic-scheme-viewer', className)}
    >
      <svg
        className='mnemonic-scheme-viewer__svg'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${width} ${height}`}
      >
        <filter
          id='mnemonic-scheme-editor-blur-filter' x='-5' y='-5' width={width + 5} height={height + 5}
          filterUnits='userSpaceOnUse'>
          <feDropShadow dx='0' dy='0' stdDeviation='0.15' floodColor='#0000ff' />
        </filter>
        <filter id='mnemonic-scheme-editor-light-blur-filter' x='-5' y='-5' width={width + 5} height={height + 5}
          filterUnits='userSpaceOnUse'>
          <feDropShadow dx='0' dy='0' stdDeviation='0.1' floodColor='#000088' />
        </filter>
        {grid}
        {elements.map(e => (
          <g
            key={e.id}
            vectorEffect={'non-scaling-stroke'}
            className='mnemonic-scheme-viewer__element'
          >
            {e.render()}</g>
        ))}
      </svg>
    </div>
  )
}

MnemonicSchemeViewer.propTypes = {
  className: PropTypes.string,
  mnemoschemeData: PropTypes.array
}

export default MnemonicSchemeViewer

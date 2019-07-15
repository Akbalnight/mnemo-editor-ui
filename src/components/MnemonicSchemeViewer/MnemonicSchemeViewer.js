import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import Pipeline from '../MnemonicSchemeEditor/elements/Pipeline';
import Text from '../MnemonicSchemeEditor/elements/Text';
import PipelineConnection from '../MnemonicSchemeEditor/elements/PipelineConnection';
import PipelineCross from '../MnemonicSchemeEditor/elements/PipelineCross';
import FlowDirectionWater from '../MnemonicSchemeEditor/elements/FlowDirectionWater';
import FlowDirectionGas from '../MnemonicSchemeEditor/elements/FlowDirectionGas';
import TemperatureConverter from '../MnemonicSchemeEditor/elements/TemperatureConverter';
import FlowMeter from '../MnemonicSchemeEditor/elements/FlowMeter';
import PressureConverter from '../MnemonicSchemeEditor/elements/PressureConverter';
import PressureChangeDetector from '../MnemonicSchemeEditor/elements/PressureChangeDetector';
import HeatAmountDetector from '../MnemonicSchemeEditor/elements/HeatAmountDetector';
import FlowMeterUltrasound from '../MnemonicSchemeEditor/elements/FlowMeterUltrasound';
import ValveLockPassthrough from '../MnemonicSchemeEditor/elements/ValveLockPassthrough';
import ValveLockAngular from '../MnemonicSchemeEditor/elements/ValveLockAngular';
import ValveReversePassthrough from '../MnemonicSchemeEditor/elements/ValveReversePassthrough';
import ValveReverseAngular from '../MnemonicSchemeEditor/elements/ValveReverseAngular';
import Latch from '../MnemonicSchemeEditor/elements/Latch';
import ValveAdjuster from '../MnemonicSchemeEditor/elements/ValveAdjuster';
import Throttle from '../MnemonicSchemeEditor/elements/Throttle';
import PumpManual from '../MnemonicSchemeEditor/elements/PumpManual';
import PumpNonAdjustable from '../MnemonicSchemeEditor/elements/PumpNonAdjustable';
import PumpJetStream from '../MnemonicSchemeEditor/elements/PumpJetStream';
import PumpCantilevered from '../MnemonicSchemeEditor/elements/PumpCantilevered';
import PumpCircular from '../MnemonicSchemeEditor/elements/PumpCircular';
import PumpNonAdjustableReverse from '../MnemonicSchemeEditor/elements/PumpNonAdjustableReverse';
import FanCentrifugal from '../MnemonicSchemeEditor/elements/FanCentrifugal';
import FanAxial from '../MnemonicSchemeEditor/elements/FanAxial';
import HeatExchanger from '../MnemonicSchemeEditor/elements/HeatExchanger';
import HeaterPanel from '../MnemonicSchemeEditor/elements/HeaterPanel';
import HeaterSectioned from '../MnemonicSchemeEditor/elements/HeaterSectioned';
import './MnemonicSchemeViewer.css';


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
];

class MnemonicSchemeViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			self: this,
			prevMnemoschemeData: props.mnemoschemeData,
			...this._prepareData(props.mnemoschemeData),
		};

		this.dataRequest();
	}

	_prepareData(data) {
		const elements = data.map(d => FIGURES.find(f => f.code() === d.code).deserialize(d));

		return {
			elements, measureKeys: elements.map(e => e.measureKey).filter(k => k),
		};
	}

	_attachInterval = () => {
		if (this._intervalId) {
			this._detachInterval();
		}

		if (this.props.dataRequestInterval) {
			this._intervalId = setInterval(this.dataRequest, this.props.dataRequestInterval < 1000
				? 1000
				: this.props.dataRequestInterval);
		}
	};

	_detachInterval = () => {
		if (this._intervalId) {
			clearInterval(this._intervalId);
		}
	};

	dataRequest = () => {
		if (this.props.onDataRequest) {
			const resultOrPromise = this.props.onDataRequest(this.state.measureKeys);
			const promise = Promise.resolve(resultOrPromise);

			promise.then(data => {
				if (data) {
					const newElements = [...this.state.elements];
					newElements.forEach(e => {
						if (e.measureKey) {
							e.setMeasureValue(data[e.measureKey] || '');
						}
					});
					this.setState({
						elements: newElements,
					});
				}
			});
		}
	};

	componentDidMount() {
		this._attachInterval();
	}

	componentWillUnmount() {
		this._detachInterval();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.dataRequestInterval !== this.props.dataRequestInterval) {
			this._attachInterval();
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (state.prevMnemoschemeData !== props.mnemoschemeData) {
			return {
				...state.self._prepareData(props.mnemoschemeData),
				prevMnemoschemeData: props.mnemoschemeData,
			};
		}

		return {};
	}

	render() {
		const {className} = this.props;

		const width = 124;
		const height = 76;

		return (
			<Grid
				width={width}
				height={height}
				className={classnames('mnemonic-scheme-viewer', className)}
			>
				{this.state.elements.map(e => (
					<g
						key={e.id}
						vectorEffect={'non-scaling-stroke'}
						className='mnemonic-scheme-viewer__element'
					>
						{e.render()}
					</g>
				))}
			</Grid>
		);
	}
}

MnemonicSchemeViewer.propTypes = {
	className: PropTypes.string,
	mnemoschemeData: PropTypes.array,
	dataRequestInterval: PropTypes.number,
	onDataRequest: PropTypes.func,
};

export default MnemonicSchemeViewer;

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

		this.gridRef = React.createRef();
		this.height = 76;
		this.width = 124;
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

	changeElementsPositions = (elements, callbackX, callbackY) => {
		return elements.map(el => {
			const newElement = {...el};

			if (newElement.code() === 'Pipeline') {
				const newPoints = newElement.points.map(point => ({
					x: callbackX(point.x),
					y: callbackY(point.y),
				}));
				newElement.setPoints(newPoints);
			} else {
				newElement.setPosition(
					callbackX(newElement.position.x),
					callbackY(newElement.position.y),
				);
			}

			return newElement;
		});
	};

	/**
	 * Поправка позиции схемы на viewport
	 */
	fixPosition = () => {
		const newState = {...this.state};
		const svg = this.gridRef.current && this.gridRef.current.getSvg();
		const svgContainerRects = svg.getBoundingClientRect();
		const svgWidth = svgContainerRects.width;
		const svgHeight = svgContainerRects.height;
		const svgCoords = this.coordinates(svgContainerRects.x + svgWidth, svgContainerRects.y + svgHeight);
		const viewportRects = svg.parentElement.getBoundingClientRect();
		const delX = svgWidth / viewportRects.width;
		const delY = svgHeight / viewportRects.height;
		const viewportCoords = {x: Math.round(svgCoords.x / delX), y: Math.round(svgCoords.y / delY)};
		const viewportOffsetX = Math.round(viewportCoords.x / 2);
		const viewportOffsetY = Math.round(viewportCoords.y / 2);
		const domItems = document.querySelectorAll('.mnemonic-scheme-viewer > svg > g');
		const {xMin, xMax, yMin, yMax} = this.getExtremePoints(domItems);
		let elements = [];

		// Если вся схема может влезть во viewport по горизонтали
		if (xMax - xMin + 4 < viewportCoords.x) {
			elements = this.changeElementsPositions(
				newState.elements,
				x => Math.round(x + (viewportOffsetX - ((xMax - xMin) / 2) - xMin)),
				y => y,
			);
		}

		// Если вся схема может влезть во viewport по вертикали
		if (yMax - yMin + 4 < viewportCoords.y) {
			elements = this.changeElementsPositions(
				newState.elements,
				x => x,
				y => Math.round(y + (viewportOffsetY - ((yMax - yMin) / 2) - yMin)),
			);
		}

		// Если схема не влезает по горизонтали, смещаем её к левому краю
		if (xMax - xMin + 4 > viewportCoords.x && xMin > 4) {
			elements = this.changeElementsPositions(
				newState.elements,
				x => x + (xMin - 2),
				y => y,
			);
		}

		// Если схема не влезает по вертикали, смещаем её к верхнему краю
		if (yMax - yMin + 4 > viewportCoords.y && yMin > 4) {
			elements = this.changeElementsPositions(
				newState.elements,
				x => x,
				y => y - (yMin - 2),
			);
		}

		newState.elements = elements;
		this.setState(newState);
	};

	/**
	 * Возвращает крайние точки схемы по переданным в параметр элементам
	 *
	 * @param items (DOM элементы схемы)
	 * @returns {{yMin: number, yMax: number, xMax: number, xMin: number}}
	 */
	getExtremePoints = items => {
		let xMin;
		let xMax;
		let yMin;
		let yMax;

		const itemRects = items[0].getBoundingClientRect();

		xMin = this.coordinates(itemRects.x, itemRects.y).x;
		xMax = this.coordinates(itemRects.x + itemRects.width, itemRects.y).x;
		yMin = this.coordinates(itemRects.x, itemRects.y).y;
		yMax = this.coordinates(itemRects.x, itemRects.y + itemRects.height).y;

		for (let i = 1; i < items.length; i++) {
			const item = items[i];
			const itemRects = item.getBoundingClientRect();
			const itemMinX = this.coordinates(itemRects.x, itemRects.y).x;
			const itemMaX = this.coordinates(itemRects.x + itemRects.width, itemRects.y).x;
			const itemMinY = this.coordinates(itemRects.x, itemRects.y).y;
			const itemMaxY = this.coordinates(itemRects.x, itemRects.y + itemRects.height).y;

			xMin = itemMinX < xMin ? itemMinX : xMin;
			xMax = itemMaX > xMax ? itemMaX : xMax;
			yMin = itemMinY < yMin ? itemMinY : yMin;
			yMax = itemMaxY > yMax ? itemMaxY : yMax;
		}

		return {
			xMin,
			xMax,
			yMin,
			yMax,
		};
	};

	/**
	 * Поправка позиции DOM элемента на коорддинатныю сетку
	 *
	 * @param elX
	 * @param elY
	 * @returns {{x: number, y: number}}
	 */
	coordinates = (elX, elY) => {
		const svg = this.gridRef.current && this.gridRef.current.getSvg();
		const rect = svg.getBoundingClientRect();
		const svgWidth = rect.width - 2;
		const svgHeight = rect.height - 2;
		const offset = {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft,
		};

		const x = Math.round((elX - offset.left) * this.width / svgWidth);
		const y = Math.round((elY - offset.top) * this.height / svgHeight);

		return {x, y};
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
		this.fixPosition();
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

		return (
			<Grid
				width={this.width}
				height={this.height}
				className={classnames('mnemonic-scheme-viewer', className)}
				ref={this.gridRef}
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

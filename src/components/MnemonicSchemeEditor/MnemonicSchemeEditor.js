import React from 'react';
import PropTypes from 'prop-types';
import Icon, {
	BgColorsOutlined,
	BoldOutlined,
	CloseOutlined,
	DeleteOutlined,
	DragOutlined,
	FontSizeOutlined,
	ItalicOutlined,
	SaveOutlined, UnderlineOutlined
} from '@ant-design/icons';
import {
	Button,
	Col,
	Row,
	Select,
	Tree,
	Modal,
	Input,
	Checkbox,
	notification,
	Space,
	Tooltip,
	Menu, Dropdown
} from 'antd';

import {Zoom} from '../Zoom/Zoom';
import Pipeline from './elements/Pipeline';
import {equal, stop} from '../../utils';
import {findGroupByCode} from '../../constants';
import {getScheme, storeScheme} from '../../utils/network';
import PipelineConnection from './elements/PipelineConnection';
import Text from './elements/Text';
import PipelineCross from './elements/PipelineCross';
import FlowDirectionWater from './elements/FlowDirectionWater';
import FlowDirectionGas from './elements/FlowDirectionGas';
import TemperatureConverter from './elements/TemperatureConverter';
import FlowMeter from './elements/FlowMeter';
import PressureConverter from './elements/PressureConverter';
import PressureChangeDetector from './elements/PressureChangeDetector';
import HeatAmountDetector from './elements/HeatAmountDetector';
import FlowMeterUltrasound from './elements/FlowMeterUltrasound';
import ValveLockPassthrough from './elements/ValveLockPassthrough';
import ValveLockAngular from './elements/ValveLockAngular';
import ValveReversePassthrough from './elements/ValveReversePassthrough';
import ValveReverseAngular from './elements/ValveReverseAngular';
import Latch from './elements/Latch';
import ValveAdjuster from './elements/ValveAdjuster';
import Throttle from './elements/Throttle';
import PumpManual from './elements/PumpManual';
import PumpNonAdjustable from './elements/PumpNonAdjustable';
import PumpJetStream from './elements/PumpJetStream';
import PumpCantilevered from './elements/PumpCantilevered';
import PumpCircular from './elements/PumpCircular';
import PumpNonAdjustableReverse from './elements/PumpNonAdjustableReverse';
import FanCentrifugal from './elements/FanCentrifugal';
import FanAxial from './elements/FanAxial';
import HeatExchanger from './elements/HeatExchanger';
import HeaterPanel from './elements/HeaterPanel';
import HeaterSectioned from './elements/HeaterSectioned';
import './MnemonicSchemeEditor.css';


class MnemonicSchemeEditor extends React.Component {
	static FIGURES = [new Pipeline(),
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

	constructor(props) {
		super(props);
		this.state = {
			width: 124,
			height: 76,
			name: '',
			isProduction: false,
			loading: !!props.id,
			mode: 'none',
			drawingFigure: null,
			elements: [],
			processingElements: [],
			editingElement: null,
			onMouseOverElement: null,
		};
		this.svgRef = React.createRef();
	}

	componentDidMount() {
		const {id, mnemoscheme, requestSchemeById} = this.props;

		document.addEventListener('mouseup', this.nodeMoveModeOff, false);
		document.addEventListener('wheel', this.onWheel, {passive: false});
		document.addEventListener('keyup', this.onKeyUp, false);

		if (id && requestSchemeById) {
			this.getScheme(id);
		} else if (mnemoscheme) {
			this.import(mnemoscheme.content);
			this.setState({
				name: mnemoscheme.title,
				isProduction: !!mnemoscheme.isProduction,
			});
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.nodeMoveModeOff, false);
		document.removeEventListener('wheel', this.onWheel, false);
		document.removeEventListener('keyup', this.onKeyUp, false);
	}

	getAvailableFigures = () => {
		// ???? ????????????, ???????? ???? ?????? ???????????? ?????????? ???????????????? ?????? ???????????????????? ????????????????????, ?????????? ?????????? ??????????????????????
		return MnemonicSchemeEditor.FIGURES;
	};

	render() {
		return (<div className="mnemonic-scheme-editor">
			<div className="mnemonic-scheme-toolsPanel-container">
				<div className="mnemonic-scheme-toolsPanel-header">
					????????????????
				</div>

				<div className="mnemonic-scheme-toolsPanel-tree-container mnemonic-scheme-svgWrapper-000000">
					{this.renderFigureTree()}
				</div>
			</div>

			<div className="mnemonic-scheme-drawingPanel-container">

				{this.renderTopPanel()}
				{this.renderControlsPanel()}

				<div className="mnemonic-scheme-rightPanel-viewPanel-outerContainer">
					<div className="mnemonic-scheme-rightPanel-viewPanel-grid-outerContainer">
						{this.renderEditor()}
					</div>
				</div>

			</div>
		</div>);
	};

	renderColorControls = () => {
		/** colors model */
		const colors = ['#b80000', '#1273de', '#ffb307', '#008b02', '#006b76', '#000000'];
		const colorButtonEnabled = this.state.editingElement && this.elementFigure(this.state.editingElement).canChangeColor();
		const ElementColorsMenu = () => (
			<Menu>
				{
					colors.map(color => (
							<Menu.Item
								key={color}
								onClick={({key}) => {
									this.changeEditElementColor(key);
								}}
							>
								<span className={'mnemonic-element-colorSelector'} style={{backgroundColor: color}}/>
							</Menu.Item>
						)
					)
				}
			</Menu>
		);

		const currentSelectedColor = this.state.editingElement && this.state.editingElement.color;
		return (
			<Tooltip title={'???????? ????????????????'}>
				<Dropdown.Button
					overlay={ElementColorsMenu}
					disabled={!colorButtonEnabled}
					icon={<BgColorsOutlined style={{color: currentSelectedColor}}/>}
					placement={'bottomLeft'}
					buttonsRender={([, rightButton]) => [ // leftButton ???????? ???????????????? ?????????? ???????????????? ?????????? ????????????
						null,
						rightButton
					]}
				/>
			</Tooltip>
		);
	};

	/** ???????????????? ?? ???????????????? ???????????? */
	renderTextControls = () => {
		const changeAttr = (attr, value) => {
			const newState = {...this.state};
			newState.editingElement[attr] = value;
			this.setState(newState);
		};
		const toggleAttr = attr => {
			changeAttr(attr, !this.state.editingElement[attr]);
		};
		const FontSizeMenu = () => {
			const onFontMenuClick = ({key}) => changeAttr('fontSize', key);
			return (
				<Menu>
					<Menu.Item
						key={'small'}
						onClick={onFontMenuClick}
					>
						????????????
					</Menu.Item>
					<Menu.Item
						key={'medium'}
						onClick={onFontMenuClick}
					>
						??????????????
					</Menu.Item>
					<Menu.Item
						key={'big'}
						onClick={onFontMenuClick}
					>
						??????????????
					</Menu.Item>

				</Menu>
			);
		};

		return (
			<Space size={3}>
				<Input
					placeholder="???????????????? ??????????"
					style={{width: '200px'}}
					value={(this.state.editingElement && this.state.editingElement.text) || ''}
					onChange={event => {
						const newState = {...this.state};
						newState.editingElement.setText(event.target.value);
						this.setState(newState);
					}}
				/>
				<Tooltip title={'???????????? ????????????'}>
					<Dropdown.Button
						overlay={FontSizeMenu}
						icon={<FontSizeOutlined/>}
						placement={'bottomLeft'}
						buttonsRender={([, rightButton]) => [ // leftButton ???????? ???????????????? ?????????? ???????????????? ?????????? ????????????
							null,
							rightButton
						]}
					/>
				</Tooltip>
				<Tooltip title={'????????????'}>
					<Button
						type={(this.state.editingElement && this.state.editingElement.fontBold) ? 'primary' : 'default'}
						icon={<BoldOutlined/>}
						onClick={() => toggleAttr('fontBold')}

					/>
				</Tooltip>
				<Tooltip title={'????????????'}>
					<Button
						type={(this.state.editingElement && this.state.editingElement.fontItalic) ? 'primary' : 'default'}
						icon={<ItalicOutlined/>}
						onClick={() => toggleAttr('fontItalic')}
					/>
				</Tooltip>
				<Tooltip title={'????????????????????????'}>
					<Button
						type={(this.state.editingElement && this.state.editingElement.fontUnderline) ? 'primary' : 'default'}
						icon={<UnderlineOutlined/>}
						onClick={() => toggleAttr('fontUnderline')}
					/>
				</Tooltip>
			</Space>
		);
	};

	/** ???????????? ???????????????? */
	renderDeleteButton = () => (
		<Tooltip title={'?????????????? ??????????????'}>
			<Button
				type={'danger'}
				disabled={!this.state.editingElement}
				icon={<DeleteOutlined/>}
				onClick={this.removeEditingElement}
			/>
		</Tooltip>
	);

	/** ???????????????????? ?????????? ?????????????????? ?? ?????????????????? ???????????????? */
	clearDrawing = () => {
		const newState = {...this.state};
		newState.mode = 'none';
		newState.drawingFigure = null;
		newState.processingElements = [];
		newState.editingElement = null;
		this.setState(newState);
	};

	renderMoveButton = () => {
		const buttonProps = (
			this.state.mode !== 'drawing'
			&& this.state.drawingFigure === null
			&& !this.state.processingElements.length
			&& !this.state.editingElement
		)
			? {type: 'primary', ghost: true}
			: {type: 'default'};
		return <Tooltip title={'?????????? ???????????? ??????????????????'}>
			<Button
				{...buttonProps}
				icon={<DragOutlined/>}
				onClick={this.clearDrawing}
			/>
		</Tooltip>;
	};

	renderAssignmentControls = () => {

		if (!this.state.editingElement) {
			return null;
		}

		const measures = this.elementFigure(this.state.editingElement).measures();
		const roundingVariants = [0, 1, 2, 3, 4]; //???????????????? ????????????????????
		if (!measures) return null;
		return (
			<Space size={3}>
				<div>
					??????????????????:
				</div>
				<Input
					placeholder="??????"
					value={(this.state.editingElement && this.state.editingElement.measureKey) || ''}
					onChange={event => {
						const newState = {...this.state};
						newState.editingElement.setMeasureKey(event.target.value);
						this.setState(newState);
					}}
				/>

				<Select
					value={this.state.editingElement && this.state.editingElement.labelText
						? this.state.editingElement.labelText
						: measures[0]
					}
					onChange={value => {
						const newState = {...this.state};
						newState.editingElement.setLabelText(value);
						this.setState(newState);
					}}
				>
					{measures.map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)}
				</Select>
				<div>??????????????????:</div>
				<Select
					value={this.state.editingElement && this.state.editingElement.rounding
						? this.state.editingElement.rounding
						: roundingVariants[0]
					}
					onChange={value => {
						const newState = {...this.state};
						newState.editingElement.setRounding(value);
						this.setState(newState);
					}}
				>
					{roundingVariants.map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)}
				</Select>
			</Space>
		);

	};

	renderDirectionControls = () => {
		const figure = !this.state.editingElement ? null : this.elementFigure(this.state.editingElement);
		const directions = [];

		if (figure) {
			const transformations = figure.canBeTransformed() || [];
			for (let i = 0; i < transformations.length; i++) {
				const transformation = transformations[i];
				let className = 'mnemonic-scheme-panel-icon-transform-choose';
				if (equal(this.state.editingElement.transformation, transformation)) {
					className += ' mnemonic-scheme-panel-icon-transform-choose-active';
				}

				let transformationText = '';
				for (let i = 0; i < transformation.length; i++) {
					const t = transformation[i];
					if (transformationText.length) {
						transformationText += ' ';
					}
					if (t.flip) {
						transformationText += 'scale(';
						if (t.flip === 'horizontal') {
							transformationText += '-1, 1';
						} else {
							if (t.flip === 'vertical') {
								transformationText += '1, -1';
							}
						}
						transformationText += ')';
					} else {
						if (t.rotate) {
							transformationText += 'rotate(' + t.rotate + 'deg)';
						}
					}
				}

				directions.push(
					<Icon
						key={JSON.stringify(transformation)} component={figure.svgImage()} className={className}
						style={{'transform': transformationText}}
						onClick={() => this.changeEditElementTransformation(transformation)}
					/>
				);
			}
			if (directions.length) {
				let className = 'mnemonic-scheme-panel-icon-transform-choose';
				if (!this.state.editingElement.transformation) {
					className += ' mnemonic-scheme-panel-icon-transform-choose-active';
				}
				directions.push(
					<Icon
						key={'normal'} component={figure.svgImage()} className={className}
						onClick={() => this.changeEditElementTransformation(null)}
					/>
				);
			}
		}

		if (!directions.length) return null;


		return (
			<Space size={3}>
				<div>??????????????????????:</div>

				<div
					className="flexCenter mnemonic-scheme-svgWrapper-000000 smallFigures"
				>
					{directions}
				</div>
			</Space>
		);
	};
	renderControlsPanel = () => {
		const showAssigmentBlock = !this.state.editingElement || this.elementFigure(this.state.editingElement).measures();
		const showTextEditingBlock = this.state.editingElement && this.state.editingElement.code() === 'Text';
		return (
			<div className={'mnemonic-scheme-controlsPanel'}>
				<Space size={8}>
					<Space size={3}>
						{this.renderMoveButton()}
						{this.renderColorControls()}
					</Space>

					{showTextEditingBlock && this.renderTextControls()}
					{this.renderDirectionControls()}
					{showAssigmentBlock && this.renderAssignmentControls()}
				</Space>
				{this.renderDeleteButton()}
			</div>
		);
	};
	renderEditor = () => {
		const {width, height} = this.state;

		const grid = [];
		for (let i = 1; i <= width - 1; i++) {
			grid.push(
				<line
					key={'grid-x-' + i}
					x1={i}
					x2={i}
					y1="0"
					y2={height}
					className={'mnemonic-scheme-rightPanel-viewPanel-grid-line-' + (i % 4 === 0 ? 'main' : 'additional')}
				/>
			);
		}
		for (let i = 1; i <= height - 1; i++) {
			grid.push(
				<line
					key={'grid-y-' + i}
					y1={i}
					y2={i}
					x1="0"
					x2={width}
					className={'mnemonic-scheme-rightPanel-viewPanel-grid-line-' + (i % 4 === 0 ? 'main' : 'additional')}
				/>
			);
		}

		const processingClass = e => {
			if (this.state.isMoving && e === this.state.editingElement) {
				return 'mnemonic-scheme-editor-moving-element';
			}

			return '';
		};

		const elementClass = e => {
			if (e === this.state.editingElement) {
				return 'mnemonic-scheme-editor-highlighted-element';
			} else {
				if (e === this.state.onMouseOverElement) {
					return 'mnemonic-scheme-editor-highlighted-light-element';
				} else {
					return '';
				}
			}
		};

		// let gridElement = <Contain ratio={this.width/this.height} className='mnemonic-scheme-rightPanel-viewPanel-grid-ratio'>
		return (
			<div className="mnemonic-scheme-rightPanel-viewPanel-grid-ratio">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="mnemonic-scheme-rightPanel-viewPanel-grid-field"
					viewBox={'0 0 ' + width + ' ' + height}
					ref={this.svgRef}
					onClick={this.state.mode === 'drawing' ? this.drawingClick : this.selectionClick}
					onMouseMove={this.state.mode === 'drawing' ? this.drawingMove : this.state.isMoving
						? this.nodeMove
						: this.selectionMove
					}
					onContextMenu={this.state.mode === 'drawing' ? this.drawingRightClick : null}
				>
					<filter
						id="mnemonic-scheme-editor-blur-filter" x="-5" y="-5" width={width + 5} height={height + 5}
						filterUnits="userSpaceOnUse"
					>
						<feDropShadow dx="0" dy="0" stdDeviation="0.15" floodColor="#0000ff"/>
					</filter>
					<filter
						id="mnemonic-scheme-editor-light-blur-filter" x="-5" y="-5" width={width + 5}
						height={height + 5}
						filterUnits="userSpaceOnUse"
					>
						<feDropShadow dx="0" dy="0" stdDeviation="0.1" floodColor="#000088"/>
					</filter>
					{grid}
					{!(this.state.elements && this.state.elements.length) ? '' : this.state.elements.map(e => (
						<g
							key={e.id}
							className={elementClass(e)}
							onMouseDown={this.state.mode !== 'drawing' && e === this.state.editingElement
								? this.nodeMoveModeOn
								: undefined
							}
						>
							{e.render()}
						</g>
					))}
					{!(this.state.processingElements && this.state.processingElements.length)
						? ''
						: this.state.processingElements.map(e => (
							<g
								key={e.id}
								className={processingClass(e)}
							>
								{e.render()}
							</g>
						))}
				</svg>
				<Zoom
					setParentState={this.setState.bind(this)}
					currentWidth={width}
					currentHeight={height}
				/>
			</div>
		);
	};

	renderFigureNode = figure => {
		const available = !figure.dependent() || (this.state.elements.length && this.state.elements.some(e => e.code() === 'Pipeline'));
		const active = figure === this.state.drawingFigure;
		const onClick = available ? () => this.toggleDrawing(figure) : null;
		let cssClass = 'mnemonic-scheme-toolsPanel-tree-item-container ';

		if (active) {
			cssClass += 'mnemonic-scheme-toolsPanel-tree-item-active ';
		}

		if (!available) {
			cssClass += 'mnemonic-scheme-toolsPanel-tree-item-disabled ';
		}
		return (
			<div className={cssClass} key={figure.type} onClick={onClick}>
				<span className="mnemonic-scheme-toolsPanel-tree-item-icon">
					<Icon component={figure.svgImage()}/>
				</span>
				<span className="mnemonic-scheme-toolsPanel-tree-item-title">
					{figure.name()}
				</span>
			</div>
		);
	};

	renderFigureTree = () => {
		const nonEmptyGroups = {};

		for (let i = 0; i < this.getAvailableFigures().length; i++) {
			// ?????? ???????? ?????????????????? ?????????? ?????????? ???? ????????????
			const figure = this.getAvailableFigures()[i];

			// ?????????????????? ???????????? ?? ???????????? ???? ???????????? ?? ?????????????????? ?? ???? ???????????? ???????? ????????????
			if (!nonEmptyGroups[figure.groupCode()]) {
				nonEmptyGroups[figure.groupCode()] = [];
			}

			nonEmptyGroups[figure.groupCode()].push(figure);
		}

		return (
			<Tree defaultExpandAll={true} className="mnemonic-scheme-toolsPanel-tree">
				{Object.getOwnPropertyNames(nonEmptyGroups).map(groupCode => {
					const group = findGroupByCode(groupCode);
					// ?????? ???????????? ???????????? ???? ???????????? ???????????? ???? ?? ?????? ?????????????????????? ????????????
					return (
						<Tree.TreeNode key={groupCode} title={group.title} className={'mnemonic-scheme-treeGroup'}>
							{nonEmptyGroups[groupCode].map(figure => {
								return <Tree.TreeNode key={figure.code()} title={this.renderFigureNode(figure)}/>;
							})}
						</Tree.TreeNode>
					);
				})
				}
			</Tree>
		);
	};

	onSaveClick = () => {
		const {onSave, defaultSendDataOnSave, id} = this.props;
		const {name, isProduction} = this.state;
		typeof onSave === 'function' && onSave({
			id,
			isProduction,
			title: name,
			content: this.export()
		});
		defaultSendDataOnSave && this.storeSchemeHandler();
	};

	nameChange = e => {
		this.setState({
			name: e.target.value,
		});
	};

	typeChange = e => {
		this.setState({
			isProduction: e.target.checked,
		});
	};
	asNewChange = e => {
		this.setState({
			asNew: e.target.checked,
		});
	};

	renderTopPanel = () => {

		return (
			<div className="mnemonic-scheme-drawingPanel-topInputs-container">
				<Row>
					<Col span={14}>
						<div className={'mnemonic-scheme-drawingPanel-topInputs-leftGroup'}>
							<Input
								className="mnemonic-scheme-drawingPanel-topInputs-name"
								placeholder="?????????????? ???????????????? ????????????????????"
								value={this.state.name}
								onChange={this.nameChange}
							/>

							<Checkbox
								checked={this.state.isProduction}
								onChange={this.typeChange}
							>
								??????????????
							</Checkbox>
						</div>
					</Col>

					<Col span={10}>
						<div className={'mnemonic-scheme-drawingPanel-rightInputs-container'}>
							<Button
								type="default"
								icon={<CloseOutlined/>}
								onClick={() => this.props.onCancel && this.props.onCancel()}
							>????????????</Button>
							<div className={'mnemonic-scheme-flexColumn'}>
								<Button
									type="primary"
									ghost
									icon={<SaveOutlined/>}
									disabled={!(this.state.name && this.state.name.length > 0)}
									onClick={this.onSaveClick}
								>??????????????????</Button>
								<Checkbox
									onChange={this.asNewChange}
								>?????? ????????????</Checkbox>
							</div>
						</div>

					</Col>
				</Row>
			</div>
		);
	};


	/**
	 * ???????? ???? ?????????? ???????? ?? ????????????. ?????????? ????????????????-?????????????????? ?????????? ?????????????????? ???????????? ????????????????.
	 */
	toggleDrawing = figure => {
		const newState = {...this.state};
		if (newState.mode !== 'drawing' || newState.drawingFigure !== figure) {
			newState.mode = 'drawing';
			newState.drawingFigure = figure;
			figure.onIconClick(x => { // callbackOnConfirm
				this.setState({...this.state, processingElements: [x]});
			}, () => { // callbackOnCancel
				this.setState({
					...this.state, mode: 'none', drawingFigure: null,
				});
			});
		} else {
			newState.mode = 'none';
			newState.drawingFigure = null;
		}
		newState.processingElements = [];
		newState.editingElement = null;
		this.setState(newState);
	};

	/**
	 * ???????? ???????????? ?????????????? ???????? ?? ???????????? ?????????????????? ???????????? ??????????????
	 */
	drawingRightClick = event => {
		stop(event);
		this.drawingClick(event, true);
	};

	/**
	 * ???????? ?????????????? ???????? ?? ???????????? ?????????????????? ???????????? ??????????????
	 */
	drawingClick = (event, rightClick = false) => {
		const newState = {...this.state};
		const coords = this.coordinates(event);
		const result = newState.drawingFigure.onClick(
			coords.x,
			coords.y,
			this.state.width,
			this.state.height,
			rightClick,
			newState.elements,
			newState.processingElements
		);

		if (result == null) {
			newState.mode = 'none';
			newState.drawingFigure = null;
			newState.processingElements = [];
		} else {
			newState.processingElements = result.processing || [];
			if (result.added) {
				Array.prototype.push.apply(newState.elements, result.added);
				newState.editingElement = result.added[0];

				if (result.done) {
					newState.mode = 'none';
					newState.drawingFigure = null;
					newState.processingElements = [];
				}
			} else {
				newState.editingElement = null;
			}
		}

		this.setState(newState);
	};

	/**
	 * ?????????????????? ?????????????????? ?????????????? ?? ???????????? ????????????????????????????
	 */
	drawingMove = event => {
		const coords = this.coordinates(event);
		const newState = {...this.state};

		newState.processingElements = this.state.drawingFigure.onMove(
			coords.x,
			coords.y,
			this.state.width,
			this.state.height,
			this.state.elements,
			this.state.processingElements
		);

		this.setState(newState);
	};

	/**
	 * ?????????????? ???????????????? ?? ???????????? ?????????????????? ???????????????????????? ??????????????????
	 */
	selectionMove = event => {
		const decimalCoords = this.coordinates(event, false);
		const element = this.state.elements.find(e => e.containsPoint(decimalCoords.x, decimalCoords.y, true));

		if ((element || this.state.onMouseOverElement) && (element !== this.state.onMouseOverElement)) {
			const newState = {...this.state};

			newState.onMouseOverElement = element;
			this.setState(newState);
		}
	};

	nodeMove = event => {
		const coords = this.coordinates(event);
		const newState = {...this.state};

		const figure = this.elementFigure(this.state.editingElement);

		newState.processingElements = figure.onMove(
			coords.x,
			coords.y,
			this.state.width,
			this.state.height,
			this.state.elements,
			this.state.processingElements
		);

		this.setState(newState);
	};

	transformElementByWheel = (element, wheelEvent) => {
		let newTransformation;
		const figure = this.elementFigure(element);
		const transformations = figure.canBeTransformed() || [];
		const currentTransformation = element.transformation || [];
		const isFlipped = currentTransformation.find(t => !!t.flip);

		const isHasFlipProp = transformation => transformation.findIndex(t => !!t.flip) > -1;
		const possibleTransformations = transformations.filter(t => isFlipped ? isHasFlipProp(t) : !isHasFlipProp(t));
		const currentIndexFromPossibleTransformations = possibleTransformations.findIndex(t => equal(t, currentTransformation));

		if (wheelEvent.wheelDelta < 0) { // ???????? ???????????? ???????????? ????????
			if (currentIndexFromPossibleTransformations === possibleTransformations.length - 1) {
				newTransformation = isFlipped ? possibleTransformations[0] : null;
			} else {
				newTransformation = possibleTransformations[currentIndexFromPossibleTransformations + 1];
			}
		} else {
			if (currentIndexFromPossibleTransformations === 0) {
				newTransformation = !isFlipped ? null : possibleTransformations[possibleTransformations.length - 1];
			} else if (currentIndexFromPossibleTransformations === -1) {
				newTransformation = possibleTransformations[possibleTransformations.length - 1];
			} else {
				newTransformation = possibleTransformations[currentIndexFromPossibleTransformations - 1];
			}
		}

		return newTransformation;
	};

	onKeyUp = e => {
		switch (e.key) {
			case 'Delete': {
				this.state.editingElement && this.removeEditingElement();
				break;
			}
			case 'Escape': {
				this.setState({
					mode: 'none',
					drawingFigure: null,
					processingElements: []
				});
				break;
			}
			default:
				break;
		}
	};

	onWheel = e => {
		const newState = {...this.state};
		const {editingElement, processingElements} = this.state;
		const isElementPipelineOrText = e => e.code() === 'Pipeline' || e.code() === 'Text';

		if (e.shiftKey) {
			e.preventDefault();
			if (processingElements && processingElements.length) {
				newState.processingElements = processingElements.map(el => {
					if (!isElementPipelineOrText(el)) {
						el.setTransformation(this.transformElementByWheel(el, e), true);
					}

					return el;
				});
			} else if (editingElement) {
				if (!isElementPipelineOrText(editingElement)) {
					editingElement.setTransformation(this.transformElementByWheel(editingElement, e), true);
					newState.editingElement = editingElement;
				}
			}

			this.setState(newState);
		}
	};

	/**
	 * ???????????????????? ?????????????? ?????????????????????? ????????????????
	 */
	nodeMoveMode = value => event => {
		if (
			event.button === 0 &&
			this.state.mode !== 'drawing' &&
			this.state.editingElement &&
			this.state.editingElement.code() !== 'Pipeline'
		) {
			if (value) {
				this.setState({
					processingElements: [this.state.editingElement],
					isMoving: true,
					oldPosition: this.state.editingElement.position,
				});
			} else {
				const coords = this.coordinates(event);
				const figure = this.elementFigure(this.state.editingElement);
				const result = figure.onClick(
					coords.x,
					coords.y,
					this.state.width,
					this.state.height,
					false,
					this.state.elements,
					this.state.processingElements
				);

				if ((result === null || (result.added && result.added.length === 0)) && this.state.oldPosition) {
					this.state.editingElement.setPosition(this.state.oldPosition.x, this.state.oldPosition.y);
					figure.onClick(
						this.state.oldPosition.x,
						this.state.oldPosition.y,
						this.state.width,
						this.state.height,
						false,
						this.state.elements,
						this.state.processingElements
					);
				}

				this.setState({processingElements: [], isMoving: false, oldPosition: undefined,});
			}
		}
	};

	nodeMoveModeOn = this.nodeMoveMode(true);
	nodeMoveModeOff = this.nodeMoveMode(false);

	/**
	 * ???????? ?? ???????????? ?????????????????? ???????????????????????? ??????????????????
	 */
	selectionClick = event => {
		const decimalCoords = this.coordinates(event, false);
		const element = this.state.elements.find(e => e.containsPoint(decimalCoords.x, decimalCoords.y, true));
		const newState = {...this.state};

		newState.editingElement = element;
		newState.onMouseOverElement = null;
		this.setState(newState);
	};

	/**
	 * ?????????? ?????????? ???????????????? ???????????????????????????? ????????????????
	 */
	changeEditElementColor = color => {
		const newState = {...this.state};
		newState.editingElement.setColor(color);

		this.setState(newState);
	};

	/**
	 * ?????????? ?????????????????????????? (??????????????-??????????????????) ???????????????? ???????????????????????????? ????????????????
	 */
	changeEditElementTransformation = transformation => {
		const newState = {...this.state};

		newState.editingElement.setTransformation(transformation, true);
		this.setState(newState);
	};

	/**
	 * ???????????????? ???????????????? ???????????????????????????? ???????????????? ??, ???????? ?????? ??????????????????????, ?????????????????????????? ???? ???????? ??????????????????
	 */
	removeEditingElement = () => {
		const newState = {...this.state};

		newState.elements = newState.elements.filter(e => e !== newState.editingElement);

		if (newState.editingElement.code() === 'Pipeline') {
			const pipelines = newState.elements.filter(e => e.code() === 'Pipeline');
			newState.elements = newState.elements.filter(e =>
				e.code() === 'Pipeline' ||
				e.code() === 'Text' ||
				pipelines.some(p => p.containsPoint(e.position.x, e.position.y))
			);
		}

		newState.editingElement = null;
		this.setState(newState);
	};

	/**
	 * ???????????????????????????? ?????????????? ?????????????????? ?????????????? ?? ???????????????????? ???? ??????????
	 */
	coordinates = (event, rounded = true) => {
		const {width, height} = this.state;
		const svg = this.svgRef.current;
		const rect = svg.getBoundingClientRect();
		const svgWidth = rect.width - 2;
		const svgHeight = rect.height - 2;
		const offset = {
			top: rect.top + document.body.scrollTop, left: rect.left + document.body.scrollLeft,
		};

		let x = (event.clientX - offset.left) * width / svgWidth;
		let y = (event.clientY - offset.top) * height / svgHeight;

		if (rounded) {
			x = Math.round(x);
			y = Math.round(y);
		}

		return {x, y};
	};

	/**
	 * ?????????????????? "????????????" ???? ?????????????????????? ???? ????????????????
	 */
	elementFigure = element => {
		return this.figureByCode(element.code());
	};

	figureByCode = code => {
		return this.getAvailableFigures().find(f => f.code() === code);
	};

	export = () => {
		return this.state.elements.map(e => this.elementFigure(e).serialize(e));
	};

	import = data => {
		this.setState({
			...this.state,
			mode: 'none',
			drawingFigure: null,
			elements: (data || []).map(d => this.figureByCode(d.code).deserialize(d)),
			processingElements: [],
			editingElement: null,
			onMouseOverElement: null,
		});
	};

	storeScheme = () => {
		storeScheme({
			id: this.props.id,
			name: this.state.name,
			isProduction: this.state.isProduction,
			data: this.export(),
		}).catch(error => {
			notification.error({
				message: '????????????',
				description: error.message,
			});
		}).then(() => {
			notification.info({
				message: '???????????????????? ??????????????????',
				description: '???????????????????? ?????????????????? ????????????',
			});
		});
	};

	storeSchemeHandler = () => {
		if (!this.state.name) {
			Modal.warning({
				title: '????????????????',
				content: '?????? ???? ?????????? ???????? ????????????',
			});
			return;
		}

		this.storeScheme();
	};
	getScheme = id => {
		getScheme(id)
			.catch(error => {
				notification.error({
					message: '????????????',
					description: error.message,
				});
			})
			.then(data => {
				data && this.import(data.data);
				this.setState({
					name: data && data.name,
					isProduction: !!(data && data.isProduction),
					loading: false,
				});
			});
	};
}

MnemonicSchemeEditor.propTypes = {
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	mnemoscheme: PropTypes.object,
	defaultSendDataOnSave: PropTypes.bool, // TODO: ??????????????????????????? ???????? true, ???? ?????? ???????????????????? ?????????? ?????????? ???? ????????????
	requestSchemeById: PropTypes.bool,
};

MnemonicSchemeEditor.defaultProps = {
	defaultSendDataOnSave: true,
	requestSchemeById: true,
};

export {MnemonicSchemeEditor};

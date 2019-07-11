import React from 'react';
import PropTypes from 'prop-types';
import AbstractFigure from './AbstractFigure';


class AbstractSimpleFigure extends AbstractFigure {
	dependent = () => true;

	defaultColor = () => '#000000';

	canChangeColor = () => true;

	canBeTransformed = () => [
		[{flip: 'horizontal'}],
		[{flip: 'vertical'}],
		[{rotate: 90}],
		[{rotate: 180}],
		[{rotate: 270}],
		[{flip: 'vertical'}, {rotate: 90}],
		[{flip: 'horizontal'}, {rotate: 90}]
	];

	onIconClick = () => {};

	onClick = (x, y, fieldWidth, fieldHeight, rightClick, currentElements, processingElements) => {
		if (rightClick) {
			return null;
		}

		const element = this.currentElement(processingElements);
		const position = this.fixPosition(x, y, fieldWidth, fieldHeight);
		const canBeMounted = this.canBeMounted(currentElements, element, position.x, position.y);
		element.setPosition(position.x, position.y);
		element.setCanBeMounted(canBeMounted);

		if (canBeMounted) {
			return {added: [element], processing: []};
		} else {
			return {added: [], processing: [element]};
		}
	};

	onMove = (x, y, fieldWidth, fieldHeight, currentElements, processingElements) => {
		const element = this.currentElement(processingElements);
		const position = this.fixPosition(x, y, fieldWidth, fieldHeight);

		element.setPosition(position.x, position.y);
		element.setCanBeMounted(this.canBeMounted(currentElements, element, position.x, position.y));

		return [element];
	};

	currentElement = processingElements => {
		if (processingElements && processingElements.length) {
			return processingElements[0];
		} else {
			return new SimpleFigureInstance({
				id: this.generateId(),
				codeId: this.code(),
				svgImage: this.svgImage(),
				width: this.width(),
				height: this.height(),
				color: this.defaultColor(),
				measures: this.measures(),
				measureKey: this.measureKey,
			});
		}
	};

	mountPosition = (element, x, y) => {
		if (SimpleFigureInstance.isElementMeter(element.code())) {
			const rotation = !element.transformation || !element.transformation.length
				? null
				: element.transformation[0].rotate
			;
			const offsetY = Math.round(element.height / 2);

			switch (rotation) {
				case 90: {
					x = x - offsetY;
					break;
				}
				case 180: {
					y = y - offsetY;
					break;
				}
				case 270: {
					x = x + offsetY;
					break;
				}
				default: {
					y = y + offsetY;
					break;
				}
			}
		}

		return {x, y};
	};

	/**
	 * Поправка координат на центр фигуры или то место, которым она монтируется
	 */
	fixPosition = (x, y, fieldWidth, fieldHeight) => {
		const offsetX = Math.round(this.width() / 2);
		const offsetY = Math.round(this.height() / 2);

		if (x - offsetX < 0) {
			x = offsetX;
		} else {
			if (x - offsetX + this.width() > fieldWidth) {
				x = fieldWidth - this.width() + offsetX;
			}
		}

		if (y - offsetY < 0) {
			y = offsetY;
		} else {
			if (y - offsetY + this.height() > fieldHeight) {
				y = fieldHeight - this.height() + offsetY;
			}
		}

		return {x, y};
	};

	/**
	 * Можно ли установить данную фигуру на текущее место (под ней есть трубопровод и она ни с кем не пересекается)
	 */
	canBeMounted = (currentElements, element, fixedX, fixedY) => {
		const {x, y} = this.mountPosition(element, fixedX, fixedY);

		return currentElements.filter(e => e.code() === 'Pipeline')
			.some(p => p.containsPoint(x, y)) && currentElements.filter(e => e.code() !== 'Pipeline' && e.id !== element.id)
			.every(f => !f.figuresIntersects(element));
	};

	canChangeFont = () => false;

	serialize = e => {
		const data = {code: e.codeId, x: e.position.x, y: e.position.y};

		['id', 'color', 'transformation', 'labelText', 'measureKey'].forEach(attr => void (data[attr] = e[attr]));
		return data;
	};

	deserialize = data => {
		const instance = new SimpleFigureInstance({
			id: data.id,
			codeId: this.code(),
			svgImage: this.svgImage(),
			width: this.width(),
			height: this.height(),
			color: data.color,
			measures: this.measures(),
			measureKey: data.measureKey,
		});

		instance.setPosition(data.x, data.y);
		instance.setTransformation(data.transformation);
		instance.setLabelText(data.labelText);

		return instance;
	};
}

class SimpleFigureInstance {
	code = () => this.codeId;

	constructor({
		id, codeId, svgImage, width, height, color, measures, measureKey, measureValue, canBeMounted = true,
	}) {
		this.id = id;
		this.codeId = codeId;
		this.position = null;
		this.color = color;
		this.image = svgImage;
		this.width = width;
		this.height = height;
		this.isMeasure = !!measures;
		this.measureKey = measureKey;
		this.measureValue = measureValue || '';
		this.canBeMounted = canBeMounted;
		this.transformation = null;
		this.labelText = measures && measures[0];
	}

	render = () => {
		return (
			<SimpleFigureElement
				key={this.id}
				position={this.position}
				color={this.color}
				image={this.image}
				width={this.width}
				height={this.height}
				isMeasure={this.isMeasure}
				isMeter={SimpleFigureInstance.isElementMeter(this.codeId)}
				measureValue={this.measureValue}
				canBeMounted={this.canBeMounted}
				transformation={this.transformation}
				labelText={this.labelText}
			/>
		);
	};

	/**
	 * Входит ли фигура в число тех, которые стоят на ножке
	 * HeatAmountDetector, PressureChangeDetector, PressureConverter, TemperatureConverter
	 */
	static isElementMeter = code => [
		'HeatAmountDetector',
		'PressureChangeDetector',
		'PressureConverter',
		'TemperatureConverter'
	].includes(code);

	setPosition = (x, y) => {
		this.position = {x, y};
	};

	setCanBeMounted = canBeMounted => {
		this.canBeMounted = canBeMounted;
	};

	setColor = color => {
		this.color = color;
	};

	setTransformation = (transformation, fixPosition) => {
		const prevRotation = this.transformation && this.transformation.length ? this.transformation[0].rotate : null;
		const newRotation = transformation && transformation.length ? transformation[0].rotate : null;
		const offsetX = Math.round(this.width / 2);
		const offsetY = Math.round(this.height / 2);

		if (fixPosition && SimpleFigureInstance.isElementMeter(this.codeId) && (prevRotation || newRotation)) {
			switch (prevRotation) {
				case 90: {
					switch (newRotation) {
						case 180: {
							this.setPosition(this.position.x - offsetX, this.position.y + offsetY);
							break;
						}
						case 270: {
							this.setPosition(this.position.x - this.height, this.position.y);
							break;
						}
						case null: {
							this.setPosition(this.position.x - offsetX, this.position.y - offsetY);
							break;
						}
						default: break;
					}
					break;
				}
				case 180: {
					switch (newRotation) {
						case 90: {
							this.setPosition(this.position.x + offsetY, this.position.y - offsetX);
							break;
						}
						case 270: {
							this.setPosition(this.position.x - offsetY, this.position.y - offsetX);
							break;
						}
						case null: {
							this.setPosition(this.position.x, this.position.y - this.height);
							break;
						}
						default: break;
					}
					break;
				}
				case 270: {
					switch (newRotation) {
						case 90: {
							this.setPosition(this.position.x + this.height, this.position.y);
							break;
						}
						case 180: {
							this.setPosition(this.position.x + offsetX, this.position.y + offsetY);
							break;
						}
						case null: {
							this.setPosition(this.position.x + offsetX, this.position.y - offsetY);
							break;
						}
						default: break;
					}
					break;
				}
				default: {
					switch (newRotation) {
						case 90: {
							this.setPosition(this.position.x + offsetY, this.position.y + offsetX);
							break;
						}
						case 180: {
							this.setPosition(this.position.x, this.position.y + this.height);
							break;
						}
						case 270: {
							this.setPosition(this.position.x - offsetY, this.position.y + offsetX);
							break;
						}
						default: break;
					}
				}
			}
		}

		this.transformation = transformation;
	};

	setLabelText = labelText => {
		this.labelText = labelText;
	};

	setMeasureKey = key => {
		this.measureKey = key;
	};

	setMeasureValue = key => {
		this.measureValue = key;
	};

	containsPoint = (x, y) => {
		const fx = this.position.x;
		const fy = this.position.y;
		const w = this.width;
		const h = this.height;
		const offsetX = Math.round(w / 2);
		const offsetY = Math.round(h / 2);
		return (
			fx - offsetX <= x && fx - offsetX + w >= x &&
			fy - offsetY <= y && fy - offsetY + h >= y
		);
	};

	figuresIntersects = e2 => {
		const e1 = this;

		return !(
			e1.position.x + e1.width < e2.position.x ||
			e2.position.x + e2.width < e1.position.x ||
			e1.position.y + e1.height < e2.position.y ||
			e2.position.y + e2.height < e1.position.y
		);
	};
}

class SimpleFigureElement extends React.Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		transformation: PropTypes.array,
		position: PropTypes.object,
		color: PropTypes.string,
		image: PropTypes.func,
		canBeMounted: PropTypes.bool,
		isMeasure: PropTypes.bool,
		isMeter: PropTypes.bool,
		labelText: PropTypes.string,
		measureValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};

	getMeasureBlockOffset = () => {
		const {transformation, width, height, isMeter} = this.props;
		const rotation = !transformation || !transformation.length ? null : transformation[0].rotate;
		const offsetX = Math.round(width / 2);
		const offsetY = Math.round(height / 2);
		const label = {};
		const content = {};
		let measureBlockX;
		let measureBlockY;

		switch (rotation) {
			case 90: {
				if (isMeter) {
					measureBlockX = -offsetY - 10;
					measureBlockY = -offsetX - 1.5;
				} else {
					measureBlockX = -offsetY - 8;
					measureBlockY = -offsetX - 1.5;
				}

				label.x = measureBlockX + 3.5;
				label.y = measureBlockY + 2;
				content.x = measureBlockX + 3.5;
				content.y = measureBlockY + 5.5;
				break;
			}
			case 180: {
				if (isMeter) {
					measureBlockX = -offsetX - 1.5;
					measureBlockY = -offsetY - 10;
				} else {
					measureBlockX = -offsetX - 1.5;
					measureBlockY = -offsetY - 8;
				}

				label.x = 0;
				label.y = measureBlockY + 2;
				content.x = 0;
				content.y = measureBlockY + 5.5;
				break;
			}
			case 270: {
				if (isMeter) {
					measureBlockX = offsetX + 3;
					measureBlockY = -offsetY - 1.5;
				} else {
					measureBlockX = offsetX + 1;
					measureBlockY = -offsetY - 1.5;
				}

				label.x = measureBlockX + 3.5;
				label.y = measureBlockY + 2;
				content.x = measureBlockX + 3.5;
				content.y = measureBlockY + 5.5;
				break;
			}
			default: {
				if (isMeter) {
					measureBlockX = -offsetX - 1.5;
					measureBlockY = offsetY + 3;
				} else {
					measureBlockX = -offsetX - 1.5;
					measureBlockY = offsetY + 1;
				}

				label.x = 0;
				label.y = measureBlockY + 2;
				content.x = 0;
				content.y = measureBlockY + 5.5;
				break;
			}
		}

		return {
			measureBlockX, measureBlockY, label, content,
		};
	};

	render = () => {
		const {measureBlockX, measureBlockY, label, content} = this.getMeasureBlockOffset();
		const offsetX = Math.round(this.props.width / 2);
		const offsetY = Math.round(this.props.height / 2);

		let transformationText = '';
		if (this.props.transformation) {
			for (let i = 0; i < this.props.transformation.length; i++) {
				const transformation = this.props.transformation[i];

				if (transformationText.length) {
					transformationText += ' ';
				}

				if (transformation.flip) {
					transformationText += 'scale(';
					if (transformation.flip === 'horizontal') {
						transformationText += '-1, 1';
					} else if (transformation.flip === 'vertical') {
						transformationText += '1, -1';
					}
					transformationText += ')';
				} else if (transformation.rotate) {
					transformationText += 'rotate(' + transformation.rotate + ')';
				}
			}
		}
		transformationText = transformationText + ' translate(' + (-offsetX) + ' ' + (-offsetY) + ')';

		const colorClassName = 'mnemonic-scheme-svgWrapper-' + this.props.color.substring(1);
		const svgWrapperClass = 'mnemonic-scheme-rightPanel-viewPanel-grid-field-addedFigure ' + colorClassName;

		return (
			<g transform={'translate(' + (this.props.position.x) + ' ' + (this.props.position.y) + ')'}>
				<g transform={transformationText}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={svgWrapperClass}
						viewBox={this.props.image().props.viewBox}
						style={{...this.props.image().props.style, opacity: this.props.canBeMounted ? 1 : 0.3}}
						width={this.props.width}
						height={this.props.height}
						x={0}
						y={0}
					>
						{this.props.image().props.children}
					</svg>
				</g>

				{this.props.isMeasure && (
					<rect
						width={7} height={7} x={measureBlockX} y={measureBlockY}
						style={{
							'fill': '#FFFFFF',
							'stroke': '#DDDFE1',
							'strokeWidth': '1',
							'fillOpacity': '1',
							'strokeOpacity': '0.9',
						}}
					/>
				)}
				{this.props.isMeasure && (
					<rect
						width={7} height={3} x={measureBlockX} y={measureBlockY}
						style={{
							'fill': '#EFF6F9',
							'stroke': '#DDDFE1',
							'strokeWidth': '1',
							'fillOpacity': '1',
							'strokeOpacity': '0.9',
						}}
					/>
				)}
				{this.props.isMeasure && (
					<text
						x={label.x} y={label.y} textAnchor='middle'
						style={{'fill': '#000000', fontSize: '1.5px'}}
					>
						{this.props.labelText}
					</text>
				)}
				{this.props.isMeasure && (
					<text
						x={content.x} y={content.y} textAnchor='middle'
						style={{'fill': '#000000', fontSize: '1.5px'}}
					>
						{this.props.measureValue}
					</text>
				)}
			</g>
		);
	};
}

export default AbstractSimpleFigure;

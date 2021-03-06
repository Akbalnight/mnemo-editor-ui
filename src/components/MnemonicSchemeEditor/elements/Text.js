import text, {ReactComponent as textSvg} from '../../../assets/images/Text.svg';
import React from 'react';
import AbstractFigure from './AbstractFigure';
import {Input, Modal, Radio, Button} from 'antd';


class Text extends AbstractFigure {
	dependent = () => false;

	image = () => text;

	svgImage = () => textSvg;

	code = () => 'Text';

	groupCode = () => 'text';

	name = () => 'Текст';

	defaultColor = () => '#000000';

	canBeTransformed = () => [];

	canChangeColor = () => true;

	canChangeFont = () => true;

	onIconClick = (callbackOnConfirm, callbackOnCancel) => {
		let inputValue = 'Введите текст';
		let fontSize = 'small';
		let fontBold = false;
		let fontItalic = false;
		let fontUnderline = false;

		const textModal = Modal.confirm({
			title: 'Ввод текста',
			centered: true,
			closable: false,
			width: 600,
			okText:'Разместить',
			cancelText:'Отменить',
			okButtonProps:{disabled:true},

			onCancel: () => {
				callbackOnCancel();
			},

			content: (
				<TextSettings
					onTextChange={v => {
						inputValue = v;
						textModal.update({okButtonProps: {disabled: !v.length}});
					}}
					onChangeSize={v => inputValue = v}
					onFontSizeChange={v => fontSize = v}
					onFontBoldChange={v => fontBold = v}
					onFontItalicChange={v => fontItalic = v}
					onFontUnderlineChange={v => fontUnderline = v}
				/>
			),

			onOk: () => {
				const x = new TextInstance(
					this.generateId(),
					{
						x: 62,
						y: 38,
					},
					inputValue,
					fontSize,
					fontBold,
					fontItalic,
					fontUnderline,
					this.defaultColor()
				);
				callbackOnConfirm(x);
			},
		});
	};

	onMove = (x, y, fieldWidth, fieldHeight, currentElements, processingElements) => {
		const element = processingElements[0];

		element.setPosition(x, y);
		return [element];
	};

	onClick = (x, y, fieldWidth, fieldHeight, rightClick, currentElements, processingElements) => {
		if (rightClick) {
			return null;
		}

		const element = processingElements[0];
		element && element.setPosition(x, y);

		return {added: [element], processing: [], done: true};
	};

	serialize = e => {
		const data = {code: this.code()};

		['id', 'position', 'text', 'fontSize', 'fontBold', 'fontItalic', 'fontUnderline', 'color'].forEach(attr => data[attr] = e[attr]);
		return data;
	};

	deserialize = data => {
		return new TextInstance(data.id, data.position, data.text, data.fontSize, data.fontBold, data.fontItalic, data.fontUnderline, data.color);
	};
}

class TextSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '', fontSize: 'small', fontBold: false, fontItalic: false, fontUnderline: false,
		};
	}

	render() {
		return (
			<div>
				<Input onChange={this.setText} placeholder={'Введите текст'} defaultValue={this.state.text} />
				<Radio.Group
					onChange={this.setFontSize}
					value={this.state.fontSize}
					className={'mnemo-editor-font-settings-block'}
				>
					<Radio.Button value='small'>Мелкий</Radio.Button>
					<Radio.Button value='medium'>Средний</Radio.Button>
					<Radio.Button value='big'>Крупный</Radio.Button>
				</Radio.Group>

				<div className={'mnemo-editor-font-settings-block pull-right'}>
					<Button
						type='default'
						className={'mnemo-editor-font-btn' + (this.state.fontBold
							? ' mnemo-editor-font-btn-pressed'
							: ''
						)}
						style={{fontWeight:'bold'}}
						onClick={this.toggleFontBold}
					>
						Ж
					</Button>
					<Button
						type='default'
						className={'mnemo-editor-font-btn' + (this.state.fontItalic
							? ' mnemo-editor-font-btn-pressed'
							: ''
						)}
						style={{fontStyle:'italic'}}
						onClick={this.toggleFontItalic}
					>
						К
					</Button>
					<Button
						type='default'
						className={'mnemo-editor-font-btn' + (this.state.fontUnderline
							? ' mnemo-editor-font-btn-pressed'
							: ''
						)}
						onClick={this.toggleFontUnderline}
					>
						<span 						style={{textDecoration:'underline'}}
						>Ч</span>
					</Button>
				</div>
			</div>
		);
	};

	setText = e => {
		this.setState({...this.state, text: e.target.value});
		this.props.onTextChange(e.target.value);
	};

	setFontSize = e => {
		this.setState({...this.state, fontSize: e.target.value});
		this.props.onFontSizeChange(e.target.value);
	};

	toggleFontBold = () => {
		this.setState({...this.state, fontBold: !this.state.fontBold});
		this.props.onFontBoldChange(!this.state.fontBold);
	};

	toggleFontItalic = () => {
		this.setState({...this.state, fontItalic: !this.state.fontItalic});
		this.props.onFontItalicChange(!this.state.fontItalic);
	};

	toggleFontUnderline = () => {
		this.setState({...this.state, fontUnderline: !this.state.fontUnderline});
		this.props.onFontUnderlineChange(!this.state.fontUnderline);
	};
}

class TextInstance {
	code = () => 'Text';

	constructor(id, position, text, fontSize, fontBold, fontItalic, fontUnderline, color) {
		this.id = id;
		this.position = position;
		this.text = text;
		this.fontSize = fontSize;
		this.fontBold = fontBold;
		this.fontItalic = fontItalic;
		this.fontUnderline = fontUnderline;
		this.color = color;
	}

	setPosition = (x, y) => {
		this.position = {x, y};
	};

	setText = text => {
		this.text = text;
	};

	containsPoint = (x, y) => {
		const fx = this.position.x;
		const fy = this.position.y;
		const h = this.fontSizeToGridPoints();
		const w = h * this.text.length * (this.fontBold ? 0.7 : 0.5); // аппроксимация
		return (fx <= x && fx + w >= x && fy - h <= y && fy >= y);
	};

	render = () => {
		return (
			<TextElement
				position={this.position}
				text={this.text}
				fontSize={this.fontSizeToGridPoints()}
				fontBold={this.fontBold}
				fontItalic={this.fontItalic}
				fontUnderline={this.fontUnderline}
				color={this.color}
			/>
		);
	};

	figuresIntersects = () => false;

	setColor = color => {
		this.color = color;
	};

	fontSizeToGridPoints = () => {
		switch (this.fontSize) {
			case 'medium':
				return 2;
			case 'big':
				return 3;
			case 'small':
			default:
				return 1;
		}
	};
}

class TextElement extends React.Component {
	render() {
		const colorClassName = 'mnemonic-scheme-svgWrapper-' + this.props.color.substring(1);
		const svgWrapperClass = 'mnemonic-scheme-rightPanel-viewPanel-grid-field-addedFigure ' + colorClassName;

		// размеры указаны в пикселях, но на самом деле они зависят от размеров клетки
		return (
			<svg className={svgWrapperClass}>
				<text
					style={{
						fontSize: this.props.fontSize + 'px',
						fontStyle: this.props.fontItalic ? 'italic' : 'normal',
						fontWeight: this.props.fontBold ? 'bold' : 'normal',
						textDecoration: this.props.fontUnderline ? 'underline' : '',
					}}
					className='colorFill'
					x={this.props.position.x}
					y={this.props.position.y}
				>
					{this.props.text}
				</text>
			</svg>
		);
	}
}

export default Text;

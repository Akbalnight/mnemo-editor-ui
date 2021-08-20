import React from 'react';
import './Zoom.css';

const SpanIcon = ({content, onClick, disabled}) => (
	<div
		className={`zoom-icon ${disabled ? 'disabled' : ''}`}
		onClick={onClick}
	>
		<span>{content}</span>
	</div>
);

export default class Zoom extends React.Component {
	state = {
		isPlusDisabled: true,
		isMinusDisabled: false,
	};

	onMinusZoom = () => {
		const {setParentState, currentHeight, currentWidth} = this.props;
		const {isMinusDisabled} = this.state;

		if (!isMinusDisabled) {
			const newWidth = currentWidth * 1.5;
			const newHeight = currentHeight * 1.5;

			setParentState({
				width: newWidth,
				height: newHeight,
			});

			const newState = {
				isMinusDisabled: newWidth * 1.5 > 420,
				isPlusDisabled: false,
			};

			this.setState(newState);
		}
	};

	onPlusZoom = () => {
		const {setParentState, currentHeight, currentWidth} = this.props;
		const {isPlusDisabled} = this.state;

		if (!isPlusDisabled) {
			const newWidth = currentWidth / 1.5;
			const newHeight = currentHeight / 1.5;

			setParentState({
				width: newWidth,
				height: newHeight,
			});

			const newState = {
				isPlusDisabled: newWidth / 1.5 < 120,
				isMinusDisabled: false,
			};

			this.setState(newState);
		}
	};


	render() {
		const {isPlusDisabled, isMinusDisabled} = this.state;


		return (
			<div className="zoom-wrapper">
				{/*<Icon type="message" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" />*/}
				<SpanIcon content={'+'} onClick={this.onPlusZoom} disabled={isPlusDisabled}/>
				<SpanIcon content={'-'} onClick={this.onMinusZoom} disabled={isMinusDisabled}/>
				{/*<Icon*/}
				{/*	onClick={this.onPlusZoom}*/}
				{/*	className={`zoom-icon ${isPlusDisabled ? 'disabled' : ''}`}*/}
				{/*	type='plus-circle'*/}
				{/*	width={50}*/}
				{/*	height={50}*/}
				{/*	component={() => <PlusCircleOutlined/>}*/}
				{/*/>*/}

				{/*<Icon*/}
				{/*	onClick={this.onMinusZoom}*/}
				{/*	className={`zoom-icon ${isMinusDisabled ? 'disabled' : ''}`}*/}
				{/*	type='minus-circle'*/}
				{/*	width={50}*/}
				{/*	height={50}*/}
				{/*/>*/}
			</div>
		);
	}
}

import React from 'react';
import './Zoom.css';
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons';


 class Zoom extends React.Component {
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
				<PlusCircleOutlined
					className={`zoom-icon ${isPlusDisabled ? 'disabled' : ''}`}
					onClick={this.onPlusZoom}
					disabled={isPlusDisabled}
				/>
				<MinusCircleOutlined
					onClick={this.onMinusZoom}
					className={`zoom-icon ${isMinusDisabled ? 'disabled' : ''}`}
					disabled={isMinusDisabled}
				/>
			</div>
		);
	}
}
export {Zoom};

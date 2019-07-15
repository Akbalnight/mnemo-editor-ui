import React, {createRef} from 'react';
import PropTypes from 'prop-types';


export default class Grid extends React.Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		onClick: PropTypes.func,
		onMouseMove: PropTypes.func,
		onContextMenu: PropTypes.func,
		className: PropTypes.string,
	};

	static defaultProps = {
		width: 123,
		height: 76,
	};

	svgRef = createRef();

	getSvg = () => this.svgRef.current;

	render() {
		const {
			width,
			height,
			children,
			onClick,
			onMouseMove,
			onContextMenu,
			className,
		} = this.props;
		const grid = [];

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
			);
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
			);
		}

		return (
			<div className={className}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='mnemonic-scheme-rightPanel-viewPanel-grid-field'
					viewBox={'0 0 ' + width + ' ' + height}
					ref={this.svgRef}
					onClick={onClick}
					onMouseMove={onMouseMove}
					onContextMenu={onContextMenu}
				>
					<filter
						id='mnemonic-scheme-editor-blur-filter'
						x='-5'
						y='-5'
						width={width + 5}
						height={height + 5}
						filterUnits='userSpaceOnUse'
					>
						<feDropShadow dx='0' dy='0' stdDeviation='0.15' floodColor='#0000ff' />
					</filter>
					<filter
						id='mnemonic-scheme-editor-light-blur-filter' x='-5' y='-5' width={width + 5} height={height + 5}
						filterUnits='userSpaceOnUse'
					>
						<feDropShadow dx='0' dy='0' stdDeviation='0.1' floodColor='#000088' />
					</filter>
					{grid}
					{children}
				</svg>
			</div>
		);
	}
}

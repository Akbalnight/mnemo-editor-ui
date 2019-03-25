import React from 'react'

import pipelineImage, {ReactComponent as pipelineImageSvg} from '../../../assets/images/Pipeline.svg'
import AbstractFigure from './AbstractFigure'

class Pipeline extends AbstractFigure {
	code = () => {
	  return 'Pipeline'
	};

	name = () => {
	  return 'Трубопровод'
	};

	image = () => {
	  return pipelineImage
	};

  svgImage = () => {
  	return pipelineImageSvg
  };

	dependent = () => {
	  return false
	};

	groupCode = () => {
	  return 'pipes'
	};

	canChangeColor = () => true;

	defaultColor = () => {
	  return '#b80000'
	};

	canBeTransformed = () => [];

	canChangeFont = () => false;

  onIconClick = () => {};

	onClick = (x, y, fieldWidth, fieldHeight, rightClick, currentElements, processingElements) => {
	  if (rightClick) {
	    if (processingElements && processingElements.length) {
	      let element = processingElements[0]
	      if (element.points.length) {
	        element.removeTemporaryPoint()
	        element.setMode('view')
	        return {
	          added: [element]
	        }
	      }
	    }
	    return {}
	  } else {
	    let element
	    if (processingElements && processingElements.length) {
	      element = processingElements[0]
	    } else {
	      element = new PipelineInstance(this.generateId(), this.defaultColor())
	    }
	    if (!element.points.some(p => p.x === x && p.y === y)) {
	      element.addPoint(x, y)
	      element.removeTemporaryPoint()
	    }
	    return {processing: [element]}
	  }
	};

	onMove = (x, y, fieldWidth, fieldHeight, currentElements, processingElements) => {
	  if (processingElements && processingElements.length) {
	    let element = processingElements[0]
	    if (!element.points.some(p => p.x === x && p.y === y)) {
	      element.setTemporaryPoint(x, y)
	    }
	  }
	  return processingElements
	};

	serialize = (e) => {
	  let data = {code: this.code()};
	  ['id', 'points', 'color'].forEach(attr => data[attr] = e[attr])
	  return data
	};

	deserialize = (data) => {
	  let instance = new PipelineInstance(data.id, data.color)
	  instance.points = data.points
	  return instance
	};
}

class PipelineInstance {
  code = () => {
    return 'Pipeline'
  };

  constructor(id, color) {
    this.id = id
    // this.code = code;
    this.mode = 'edit'
    this.points = []
    this.temporaryPoint = null
    this.color = color
  }

	render = () => {
	  return <PipelineElement key={this.id}
	    points={this.points}
	    temporaryPoint={this.temporaryPoint}
	    color={this.color}
	    mode={this.mode} />
	};

	addPoint = (x, y) => {
	  this.points.push({x, y})
	};

	setTemporaryPoint = (x, y) => {
	  this.temporaryPoint = {x, y}
	};

	removeTemporaryPoint = () => {
	  this.temporaryPoint = null
	};

	setMode = (mode) => {
	  this.mode = mode
	};

	setColor = (color) => {
	  this.color = color
	};

	containsPoint = (x, y, decimalCoords = false) => {
	  let points = this.points
	  for (let i = 1; i < points.length; i++) {
	    let point1 = points[i - 1]
	    let point2 = points[i]

	    let dxc = x - point1.x
	    let dyc = y - point1.y

	    let dxl = point2.x - point1.x
	    let dyl = point2.y - point1.y

	    let cross = dxc * dyl - dyc * dxl
	    // 4 - насколько точно надо прицелиться, чтобы выделить линию
	    if (this.compareNumbers(cross, 0, true, decimalCoords, 4)) {
	      continue
	    }

	    let between
	    if (Math.abs(dxl) >= Math.abs(dyl)) {
	      between = dxl > 0
	        ? point1.x <= x && x <= point2.x
	        : point2.x <= x && x <= point1.x
	    } else {
	      between = dyl > 0
	        ? point1.y <= y && y <= point2.y
	        : point2.y <= y && y <= point1.y
	    }

	    if (between) {
	      return true
	    }
	  }

	  return false
	};

	compareNumbers(a, b, not, decimalCoords, epsilon) {
	  let r
	  if (decimalCoords) {
	    r = a - epsilon < b && a + epsilon > b
	  } else {
	    r = a === b
	  }
	  return not ? !r : r
	}
}

class PipelineElement extends React.Component {
	render = () => {
	  let elements = []
	  let radius = 0.5

	  let points = this.props.temporaryPoint ? [...this.props.points, this.props.temporaryPoint] : this.props.points

	  for (let i = 0; i < points.length; i++) {
	    let curr = points[i]
	    if (this.props.mode === 'edit') {
	      elements.push(
  <circle
  key={curr.x + '-' + curr.y}
  cx={curr.x} cy={curr.y} r={radius}
  stroke={this.props.color}
  fill='transparent'
  strokeWidth='1' />)
	    }
	    if (i !== 0) {
	      let prev = points[i - 1]
	      let xOffset
	      let yOffset
	      if (this.props.mode === 'edit') {
	        let a = curr.x - prev.x
	        let b = curr.y - prev.y
	        yOffset = b === 0 ? 0 : Math.sign(b) / Math.sqrt(1 + a * a / b / b)
	        xOffset = a === 0 ? 0 : Math.sign(a) / Math.sqrt(1 + b * b / a / a)
	        xOffset *= radius
	        yOffset *= radius
	      } else {
	        xOffset = 0
	        yOffset = 0
	      }
	      elements.push(
  <line key={curr.x + '-' + curr.y + '-' + prev.x + '-' + prev.y}
	          x1={prev.x + xOffset}
	          x2={curr.x - xOffset}
	          y1={prev.y + yOffset}
	          y2={curr.y - yOffset}
	          stroke={this.props.color} />
	      )
	    }
	  }

	  return (
  <g>
  {elements}
	    </g>
	  )
	};
}

export default Pipeline

import React from 'react'
import AbstractFigure from './AbstractFigure'

class AbstractSimpleFigure extends AbstractFigure {
  dependent = () => {
    return true
  };

  defaultColor = () => {
    return '#000000'
  };

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

  onIconClick = () => {
  };

  onClick = (x, y, fieldWidth, fieldHeight, rightClick, currentElements, processingElements) => {
    if (rightClick) {
      return null
    }
    let element = this.currentElement(processingElements)
    let position = this.fixPosition(x, y, fieldWidth, fieldHeight)
    element.setPosition(position.x, position.y)
    let canBeMounted = this.canBeMounted(currentElements, element, position.x, position.y)
    element.setCanBeMounted(canBeMounted)
    if (canBeMounted) {
      return {added: [element], processing: []}
    } else {
      return {added: [], processing: [element]}
    }
  };

  onMove = (x, y, fieldWidth, fieldHeight, currentElements, processingElements) => {
    let element = this.currentElement(processingElements)
    let position = this.fixPosition(x, y, fieldWidth, fieldHeight)
    element.setPosition(position.x, position.y)
    element.setCanBeMounted(this.canBeMounted(currentElements, element, position.x, position.y))
    return [element]
  };

  currentElement = (processingElements) => {
    if (processingElements && processingElements.length) {
      return processingElements[0]
    } else {
      return new SimpleFigureInstance({
        id: this.generateId(),
        codeId: this.code(),
        svgImage: this.svgImage(),
        width: this.width(),
        height: this.height(),
        color: this.defaultColor(),
        measures: this.measures(),
        measureKey: this.measureKey
      })
    }
  };

  /**
   * Поправка координат на центр фигуры или то место, которым она монтируется
   */
  fixPosition = (x, y, fieldWidth, fieldHeight) => {
    let offsetX = Math.round(this.width() / 2)
    let offsetY = Math.round(this.height() / 2)

    if (x - offsetX < 0) {
      x = offsetX
    } else if (x - offsetX + this.width() > fieldWidth) {
      x = fieldWidth - this.width() + offsetX
    }

    if (y - offsetY < 0) {
      y = offsetY
    } else if (y - offsetY + this.height() > fieldHeight) {
      y = fieldHeight - this.height() + offsetY
    }

    return {x, y}
  };

  /**
   * Можно ли установить данную фигуру на текущее место (под ней есть трубопровод и она ни с кем не пересекается)
   */
  canBeMounted = (currentElements, element, fixedX, fixedY) => {
    return currentElements.filter(e => e.code() === 'Pipeline').some(p => p.containsPoint(fixedX, fixedY)) &&
      currentElements.filter(e => e.code() !== 'Pipeline' && e.id !== element.id).every(f => !f.figuresIntersects(element))
  };

  canChangeFont = () => false;

  serialize = (e) => {
    let data = {code: e.codeId, x: e.position.x, y: e.position.y};
    ['id', 'color', 'transformation', 'labelText', 'measureKey'].forEach(attr => void (data[attr] = e[attr]))
    return data
  };

  deserialize = (data) => {
    const instance = new SimpleFigureInstance({
      id: data.id,
      codeId: this.code(),
      svgImage: this.svgImage(),
      width: this.width(),
      height: this.height(),
      color: data.color,
      measures: this.measures(),
      measureKey: data.measureKey
    })
    instance.setPosition(data.x, data.y)
    instance.setTransformation(data.transformation)
    instance.setLabelText(data.labelText)
    return instance
  };
}

class SimpleFigureInstance {
  code = () => {
    return this.codeId
  };

  constructor({
    id,
    codeId,
    svgImage,
    width,
    height,
    color,
    measures,
    measureKey,
    measureValue,
    canBeMounted = true
  }) {
    this.id = id
    this.codeId = codeId
    this.position = null
    this.color = color
    this.image = svgImage
    this.width = width
    this.height = height
    this.isMeasure = !!measures
    this.measureKey = measureKey
    this.measureValue = measureValue || ''
    this.canBeMounted = canBeMounted
    this.transformation = null
    this.labelText = measures && measures[0]
  }

  render = () => {
    return (
      <SimpleFigureElement key={this.id}
        position={this.position}
        color={this.color}
        image={this.image}
        width={this.width}
        height={this.height}
        isMeasure={this.isMeasure}
        measureValue={this.measureValue}
        canBeMounted={this.canBeMounted}
        transformation={this.transformation}
        labelText={this.labelText} />
    );
  };

  setPosition = (x, y) => {
    this.position = {x, y}
  };

  setCanBeMounted = (canBeMounted) => {
    this.canBeMounted = canBeMounted
  };

  setColor = (color) => {
    this.color = color
  };

  setTransformation = (transformation) => {
    this.transformation = transformation
  };

  setLabelText = (labelText) => {
    this.labelText = labelText
  };

  setMeasureKey = (key) => {
    this.measureKey = key
  }

  setMeasureValue = (key) => {
    this.measureValue = key
  }


  containsPoint = (x, y) => {
    let fx = this.position.x
    let fy = this.position.y
    let w = this.width
    let h = this.height
    let offsetX = Math.round(w / 2)
    let offsetY = Math.round(h / 2)
    return (
      fx - offsetX <= x && fx - offsetX + w >= x &&
      fy - offsetY <= y && fy - offsetY + h >= y
    )
  };

  figuresIntersects = (e2) => {
    let e1 = this
    return !(e1.position.x + e1.width < e2.position.x ||
      e2.position.x + e2.width < e1.position.x ||
      e1.position.y + e1.height < e2.position.y ||
      e2.position.y + e2.height < e1.position.y)
  };
}

class SimpleFigureElement extends React.Component {
  render = () => {
    let offsetX = Math.round(this.props.width / 2)
    let offsetY = Math.round(this.props.height / 2)

    let transformationText = ''
    if (this.props.transformation) {
      for (let i = 0; i < this.props.transformation.length; i++) {
        let transformation = this.props.transformation[i]
        if (transformationText.length) {
          transformationText += ' '
        }
        if (transformation.flip) {
          transformationText += 'scale('
          if (transformation.flip === 'horizontal') {
            transformationText += '-1, 1'
          } else if (transformation.flip === 'vertical') {
            transformationText += '1, -1'
          }
          transformationText += ')'
        } else if (transformation.rotate) {
          transformationText += 'rotate(' + transformation.rotate + ')'
        }
      }
    }
    transformationText = transformationText + ' translate(' + (-offsetX) + ' ' + (-offsetY) + ')'

    let colorClassName = 'mnemonic-scheme-svgWrapper-' + this.props.color.substring(1)
    let svgWrapperClass = 'mnemonic-scheme-rightPanel-viewPanel-grid-field-addedFigure ' + colorClassName

    return (
      <g transform={'translate(' + (this.props.position.x) + ' ' + (this.props.position.y) + ')'}>
        <g transform={transformationText}>
          <svg xmlns='http://www.w3.org/2000/svg'
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

        {this.props.isMeasure && <rect width={7} height={7} x={-offsetX - 1.5} y={offsetY + 0.5}
          style={{
            'fill': '#FFFFFF',
            'stroke': '#DDDFE1',
            'strokeWidth': '1',
            'fillOpacity': '1',
            'strokeOpacity': '0.9'
          }} /> }
        {this.props.isMeasure && <rect width={7} height={3} x={-offsetX - 1.5} y={offsetY + 0.5}
          style={{
            'fill': '#EFF6F9',
            'stroke': '#DDDFE1',
            'strokeWidth': '1',
            'fillOpacity': '1',
            'strokeOpacity': '0.9'
          }} />}
        {this.props.isMeasure && <text x={0} y={offsetY + 2.5} textAnchor='middle'
          style={{'fill': '#000000', fontSize: '1.5px'}}>{this.props.labelText}</text>}
        {this.props.isMeasure && <text x={0} y={offsetY + 6} textAnchor='middle'
          style={{'fill': '#000000', fontSize: '1.5px'}}>{this.props.measureValue}</text>}
      </g>
    )
  };
}

export default AbstractSimpleFigure

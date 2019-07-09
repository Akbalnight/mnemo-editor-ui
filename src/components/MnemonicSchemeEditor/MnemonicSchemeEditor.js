import React from 'react'
import PropTypes from 'prop-types'
import Pipeline from './elements/Pipeline'
import {equal, stop} from '../../utils'
import {Button, Col, Icon, Row, Select, Tree, Modal, Input, Checkbox, notification} from 'antd'
import {findGroupByCode} from '../../constants'
import {getScheme, storeScheme} from '../../utils/network'
import PipelineConnection from './elements/PipelineConnection'
import Text from './elements/Text'
import PipelineCross from './elements/PipelineCross'
import FlowDirectionWater from './elements/FlowDirectionWater'
import FlowDirectionGas from './elements/FlowDirectionGas'
import TemperatureConverter from './elements/TemperatureConverter'
import FlowMeter from './elements/FlowMeter'
import PressureConverter from './elements/PressureConverter'
import PressureChangeDetector from './elements/PressureChangeDetector'
import HeatAmountDetector from './elements/HeatAmountDetector'
import FlowMeterUltrasound from './elements/FlowMeterUltrasound'
import ValveLockPassthrough from './elements/ValveLockPassthrough'
import ValveLockAngular from './elements/ValveLockAngular'
import ValveReversePassthrough from './elements/ValveReversePassthrough'
import ValveReverseAngular from './elements/ValveReverseAngular'
import Latch from './elements/Latch'
import ValveAdjuster from './elements/ValveAdjuster'
import Throttle from './elements/Throttle'
import PumpManual from './elements/PumpManual'
import PumpNonAdjustable from './elements/PumpNonAdjustable'
import PumpJetStream from './elements/PumpJetStream'
import PumpCantilevered from './elements/PumpCantilevered'
import PumpCircular from './elements/PumpCircular'
import PumpNonAdjustableReverse from './elements/PumpNonAdjustableReverse'
import FanCentrifugal from './elements/FanCentrifugal'
import FanAxial from './elements/FanAxial'
import HeatExchanger from './elements/HeatExchanger'
import HeaterPanel from './elements/HeaterPanel'
import HeaterSectioned from './elements/HeaterSectioned'
import './MnemonicSchemeEditor.css'

class MnemonicSchemeEditor extends React.Component {
  static FIGURES = [
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
  ]

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isProduction: false,
      loading: !!props.id,
      mode: 'none',
      drawingFigure: null,
      elements: [],
      processingElements: [],
      editingElement: null,
      onMouseOverElement: null
    }
    this.svgRef = React.createRef()
    this.width = 124
    this.height = 76

    if (props.id) {
      this.getScheme(props.id)
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.nodeMoveModeOff, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.nodeMoveModeOff, false)
  }

  getAvailableFigures = () => {
    // На случай, если не все фигуры будут доступны для конкретной мнемосхемы, можно будет фильтрануть
    return MnemonicSchemeEditor.FIGURES
  }

  render() {
    return (
      <div className='mnemonic-scheme-editor'>
        <div className='mnemonic-scheme-toolsPanel-container'>
          <div className='mnemonic-scheme-toolsPanel-header'>
            Элементы
          </div>

          <div className='mnemonic-scheme-toolsPanel-tree-container mnemonic-scheme-svgWrapper-000000'>
            {this.renderFigureTree()}
          </div>
        </div>

        <div className='mnemonic-scheme-drawingPanel-container'>
          <div className='mnemonic-scheme-drawingPanel-header'>
            Мнемосхема
          </div>

          {this.renderTopPanel()}

          <div className='mnemonic-scheme-rightPanel-viewPanel-outerContainer'>
            <div className='mnemonic-scheme-rightPanel-viewPanel-grid-outerContainer'>
              {this.renderEditor()}
            </div>

            <div className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-container'>
              {this.renderLeftPanel()}
              {this.renderRightPanel()}
            </div>
          </div>

        </div>
      </div>
    )
  };

  renderEditor = () => {
    let width = this.width
    let height = this.height

    let grid = []
    for (let i = 1; i <= width - 1; i++) {
      grid.push(<line key={'grid-x-' + i} x1={i} x2={i} y1='0' y2={height} className={'mnemonic-scheme-rightPanel-viewPanel-grid-line-' + (i % 4 === 0 ? 'main' : 'additional')} />)
    }
    for (let i = 1; i <= height - 1; i++) {
      grid.push(<line key={'grid-y-' + i} y1={i} y2={i} x1='0' x2={width} className={'mnemonic-scheme-rightPanel-viewPanel-grid-line-' + (i % 4 === 0 ? 'main' : 'additional')} />)
    }

    let processingClass = (e) => {
      if (this.state.isMoving && e === this.state.editingElement) {
        return 'mnemonic-scheme-editor-moving-element'
      }

      return ''
    }

    let elementClass = (e) => {
      if (e === this.state.editingElement) {
        return 'mnemonic-scheme-editor-highlighted-element'
      } else if (e === this.state.onMouseOverElement) {
        return 'mnemonic-scheme-editor-highlighted-light-element'
      } else {
        return ''
      }
    }

    // let gridElement = <Contain ratio={this.width/this.height} className='mnemonic-scheme-rightPanel-viewPanel-grid-ratio'>
    return (
      <div className='mnemonic-scheme-rightPanel-viewPanel-grid-ratio'>
        <svg xmlns='http://www.w3.org/2000/svg'
          className='mnemonic-scheme-rightPanel-viewPanel-grid-field'
          viewBox={'0 0 ' + width + ' ' + height}
          ref={this.svgRef}
          onClick={this.state.mode === 'drawing' ? this.drawingClick : this.selectionClick}
          onMouseMove={
            this.state.mode === 'drawing'
              ? this.drawingMove
              : this.state.isMoving
                ? this.nodeMove
                : this.selectionMove}
          onContextMenu={this.state.mode === 'drawing' ? this.drawingRightClick : null}
        >
          <filter id='mnemonic-scheme-editor-blur-filter' x='-5' y='-5' width={width + 5} height={height + 5}
            filterUnits='userSpaceOnUse'>
            <feDropShadow dx='0' dy='0' stdDeviation='0.15' floodColor='#0000ff' />
          </filter>
          <filter id='mnemonic-scheme-editor-light-blur-filter' x='-5' y='-5' width={width + 5} height={height + 5}
            filterUnits='userSpaceOnUse'>
            <feDropShadow dx='0' dy='0' stdDeviation='0.1' floodColor='#000088' />
          </filter>
          {grid}
          {this.state.elements && this.state.elements.length
            ? this.state.elements.map(e => <g
              key={e.id}
              className={elementClass(e)}
              onMouseDown={
                this.state.mode !== 'drawing' &&
                e === this.state.editingElement
                  ? this.nodeMoveModeOn
                  : undefined
              }
            >{e.render()}</g>) : ''}
          {this.state.processingElements && this.state.processingElements.length
            ? this.state.processingElements.map(e => <g key={e.id} className={processingClass(e)}>{e.render()}</g>) : ''}
        </svg>
      </div>
    )
  }

  renderFigureNode = (figure) => {
    let available = !figure.dependent() || (this.state.elements.length && this.state.elements.some(e => e.code() === 'Pipeline'))
    let active = figure === this.state.drawingFigure
    let onClick = available ? () => this.toggleDrawing(figure) : null
    let cssClass = 'mnemonic-scheme-toolsPanel-tree-item-container '

    if (active) {
      cssClass += 'mnemonic-scheme-toolsPanel-tree-item-active '
    }

    if (!available) {
      cssClass += 'mnemonic-scheme-toolsPanel-tree-item-disabled '
    }

    return <div className={cssClass} key={figure.type} onClick={onClick}>
      <span className='mnemonic-scheme-toolsPanel-tree-item-icon'>
        <Icon component={figure.svgImage()} />
      </span>
      <span className='mnemonic-scheme-toolsPanel-tree-item-title'>
        {figure.name()}
      </span>
    </div>
  }

  renderFigureTree = () => {
    let nonEmptyGroups = {}

    for (let i = 0; i < this.getAvailableFigures().length; i++) {
      // для всех доступных фигур берем их группу
      let figure = this.getAvailableFigures()[i]

      // добавляем группу в список на рендер и добавляем в её массив саму фигуру
      if (!nonEmptyGroups[figure.groupCode()]) {
        nonEmptyGroups[figure.groupCode()] = []
      }
      nonEmptyGroups[figure.groupCode()].push(figure)
    }

    return <Tree defaultExpandAll={true} className='mnemonic-scheme-toolsPanel-tree'>
      {Object.getOwnPropertyNames(nonEmptyGroups).map(groupCode => {
        let group = findGroupByCode(groupCode)
        // для каждой группы на рендер рисуем её и все добавленные фигуры
        return <Tree.TreeNode key={groupCode} title={group.title}>
          {nonEmptyGroups[groupCode].map(figure => {
            // return <Tree.TreeNode title={<span><Icon component={figure.svgImage()}/>  {figure.name()}</span>} />
            return <Tree.TreeNode key={figure.code()} title={this.renderFigureNode(figure)} />
          })}
        </Tree.TreeNode>
      })}
    </Tree>
  }

  nameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  typeChange = (e) => {
    this.setState({
      isProduction: e.target.checked
    })
  }

  renderTopPanel = () => {
    return (
      <div className='mnemonic-scheme-drawingPanel-topInputs-container'>
        <Row>
          <Col span={14}>
            <div className='mnemonic-scheme-drawingPanel-topInputs-leftGroup'>
              <Input
                className='mnemonic-scheme-drawingPanel-topInputs-name'
                placeholder='Введите название мнемосхемы'
                value={this.state.name}
                onChange={this.nameChange}
              />

              <Checkbox
                className='mnemonic-scheme-drawingPanel-topInputs-checkbox'
                checked={this.state.isProduction}
                onChange={this.typeChange}
              >Рабочая</Checkbox>
            </div>
          </Col>

          <Col span={10} className='mnemonic-scheme-rightPanel-topInputs-rightGroup'>
            <Button type='default' icon='close' className='mnemonic-scheme-rightPanel-topInputs-button' onClick={() => {
              this.props.onCancel && this.props.onCancel()
            }}>Отмена</Button>
            <Button type='default' icon='save' className='mnemonic-scheme-rightPanel-topInputs-button' onClick={() => {
              this.storeSchemeHandler()
            }}>Сохранить мнемосхему</Button>
          </Col>
        </Row>
      </div>
    )
  }

  renderLeftPanel = () => {
    const showAssigmentBlock = !this.state.editingElement || this.elementFigure(this.state.editingElement).measures()
    const showTextEditingBlock = this.state.editingElement && this.state.editingElement.code() === 'Text'

    return (
      <div
        className={'mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel ' + ((!this.state.editingElement) ? 'mnemonic-scheme-shader' : '')}>
        <div className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-header'>
          Параметры
        </div>

        {this.renderDirectionBlock()}

        {showAssigmentBlock && this.renderAssignmentBlock()}
        {showTextEditingBlock && this.renderTextEditingBlock()}
      </div>
    )
  }

  renderRightPanel = () => {
    return (
      <div
        className={'mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel ' + ((!this.state.editingElement) ? 'mnemonic-scheme-shader' : '')}>
        <div className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-header'>
          <div>Инструменты</div>
          <div><Button
            type='danger'
            shape='circle'
            icon='delete'
            size='small'
            onClick={this.removeEditingElement}
          /></div>
        </div>

        {this.renderColorsBlock()}

        {this.renderFontBlock()}

      </div>
    )
  }

  renderColorsBlock = () => {
    let colors = ['#b80000', '#1273de', '#ffb307', '#008b02', '#006b76', '#000000']
    let colorsPanel
    if (!this.state.editingElement || this.elementFigure(this.state.editingElement).canChangeColor()) {
      colorsPanel = (
        <div className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-colorPicker'>
          {colors.map(color => (
            <div
              key={color}
              className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-colorPicker-color'
              style={{backgroundColor: color}}
              onClick={() => this.changeEditElementColor(color)}
            />
          ))}
        </div>
      )
    } else {
      colorsPanel = 'Не доступно'
    }

    return (
      <Row className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row'>
        <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-titleColumn'>
          Цвет элемента
        </Col>

        <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn'>
          {colorsPanel}
        </Col>
      </Row>
    )
  }

  renderDirectionBlock = () => {
    let figure = !this.state.editingElement ? null : this.elementFigure(this.state.editingElement)
    let directions = []

    if (figure) {
      let transformations = figure.canBeTransformed() || []
      for (let i = 0; i < transformations.length; i++) {
        let transformation = transformations[i]
        let className = 'mnemonic-scheme-panel-icon-transform-choose'
        if (equal(this.state.editingElement.transformation, transformation)) {
          className += ' mnemonic-scheme-panel-icon-transform-choose-active'
        }

        let transformationText = ''
        for (let i = 0; i < transformation.length; i++) {
          let t = transformation[i]
          if (transformationText.length) {
            transformationText += ' '
          }
          if (t.flip) {
            transformationText += 'scale('
            if (t.flip === 'horizontal') {
              transformationText += '-1, 1'
            } else if (t.flip === 'vertical') {
              transformationText += '1, -1'
            }
            transformationText += ')'
          } else if (t.rotate) {
            transformationText += 'rotate(' + t.rotate + 'deg)'
          }
        }

        directions.push(<Icon key={JSON.stringify(transformation)} component={figure.svgImage()} className={className}
          style={{'transform': transformationText}}
          onClick={() => this.changeEditElementTransformation(transformation)} />)
      }
      if (directions.length) {
        let className = 'mnemonic-scheme-panel-icon-transform-choose'
        if (!this.state.editingElement.transformation) {
          className += ' mnemonic-scheme-panel-icon-transform-choose-active'
        }
        directions.push(<Icon key={'normal'} component={figure.svgImage()} className={className}
          onClick={() => this.changeEditElementTransformation(null)} />)
      }
    }
    if (!directions.length) {
      directions = 'Не доступно'
    }

    return (
      <Row className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row'>
        <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-titleColumn'>
          Направление элемента
        </Col>

        <Col span={12}
          className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn mnemonic-scheme-svgWrapper-000000'>
          {directions}
        </Col>
      </Row>
    )
  }

  renderFontBlock = () => {
    let changeAttr = (attr, value) => {
      let newState = {...this.state}
      newState.editingElement[attr] = value
      this.setState(newState)
    }

    let toggleAttr = (attr, value) => {
      changeAttr(attr, !this.state.editingElement[attr])
    }

    let fontPanel
    if (this.state.editingElement && this.elementFigure(this.state.editingElement).canChangeFont()) {
      fontPanel = (
        <div>
          <Button
            type='default'
            className={'mnemo-editor-font-btn' + (this.state.editingElement && this.state.editingElement.fontBold ? ' mnemo-editor-font-btn-pressed' : '')}
            onClick={() => toggleAttr('fontBold')}>Ж</Button>
          <Button
            type='default'
            className={'mnemo-editor-font-btn' + (this.state.editingElement && this.state.editingElement.fontItalic ? ' mnemo-editor-font-btn-pressed' : '')}
            onClick={() => toggleAttr('fontItalic')}>К</Button>
          <Button
            type='default'
            className={'mnemo-editor-font-btn' + (this.state.editingElement && this.state.editingElement.fontUnderline ? ' mnemo-editor-font-btn-pressed' : '')}
            onClick={() => toggleAttr('fontUnderline')}>Ч</Button>

          <Select
            className='mnemonic-scheme-panel-content-row-control'
            value={this.state.editingElement && this.state.editingElement.fontSize ? this.state.editingElement.fontSize : 'small'}
            onChange={v => changeAttr('fontSize', v)}>
            <Select.Option value='small'>Мелкий</Select.Option>
            <Select.Option value='medium'>Средний</Select.Option>
            <Select.Option value='big'>Крупный</Select.Option>

          </Select>
        </div>
      )
    } else {
      fontPanel = 'Не доступно'
    }

    return <Row className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row'>
      <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-titleColumn'>
        Шрифт
      </Col>

      <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn'>
        {fontPanel}
      </Col>
    </Row>
  }

  renderTextEditingBlock = () => {
    return (
      <Row className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row'>
        <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-titleColumn'>
          Текст
        </Col>
        <Col span={12} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn'>
          <Input
            placeholder='Текст'
            style={{width: '100%'}}
            value={(this.state.editingElement && this.state.editingElement.text) || ''}
            onChange={(event) => {
              let newState = {...this.state}
              newState.editingElement.setText(event.target.value)
              this.setState(newState)
            }}
          />
        </Col>
      </Row>
    )
  }

  renderAssignmentBlock = () => {
    if (!this.state.editingElement) {
      return null
    }

    const measures = this.elementFigure(this.state.editingElement).measures()

    return (
      <Row className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row'>
        <Col span={8} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-titleColumn'>
          Контролируемые параметры
        </Col>

        <Col span={8} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn'
          style={{paddingRight: 10}}>
          <Input
            placeholder='Имя'
            style={{width: '100%'}}
            value={(this.state.editingElement && this.state.editingElement.measureKey) || ''}
            onChange={(event) => {
              let newState = {...this.state}
              newState.editingElement.setMeasureKey(event.target.value)
              this.setState(newState)
            }}
          />
        </Col>

        <Col span={8} className='mnemonic-scheme-rightPanel-viewPanel-bottomPanels-panel-content-row-contentColumn'>
          <Select
            value={this.state.editingElement && this.state.editingElement.labelText
              ? this.state.editingElement.labelText : measures[0]}
            style={{width: '100%'}}
            onChange={(value) => {
              let newState = {...this.state}
              newState.editingElement.setLabelText(value)
              this.setState(newState)
            }}
          >
            {measures.map(value => <Select.Option key={value} value={value}>{value}</Select.Option>)}
          </Select>
        </Col>
      </Row>
    )
  }

  /**
   * Клик на пункт меню в дереве. Может включить-выключить режим рисования нового элемента.
   */
  toggleDrawing = (figure) => {
    let newState = {...this.state}
    if (newState.mode !== 'drawing' || newState.drawingFigure !== figure) {
      newState.mode = 'drawing'
      newState.drawingFigure = figure
      figure.onIconClick(
        (x) => { // callbackOnConfirm
          this.setState({...this.state, processingElements: [x]})
        },
        () => { // callbackOnCancel
          this.setState({
            ...this.state,
            mode: 'none',
            drawingFigure: null
          })
        }
      )
    } else {
      newState.mode = 'none'
      newState.drawingFigure = null
    }
    newState.processingElements = []
    newState.editingElement = null
    this.setState(newState)
  }

  /**
   * Клик правой кнопкой мыши в режиме рисования нового объекта
   */
  drawingRightClick = (event) => {
    stop(event)
    this.drawingClick(event, true)
  }

  /**
   * Клик кнопкой мыши в режиме рисования нового объекта
   */
  drawingClick = (event, rightclick = false) => {
    let newState = {...this.state}
    let coords = this.coordinates(event)
    let result = newState.drawingFigure.onClick(coords.x, coords.y, this.width, this.height, rightclick,
      newState.elements, newState.processingElements)
    if (result == null) {
      newState.mode = 'none'
      newState.drawingFigure = null
      newState.processingElements = []
    } else {
      newState.processingElements = result.processing || []
      if (result.added) {
        Array.prototype.push.apply(newState.elements, result.added)
        newState.editingElement = result.added[0]

        if (result.done) {
          newState.mode = 'none'
          newState.drawingFigure = null
          newState.processingElements = []
        }
      } else {
        newState.editingElement = null
      }
    }
    this.setState(newState)
  }

  /**
   * Изменение положения курсора в режиме редактирования
   */
  drawingMove = (event) => {
    let coords = this.coordinates(event)
    let newState = {...this.state}
    newState.processingElements = this.state.drawingFigure.onMove(coords.x, coords.y, this.width, this.height,
      this.state.elements, this.state.processingElements)
    this.setState(newState)
  }

  /**
   * Движеие курсором в режиме просмотра нарисованных элементов
   */
  selectionMove = (event) => {
    let decimalCoords = this.coordinates(event, false)
    let element = this.state.elements.find(e => e.containsPoint(decimalCoords.x, decimalCoords.y, true))
    if ((element || this.state.onMouseOverElement) && (element !== this.state.onMouseOverElement)) {
      let newState = {...this.state}
      newState.onMouseOverElement = element
      this.setState(newState)
    }
  }

  nodeMove = (event) => {
    const coords = this.coordinates(event)
    const newState = {...this.state}

    const figure = this.elementFigure(this.state.editingElement);

    newState.processingElements = figure.onMove(coords.x, coords.y, this.width, this.height,
      this.state.elements, this.state.processingElements)
    this.setState(newState)
  }

  /**
   * Управление режимом перемещения объектов
   */
  nodeMoveMode = (value) => (event) => {
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
          oldPosition: this.state.editingElement.position
        })
      } else {
        const coords = this.coordinates(event)
        const figure = this.elementFigure(this.state.editingElement)
        const result = figure.onClick(coords.x, coords.y, this.width, this.height, false,
          this.state.elements, this.state.processingElements)

        if ((result === null || (result.added && result.added.length === 0)) && this.state.oldPosition) {
          this.state.editingElement.setPosition(this.state.oldPosition.x, this.state.oldPosition.y)
          figure.onClick(this.state.oldPosition.x, this.state.oldPosition.y, this.width, this.height, false,
            this.state.elements, this.state.processingElements)
        }

        this.setState({
          processingElements: [],
          isMoving: false,
          oldPosition: undefined
        })
      }
    }
  }

  nodeMoveModeOn = this.nodeMoveMode(true)
  nodeMoveModeOff = this.nodeMoveMode(false)

  /**
   * Клик в режиме просмотра нарисованных элементов
   */
  selectionClick = (event) => {
    let decimalCoords = this.coordinates(event, false)
    let element = this.state.elements.find(e => e.containsPoint(decimalCoords.x, decimalCoords.y, true))
    let newState = {...this.state}
    newState.editingElement = element
    newState.onMouseOverElement = null
    this.setState(newState)
  }

  /**
   * Смена цвета текущего редактируемого элемента
   */
  changeEditElementColor = (color) => {
    let newState = {...this.state}
    newState.editingElement.setColor(color)
    this.setState(newState)
  }

  /**
   * Смена трансформации (поворот-отражение) текущего редактируемого элемента
   */
  changeEditElementTransformation = (transformation) => {
    let newState = {...this.state}
    newState.editingElement.setTransformation(transformation, true)
    this.setState(newState)
  }

  /**
   * Удаление текущего редактируемого элемента и, если это трубопровод, установленных на него элементов
   */
  removeEditingElement = () => {
    let newState = {...this.state}
    newState.elements = newState.elements.filter(e => e !== newState.editingElement)

    if (newState.editingElement.code() === 'Pipeline') {
      let pipelines = newState.elements.filter(e => e.code() === 'Pipeline')
      newState.elements = newState.elements.filter(e => e.code() === 'Pipeline' || e.code() === 'Text' ||
        pipelines.some(p => p.containsPoint(e.position.x, e.position.y)))
    }

    newState.editingElement = null
    this.setState(newState)
  }

  /**
   * Преобразование мышиных координат события в координаты на сетке
   */
  coordinates = (event, rounded = true) => {
    let svg = this.svgRef.current
    let rect = svg.getBoundingClientRect()
    let svgWidth = rect.width - 2
    let svgHeight = rect.height - 2
    let offset = {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }

    let x = (event.clientX - offset.left) * this.width / svgWidth
    let y = (event.clientY - offset.top) * this.height / svgHeight
    if (rounded) {
      x = Math.round(x)
      y = Math.round(y)
    }
    return {x, y}
  }

  /**
   * Получение "фигуры" по конкретному ее инстансу
   */
  elementFigure = (element) => {
    return this.figureByCode(element.code())
  }

  figureByCode = (code) => {
    return this.getAvailableFigures().find(f => f.code() === code)
  }

  export = () => {
    return this.state.elements.map(e => this.elementFigure(e).serialize(e))
  }

  import = (data) => {
    this.setState({
      ...this.state,
      mode: 'none',
      drawingFigure: null,
      elements: data.map(d => this.figureByCode(d.code).deserialize(d)),
      processingElements: [],
      editingElement: null,
      onMouseOverElement: null
    })
  }

  storeScheme = () => {
    storeScheme({
      id: this.props.id,
      name: this.state.name,
      isProduction: this.state.isProduction,
      data: this.export()
    }).catch(error => {
      notification.error({
        message: 'Ошибка',
        description: error.message
      })
    }).then(() => {
      notification.info({
        message: 'Мнемосхема сохранена',
        description: 'Мнемосхема сохранена удачно'
      })
    })
  }

  storeSchemeHandler = () => {
    if (!this.state.name) {
      Modal.warning({
        title: 'Внимание',
        content: 'Имя не может быть пустым'
      })
      return
    }

    this.storeScheme()
  }
  getScheme = (id) => {
    getScheme(id)
      .catch(error => {
        notification.error({
          message: 'Ошибка',
          description: error.message
        })
      })
      .then(data => {
        data && this.import(data.data)
        this.setState({
          name: data && data.name,
          isProduction: !!(data && data.isProduction),
          loading: false
        })
      })
  }
}

MnemonicSchemeEditor.propTypes = {
  id: PropTypes.number,
  onCancel: PropTypes.func
}

export default MnemonicSchemeEditor

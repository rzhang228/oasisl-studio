import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './index.scss'

class DragBlock extends Component {
  onDragStart = (event) => {
    this.target = this.props.target()

    switch (this.props.type) {
      case 'horizontal':
        this.startPosition = event.clientY
        this.originLength = this.target.getBoundingClientRect().height
        break
      case 'vertical':
        this.startPosition = event.clientX
        this.originLength = this.target.getBoundingClientRect().width
        break
      default:
        break
    }

    document.onmousemove = this.onDrag
    document.onmouseup = this.onDragEnd
  }

  onDrag = (event) => {
    let diff
    switch (this.props.type) {
      case 'horizontal':
        if (this.props.direction)
          diff = -(event.clientY - this.startPosition)
        else
          diff = event.clientY - this.startPosition
        this.target.style.height = `${this.originLength + diff}px`
        break
      case 'vertical':
        if (this.props.direction)
          diff = -(event.clientX - this.startPosition)
        else
          diff = event.clientX - this.startPosition
        this.target.style.width = `${this.originLength + diff}px`
        break
      default:
        break
    }
  }

  onDragEnd = () => {
    document.onmousemove = null
  }

  target
  originLength
  startPosition

  render() {
    let wrapperStyle = {}
    const barStyle = {
      [this.props.position]: 0
    }
    if (this.props.needFlexStyle)
      wrapperStyle = {
        display: 'flex',
        flexDirection: this.props.flexDirection
      }
    return (
      <div className={style['dragWrapper']} style={wrapperStyle}>
        {this.props.children}
        <div
          className={`${style['dragBar']} ${style[this.props.type]}`}
          style={barStyle}
          onMouseDown={this.onDragStart}
          role="presentation"
        />
      </div>
    )
  }
}

DragBlock.defaultProps = {
  type: 'horizontal',
  position: 'top',
  flexDirection: 'row',
  needFlexStyle: false,
  direction: 0
}

DragBlock.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  needFlexStyle: PropTypes.bool,
  direction: PropTypes.oneOf([0, 1]),
  target: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default DragBlock

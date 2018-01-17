import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createContainer from 'UTIL/createContainer'
import VNodeTree from 'UTIL/menifest/VNodeTree'
import vNodeTreeAction from 'ACTION/vNodeTree'
import './index.scss'

const connector = createContainer(
  ({ vNodeTreeList, domId }) => ({ vNodeTreeList, domId }),
  vNodeTreeAction
)

function getMask(dom) {
  if (!dom)
    return {
      main: {},
      border: {},
      padding: {},
      margin: {}
    }

  const rect = dom.getBoundingClientRect()
  const { style } = dom

  const borderTopWidth = +style.borderTopWidth.slice(0, -2)
  const borderRightWidth = +style.borderRightWidth.slice(0, -2)
  const borderBottomWidth = +style.borderBottomWidth.slice(0, -2)
  const borderLeftWidth = +style.borderLeftWidth.slice(0, -2)
  const paddingTop = +style.paddingTop.slice(0, -2)
  const paddingRight = +style.paddingRight.slice(0, -2)
  const paddingBottom = +style.paddingBottom.slice(0, -2)
  const paddingLeft = +style.paddingLeft.slice(0, -2)
  const marginTop = +style.marginTop.slice(0, -2)
  const marginRight = +style.marginRight.slice(0, -2)
  const marginBottom = +style.marginBottom.slice(0, -2)
  const marginLeft = +style.marginLeft.slice(0, -2)

  const main = {
    height: rect.height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom,
    width: rect.width - borderRightWidth - borderLeftWidth - paddingRight - paddingLeft,
    top: rect.top + borderTopWidth + paddingTop,
    left: rect.left + borderLeftWidth + paddingLeft
  }
  const border = {
    height: rect.height,
    width: rect.width,
    top: rect.top,
    left: rect.left,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth
  }
  const padding = {
    height: rect.height - borderTopWidth - borderBottomWidth,
    width: rect.width - borderRightWidth - borderLeftWidth,
    top: rect.top + borderTopWidth,
    left: rect.left + borderLeftWidth,
    borderTopWidth: paddingTop,
    borderRightWidth: paddingRight,
    borderBottomWidth: paddingBottom,
    borderLeftWidth: paddingLeft
  }
  const margin = {
    height: rect.height + marginTop + marginBottom,
    width: rect.width + marginRight + marginLeft,
    top: rect.top - marginTop,
    left: rect.left - marginLeft,
    borderTopWidth: marginTop,
    borderRightWidth: marginRight,
    borderBottomWidth: marginBottom,
    borderLeftWidth: marginLeft
  }
  return {
    main,
    border,
    padding,
    margin
  }
}

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDom: null
    }
  }

  componentDidUpdate() {
    if (!this.activeIframe)
      return

    const currentWindow = this.activeIframe.contentWindow
    currentWindow.onload = () => {
      currentWindow.document.onmouseover = (event) => {
        this.setState({
          activeDom: event.target
        })
      }
      currentWindow.document.onmouseout = () => {
        this.setState({
          activeDom: null
        })
      }
    }
  }

  changeIndex = (event) => {
    this.props.setActiveIndex(+event.currentTarget.getAttribute('data-index'))
  }

  close = (event) => {
    event.stopPropagation()
    this.props.removeVNodeTree(+event.currentTarget.parentNode.getAttribute('data-index'))
  }

  render() {
    const { activeIndex, list } = this.props.vNodeTreeList
    let maskStyle

    if (this.props.domId.active)
      maskStyle = getMask(this.activeIframe.contentWindow.document.querySelector(`[data-os-id="${this.props.domId.active}"]`))
    else
      maskStyle = getMask(this.state.activeDom)

    return (
      <div className="page-container">
        <div className="tabs clearfix">
          {
            list.map((vNodeTree, index) => (
              <div
                className={`tab${index === activeIndex ? ' active' : ''}`}
                data-index={index}
                onClick={this.changeIndex}
                key={vNodeTree.key}
                role="presentation"
              >
                {vNodeTree.title} {vNodeTree.unsaved ? '*' : ''}
                <span
                  className="close-icon"
                  onClick={this.close}
                  role="presentation"
                >
                  <i className="oasicon oasicon-close" />
                </span>
              </div>
            ))
          }
        </div>
        <div className="iframe-wrapper">
          <div className="iframe-area" style={{ height: '1024px', width: '750px' }}>
            <div className="iframe-jusitify">
              {
                list.map((vNodeTree, index) => (
                  <iframe
                    className={`iframe${index === activeIndex ? ' current' : ''}`}
                    title={vNodeTree.title}
                    src={vNodeTree.path}
                    key={vNodeTree.key}
                    ref={(el) => { if (index === activeIndex) this.activeIframe = el }}
                  >
                    Content
                  </iframe>
                ))
              }
              <div className="mask">
                <div className="main" style={maskStyle.main} />
                <div className="border" style={maskStyle.border} />
                <div className="padding" style={maskStyle.padding} />
                <div className="margin" style={maskStyle.margin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  vNodeTreeList: PropTypes.shape({
    activeIndex: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.instanceOf(VNodeTree))
  }).isRequired,
  domId: PropTypes.shape({
    active: PropTypes.number,
    selected: PropTypes.number
  }).isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  removeVNodeTree: PropTypes.func.isRequired
}

export default connector(Page)

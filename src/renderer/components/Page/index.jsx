import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createContainer from 'UTIL/createContainer'
import VNodeTree from 'UTIL/menifest/VNodeTree'
import vNodeTreeAction from 'ACTION/vNodeTree'
import './index.scss'

const connector = createContainer(
  ({ vNodeTreeList, activeIndex }) => ({ vNodeTreeList, activeIndex }),
  vNodeTreeAction
)

class Page extends Component {
  componentDidUpdate() {
    const currentWindow = this.activeIframe.contentWindow
    currentWindow.onload = () => {
      // 需要做下截流
      currentWindow.document.onmousemove = (event) => {
        console.log(event.target.getBoundingClientRect())
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
          </div>
        </div>
        <div className="mask" />
      </div>
    )
  }
}

Page.propTypes = {
  vNodeTreeList: PropTypes.shape({
    activeIndex: PropTypes.number,
    list: PropTypes.arrayOf(PropTypes.instanceOf(VNodeTree))
  }).isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  removeVNodeTree: PropTypes.func.isRequired
}

export default connector(Page)

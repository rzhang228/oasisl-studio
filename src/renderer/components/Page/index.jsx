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
  changeIndex = (event) => {
    this.props.setActiveIndex(+event.target.getAttribute('data-index'))
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
                role="presentation"
              >
                {vNodeTree.title} {vNodeTree.unsaved ? '*' : ''}
                <span className="close-icon"><i className="oasicon oasicon-close" /></span>
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
                >
                  content
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
  setActiveIndex: PropTypes.func.isRequired
}

export default connector(Page)

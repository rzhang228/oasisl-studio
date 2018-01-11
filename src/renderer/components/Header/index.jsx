import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createContainer from 'UTIL/createContainer'
import services from 'SERVICE'
import fileAction from 'ACTION/file'
import vNodeTreeAction from 'ACTION/vNodeTree'
import VNodeTree from 'UTIL/menifest/VNodeTree'
import './index.scss'

const connector = createContainer(
  ({ fileObj, vNodeTreeList }) => ({ fileObj, vNodeTreeList }),
  { ...fileAction, ...vNodeTreeAction }
)

class Header extends Component {
  operateList = [
    {
      name: '打开',
      icon: 'glyphicon glyphicon-file',
      color: '#DDEAF1',
      fn: () => {
        services.trigger('open-file', (event, file) => {
          console.log(file)
        })
      }
    },
    {
      name: '打开文件夹',
      icon: 'oasicon oasicon-folder',
      color: '#FFA430',
      fn: () => {
        services.trigger('open-dir', (event, fileObj) => {
          this.props.setFile(fileObj)
        })
      }
    },
    {
      name: '新建',
      icon: 'oasicon oasicon-folder',
      color: '#FFA430',
      fn: () => {
        const vNodeTree = VNodeTree.create()
        const previreHTML = vNodeTree.toPreviewHTML()
        services.trigger('create-previewHTML', previreHTML, (path) => {
          vNodeTree.setPath(path)
          this.props.addVNodeTree(vNodeTree)
        })
      }
    },
    {
      name: 'test',
      icon: 'oasicon oasicon-folder',
      color: '#FFA430',
      fn: () => {
        const vNodeTree = VNodeTree.create()
        this.props.addVNodeTree(vNodeTree)
      }
    }
  ]

  render() {
    return (
      <div className="header-container clearfix">
        {
          this.operateList.map(operate => (
            <div
              className="operate"
              key={operate.name}
              onClick={operate.fn}
              role="presentation"
            >
              <div className="operate-wrapper clearfix">
                <i className={`operate-icon ${operate.icon}`} style={{ color: operate.color }} />
                <span className="operate-name">{operate.name}</span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

Header.propTypes = {
  setFile: PropTypes.func.isRequired,
  addVNodeTree: PropTypes.func.isRequired
}

export default connector(Header)

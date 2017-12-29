import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import { create } from 'UTIL/menifest/util'
import './index.scss'

@connect(
  ({ fileObj }) => ({ fileObj }),
  require('ACTION/file').default
)
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      operateList: [
        {
          name: '打开',
          icon: 'glyphicon glyphicon-file',
          color: '#DDEAF1',
          fn: (event) => {
            ipcRenderer.once('receive-file', (event, file) => {
              console.log(file)
            })
            ipcRenderer.send('open-file')
          }
        },
        {
          name: '打开文件夹',
          icon: 'oasicon oasicon-folder',
          color: '#FFA430',
          fn: (event) => {
            ipcRenderer.once('receive-dir', (event, fileObj) => {
              console.log(this.props)
              this.props.setFile(fileObj)
              console.log(this.props)
            })
            ipcRenderer.send('open-dir')
          }
        },
        {
          name: '新建',
          icon: 'oasicon oasicon-folder',
          color: '#FFA430',
          fn: (event) => {
            console.log(create())
          }
        }
      ]
    }
  }
  render() {
    return (
      <div className="header clearfix">
        {
          this.state.operateList.map((operate, index) => {
            return (
              <div className="operate" key={operate.name} onClick={operate.fn}>
                <div className="operate-wrapper clearfix">
                  <i className={'operate-icon ' + operate.icon} style={{ color: operate.color }}></i>
                  <span className="operate-name">{operate.name}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Header;

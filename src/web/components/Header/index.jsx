import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import './index.scss'

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
              console.log(fileObj)
              this.props.setFile(fileObj)
            })
            ipcRenderer.send('open-dir')
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

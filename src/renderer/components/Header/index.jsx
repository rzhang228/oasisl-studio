import React, { Component } from 'react'
import { connect } from 'react-redux'
import services from 'SERVICE'
import style from './index.scss'

import VNodeTree from 'UTIL/menifest/VNodeTree'

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
            services.trigger('open-file', (event, file) => {
              console.log(file)
            })
          }
        },
        {
          name: '打开文件夹',
          icon: 'oasicon oasicon-folder',
          color: '#FFA430',
          fn: (event) => {
            services.trigger('open-dir', (event, fileObj) => {
              this.props.setFile(fileObj)
            })
          }
        },
        {
          name: '新建',
          icon: 'oasicon oasicon-folder',
          color: '#FFA430',
          fn: (event) => {
            let vNodeTree = VNodeTree.create()
            console.log(vNodeTree)
          }
        }
      ]
    }
  }
  render() {
    return (
      <div className={style['header'] + ' clearfix'}>
        {
          this.state.operateList.map((operate, index) => {
            return (
              <div className={style['operate']} key={operate.name} onClick={operate.fn}>
                <div className={style['operate-wrapper'] + ' clearfix'}>
                  <i className={style['operate-icon'] + ' ' + operate.icon} style={{ color: operate.color }}></i>
                  <span className={style['operate-name']}>{operate.name}</span>
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

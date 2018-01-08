import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'

@connect(
  ({ fileObj }) => ({ fileObj }),
  require('ACTION/file').default
)
class File extends React.Component {
  render() {
    console.log(this.props.fileObj)
    return (
      <div className={style['file-container']}></div>
    )
  }
}

export default File;

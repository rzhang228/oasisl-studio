import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import './index.scss'

class File extends React.Component {
  render() {
    console.log(this.props.fileObj)
    return (
      <div></div>
    )
  }
}

export default File;

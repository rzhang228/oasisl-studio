import React, { Component } from 'react'
import PropTypes from 'prop-types'

import fileAction from 'ACTION/file'
import createContainer from 'UTIL/createContainer'
import style from './index.scss'

const connector = createContainer(
  ({ fileObj }) => ({ fileObj }),
  fileAction
)

class File extends Component {
  render() {
    console.log(this.props.fileObj)
    return (
      <div className={style['file-container']} />
    )
  }
}

File.propTypes = {
  fileObj: PropTypes.object.isRequired
}

export default connector(File)

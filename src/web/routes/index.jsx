import React from 'react';
import { Route } from 'react-router-dom'
import { injectReducer } from 'REDUCER'
import createContainer from 'UTIL/createContainer'
import App from 'COMPONENT/App'

export default () => {
  return (
    <Route path="/" component = { App }>
      <Route getComponents = {(location, cb) => {
        // 注入 Reducer
        injectReducer('file', require('REDUCER/file').default)

        /* 组件连接 redux */
        const FileContainer = createContainer(
          ({ fileObj }) => ({ fileObj }),     // mapStateToProps,
          require('ACTION/file').default,     // mapActionCreators,
          require('COMPONENT/File').default // 木偶组件
        )

        cb(null, {
          header: require('COMPONENT/Header').default,
          file: FileContainer
        })
      }} />
    </Route>
  )
}
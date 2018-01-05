/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, Redirect } from 'react-router-dom'
import store/* , { history } */ from 'STORE'
// import router from 'ROUTE'
import App from 'COMPONENT/App'
import './index.scss'

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    {/* <Router history={history}>
      { router }
    </Router> */}
    <App></App>
  </Provider>,
  MOUNT_NODE
)
/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'STORE'
import routes from 'ROUTE'
import './index.scss';

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} />
  </Provider>,
  MOUNT_NODE
)
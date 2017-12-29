import React from 'react';
import { Route } from 'react-router-dom'
import { injectReducer } from 'REDUCER'
import createContainer from 'UTIL/createContainer'
import App from 'COMPONENT/App'

export default (
  <Route path="/" component = { App }>
  </Route>
)
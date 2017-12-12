import React from 'react';
import { Route } from 'react-router-dom'

export default () => {
  return (
    <Route exact path="/" component={require('COMPONENT/Header').default} />
  )
}

/*
  当前路由树如下
  ├ /
  |
  ├ /msg
  ├ /msg/add
  ├ /msg/detail/:msgId
  ├ /msg/modify/:msgId
  |
  ├ /todo
  |
  ├ /redirect
*/

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from 'REDUCER'
import middlewares from './middlewares'

// ======================================================
// 实例化 Store
// ======================================================
const args = [
  createRootReducer(),
  {}
]

switch (process.env.NODE_ENV) {
  case 'development':
    args.push(composeWithDevTools(applyMiddleware(...middlewares)))
    break
  case 'production':
    args.push(compose(applyMiddleware(...middlewares)))
    break
  default:
    throw new Error('need NODE_ENV')
}

const store = createStore.apply(this, args)

export default store

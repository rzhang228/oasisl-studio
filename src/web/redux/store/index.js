import { applyMiddleware/* , compose */, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createRootReducer } from 'REDUCER'
import middlewares from './middlewares'
// import enhancers from './enhancers'
import syncHistoryWithStore from './syncHistoryWithStore'

// ======================================================
// 实例化 Store
// ======================================================
const store = createStore(
  createRootReducer(),
  {},
  /* compose(
    applyMiddleware(...middlewares),
    // ...enhancers
  ) */
  composeWithDevTools(
    applyMiddleware(...middlewares),
  )
)
export default store

// ======================================================
// 增强版 history
// ======================================================
export const history = syncHistoryWithStore(store)

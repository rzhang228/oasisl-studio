// ========================================================
// 同步 history 配置
// ========================================================
import createHashHistory from 'history/createHashHistory'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

const hashHistory = createHashHistory()

export const historyMiddleware = routerMiddleware(hashHistory)

/**
 * @param  {Store}
 * @return {History} 增强版 history
 */
export default function (store) {
  return syncHistoryWithStore(
    hashHistory,
    store,
    { selectLocationState: (state) => state.router }
  )
}

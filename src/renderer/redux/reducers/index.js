import { combineReducers } from 'redux'
import fileReducer from './file'
import vNodeTreeReducer from './vNodeTree'

const reducers = {
  fileObj: fileReducer,
  vNodeTreeList: vNodeTreeReducer
}

/**
 * @return {Function} rootReducer
 */
export default function createRootReducer() {
  return combineReducers(reducers)
}

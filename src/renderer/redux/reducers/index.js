import { combineReducers } from 'redux'
import fileReducer from './file'
import vNodeTreeReducer from './vNodeTree'
import domIdReducer from './domId'

const reducers = {
  fileObj: fileReducer,
  vNodeTreeList: vNodeTreeReducer,
  domId: domIdReducer
}

/**
 * @return {Function} rootReducer
 */
export default function createRootReducer() {
  return combineReducers(reducers)
}

import { combineReducers } from 'redux'
import fileReducer from 'REDUCER/file'

const reducers = {
  fileObj: fileReducer
}

/**
 * @return {Function} rootReducer
 */
export default function createRootReducer() {
  return combineReducers(reducers)
}

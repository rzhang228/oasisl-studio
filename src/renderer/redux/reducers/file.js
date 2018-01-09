import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/file'
import initState from 'STORE/initState'

export default createReducer(initState.fileObj, ACTION_HANDLERS)

import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/vNodeTree'
import initState from 'STORE/initState'

export default createReducer(initState.vNodeTreeList, ACTION_HANDLERS)

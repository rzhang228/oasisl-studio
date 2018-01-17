import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/domId'
import initState from 'STORE/initState'

export default createReducer(initState.domId, ACTION_HANDLERS)

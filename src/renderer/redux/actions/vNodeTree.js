const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX'
const ADD_VNODETREE = 'ADD_VNODETREE'

const setActiveIndex = index => ({
  type: SET_ACTIVE_INDEX,
  payload: index
})

const addVNodeTree = vNodeTree => ({
  type: ADD_VNODETREE,
  payload: vNodeTree
})

export default {
  addVNodeTree,
  setActiveIndex
}

export const ACTION_HANDLERS = {
  [SET_ACTIVE_INDEX]: (vNodeTreeList, { payload }) => ({
    activeIndex: payload,
    list: vNodeTreeList.list
  }),
  [ADD_VNODETREE]: (vNodeTreeList, { payload }) => ({
    activeIndex: vNodeTreeList.list.length,
    list: [...vNodeTreeList.list, payload]
  })
}

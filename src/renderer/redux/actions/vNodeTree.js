import service from 'SERVICE'

const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX'
const ADD_VNODETREE = 'ADD_VNODETREE'
const REMOVE_VNODETREE = 'REMOVE_VNODETREE'

const setActiveIndex = index => ({
  type: SET_ACTIVE_INDEX,
  payload: index
})

const addVNodeTree = (vNodeTree) => {
  vNodeTree.setKey(new Date().getTime())
  return {
    type: ADD_VNODETREE,
    payload: vNodeTree
  }
}

const removeVNodeTree = index => ({
  type: REMOVE_VNODETREE,
  payload: index
})

export default {
  setActiveIndex,
  addVNodeTree,
  removeVNodeTree
}

export const ACTION_HANDLERS = {
  [SET_ACTIVE_INDEX]: (vNodeTreeList, { payload }) => ({
    activeIndex: payload,
    list: vNodeTreeList.list
  }),

  [ADD_VNODETREE]: (vNodeTreeList, { payload }) => ({
    activeIndex: vNodeTreeList.list.length,
    list: [...vNodeTreeList.list, payload]
  }),

  [REMOVE_VNODETREE]: (vNodeTreeList, { payload }) => {
    let toIndex = vNodeTreeList.activeIndex
    if (vNodeTreeList.activeIndex === payload)
      toIndex = 0
    if (vNodeTreeList.activeIndex > payload)
      toIndex -= 1
    const [vNodeTree] = vNodeTreeList.list.splice(payload, 1)
    service.trigger('delete-file', vNodeTree.path)
    return {
      activeIndex: toIndex,
      list: [...vNodeTreeList.list]
    }
  }
}

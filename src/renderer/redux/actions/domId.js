const SET_ACTIVE_DOM_ID = 'SET_ACTIVE_DOM_ID'
const CLEAR_ACTIVE_DOM_ID = 'CLEAR_ACTIVE_DOM_ID'
const SET_SELECTED_DOM_ID = 'SET_SELECTED_DOM_ID'
const CLEAR_SELECTED_DOM_ID = 'CLEAR_SELECTED_DOM_ID'

const setActiveDomId = id => ({
  type: SET_ACTIVE_DOM_ID,
  payload: id
})

const clearActiveDomId = () => ({
  type: CLEAR_ACTIVE_DOM_ID,
  payload: {}
})

const setSelectedDomId = id => ({
  type: SET_SELECTED_DOM_ID,
  payload: id
})

const clearSelectedDomId = () => ({
  type: CLEAR_SELECTED_DOM_ID,
  payload: {}
})

/* default 导出所有 Action Creators */
export default {
  setActiveDomId,
  clearActiveDomId,
  setSelectedDomId,
  clearSelectedDomId
}

export const ACTION_HANDLERS = {
  [SET_ACTIVE_DOM_ID]: (domId, { payload }) => ({
    active: payload,
    selected: domId.selected
  }),
  [CLEAR_ACTIVE_DOM_ID]: domId => ({
    active: 0,
    selected: domId.selected
  }),
  [SET_SELECTED_DOM_ID]: (domId, { payload }) => ({
    active: domId.active,
    selected: payload
  }),
  [CLEAR_SELECTED_DOM_ID]: domId => ({
    active: domId.active,
    selected: 0
  })
}

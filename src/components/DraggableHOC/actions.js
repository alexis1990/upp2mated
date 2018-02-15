import * as types from './actionTypes'


export function addChangeSet(draggableElementId, draggableElementType, draggableElementAction) {
  return {
    type: types.ADD_CHANGE_SET,
    payload: {
      "about": draggableElementType,
      "aboutEntityId": draggableElementId,
      "action": draggableElementAction
    }
  }
}
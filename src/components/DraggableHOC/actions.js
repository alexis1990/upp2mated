import * as types from './actionTypes'
import axios from 'axios'


export function addChangeSet(draggableElementId, draggableElementType, draggableElementAction) {
  return {
    type: types.ADD_CHANGE_SET,
    payload: {
      "about": draggableElementType,
      "aboutEntityId": draggableElementId + 1,
      "action": draggableElementAction
    }
  }
}
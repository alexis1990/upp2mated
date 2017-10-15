import initialState from './initialValues'
import * as types from './actionTypes'


export function modalReducer(state = initialState.modal, action = action) {
  switch(action.type) {
    case types.VISIBLE_MODAL:
      return {mode: action.payload.mode, name: action.payload.name};
    default:
      return state;
  }
}
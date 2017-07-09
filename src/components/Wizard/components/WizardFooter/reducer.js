import initialState from '../../initialState'
import * as types from './actionTypes'


export function wizardReducer(state = initialState.wizard, action = action) {
  switch(action.type) {
    case types.NEXT_PAGE:
      return action.payload;
    case types.PREVIOUS_PAGE:
      return action.payload;
    default:
      return state;
  }
}
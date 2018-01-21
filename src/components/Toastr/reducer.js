import * as types from './actionTypes'
import intialstate from './initialState'

export function ToastrReducer(state=intialstate, action) {
    switch(action.type) {
        case types.DISPLAY_TOASTR:
            return {
                display: action.payload.display, 
                message: action.payload.message
            }
            
        default:
            return state
    }
}
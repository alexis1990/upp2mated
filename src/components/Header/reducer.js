
import initialState from './initialState'
import * as types from './actionTypes'

export function notifications(state = initialState, action = action) {
    switch(action.type){
        case types.LOAD_NOTIFICATIONS:
            return {
                ...state,
                count: action.payload.length,
                list: action.payload
            }
        default:
            return state
    }
}
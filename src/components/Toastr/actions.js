import * as types from './actionTypes'

export function displayToastr(display, message, status) {
    return {
        type: types.DISPLAY_TOASTR,
        payload: { display: display, message: message, status }
    }
}
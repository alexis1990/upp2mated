import * as types from './actionTypes'
import axios from 'axios'

export function logout(history, sessionStorage) {
  return (dispatch, getState) => {
    sessionStorage.clear();
    history.push('/');
    dispatch({
		type: types.IS_AUTHENTICATED,
		payload: { isLogged: null }
	});
  }
}

export function loadNotifications(notifications) {
  return {
    type: types.LOAD_NOTIFICATIONS,
    payload: notifications
  }
}

export function fetchNotifications(teamId, userId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/notification/team/${teamId}/user/${userId}`)
    .then((notifications) =>
      dispatch(loadNotifications(notifications))
    ).catch((reject) =>
      console.log('ERRORR', reject)
    )
  }
}
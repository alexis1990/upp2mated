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

export function loadNotifications(teamId, userId) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/notification/team/${teamId}/user/${userId}`)
    .then((response) =>
      console.log('RESPOSNEEE', response)
    ).catch((reject) =>
      console.log('ERRORR', reject)
    )
  }
}
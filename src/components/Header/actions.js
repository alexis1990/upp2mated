import * as types from './actionTypes'

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
import axios from 'axios'
import * as types from './actionTypes'

export function loadTeams(teams, isLoading) {
	return {
		type: types.LOAD_TEAMS,
		payload: { data: teams, isLoading: isLoading }
	}
}

export function loadTeam(team, isLoading) {
	return {
		type: types.LOAD_TEAM,
		payload: { data: team, isLoading: isLoading }
	}
}

export function fetchTeams() {
	return (dispatch) => {
		dispatch(loadTeams([], true))

		axios.get('/u2m-api/v1/team/').then((teams) => {
			dispatch(loadTeams(teams, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}

export function fetchTeam(id) {
	return (dispatch) => {
		dispatch(loadTeam({}, true))

		axios.get(`${'/u2m-api/v1/team/' + id }`).then((team) => {
			dispatch(loadTeam(team, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
	}
}
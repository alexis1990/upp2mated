import axios from 'axios'
import * as types from '../../actionTypes'

//Authorization & Roles
export function addTeamToAuthorizationList(team, type) {
    return {
        type: types.ADD_TEAM_AUHORIZATION_LIST,
        payload: { ...team, type: type }
    }
}

export function removeTeamToAuthorizationList(team, type) {
    return {
        type: types.REMOVE_TEAM_AUHORIZATION_LIST,
        payload: { ...team, type: type }
    }
}

export function selectedTeamAuthorization(selectedTeam, type) {
    return (dispatch, getState) => {
        const teamListState = getState().form.Administration.authorization[type].teams;
        teamListState.some((item) => item.team.values.id === selectedTeam.id) ? dispatch(removeTeamToAuthorizationList(selectedTeam, type)) : dispatch(addTeamToAuthorizationList(selectedTeam, type));
    }
}

export function addUserToAuthorizationList(user, type) {
    return {
        type: types.ADD_USER_AUHORIZATION_LIST,
        payload: { ...user, type: type }
    }
}

export function removeUserToAuthorizationList(user, type) {
    return {
        type: types.REMOVE_USER_AUHORIZATION_LIST,
        payload: { ...user, type: type }
    }
}

export function selectedUserAuthorization(selectedUser, type) {
    return (dispatch, getState) => {
        const usersListState = getState().form.Administration.authorization[type].users;
        usersListState.some((item) => item.user.values.id === selectedUser.id) ? dispatch(removeUserToAuthorizationList(selectedUser, type)) : dispatch(addUserToAuthorizationList(selectedUser, type));
    }
}

export function loadResponsibilities(responsibilities) {
    return {
        type: types.LOAD_RESPONSIBILITIES,
        payload: responsibilities
    }
}

export function getResponsibilities() {
    return (dispatch) => {
        axios.get(`/u2m-api/v1/authorization-type/functions`).then((responsibilities) => {
            const responsibilitiesOptions = responsibilities.map((responsibility) => (
                { value: responsibility, name: responsibility }
            ))
            dispatch(loadResponsibilities(responsibilitiesOptions));
        }, (errorResponse) => {
            console.log('ROLES', errorResponse)
        })
    }
}

export function loadScopes(scopes) {
    return {
        type: types.LOAD_SCOPES,
        payload: scopes
    }
}

export function getScopes() {
    return (dispatch) => {
        axios.get(`/u2m-api/v1/authorization-type/scopes`).then((scopes) => {
            const scopesOptions = scopes.map((scope) => (
                { value: scope, name: scope }
            ))
            dispatch(loadScopes(scopesOptions));
        }, (errorResponse) => {
            console.log('ROLES', errorResponse)
        })
    }
}

export function postRowAuthorization(rowSelected) {
    return (dispatch) => {
        axios.post(`/u2m-api/v1/role/${rowSelected.function}/person/${rowSelected.id}`).then((response) => {
            console.log('TEAM AUTHORISATION', response)
        }, (errorResponse) => {
            console.log('TEAM AUTHORISATION ERROR', errorResponse)
        })
    }
}

export function loadRoles(roles) {
    return {
        type: types.LOAD_ROLES,
        payload: roles
    }
}


export function getRoles() {
    return (dispatch) => {
        axios.get(`/u2m-api/v1/role/`).then((roles) => {
            dispatch(loadRoles(roles));
        }, (errorResponse) => {
            console.log('ROLES', errorResponse)
        })
    }
}

export function loadRole(role) {
    return {
        type: types.LOAD_ROLE,
        payload: role
    }
}


export function getRole(id) {
    return (dispatch) => {
        axios.get(`/u2m-api/v1/role/${id}`).then((role) => {
            dispatch(loadRole(role));
        }, (errorResponse) => {
            console.log('ROLES', errorResponse)
        })
    }
}

export function createRole(role) {
    return (dispatch) => {
        axios.post(`/u2m-api/v1/role/`, role).then((successResponse) => {
            console.log('successResponse', successResponse)
            // dispatch(loadRoles(rolesOptions));
        }, (errorResponse) => {
            console.log('ROLES', errorResponse)
        })
    }
}
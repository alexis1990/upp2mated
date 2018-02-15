import initialState from './initialState';
import * as types from './actionTypes';

export function administationReducer(state = initialState, action = action) {
  let type = '';

  switch (action.type) {
    case types.ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case types.LOAD_TEAMS:
      return { ...state, teams: action.payload };
    case types.LOAD_TEAM_TO_MANAGE:
      return {
        ...state,
        manageTeam: {
          ...state.manageTeam,
          values: {
            ...state.manageTeam.values,
            id: action.payload.data.id,
            name: action.payload.data.name,
            teamMembers: action.payload.data.teamMembers,
          },
          isLoading: action.payload.isLoading,
        },
      };
    case types.LOAD_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    case types.LOAD_USERS:
      return { ...state, users: action.payload };
    case types.LOAD_USER:
      return { ...state, user: action.payload };
    case types.LOAD_USER_TO_MANAGE:
      return {
        ...state,
        manageUser: {
          ...state.manageUser,
          values: action.payload.data,
          isLoading: action.payload.isLoading,
        },
      };
    case types.ADD_MEMBER:
      return {
        ...state,
        manageTeam: {
          ...state.manageTeam,
          values: {
            ...state.manageTeam.values,
            teamMembers: state.manageTeam.values.teamMembers.concat(action.payload),
          },
        },
      };
    case types.REMOVE_MEMBER:
      return {
        ...state,
        manageTeam: {
          ...state.manageTeam,
          values: {
            ...state.manageTeam.values,
            teamMembers: state.manageTeam.values.teamMembers.filter((x) => x.id !== action.payload.id),
          },
        },
      };
    case types.REMOVE_MEMBER_LIST:
      return {
        ...state,
        users: {
          ...state.users,
          data: {
            ...state.users.data,
            content: state.users.data.content.filter((x) => x.id !== action.payload),
          },
        },
      };
    case types.ADD_TEAM_CREATION:
      return {
        ...state,
        manageUser: {
          ...state.manageUser,
          values: {
            ...state.manageUser.values,
            teamList: state.manageUser.values.teamList.concat(action.payload),
          },
        },
      };
    case types.REMOVE_TEAM_CREATION:
      return {
        ...state,
        manageUser: {
          ...state.manageUser,
          values: {
            ...state.manageUser.values,
            teamList: state.manageUser.values.teamList.filter((x) => x.id !== action.payload.id),
          },
        },
      };
    case types.REMOVE_TEAM_LIST:
      return {
        ...state,
        teams: {
          ...state.teams, data: state.teams.data.filter((x) => x.id !== action.payload),
        },
      };
    case types.LOAD_RESPONSIBILITIES:
      return {
        ...state,
        authorization: {
          ...state.authorization, responsibilities: action.payload,
        },
      };
    case types.LOAD_SCOPES:
      return {
        ...state,
        authorization: {
          ...state.authorization, scopes: action.payload,
        },
      };
    case types.LOAD_ROLES:
      return {
        ...state,
        authorization: {
          ...state.authorization, roles: action.payload,
        },
      };
    case types.LOAD_ROLE:

      return {
        ...state,
        manageRoles: {
          ...state.authorization.manageRoles, values: action.payload,
        },
      };
    case types.ADD_TEAM_AUHORIZATION_LIST:
      type = action.payload.type;
      return {
        ...state,
        authorization: {
          ...state.authorization,
          [type]: {
            ...state.authorization[type],
            teams: state.authorization[type].teams.concat({ team: { values: action.payload } }),
          },
        },
      };
    case types.REMOVE_TEAM_AUHORIZATION_LIST:
      type = action.payload.type;
      return {
        ...state,
        authorization: {
          ...state.authorization,
          [type]: {
            ...state.authorization[type],
            teams: state.authorization[type].teams.filter((x) => x.team.values.id !== action.payload.id),
          },
        },
      };
    case types.ADD_USER_AUHORIZATION_LIST:
      type = action.payload.type;
      return {
        ...state,
        authorization: {
          ...state.authorization,
          [type]: {
            ...state.authorization[type],
            users: state.authorization[type].users.concat({ user: { values: action.payload } }),
          },
        },
      };
    case types.REMOVE_USER_AUHORIZATION_LIST:
      type = action.payload.type;
      return {
        ...state,
        authorization: {
          ...state.authorization,
          [type]: {
            ...state.authorization[type],
            users: state.authorization[type].users.filter((x) => x.user.values.id !== action.payload.id),
          },
        },
      };
    case types.RESET_AUHORIZATION_LIST:
      return {
        ...state,
        authorization: {
          ...state.authorization,
          tenant: {
            ...state.authorization.tenant,
            role: {},
            users: [],
            teams: [],
          },
        },
      };
    case types.LOAD_QUALITY_SURVEYS:
      return {
        ...state,
        qualitySurveys: {
          ...state.qualitySurveys, values: action.payload,
        },
      };
    case types.LOAD_QUALITY_SURVEY:
      return {
        ...state,
        qualitySurvey: {
          ...state.qualitySurvey,
          values: { ...action.payload },
        },
      };
    case types.ADD_CHANGE_SET:
      const { changeList } = state.qualitySurvey.values.lastChangeSet;
      const ABOUT = {
        ADD: 'ADD',
        MODIFY: 'MODIFY',
        REMOVE: 'REMOVE',
        UNKNOWN: 'UNKNOWN',
      };
      const mergeChangeList = (changeList, newChange) => {
        let objectIsUpdated = false;

        console.log(newChange)
        const changeListWithoutRemoveAction = changeList.filter((change) => {
          if (change.about === newChange.about && change.aboutEntityId === newChange.aboutEntityId) {
            console.log(change)
            if (newChange.action === ABOUT.REMOVE) {


              objectIsUpdated = true;
              return false;
            }
            return true;
          }
          return true;
        });

        const changeListToReturn = changeListWithoutRemoveAction.map((change) => {
          console.log(change);
          if (change.about === newChange.about && change.aboutEntityId === newChange.aboutEntityId) {


            let action = '';
            switch (newChange.action) {
              case ABOUT.ADD:
                action = change.action === ABOUT.REMOVE ? ABOUT.MODIFY : ABOUT.ADD;
                break;
              case ABOUT.MODIFY:
                action = change.action === ABOUT.ADD ? ABOUT.ADD : ABOUT.MODIFY;
                break;
              case ABOUT.REMOVE:
                action = change.action === ABOUT.ADD ? ABOUT.MODIFY : ABOUT.REMOVE;
                break;
              default:
                action = ABOUT.UNKNOWN;
                break;
            }

            objectIsUpdated = true;

            return {
              ...change,
              action,
            };
          }
          return change;
        });

        if (!objectIsUpdated) {
          changeListToReturn.push(newChange);
        }

        return changeListToReturn;
      };

      return {
        ...state,
        qualitySurvey: {
          ...state.qualitySurvey,
          values: {
            ...state.qualitySurvey.values,
            lastChangeSet: {
              ...state.qualitySurvey.values.lastChangeSet,
              changeList: mergeChangeList(changeList, action.payload),
            },
          },
        },
      };
    default:
      return state;
  }
}

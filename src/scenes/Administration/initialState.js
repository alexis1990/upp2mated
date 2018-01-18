const initialState = {
    teams: {
        data: [],
        isLoading: true
    },
    team: {
        data: {
            teamMembers: [],
            teamManagers: []
        },
        isLoading: true
    },
    manageTeam: {
        values: {
            teamMembers: []
        }
    },
    manageUser: {
        values: {
            teamList: []
        }
    },
    users: {
        data: {
            teamMembers: [],
            teamManagers: []
        },
        isLoading: true
    },
    user: {
        data: {
            teamMembers: [],
        },
        isLoading: true
    },
    authorization: {
        responsibilities: [],
        roles: [],
        tenant: {
            teams: [],
            users: []
        },
        director: {
            teams: [],
            users: []
        },
        buyer: {
            teams: [],
            users: []
        }
    },
    qualitySurvey: {
        values: {
            id: 0,
            changeSetList: [],
            sections:[],
            templateId: 0
        }
    },
    qualitySurveys: {
        values: {
            content: [],
        }
    }
}

export default initialState;
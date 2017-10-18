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
    createTeam: {
        values: {
            teamList: []
        }
    },
    editTeam: {
        values: {
            teamMembers: []
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
        tenant: {
            teams : [],
            users : []
        },
        director: {
            values: {
                teams : [],
                users : []
            }
        },
        buyer: {
            values: {
                teams : [],
                users : []
            }
        }
    }
}

export default initialState;
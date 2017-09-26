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
        },
        isLoading: true
    }
}

export default initialState;
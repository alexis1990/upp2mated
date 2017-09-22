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
    users: {
    	data: {
            teamMembers: [],
            teamManagers: []
        },
    	isLoading: true
    }
}

export default initialState;
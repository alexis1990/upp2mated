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
            name:'okok'
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
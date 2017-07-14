const initialState = {
  values: {
  	providersReducer :
    [{
      provider: '',
      mail: '',
      interlocutor: '',
      job: '',
      client: false,
      survey: false,
      presenceProvider: false
    }],
    listProviders :
    [{
    	name:'Alstom',
    	mail:'Alstom@gmail.com',
    	interlocutor:'Mr Richard',
    	job:'Directeur'
    }]
  }
}

export default initialState;
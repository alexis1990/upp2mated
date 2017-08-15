const initialState = {
  teamUsers: {
    users : [],
    isLoading: false
  },
  values: {
    tech :
    [{
      user: '',
      consultationPersonType: 'TECHNICAL',
      job: '',
      permission: "DECISION_MAKER",
      visibleBySupplier: false
    }],
    teamLeader: {
      consultationPersonType: 'PROJECT_LEAD',
      permission: "DECISION_MAKER",
      active: false
    }
  }
}

export default initialState;

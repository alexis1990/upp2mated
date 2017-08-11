const initialState = {
  values: {
    commercial :
    [{
      identity: '',
      consultationPersonType: 'COMMERCIAL',
      job: '',
      permission: '',
      visibleBySupplier: false
    }],
    tech :
    [{
      identity: '',
      consultationPersonType: 'TECHNICAL',
      job: '',
      permission: '',
      visibleBySupplier: false
    }],
    teamUsers: {
      users : [],
      isLoading: false
    }
  }
}

export default initialState;

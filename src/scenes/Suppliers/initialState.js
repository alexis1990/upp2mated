const initialState = {
  suppliers: {
    content: [],
  },
  supplier: {
    name: '',
    contactPersonList: [],
  },
  qualitySurvey: {
    values: {
      content: [],
      lastEditingVersionBySupplier: 0,
      templatePublishedVersion: 0,
      details: {
        name: '',
        description: '',
      },
    },
  },
  isLoading: false,
};

export default initialState;

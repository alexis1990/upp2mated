const initialState = {
  values: {
  	consultationSupplierList :
    [{
      supplier: [
        {
          contactPersonList:[]
        }
      ],
      interlocutor: {
      	id: '',
      	name: ''
      },
      referenceCustomerRequested: false,
      qualitySecurityServey: false,
      supplierPresence: false,
    }]
  }
}

export default initialState;

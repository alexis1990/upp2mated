const initialState = {
  values: {
  	consultationSupplierList :
    [{
      supplier: {
      	id: '',
      	name: ''
      },
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
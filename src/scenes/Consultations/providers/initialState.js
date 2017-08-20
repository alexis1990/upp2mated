const initialState = {
  values: {
  	consultationSupplierList :
    [{
      supplier: [
        {
          contactPersonList:[]
        }
      ],
      interlocutor: null,
      referenceCustomerRequested: false,
      qualitySecurityServey: false,
      supplierPresence: false,
    }]
  }
}

export default initialState;

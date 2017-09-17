const validate = values => {
  const errors = {}
  const suppliersArrayErrors = []
  values.consultationSupplierList.forEach((supplier, supplierIndex) => {
      console.log('VLLLL', supplier)
    const supplierErrors = {}
    
    if (!supplier || !supplier.interlocutor) {
      supplierErrors.interlocutor = 'Required'
      suppliersArrayErrors[supplierIndex] = supplierErrors
    }
    if (!supplier || !supplier.supplier) {
      supplierErrors.supplier = 'Required'
      suppliersArrayErrors[supplierIndex] = supplierErrors
    }
  })

  if(suppliersArrayErrors.length) {
    errors.consultationSupplierList = suppliersArrayErrors
  }

  return errors
}

export default validate

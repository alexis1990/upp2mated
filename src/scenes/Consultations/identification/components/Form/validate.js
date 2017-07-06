const validate = values => {
  const errors = {}
  console.log('VALUEEE', values)
  if (!values.libelle) {
    errors.libelle = 'Champ obligatoire'
  } else if (values.libelle.length > 0 && values.libelle.length < 6){
  	errors.libelle = 'Le libellé doit contenir minimum 6 chiffres'
  }
  // if (!values.lastName) {
  //   errors.lastName = 'Required'
  // }
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  // if (!values.sex) {
  //   errors.sex = 'Required'
  // }
  // if (!values.favoriteColor) {
  //   errors.favoriteColor = 'Required'
  // }
  return errors
}

export default validate

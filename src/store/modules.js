import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wizardReducer } from '../components/Wizard/reducer'
import { identificationReducer } from '../scenes/Consultations/identification/reducer'
import { teamReducer } from '../scenes/Consultations/team/reducer'
import { providersReducer } from '../scenes/Consultations/providers/reducer'
import { auth } from '../scenes/Authentication/reducer'
import { suppliersReducer } from '../scenes/Suppliers/reducer'
import { administationReducer } from '../scenes/Administration/reducer'
import { loadTranslations, setLocale, i18nReducer } from 'react-redux-i18n';
// import { newProvider } from '../scenes/Consultations/providers/components/Modal/reducer'
import { modalReducer } from '../components/Modal/reducer'
import { reducer as formReducer } from 'redux-form'

// const allReducers = Object.assign({}, reducers1, reducers2);

export default combineReducers({
  	wizard: wizardReducer,
  	modal: modalReducer,
  	auth: auth,
  	// team: teamReducer,
   	routing: routerReducer,
    suppliers: suppliersReducer,
   	form: formReducer.plugin({
   		Identification: identificationReducer,
    	Team: teamReducer,
    	Providers: providersReducer,
		Administration: administationReducer
    	// NewProvider: newProvider
	}),
	i18n: i18nReducer
})

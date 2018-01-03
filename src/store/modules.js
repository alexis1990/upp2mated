import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wizardReducer } from '../components/Wizard/reducer'
import { identificationReducer } from '../scenes/Consultations/identification/reducer'
import { teamReducer } from '../scenes/Consultations/team/reducer'
import { providersReducer } from '../scenes/Consultations/providers/reducer'
import { notifications } from '../components/Header/reducer'
import { auth } from '../scenes/Authentication/reducer'
import { suppliersReducer } from '../scenes/Suppliers/reducer'
import { administationReducer } from '../scenes/Administration/reducer'
// import { newProvider } from '../scenes/Consultations/providers/components/Modal/reducer'
import { modalReducer } from '../components/Modal/reducer'
import { reducer as formReducer } from 'redux-form'

// const allReducers = Object.assign({}, reducers1, reducers2);

export default combineReducers({
	wizard: wizardReducer,
	modal: modalReducer,
	auth: auth,
	notifications: notifications,
	// team: teamReducer,
	routing: routerReducer,
	form: formReducer.plugin({
		Identification: identificationReducer,
		Team: teamReducer,
		Providers: providersReducer,
		Administration: administationReducer,
		Suppliers: suppliersReducer,
		// NewProvider: newProvider
	})
})

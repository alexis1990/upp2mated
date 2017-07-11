import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wizardReducer } from '../components/Wizard/components/WizardFooter/reducer'
import { teamReducer } from '../scenes/Consultations/team/components/Form/reducer'
import { providersReducer } from '../scenes/Consultations/providers/components/Form/reducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  	wizard: wizardReducer,
  	// team: teamReducer,
   	routing: routerReducer,
   	form: formReducer.plugin({
    	Team: teamReducer,
    	Providers: providersReducer
	})	
})

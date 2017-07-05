import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wizardReducer } from '../reducers/wizardReducer/index'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  	wizard: wizardReducer,
   	routing: routerReducer,
   	form: formReducer
})

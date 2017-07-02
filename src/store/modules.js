import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { wizardReducer } from '../reducers/wizardReducer/index'

export default combineReducers({
  	wizard: wizardReducer,
   	routing: routerReducer
})

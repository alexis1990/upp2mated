import initialState from './initialState'
import * as types from './actionTypes'
import {reducer as formReducer} from 'redux-form';
import _ from 'lodash'

export function teamReducer(state = initialState, action = action) {
			console.log('SSSSSSSS', state)
	switch(action.type) {
	    case types.ADD_FIELD:
	    	const newField = {};
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              Team: state.values.Team.concat(newField)
	            }
	        }
	    case types.REMOVE_FIELD:
	      	return {
	            ...state,
	            values: {
	              ...state.values,
	              Team: state.values.Team.filter((item, key )=> key !== action.payload)
	            }
	        }
	    default:
	      	return state;
	}	
}
// export function teamReducer(state = initialState.fields, action = action) {
//   switch(action.type) {
//     case types.ADD_FIELD:
//     	const newField = {};
//       	return { 
// 	        ...state,
// 	        fields: state.fields.concat(newField)
// 	    }
//     case types.REMOVE_FIELD:
//       	return {
//       		fields: state.fields.filter((item, key )=> key !== action.payload)
//       	}
//     default:
//       	return state;
//   }
// }
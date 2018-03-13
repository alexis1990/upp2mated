import initialState from './initialState';
import * as types from './actionTypes';

export function suppliersReducer(state = initialState, action = action) {
  switch (action.type) {
    case types.SUPPLIER_VIEW_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case types.LOAD_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload.suppliers,
        isLoading: action.payload.isLoading,
      };
    case types.LOAD_SUPPLIER:
      return {
        ...state,
        supplier: action.payload.supplier,
        ManageSupplier: {
          ...state.ManageSupplier,
          values: action.payload.supplier,
        },
        isLoading: action.payload.isLoading,
      };
    case types.LOAD_QUALITY_SURVEY_REPLY:
      return {
        ...state,
        qualitySurvey: {
          ...state.qualitySurvey,
          values: {
            ...action.payload,
          },
        },
      };
    case types.REMOVE_SUPPLIER:
      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          content: state.suppliers.content.filter(supplier => supplier.id !== action.payload),
        },
      };
    case types.PRELOAD_SUPPLIER_CONTACT:
      return {
        ...state,
        contact: {
          values: {
            ...action.payload,
          },
        },
      };
    case types.REMOVE_SUPPLIER_CONTACT:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          contactPersonList: state.supplier.contactPersonList.filter(contact => contact.id !== action.payload),
        },

      };
    default:
      return state;
  }
}
// export function suppliersReducer(state = initialState, action = action) {
// 	console.log('SUPPLIERREDUCE', state)
// 	switch (action.type) {
// 		case types.LOAD_SUPPLIERS:
// 			return {
// 				...state,
// 				suppliers: action.payload.suppliers,
// 				isLoading: action.payload.isLoading
// 			}
// 		case types.LOAD_SUPPLIER:
// 			return {
// 				...state,
// 				supplier: action.payload.supplier,
// 				manageSupplier: {
// 					...state.manageSupplier,
// 					values: action.payload.supplier
// 				},
// 				isLoading: action.payload.isLoading
// 			}

// 		case types.LOAD_QUALITY_SURVEY_REPLY:
// 			const sections = action.payload.content;
// 			return {
// 				...state,
// 				qualitySurvey: {
// 					...state.qualitySurvey,
// 					values: {
// 						...action.payload,
// 						content: [].concat.apply([], sections.map((section) => {{
// 							return { 
// 								...section,
// 								questions: section.questions.map((question)=> {
// 									return { ...question, answers:[{}] }
// 								})
// 							}
// 						}},
// 					))}
// 				}
// 			}
// 		case types.REMOVE_SUPPLIER:
// 			return {
// 				...state,
// 				suppliers: {
// 					...state.suppliers,
// 					content: state.suppliers.content.filter((supplier) => supplier.id !== action.payload)
// 				}
// 			}
// 		default:
// 			return state;
// 	}
// }

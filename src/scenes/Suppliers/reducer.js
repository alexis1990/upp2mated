import initialState from './initialState'
import * as types from './actionTypes'

export function suppliersReducer(state = initialState, action = action) {
	console.log('SUPPLIERREDUCE', state)
	switch (action.type) {
		case types.LOAD_SUPPLIERS:
			return {
				...state,
				suppliers: action.payload.suppliers,
				isLoading: action.payload.isLoading
			}
		case types.LOAD_SUPPLIER:
			return {
				...state,
				supplier: action.payload.supplier,
				manageSupplier: {
					...state.manageSupplier,
					values: action.payload.supplier
				},
				isLoading: action.payload.isLoading
			}

		case types.LOAD_QUALITY_SURVEY_REPLY:
			const sections = action.payload.content;
			return {
				...state,
				qualitySurvey: {
					...state.qualitySurvey,
					values: {
						...action.payload,
						content: [].concat.apply([], sections.map((section) => {{
							return { 
								...section,
								questions: section.questions.map((question)=> {
									return { ...question, answers:[{}] }
								})
							}
						}},
					))}
				}
			}
		case types.REMOVE_SUPPLIER:
			return {
				...state,
				suppliers: {
					...state.suppliers,
					content: state.suppliers.content.filter((supplier) => supplier.id !== action.payload)
				}
			}
		default:
			return state;
	}
}

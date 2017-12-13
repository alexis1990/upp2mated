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
				ManageSupplier: {
					...state.ManageSupplier,
					values: action.payload.supplier
				},
				isLoading: action.payload.isLoading
			}
		case types.LOAD_QUALITY_SURVEY_REPLY:
			const sections = action.payload.content;
			const templatePublishedVersion = action.payload.templatePublishedVersion;
			const lastEditingVersionBySupplier = action.payload.lastEditingVersionBySupplier;
			
			return {
				...state,
				qualitySurvey: {
					...state.qualitySurvey,
					values: {
						...state.qualitySurvey.values,
						templatePublishedVersion,
						lastEditingVersionBySupplier,
						content: [].concat.apply([], sections.map((section) => {{
							return { 
								questions: section.questions.map((question)=> {
									return { ...question, answers:[{}] }
								})
							}
						}},
					))}
				}
			}
		default:
			return state;
	}
}

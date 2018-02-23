import initialState from './initialState';
import * as types from './actionTypes';

export function suppliersReducer(state = initialState, action = action) {
  switch (action.type) {
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
            qualitySurveyForm: action.payload.qualitySurveyForm.map(section => ({
              ...section,
              questions: section.questions.map(question => ({
                ...question,
                answer: {
                  answer: '',
                  questionId: question.questionId,
                },
              })),
            })),
          },
        },
      };
    case types.REMOVE_SUPPLIER:
      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          content: state.suppliers.content.filter((supplier) => supplier.id !== action.payload),
        },
      };
    default:
      return state;
  }
}

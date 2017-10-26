import * as types from '../../actionTypes'

export function getQualitySurveyForm() {
  return (dispatch) => {
    dispatch({
      type: types.LOAD_QUALITY_SURVEY_FORM,
      payload: {
        "changeList": [
          {
            "about": "SECTION",
            "aboutEntityId": 1,
            "action": "ADD"
          },
          {
            "about": "QUESTION",
            "aboutEntityId": 1,
            "action": "ADD"
          },
          {
            "about": "QUESTION",
            "aboutEntityId": 2,
            "action": "ADD"
          }
        ],
        "questions": [
          {
            "content": "Quel est l'age du capitaine?",
            "questionId": 1,
            "templateId": 50,
            "version": 1
          },
          {
            "content": "Quel est la couleur du cheval blanc d'Henri 4",
            "questionId": 2,
            "templateId": 50,
            "version": 1
          }
        ],
        "sections": [
          {
            "content": "Principal",
            "sectionId": 1,
            "templateId": 50,
            "version": 1
          }
        ],
        "version": 1,
        "orderFormula": "S1,Q1,Q2"
      }
    })
  }
}
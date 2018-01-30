import * as types from '../../actionTypes'
import { displayToastr } from '../../../../components/Toastr/actions'
import { isModalVisible } from '../../../../components/Modal/actions'
import _ from 'lodash'
import axios from 'axios'

export function loadQualitySurvey(quality_survey) {
  return {
    type: types.LOAD_QUALITY_SURVEY,
    payload: quality_survey
  }
}

export function loadQualitySurveys(quality_surveys) {
  return {
    type: types.LOAD_QUALITY_SURVEYS,
    payload: quality_surveys
  }
}

export function getQualitySurveys(pageId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/?page=${pageId}&size=10`).then((quality_surveys) => {
      dispatch(loadQualitySurveys(quality_surveys, false));
    }, (errorResponse) => {
      console.log('ERROR', errorResponse)
    })
  }
}

export function getQualitySurveyForm(surveyParams) {
  return (dispatch) => {
    let qqContent = [];
    axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyParams.id}/v/${surveyParams.version}`)
      .then((quality_survey) => {
        qqContent = quality_survey;
        return axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyParams.id}`);
      })
      .then((quality_survey) => {
        quality_survey.sections = qqContent;
        dispatch(loadQualitySurvey(quality_survey, false));
      })
  }
}

function formatQualitySurveyToChangeSet(qualitySurvey) {

  function omitQQId(qualitySurvey) {
    return _.omit(qualitySurvey, 'id')
  }

  function removeDuplicateChange(qualitySurvey) {
    return _.uniqWith(qualitySurvey.changeList, _.isEqual)
  }

  function createOrderFormula(qualitySurvey) {

    function createSectionNumberWord(index) {
      return ('S' + (index + 1) + ",");
    }

    function createQuestionNumberWord(index) {
      return ('Q' + (index + 1) + ",");
    }

    let orderFormula = '';

    const sections = qualitySurvey.sections;
    if (qualitySurvey.hasOwnProperty('sections')) {
      sections.forEach((section, index) => {
        orderFormula += createSectionNumberWord(index);
        if (section.questions) {
          section.questions.forEach((question, index) => {
            orderFormula += createQuestionNumberWord(index);
          })
        }
      })
    }
    return orderFormula;
  }

  function groupByQuestions(qualitySurvey) {
    return _.compact(qualitySurvey.sections
      .map((survey) => {
        return survey.questions
      })
      .reduce((arrayOne, arrayTwo) => {
        return _.compact(arrayOne.concat(arrayTwo));
      }, [])
      .map((question, index) => {
        if(!question.id) {
          return { ...question, questionId: index + 1 }
        }
        return null;
      }))
  }

  function groupBySections(qualitySurvey) {
    const sections = qualitySurvey.sections;
    return _.compact(sections
      .map((section, index) => {
        // if(console.log('SECTONNNN', section)) { //CHECK MODIFY SECTION CONTENT
          return {
            ...section,
            sectionId: index + 1,
          }
        // }
        // return null;
      })
    )
  }

  return {
    ...omitQQId(qualitySurvey),
    changeList: removeDuplicateChange(qualitySurvey),
    orderFormula: createOrderFormula(qualitySurvey),
    questions: groupByQuestions(qualitySurvey),
    sections: groupBySections(qualitySurvey),
  }
}

export function sendQualitySurvey(qualitySurvey, history) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);
  return (dispatch) => {
    const qualitySurveyGlobalInformations = {
      name: qualitySurveyFormatedForAPI.name,
      description: qualitySurveyFormatedForAPI.description,
    }
    axios.post('/u2m-api/v1/suppliers/template/qualityquestionnaire/', qualitySurveyGlobalInformations)
      .then((qualitySurvey) => {
        const qualitySurveyId = qualitySurvey.id;
        axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/editing`)
        // history.push('/administration')
        return qualitySurveyId;
      })
      .then(qualitySurveyId => new Promise(resolve => {
        setTimeout(function() {
          resolve(qualitySurveyId);
        }, 500);
      })).then((qualitySurveyId) => {
        return axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, { ...qualitySurveyFormatedForAPI, version: 1 })
      })
      .then((result) =>
        history.push('/administration')
      ).catch((error) => console.log('ERROR', error))
  }
}

export function sendEditingQualitySurvey(qualitySurvey, qualitySurveyId, history) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, { ...qualitySurveyFormatedForAPI, version: 1 })
    .then((result) =>{
      dispatch(displayToastr(true, "Modification enregistrée !", 'success'))
      history.push('/administration')
    }).catch((err) => {
      dispatch(displayToastr(true, "Impossible de modifier", 'error'))
    })
  }
}

export function editQualitySurvey(survey) {
  axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${survey.id}/editing`)
  .then((response) => {
  }).catch((reject) => {
    console.log(reject)
  })
}

export function publishQualitySurvey(surveyId, history) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
      .then((response) =>{
        dispatch(displayToastr(true, "Publication enregistrée !", 'success'))
        history.push('/administration')
      }).catch((reject) => {
        dispatch(displayToastr(true, "Impossible de publier", 'error'))
      })
  }
}

export function sendQualitySurveyToSupplier(templateId) {
  return (dispatch) => {
    // axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
    //   .then((response) =>
    //     console.log('RESPOSNEEE', response)
    //   ).catch((reject) =>
    //     console.log('ERRORR', reject)
    //   )
  }
}

export function sendQualitySurveyToSuppliers(selectedContacts, qualitySurveyId) {
  const reorganizeQSSelectedContacts = selectedContacts;
  return (dispatch) => {
    axios.post(`/u2m-api/v1/supplier-action/qq/update?qqIdList=${qualitySurveyId}`, reorganizeQSSelectedContacts)
      .then((response) => {
        dispatch(displayToastr(true, "Questionnaire Envoyé !", 'success'))
        dispatch(isModalVisible(false))
      }).catch((reject) =>
        dispatch(displayToastr(true, "Impossible d'envoyer", 'error'))
      )
  }
}

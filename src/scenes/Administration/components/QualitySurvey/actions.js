import * as types from '../../actionTypes'
import {displayToastr} from '../../../../components/Toastr/actions'
import {isModalVisible} from '../../../../components/Modal/actions'
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
    const quality_survey = {
      qualitySurveyForm: {},
      lastChangeSet: {},
      details: {}
    };
    const {id, version} = surveyParams

    axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyParams.id}`)
      .then(qualitySurveyDetails => {
        quality_survey.details = qualitySurveyDetails;
        return axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${id}/diff`, {
          params: {
            fromVersion: version,
            toVersion: version > 1 ? version - 1 : version
          }
        });
      })
      .then(qualitySurveyForm => {
        quality_survey.qualitySurveyForm = qualitySurveyForm;
        return axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${id}/last-changeset`);
      })
      .then(lastChangeSet => {
        quality_survey.lastChangeSet = lastChangeSet;
        dispatch(loadQualitySurvey(quality_survey, false));
      });
  }
}

function formatQualitySurveyToChangeSet(qualitySurvey) {

  function omitQQId(qualitySurvey) {
    return _.omit(qualitySurvey, 'id')
  }

  function removeDuplicateChange(qualitySurvey) {
    return _.uniqWith(qualitySurvey.lastChangeSet.changeList, _.isEqual)
  }

  function createOrderFormula(qualitySurvey) {

    function createSectionNumberWord(index) {
      return ('S' + (index + 1) + ",");
    }

    function createQuestionNumberWord(index) {
      return ('Q' + (index + 1) + ",");
    }

    let orderFormula = '';

    const sections = qualitySurvey.qualitySurveyForm;

    sections.forEach((section, index) => {
      orderFormula += createSectionNumberWord(index);
      if (section.questions) {
        section.questions.forEach((question, index) => {
          orderFormula += createQuestionNumberWord(index);
        })
      }
    });

    return orderFormula;
  }

  function groupByQuestions(qualitySurvey) {
    return _.compact(qualitySurvey.qualitySurveyForm
      .map((survey) => {
        return survey.questions
      })
      .reduce((arrayOne, arrayTwo) => {
        return _.compact(arrayOne.concat(arrayTwo));
      }, [])
      .map((question, index) => {
        if (!question.id) {
          return {
            ...question,
            questionId: index + 1
          }
        }
        return question;
      }))
  }

  function groupBySections(qualitySurvey) {
    const sections = qualitySurvey.qualitySurveyForm;
    return _.compact(sections
      .map((section, index) => {
        // if(console.log('SECTONNNN', section)) { //CHECK MODIFY SECTION CONTENT
        return {
          ...section,
          sectionId: index + 1
        }
        // }
        // return null;
      })
    )
  }

  return {
    ...qualitySurvey.lastChangeSet,
    changeList: _.orderBy(removeDuplicateChange(qualitySurvey), 'id'),
    orderFormula: createOrderFormula(qualitySurvey),
    questions: groupByQuestions(qualitySurvey),
    sections: groupBySections(qualitySurvey),
  }
}

export function sendQualitySurvey(qualitySurvey, history) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);

  return dispatch => {
    const qualitySurveyGlobalInformations = {
      name: qualitySurveyFormatedForAPI.name,
      description: qualitySurveyFormatedForAPI.description,
    };
    axios.post('/u2m-api/v1/suppliers/template/qualityquestionnaire/', qualitySurveyGlobalInformations)
      .then((qualitySurvey) => {
        const qualitySurveyId = qualitySurvey.id;
        axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/editing`)
        // history.push('/administration')
        return qualitySurveyId;
      })
      .then(qualitySurveyId => new Promise(resolve => {
        setTimeout(function () {
          resolve(qualitySurveyId);
        }, 500);
      })).then((qualitySurveyId) => {
      return axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, {...qualitySurveyFormatedForAPI})
    })
      .then((result) =>
        history.push('/administration')
      ).catch((error) => console.log('ERROR', error))
  }
}

export function sendEditingQualitySurvey(qualitySurvey, qualitySurveyId, history) {
  console.log("QUALITYSURVEYYEAHHHHH:", qualitySurvey);
  const changeSetFormatedForApi = formatQualitySurveyToChangeSet(qualitySurvey);
  let action;
  console.log("changeSetFormatedForApi: ", changeSetFormatedForApi);
  if (changeSetFormatedForApi.id) {
    action = "update-changeset";
  } else {
    action = "addchangeset";
  }

  console.log("LASTCHANGE:", changeSetFormatedForApi);

  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/${action}`, {...changeSetFormatedForApi})
      .then((result) => {
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
      .then((response) => {
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

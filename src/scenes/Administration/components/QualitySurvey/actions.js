import _ from 'lodash';
import axios from 'axios';
import * as types from '../../actionTypes';
import { displayToastr } from '../../../../components/Toastr/actions';
import { isModalVisible } from '../../../../components/Modal/actions';

export function loadQualitySurvey(qualitySurvey) {
  return {
    type: types.LOAD_QUALITY_SURVEY,
    payload: qualitySurvey,
  };
}

export function loadQualitySurveys(qualitySurveys) {
  return {
    type: types.LOAD_QUALITY_SURVEYS,
    payload: qualitySurveys,
  };
}

export function getQualitySurveys(pageId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/?page=${pageId}&size=10`).then((quality_surveys) => {
      dispatch(loadQualitySurveys(quality_surveys, false));
    }, (errorResponse) => {
      console.log('ERROR', errorResponse);
    });
  };
}

export function getQualitySurveyForm(surveyParams) {
  return (dispatch) => {
    const qualitySurvey = {
      qualitySurveyForm: {},
      lastChangeSet: {},
      details: {},
      maxAboutEntityId: {
        section: 0,
        question: 0,
      },
    };
    const { id, version } = surveyParams;

    axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyParams.id}`)
      .then((qualitySurveyDetails) => {
        qualitySurvey.details = qualitySurveyDetails;
        return axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${id}/diff`, {
          params: {
            fromVersion: version > 1 ? version - 1 : version,
            toVersion: version,
          },
        });
      })
      .then((qualitySurveyForm) => {
        qualitySurvey.qualitySurveyForm = qualitySurveyForm;
        qualitySurvey.maxAboutEntityId.section = qualitySurveyForm.length === 0 ? 0 :
          qualitySurveyForm.reduce((prev, current) => ((prev.sectionId > current.sectionId) ? prev : current)).sectionId;

        let maxAboutEntityIdQuestion = 0;
        qualitySurveyForm.forEach(section => section.questions.forEach((question) => {
          if (question.questionId > maxAboutEntityIdQuestion) {
            maxAboutEntityIdQuestion = question.questionId;
          }
        }));

        qualitySurvey.maxAboutEntityId.question = maxAboutEntityIdQuestion;

        return axios.get(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${id}/last-changeset`);
      })
      .then((lastChangeSet) => {
        qualitySurvey.lastChangeSet = lastChangeSet;
        dispatch(loadQualitySurvey(qualitySurvey, false));
      });
  };
}

function formatQualitySurveyToChangeSet(qualitySurvey) {
  function omitQQId(qualitySurvey) {
    return _.omit(qualitySurvey, 'id');
  }

  function removeDuplicateChange(qualitySurvey) {
    return _.uniqWith(qualitySurvey.lastChangeSet.changeList, _.isEqual);
  }

  function createOrderFormula(qualitySurvey) {
    function createSectionNumberWord(index) {
      return (`S${index + 1},`);
    }

    function createQuestionNumberWord(index) {
      return (`Q${index + 1},`);
    }

    let orderFormula = '';

    const sections = qualitySurvey.qualitySurveyForm;

    sections.forEach((section, index) => {
      orderFormula += createSectionNumberWord(index);
      if (section.questions) {
        section.questions.forEach((question, index) => {
          orderFormula += createQuestionNumberWord(index);
        });
      }
    });

    return orderFormula;
  }

  function groupByQuestions(qualitySurvey) {
    return _.compact(qualitySurvey.qualitySurveyForm
      .map(survey => survey.questions)
      .reduce((arrayOne, arrayTwo) => _.compact(arrayOne.concat(arrayTwo)), [])
      .map((question, index) => ({
        ...question,
        id: qualitySurvey.lastChangeSet.id ? question.id : null,
        questionId: index + 1,
      })));
  }

  function groupBySections(qualitySurvey) {
    const sections = qualitySurvey.qualitySurveyForm;
    return _.compact(sections
      .map((section, index) => ({
        ...section,
        id: qualitySurvey.lastChangeSet.id ? section.id : null,
        sectionId: index + 1,
      })));
  }

  return {
    ...qualitySurvey.lastChangeSet,
    changeList: _.orderBy(removeDuplicateChange(qualitySurvey), 'id'),
    orderFormula: createOrderFormula(qualitySurvey),
    questions: groupByQuestions(qualitySurvey),
    sections: groupBySections(qualitySurvey),
  };
}

export function sendQualitySurvey(qualitySurvey, history) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);

  return (dispatch) => {
    const qualitySurveyGlobalInformations = {
      name: qualitySurveyFormatedForAPI.name,
      description: qualitySurveyFormatedForAPI.description,
    };
    axios.post('/u2m-api/v1/suppliers/template/qualityquestionnaire/', qualitySurveyGlobalInformations)
      .then((qualitySurvey) => {
        const qualitySurveyId = qualitySurvey.id;
        axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/editing`);
        // history.push('/administration')
        return qualitySurveyId;
      })
      .then(qualitySurveyId => new Promise((resolve) => {
        setTimeout(() => {
          resolve(qualitySurveyId);
        }, 500);
      })).then(qualitySurveyId => axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, { ...qualitySurveyFormatedForAPI }))
      .then(result =>
        history.push('/administration'))
      .catch(error => console.log('ERROR', error));
  };
}

export function sendEditingQualitySurvey(qualitySurvey, qualitySurveyId, history) {
  const changeSetFormatedForApi = formatQualitySurveyToChangeSet(qualitySurvey);
  let action;
  if (changeSetFormatedForApi.id) {
    action = 'update-changeset';
  } else {
    action = 'addchangeset';
  }

  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/${action}`, { ...changeSetFormatedForApi })
      .then((result) => {
        dispatch(displayToastr(true, 'Modification enregistrée !', 'success'));
        history.push('/administration');
      }).catch((err) => {
      dispatch(displayToastr(true, 'Impossible de modifier', 'error'));
    });
  };
}

export function editQualitySurvey(survey) {
  axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${survey.id}/editing`)
    .then((response) => {
    }).catch((reject) => {
    console.log(reject);
  });
}

export function publishQualitySurvey(surveyId, history) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
      .then((response) => {
        dispatch(displayToastr(true, 'Publication enregistrée !', 'success'));
        history.push('/administration');
      }).catch((reject) => {
      dispatch(displayToastr(true, 'Impossible de publier', 'error'));
    });
  };
}

export function sendQualitySurveyToSupplier(templateId) {
  return (dispatch) => {
    // axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
    //   .then((response) =>
    //     console.log('RESPOSNEEE', response)
    //   ).catch((reject) =>
    //     console.log('ERRORR', reject)
    //   )
  };
}

export function sendQualitySurveyToSuppliers(selectedContacts, qualitySurveyId) {
  const reorganizeQSSelectedContacts = selectedContacts;
  return (dispatch) => {
    axios.post(`/u2m-api/v1/supplier-action/qq/update?qqIdList=${qualitySurveyId}`, reorganizeQSSelectedContacts)
      .then((response) => {
        dispatch(displayToastr(true, 'Questionnaire Envoyé !', 'success'));
        dispatch(isModalVisible(false));
      }).catch(reject =>
      dispatch(displayToastr(true, 'Impossible d\'envoyer', 'error')));
  };
}

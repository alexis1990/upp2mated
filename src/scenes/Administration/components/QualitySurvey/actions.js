import * as types from '../../actionTypes'
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
    return qualitySurvey.sections
      .map((survey) => {
        return survey.questions
      })
      .reduce((arrayOne, arrayTwo) => {
        return _.compact(arrayOne.concat(arrayTwo));
      }, [])
      .map((question, index) => {
        return { ...question, questionId: index + 1 }
      })
  }

  function groupBySections(qualitySurvey) {
    const sections = qualitySurvey.sections;
    return sections
      .map((section) => {
        return _.omit(section, ['questions']);
      }).map((section, index) => {
        return {
          ...section,
          sectionId: index + 1
        }
      });
  }

  return {
    ...qualitySurvey,
    changeList: removeDuplicateChange(qualitySurvey),
    orderFormula: createOrderFormula(qualitySurvey),
    questions: groupByQuestions(qualitySurvey),
    sections: groupBySections(qualitySurvey),
  }
}

export function sendQualitySurvey(qualitySurvey) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);
  return (dispatch) => {
    const qualitySurveyGlobalInformations = {
      name: qualitySurveyFormatedForAPI.name,
      description: qualitySurveyFormatedForAPI.description,
    }
    axios.post('/u2m-api/v1/suppliers/template/qualityquestionnaire/', qualitySurveyGlobalInformations)
      .then((result) => {
        const qualitySurveyId = result.id;
        axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/editing`);
        return qualitySurveyId;
      })
      .then(id => new Promise(resolve => setTimeout(() => resolve(id), 500)))
      .then((id) => {
        const qualitySurveyId = id;
        return axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, { ...qualitySurveyFormatedForAPI, version: 1 });
      })
      .then((result) => {
        console.log('RESULTTTTTTTT', result)
      })
      .catch((error) => console.log('ERROR', error))
  }
}

export function sendEditingQualitySurvey(qualitySurvey, qualitySurveyId) {
  const qualitySurveyFormatedForAPI = formatQualitySurveyToChangeSet(qualitySurvey);

  axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/editing`)
  .then((result) => {
    return axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, { ...qualitySurveyFormatedForAPI, version: 1 })
  })
  .then((result) =>
    console.log('RESULTTTTTEDITTTT', result)
  )
}

export function editQualitySurvey(survey) {
  axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${survey.id}/editing`).then((response) =>
    console.log('RESPONSEEDIT', response)
  ).catch((reject) =>
    console.log(reject)
    )
}

export function publishQualitySurvey(surveyId) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
      .then((response) =>
        console.log('RESPOSNEEE', response)
      ).catch((reject) =>
        console.log('ERRORR', reject)
      )
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

export function manageSuppliersChoosedToFillQS(supplier) {
  console.log('SUPPPPP', supplier)
  // const suppliersSelected = [];
  // suppliersSelected.concat(supplier)
  return (dispatch) => {
    // axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
    //   .then((response) =>
    //     console.log('RESPOSNEEE', response)
    //   ).catch((reject) =>
    //     console.log('ERRORR', reject)
    //   )
  }
}

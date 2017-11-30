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
    axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyParams.id}/v/${surveyParams.version}`).then((quality_survey) => {
			dispatch(loadQualitySurvey(quality_survey, false));
		}, (errorResponse) => {
			console.log('ERROR', errorResponse)
		})
  }
}

export function sendQualitySurvey(qualitySurvey) {
  
  function createOrderFormula(qualitySurvey) {
    
      function createSectionNumberWord(index) {
        return ('S' + (index + 1) + ",");
      }
    
      function createQuestionNumberWord(index) {
        return ('Q' + (index + 1) + ",");
      }
    
      let orderFormula = '';
    
      const sections = qualitySurvey.sections;
      if(qualitySurvey.hasOwnProperty('sections')) {
        sections.forEach((section, index) => {
          orderFormula += createSectionNumberWord(index);
          if(section.questions) {
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
      return arrayOne.concat(arrayTwo);
    }, [])
    .map((question, index)=> {
      return {...question, questionId: index + 1}
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
        sectionId : index + 1
      } 
    });
  }

  const qualitySurveyFormatedForAPI = { 
    ...qualitySurvey,
    orderFormula: createOrderFormula(qualitySurvey),
    questions: groupByQuestions(qualitySurvey),
    sections: groupBySections(qualitySurvey),
  }

  return (dispatch) => {
    const qualitySurveyGlobalInformations = {
      name: qualitySurveyFormatedForAPI.name,
      description: qualitySurveyFormatedForAPI.description,
    }
    axios.post('/u2m-api/v1/suppliers/template/qualityquestionnaire/', qualitySurveyGlobalInformations)
    .then((result)=>{
      const qualitySurveyId = result.id;
      return axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${qualitySurveyId}/addchangeset`, {...qualitySurveyFormatedForAPI, version:1});      
    })
    .then((result)=>{
      console.log('RESULT', result)
    })
    .catch((error)=>console.log('ERROR', error))
  }
}

export function editQualitySurvey(survey) {
  axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${survey.id}/editing`).then((response) => 
    console.log('RESULT', response)
  ).catch((reject)=> 
    console.log(reject)
  )
}

export function sendEditingQualitySurvey(survey) {
  return (dispatch) => {
    dispatch(sendQualitySurvey())
  }
}

export function publishQualitySurvey(surveyId) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/template/qualityquestionnaire/${surveyId}/publish`)
    .then((response)=> 
      console.log('RESPOSNEEE', response)
    ).catch((reject) => 
      console.log('ERRORR', reject)
    )
  }
}

import _ from 'lodash';
import * as types from './actionTypes';
import axios from '../../axios.config';
import { displayToastr } from '../../components/Toastr/actions';

function loadSuppliers(isLoading, contact) {
  return {
    type: types.LOAD_SUPPLIERS,
    payload: { suppliers: contact, isLoading },
  };
}

function loadSupplier(isLoading, contact) {
  return {
    type: types.LOAD_SUPPLIER,
    payload: { supplier: contact, isLoading },
  };
}

export function fetchSuppliers(pageId) {
  return (dispatch) => {
    dispatch(loadSuppliers(true, { content: [] }));
    axios.get(`/u2m-api/v1/suppliers/?page=${pageId}`)
      .then((response) => {
        dispatch(loadSuppliers(false, response));
      })
      .catch((error) => {
        console.log('ERRORloadSuppliers', error);
      });
  };
}

export function fetchSupplier(id) {
  return (dispatch) => {
    dispatch(loadSupplier(true, { contactPersonList: [] }));
    axios.get(`/u2m-api/v1/suppliers/${id}`)
      .then((response) => {
        dispatch(loadSupplier(false, response));
      })
      .catch((error) => {
        console.log('ERRORloadSupplier', error);
      });
  };
}

export function postSupplier(supplier) {
  return (dispatch) => {
    axios.post('/u2m-api/v1/suppliers/', supplier)
      .then((response) => {
        console.log('POSTRESULT', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loadQualitySurvey(qualitySurvey) {
  return {
    type: types.LOAD_QUALITY_SURVEY_REPLY,
    payload: qualitySurvey,
  };
}

export function getQualitySurvey(supplierId, templateId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/suppliers/qualityquestionnaire/${templateId}/supplierid/${supplierId}`)
      .then((qualitySurveyForm) => {
        return axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${templateId}`)
          .then((details) => {
            dispatch(loadQualitySurvey({
              ...qualitySurveyForm,
              qualitySurveyForm: qualitySurveyForm.content || [],
              details,
            }));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendReply(qualitySurvey, templateId, supplierId) {
  const answersList = {
    answers: _.chain(qualitySurvey.content)
      .map('questions')
      .flatten()
      .reduce((arr, question) => {
        return arr.concat(question.answers.map((answer) => {
          return {
            answer: answer.answer,
            questionId: question.questionId,
          };
        }));
      }, [])
      .value(),
    supplierId: parseInt(supplierId),
    templateId: parseInt(templateId),
    templateIdVersion: 1,
  };

  return (dispatch) => {
    axios.post('/u2m-api/v1/suppliers/qualityquestionnaire/', answersList)
      .then(response => {
        displayToastr(true, 'Réponse envoyée', 'success');

      })
      .catch(error => console.log('ERRRRRRRRRRRRRRR'));
  };
}

export function deleteSupplier(supplierId) {
  return (dispatch) => {
    axios.delete(`/u2m-api/v1/suppliers/${supplierId}?supplierId=${supplierId}`)
      .then((resolve) => {
        dispatch({
          type: types.REMOVE_SUPPLIER,
          payload: supplierId,
        });
      })
      .catch((reject) => console.log('REJJ'));
  };
}

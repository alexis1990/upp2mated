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
    return axios.get(`/u2m-api/v1/suppliers/${id}`)
      .then((response) => {
        dispatch(loadSupplier(false, response));
      })
      .catch((error) => {
        console.log('ERRORloadSupplier', error);
      });
  };
}

export function updateSupplierCard(supplierId, supplierCard, history) {
  return (dispatch) => {
    axios.post(`/u2m-api/v1/suppliers/${supplierId}/update/b`, supplierCard)
      .then((response) => {
        dispatch(displayToastr(true, 'Fiche fournisseur mise à jour', 'success'));
        history.push(`/suppliers/${supplierId}`);
      })
      .catch((error) => {
        dispatch(displayToastr(true, 'Impossible de mettre à jour la fiche fournisseur', 'error'));
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

function mergeContentAndAnswers(content, responses) {
  if (responses.length === 0) {
    return content;
  }

  return content.map(section => ({
    ...section,
    questions: section.questions.map((question) => {
      const answer = responses.filter(response => response.questionId === question.questionId);
      return ({
        ...question,
        answer: answer.length !== 0 ? _.head(answer) : {
          answer: '',
          questionId: question.questionId,
        },
      });
    }),
  }));
}

export function getQualitySurvey(supplierId, templateId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/suppliers/qualityquestionnaire/${templateId}/supplierid/${supplierId}`)
      .then((qualitySurveyForm) => {
        return axios.get(`u2m-api/v1/suppliers/template/qualityquestionnaire/${templateId}`)
          .then((details) => {
            dispatch(loadQualitySurvey({
              ...qualitySurveyForm,
              content: mergeContentAndAnswers(qualitySurveyForm.content, qualitySurveyForm.qualityQuestionnaireResponse.answers),
              details,
            }));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sendReply(qualitySurvey, templateId, supplierId, history, location) {
  const isNewReply = qualitySurvey.lastEditingVersionBySupplier !== qualitySurvey.templatePublishedVersion;
  const answersList = {
    id: isNewReply ? null : qualitySurvey.qualityQuestionnaireResponse.id,
    answers: _.chain(qualitySurvey.content)
      .map('questions')
      .flatten()
      .reduce((arr, question) => arr.concat({
        id: isNewReply ? null : question.answer.id,
        answer: question.answer.answer,
        questionId: question.questionId,
      }), [])
      .value(),
    supplierId: parseInt(supplierId, 10),
    templateId: parseInt(templateId, 10),
    templateIdVersion: qualitySurvey.templatePublishedVersion,
    version: qualitySurvey.qualityQuestionnaireResponse.version || 0,
  };

  console.log(answersList);

  return (dispatch) => {
    return axios.post('/u2m-api/v1/suppliers/qualityquestionnaire/', answersList)
      .then(response => {
        dispatch(displayToastr(true, 'Réponse envoyée', 'success'));
        history.push(location.pathname);
      })
      .catch(error => {
        console.log('ça passe pas ');
        console.log(error);
        dispatch(displayToastr(true, 'Impossible d\'envoyer le questionnaire qualité', 'error'));
      });
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

export function getFinancialHealth(supplierId) {
  return (dispatch) => {
    axios.get(`/u2m-api/v1/suppliers/${supplierId}/financial-health/`)
      .then((resolve) => {
        console.log('RESOLVEEE', resolve);
      })
      .catch((reject) => console.log('REJJ'));
  };
}

export function keepInMemoryActiveTab(tabIndex) {
  return {
    type: types.SUPPLIER_VIEW_ACTIVE_TAB,
    payload: tabIndex,
  };
}

export function addContact(supplierId, contact) {
  return dispatch =>
    axios.post(`/u2m-api/v1/suppliers/${supplierId}/contact`, contact)
      .then((response) => {
        dispatch(displayToastr(true, 'Contact ajouté', 'success'));
      })
      .catch((error) => {
        dispatch(displayToastr(true, 'Impossible d\'ajouter le contact', 'error'));
      });
}

export function updateContact(supplierId, contact) {
  return dispatch =>
    axios.put(`/u2m-api/v1/suppliers/${supplierId}/contact`, contact)
      .then((response) => {
        dispatch(displayToastr(true, 'Contact modifié', 'success'));
      })
      .catch((error) => {
        dispatch(displayToastr(true, 'Impossible de modifier le contact', 'error'));
      });
}

export function removeContact(supplierId, contact) {
  return dispatch =>
    axios.delete(`/u2m-api/v1/suppliers/${supplierId}/contact/${contact.id}`)
      .then((response) => {
        dispatch(displayToastr(true, 'Contact supprimé', 'success'));
        dispatch({
          type: types.REMOVE_SUPPLIER_CONTACT,
          payload: contact.id,
        });
      })
      .catch((error) => {
        dispatch(displayToastr(true, 'Impossible de supprimer le contact', 'error'));
      });
}

export function preloadContact(contact) {
  return {
    type: types.PRELOAD_SUPPLIER_CONTACT,
    payload: contact,
  };
}

import * as types from './actionTypes'
import axios from 'axios'


export function addChangeSetSection(sectionId) {
    return {
      type: types.ADD_CHANGE_SET_SECTION,
      payload: {
          "about": "SECTION",
          "aboutEntityId": sectionId,
          "action": "ADD"
      }
    }
  }

export function addChangeSetQuestion(questionId) {
  return {
    type: types.ADD_CHANGE_SET_QUESTION,
    payload: {
        "about": "QUESTION",
        "aboutEntityId": questionId,
        "action": "ADD"
    }
  }
}
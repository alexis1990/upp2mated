import * as types from './actionTypes'
import axios from 'axios'


export function addChangeSetSection(sectionId) {
    return {
      type: types.ADD_CHANGE_SET_SECTION,
      payload: {
          "about": "SECTION",
          "aboutEntityId": sectionId + 1,
          "action": "ADD"
      }
    }
  }

export function addChangeSetQuestion(questionId) {
  return {
    type: types.ADD_CHANGE_SET_QUESTION,
    payload: {
        "about": "QUESTION",
        "aboutEntityId": questionId + 1,
        "action": "ADD"
    }
  }
}
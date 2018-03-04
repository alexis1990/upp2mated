import * as types from './actionTypes';

export function isModalVisible(mode, name, data) {
  return {
    type: types.VISIBLE_MODAL,
    payload: { mode: mode, name: name, data: data },
  };
}

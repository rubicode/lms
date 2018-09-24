import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, title, content, category, file, student_access) {
  return { type: types.ADD_CHALLENGE_DATA, id, title, content, category, file, student_access }
}

export function editData(id, title, content, category, file, student_access) {
  return { type: types.EDIT_CHALLENGE_DATA, id, title, content, category, file, student_access }
}

export function deleteData(id) {
  return { type: types.DELETE_CHALLENGE_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_CHALLENGE_ALL }
}

export function loadData() {
  return { type: types.LOAD_CHALLENGE_DATA }
}

export function challenge() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}challenge`)
      .end((err, res) => {
        if (err) {
          dispatch(loadChallengeFailure())
        } else {
          dispatch(loadChallengeSuccess(res.body))
        }
      })
  }
}

export function loadChallenge(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}challenge/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadChallengeFailure())
        } else {
          dispatch(loadChallengeSuccess(res.body))
        }
      })
  }
}

export function loadChallengeSuccess(challenge) {
  return { type: types.LOAD_CHALLENGE_SUCCESS, challenge }
}

export function loadChallengeFailure() {
  return { type: types.LOAD_CHALLENGE_FAILURE }
}

export function addChallenge(title, content, category, file, student_access) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, title, content, category, file, student_access))
    return request
      .post(`${types.SERVER_URL}challenge`)
      .type('form')
      .send({ id: id })
      .send({ title: title })
      .send({ content: content })
      .send({ category: category })
      .send({ file: file })
      .send({ student_access: student_access })
      .send({ file: file })
      .end((err, res) => {
        if (err) {
          dispatch(addChallengeFailure());
        } else {
          dispatch(addChallengeSuccess(res.body));
        }
      })
  }
}

export function addChallengeFailure() {
  return { type: types.ADD_CHALLENGE_FAILURE }
}

export function addChallengeSuccess(challenge) {
  return { type: types.ADD_CHALLENGE_SUCCESS, challenge }
}


export function editChallenge(id, title, content, category, file, student_access) {
  return dispatch => {
    dispatch(editData(id, title, content, category, file, student_access))
    return request
      .put(`${types.SERVER_URL}challenge/${id}`)
      .type('form')
      .send({ id: id })
      .send({ title: title })
      .send({ content: content })
      .send({ category: category })
      .send({ file: file })
      .send({ student_access: student_access })
      .end((err, res) => {
        if (err) {
          dispatch(editChallengeFailure());
        } else {
          dispatch(editChallengeSuccess(res.body));
        }
      })
  }
}

export function editChallengeFailure() {
  return { type: types.EDIT_CHALLENGE_FAILURE }
}

export function editChallengeSuccess(challenge) {
  return { type: types.EDIT_CHALLENGE_SUCCESS, challenge }
}


export function deleteChallenge(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}challenge/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteChallengeFailure());
        } else {
          dispatch(deleteChallengeSuccess(res.body));
        }
      })
  }
}

export function deleteChallengeFailure() {
  return { type: types.DELETE_CHALLENGE_FAILURE }
}

export function deleteChallengeSuccess(challenge) {
  return { type: types.DELETE_CHALLENGE_SUCCESS, challenge }
}

import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, name, nim, file) {
  return { type: types.ADD_STUDENT_DATA, id, name, nim, file }
}

export function editData(id, name, nim, file) {
  return { type: types.EDIT_STUDENT_DATA, id, name, nim, file }
}

export function deleteData(id) {
  return { type: types.DELETE_STUDENT_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_STUDENT_ALL }
}

export function loadData() {
  return { type: types.LOAD_STUDENT_DATA }
}

export function sendStudentImage(filess) {
  return dispatch => {
    return request
      .post(`${types.SERVER_URL}upload/send`)
      .send(filess)
      .end((err, res) => {
        if (err) {
          // dispatch(loadStudentFailure())
        } else {
          // dispatch(loadStudentSuccess(res.body))
        }
      })
  }
}

export function student() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}student`)
      .end((err, res) => {
        if (err) {
          dispatch(loadStudentFailure())
        } else {
          dispatch(loadStudentSuccess(res.body))
        }
      })
  }
}

export function loadStudent(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}student/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadStudentFailure())
        } else {
          dispatch(loadStudentSuccess(res.body))
        }
      })
  }
}

export function loadStudentSuccess(student) {
  return { type: types.LOAD_STUDENT_SUCCESS, student }
}

export function loadStudentFailure() {
  return { type: types.LOAD_STUDENT_FAILURE }
}

export function loadStudentID(id) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}student/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadStudentIDFailure())
        } else {
          dispatch(loadStudentIDSuccess(res.body))
        }
      })
  }
}

export function loadStudentIDSuccess(student) {
  return { type: types.LOAD_STUDENT_ID_SUCCESS, student }
}

export function loadStudentIDFailure() {
  return { type: types.LOAD_STUDENT_FAILURE }
}

export function addStudent(name, nim, file) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, name, nim, file))
    return request
      .post(`${types.SERVER_URL}student`)
      .type('form')
      .send({ id: id })
      .send({ name: name })
      .send({ nim: nim })
      .send({ file: file })
      .end((err, res) => {
        if (err) {
          dispatch(addStudentFailure());
        } else {
          dispatch(addStudentSuccess(res.body));
        }
      })
  }
}

export function addStudentFailure() {
  return { type: types.ADD_STUDENT_FAILURE }
}

export function addStudentSuccess(student) {
  return { type: types.ADD_STUDENT_SUCCESS, student }
}


export function editStudent(id, name, nim, file) {
  return dispatch => {
    dispatch(editData(id, name, nim, file))
    return request
      .put(`${types.SERVER_URL}student/${id}`)
      .type('form')
      .send({ name: name })
      .send({ nim: nim })
      .send({ file: file })
      .end((err, res) => {
        if (err) {
          dispatch(editStudentFailure());
        } else {
          dispatch(editStudentSuccess(res.body));
        }
      })
  }
}

export function editStudentFailure() {
  return { type: types.EDIT_STUDENT_FAILURE }
}

export function editStudentSuccess(student) {
  return { type: types.EDIT_STUDENT_SUCCESS, student }
}


export function deleteStudent(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}student/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteStudentFailure());
        } else {
          dispatch(deleteStudentSuccess(res.body));
        }
      })
  }
}

export function deleteStudentFailure() {
  return { type: types.DELETE_STUDENT_FAILURE }
}

export function deleteStudentSuccess(student) {
  return { type: types.DELETE_STUDENT_SUCCESS, student }
}


export function changeChallengeData(id, challenges) {
  return { type: types.CHANGE_CHALLENGE_STUDENT, id, challenges }
}

export function changeChallengeStudent(id, challenges) {
  return dispatch => {
    return request
      .put(`${types.SERVER_URL}student/challenges/${id}`)
      .type('form')
      .send({ challenges: challenges })
      .end((err, res) => {
        if (err) {

        } else {
          
        }
      })
  }
}

export function changeChallengeStudentFailure() {
  return { type: types.EDIT_STUDENT_FAILURE }
}

export function changeChallengeStudentSuccess(student) {
  return { type: types.EDIT_STUDENT_SUCCESS, student }
}
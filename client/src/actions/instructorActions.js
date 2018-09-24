import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, name, gender, contact) {
  return { type: types.ADD_INSTRUCTOR_DATA, id, name, gender, contact }
}

export function editData(id, name, gender, contact) {
  return { type: types.EDIT_INSTRUCTOR_DATA, id, name, gender, contact }
}

export function deleteData(id) {
  return { type: types.DELETE_INSTRUCTOR_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_INSTRUCTOR_ALL }
}

export function loadData() {
  return { type: types.LOAD_INSTRUCTOR_DATA }
}

export function instructor() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}instructor`)
      .end((err, res) => {
        if (err) {
          dispatch(loadInstructorFailure())
        } else {
          dispatch(loadInstructorSuccess(res.body))
        }
      })
  }
}

export function loadInstructor(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}instructor/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadInstructorFailure())
        } else {
          dispatch(loadInstructorSuccess(res.body))
        }
      })
  }
}

export function loadInstructorSuccess(instructor) {
  return { type: types.LOAD_INSTRUCTOR_SUCCESS, instructor }
}

export function loadInstructorFailure() {
  return { type: types.LOAD_INSTRUCTOR_FAILURE }
}

export function addInstructor(name, gender, contact) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, name, gender, contact))
    return request
      .post(`${types.SERVER_URL}instructor`)
      .type('form')
      .send({ id: id })
      .send({ name: name })
      .send({ gender: gender })
      .send({ contact: contact })
      .end((err, res) => {
        if (err) {
          dispatch(addInstructorFailure());
        } else {
          dispatch(addInstructorSuccess(res.body));
        }
      })
  }
}

export function addInstructorFailure() {
  return { type: types.ADD_INSTRUCTOR_FAILURE }
}

export function addInstructorSuccess(instructor) {
  return { type: types.ADD_INSTRUCTOR_SUCCESS, instructor }
}


export function editInstructor(id, name, gender, contact) {
  return dispatch => {
    dispatch(editData(id, name, gender, contact))
    return request
      .put(`${types.SERVER_URL}instructor/${id}`)
      .type('form')
      .send({ name: name })
      .send({ gender: gender })
      .send({ contact: contact })
      .end((err, res) => {
        if (err) {
          dispatch(editInstructorFailure());
        } else {
          dispatch(editInstructorSuccess(res.body));
        }
      })
  }
}

export function editInstructorFailure() {
  return { type: types.EDIT_INSTRUCTOR_FAILURE }
}

export function editInstructorSuccess(instructor) {
  return { type: types.EDIT_INSTRUCTOR_SUCCESS, instructor }
}


export function deleteInstructor(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}instructor/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteInstructorFailure());
        } else {
          dispatch(deleteInstructorSuccess(res.body));
        }
      })
  }
}

export function deleteInstructorFailure() {
  return { type: types.DELETE_INSTRUCTOR_FAILURE }
}

export function deleteInstructorSuccess(instructor) {
  return { type: types.DELETE_INSTRUCTOR_SUCCESS, instructor }
}

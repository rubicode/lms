import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, name, name_company, address, contact) {
  return { type: types.ADD_HIRINGPARTNER_DATA, id, name, name_company, address, contact }
}

export function editData(id, name, name_company, address, contact) {
  return { type: types.EDIT_HIRINGPARTNER_DATA, id, name, name_company, address, contact }
}

export function deleteData(id) {
  return { type: types.DELETE_HIRINGPARTNER_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_HIRINGPARTNER_ALL }
}

export function loadData() {
  return { type: types.LOAD_HIRINGPARTNER_DATA }
}

export function hiringpartner() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}hiringpartner`)
      .end((err, res) => {
        if (err) {
          dispatch(loadHiringpartnerFailure())
        } else {
          dispatch(loadHiringpartnerSuccess(res.body))
        }
      })
  }
}

export function loadHiringpartner(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}hiringpartner/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadHiringpartnerFailure())
        } else {
          dispatch(loadHiringpartnerSuccess(res.body))
        }
      })
  }
}

export function loadHiringpartnerSuccess(hiringpartner) {
  return { type: types.LOAD_HIRINGPARTNER_SUCCESS, hiringpartner }
}

export function loadHiringpartnerFailure() {
  return { type: types.LOAD_HIRINGPARTNER_FAILURE }
}

export function addHiringpartner(name, name_company, address, contact) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, name, name_company, address, contact))
    return request
      .post(`${types.SERVER_URL}hiringpartner`)
      .type('form')
      .send({ id: id })
      .send({ name: name })
      .send({ name_company: name_company })
      .send({ address: address })
      .send({ contact: contact })
      .end((err, res) => {
        if (err) {
          dispatch(addHiringpartnerFailure());
        } else {
          dispatch(addHiringpartnerSuccess(res.body));
        }
      })
  }
}

export function addHiringpartnerFailure() {
  return { type: types.ADD_HIRINGPARTNER_FAILURE }
}

export function addHiringpartnerSuccess(hiringpartner) {
  return { type: types.ADD_HIRINGPARTNER_SUCCESS, hiringpartner }
}


export function editHiringpartner(id, name, name_company, address, contact) {
  return dispatch => {
    dispatch(editData(id, name, name_company, address, contact))
    return request
      .put(`${types.SERVER_URL}hiringpartner/${id}`)
      .type('form')
      .send({ name: name })
      .send({ name_company: name_company })
      .send({ address: address })
      .send({ contact: contact })
      .end((err, res) => {
        if (err) {
          dispatch(editHiringpartnerFailure());
        } else {
          dispatch(editHiringpartnerSuccess(res.body));
        }
      })
  }
}

export function editHiringpartnerFailure() {
  return { type: types.EDIT_HIRINGPARTNER_FAILURE }
}

export function editHiringpartnerSuccess(hiringpartner) {
  return { type: types.EDIT_HIRINGPARTNER_SUCCESS, hiringpartner }
}


export function deleteHiringpartner(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}hiringpartner/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteHiringpartnerFailure());
        } else {
          dispatch(deleteHiringpartnerSuccess(res.body));
        }
      })
  }
}

export function deleteHiringpartnerFailure() {
  return { type: types.DELETE_HIRINGPARTNER_FAILURE }
}

export function deleteHiringpartnerSuccess(hiringpartner) {
  return { type: types.DELETE_HIRINGPARTNER_SUCCESS, hiringpartner }
}

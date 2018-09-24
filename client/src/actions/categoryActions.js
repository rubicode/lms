import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, title) {
  return { type: types.ADD_CATEGORY_DATA, id, title }
}

export function editData(id, title) {
  return { type: types.EDIT_CATEGORY_DATA, id, title }
}

export function deleteData(id) {
  return { type: types.DELETE_CATEGORY_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_CATEGORY_ALL }
}

export function loadData() {
  return { type: types.LOAD_CATEGORY_DATA }
}

export function category() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}category`)
      .end((err, res) => {
        if (err) {
          dispatch(loadCategoryFailure())
        } else {
          dispatch(loadCategorySuccess(res.body))
        }
      })
  }
}

export function loadCategory(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}category/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadCategoryFailure())
        } else {
          dispatch(loadCategorySuccess(res.body))
        }
      })
  }
}

export function loadCategorySuccess(category) {
  return { type: types.LOAD_CATEGORY_SUCCESS, category }
}

export function loadCategoryFailure() {
  return { type: types.LOAD_CATEGORY_FAILURE }
}

export function addCategory(title) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, title))
    return request
      .post(`${types.SERVER_URL}category`)
      .type('form')
      .send({ id: id })
      .send({ title: title })
      .end((err, res) => {
        if (err) {
          dispatch(addCategoryFailure());
        } else {
          dispatch(addCategorySuccess(res.body));
        }
      })
  }
}

export function addCategoryFailure() {
  return { type: types.ADD_CATEGORY_FAILURE }
}

export function addCategorySuccess(category) {
  return { type: types.ADD_CATEGORY_SUCCESS, category }
}


export function editCategory(id, title) {
  return dispatch => {
    dispatch(editData(id, title))
    return request
      .put(`${types.SERVER_URL}category/${id}`)
      .type('form')
      .send({ title: title })
      .end((err, res) => {
        if (err) {
          dispatch(editCategoryFailure());
        } else {
          dispatch(editCategorySuccess(res.body));
        }
      })
  }
}

export function editCategoryFailure() {
  return { type: types.EDIT_CATEGORY_FAILURE }
}

export function editCategorySuccess(category) {
  return { type: types.EDIT_CATEGORY_SUCCESS, category }
}


export function deleteCategory(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}category/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteCategoryFailure());
        } else {
          dispatch(deleteCategorySuccess(res.body));
        }
      })
  }
}

export function deleteCategoryFailure() {
  return { type: types.DELETE_CATEGORY_FAILURE }
}

export function deleteCategorySuccess(category) {
  return { type: types.DELETE_CATEGORY_SUCCESS, category }
}

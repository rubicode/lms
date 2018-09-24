import * as types from './actionTypes';
import request from 'superagent'

export function addData(id, email, password, role, firstname, lastname) {
  return { type: types.ADD_USER_DATA, id, email, password, role, firstname, lastname }
}

export function editData(id, email, role, firstname, lastname, id_user) {
  return { type: types.EDIT_USER_DATA, id, email, role, firstname, lastname, id_user }
}

export function deleteData(id) {
  return { type: types.DELETE_USER_DATA, id }
}

export function deleteAll() {
  return { type: types.DELETE_USER_ALL }
}

export function loadData() {
  return { type: types.LOAD_USER_DATA }
}

export function users() {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}users`)
      .end((err, res) => {
        if (err) {
          dispatch(loadUsersFailure())
        } else {
          dispatch(loadUsersSuccess(res.body))
        }
      })
  }
}

export function loadUsers(skip, limit) {
  return dispatch => {
    dispatch(loadData());
    return request
      .get(`${types.SERVER_URL}users/${skip}/${limit}`)
      .end((err, res) => {
        if (err) {
          dispatch(loadUsersFailure())
        } else {
          dispatch(loadUsersSuccess(res.body))
        }
      })
  }
}

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users }
}

export function loadUsersFailure() {
  return { type: types.LOAD_USER_FAILURE }
}

export function addUsers(email, password, role, firstname, lastname) {
  let id = Date.now()
  return dispatch => {
    dispatch(addData(`${id}`, email, password, role, firstname, lastname))
    return request
      .post(`${types.SERVER_URL}users`)
      .type('form')
      .send({ id: id })
      .send({ email: email })
      .send({ password: password })
      .send({ role: role })
      .send({ firstname: firstname })
      .send({ lastname: lastname })
      .end((err, res) => {
        if (err) {
          dispatch(addUsersFailure());
        } else {
          dispatch(addUsersSuccess(res.body));
        }
      })
  }
}

export function addUsersFailure() {
  return { type: types.ADD_USER_FAILURE }
}

export function addUsersSuccess(users) {
  return { type: types.ADD_USER_SUCCESS, users }
}


export function editUsers(id, email, role, firstname, lastname, id_user) {
  return dispatch => {
    dispatch(editData(id, email, role, firstname, lastname, id_user))
    return request
      .put(`${types.SERVER_URL}users/${id}`)
      .type('form')
      .send({ email: email })
      .send({ role: role })
      .send({ firstname: firstname })
      .send({ lastname: lastname })
      .send({ id_user: id_user })
      .end((err, res) => {
        if (err) {
          dispatch(editUsersFailure());
        } else {
          dispatch(editUsersSuccess(res.body));
        }
      })
  }
}

export function editUsersFailure() {
  return { type: types.EDIT_USER_FAILURE }
}

export function editUsersSuccess(users) {
  return { type: types.EDIT_USER_SUCCESS, users }
}

export function editUsersPasswordModal(modal) {
  return dispatch => {
    if (modal) {
      dispatch(editUsersPasswordModalExe(modal))
    } else {
      dispatch(editUsersPasswordSuccess({ message: '' }))
      dispatch(editUsersPasswordModalExe(modal))
    }
  }
}

export function editUsersPasswordModalExe(modal) {
  return { type: types.EDIT_USER_PASSWORD_MODAL, modal }
}

export function editUsersPassword(id, oldPassword, newPassword) {
  return dispatch => {
    if (!oldPassword || !newPassword) {
      dispatch(editUsersPasswordSuccess({ message: 'Please enter all value' }));
    } else {
      return request
        .put(`${types.SERVER_URL}api/forgot_password/${id}`)
        .type('form')
        .send({ id: id })
        .send({ oldPassword: oldPassword })
        .send({ newPassword: newPassword })
        .end((err, res) => {
          if (err) {
            dispatch(editUsersPasswordSuccess({ message: 'error server!' }));
          } else {
            dispatch(editUsersPasswordSuccess(res.body));
            if (res.body.status)
              setTimeout(function () {
                dispatch(editUsersPasswordSuccess({ message: '' }));
                dispatch(editUsersPasswordModal(false));
              }, 1000);
          }
        })
    }
  }
}

export function newPassword(id, newPassword) {
  return dispatch => {
    if (!newPassword) {
      dispatch(editUsersPasswordSuccess({ message: 'Please enter value' }));
    } else {
      return request
        .put(`${types.SERVER_URL}api/new_password/${id}`)
        .type('form')
        .send({ newPassword: newPassword })
        .end((err, res) => {
          if (err) {
            dispatch(editUsersPasswordSuccess({ message: 'error server!' }));
          } else {
            dispatch(editUsersPasswordSuccess(res.body));
            if (res.body.status)
              setTimeout(function () {
                dispatch(editUsersPasswordSuccess({ message: '' }));
                dispatch(editUsersPasswordModal(false));
              }, 1000);
          }
        })
    }
  }
}

export function editUsersPasswordSuccess(users) {
  return { type: types.EDIT_USER_PASSWORD, users }
}


export function deleteUsers(id) {
  return dispatch => {
    dispatch(deleteData(id))
    return request
      .delete(`${types.SERVER_URL}users/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch(deleteUsersFailure());
        } else {
          dispatch(deleteUsersSuccess(res.body));
        }
      })
  }
}

export function deleteUsersFailure() {
  return { type: types.DELETE_USER_FAILURE }
}

export function deleteUsersSuccess(users) {
  return { type: types.DELETE_USER_SUCCESS, users }
}

import * as types from './actionTypes';
import request from 'superagent'
import { errorHandler } from './index';

export function registerUser({ email, firstname, lastname, password }) {
    return dispatch => {
        if (!email || !firstname || !lastname || !password) {
            dispatch(editPasswordSuccess({ message: 'Please enter all value' }))
            setTimeout(function () {
                dispatch(editPasswordSuccess({ message: '' }));
            }, 2500);
        } else {
            let id = Date.now()
            return request
                .post(`${types.SERVER_URL}api/register`)
                .type('form')
                .send({ id: id })
                .send({ email: email })
                .send({ firstname: firstname })
                .send({ lastname: lastname })
                .send({ password: password })
                .end((err, res) => {
                    if (err) {
                        dispatch(editPasswordSuccess({ message: 'server error.' }))
                        setTimeout(function () {
                            dispatch(editPasswordSuccess({ message: '' }));
                        }, 2500);
                    } else {
                        if (res.body.status) {
                            localStorage.setItem('lms', JSON.stringify({ token: res.body.token, user: res.body.user }));
                            dispatch({ type: types.AUTH_USER });
                            window.location.href = `${types.CLIENT_ROOT_URL}dashboard`;
                        } else {
                            dispatch(editPasswordSuccess({ message: res.body.message }))
                            setTimeout(function () {
                                dispatch(editPasswordSuccess({ message: '' }));
                            }, 2500);
                        }
                    }
                })
        }
    }
}


export function loginUser({ email, password }) {
    return dispatch => {
        if (!email || !password) {
            dispatch(editPasswordSuccess({ message: 'Please enter all value' }))
            setTimeout(function () {
                dispatch(editPasswordSuccess({ message: '' }));
            }, 2500);
        } else {
            return request
                .post(`${types.SERVER_URL}api/login`)
                .type('form')
                .send({ email: email })
                .send({ password: password })
                .end((err, res) => {
                    if (err) {
                        dispatch(editPasswordSuccess({ message: 'wrong password, try again' }))
                        setTimeout(function () {
                            dispatch(editPasswordSuccess({ message: '' }));
                        }, 2500);
                    } else {
                        localStorage.setItem('lms', JSON.stringify({ token: res.body.token, user: res.body.user }));
                        dispatch({ type: types.AUTH_USER });
                        window.location.href = `${types.CLIENT_ROOT_URL}dashboard`;
                    }
                })
        }
    }
}

export function logoutUser(error) {
    return dispatch => {
        dispatch({ type: types.UNAUTH_USER, payload: error || '' });
        localStorage.setItem('lms', JSON.stringify({}));

        window.location.href = `${types.CLIENT_ROOT_URL}login`;
    };
}


function stripTrailingSlash(url) {
    const array = url.split('/');

    const lastsegment = array[array.length - 1];
    return lastsegment;
}

export function cek() {
    const getUrl = stripTrailingSlash(window.location.href);
    let token = localStorage.getItem('lms') && JSON.parse(localStorage.getItem('lms')).token ? JSON.parse(localStorage.getItem('lms')).token : null;

    return dispatch => {
        return request
            .post(`${types.SERVER_URL}api/cek`)
            .type('form')
            .send({ token: token })
            .end((err, res) => {
                if (err) {
                    if (getUrl === 'login' || getUrl === 'registration' || getUrl === 'forgot_password') {
                    } else {
                        localStorage.setItem('lms', JSON.stringify({}));
                        window.location.href = `${types.CLIENT_ROOT_URL}login`;
                    }
                } else {
                    if (res.body.status) {
                        if (getUrl === 'login' || getUrl === 'registration' || getUrl === 'forgot_password') {
                            if (res.body.role === 'student' || res.body.role === 'admin' || res.body.role === 'instructor' || res.body.role === 'hiringpartner') {
                                localStorage.setItem('lms', JSON.stringify(res.body.newToken));
                                window.location.href = `${types.CLIENT_ROOT_URL}dashboard`;
                            }
                        } else {
                            if (res.body.role === 'student' || res.body.role === 'admin' || res.body.role === 'instructor' || res.body.role === 'hiringpartner') {
                                localStorage.setItem('lms', JSON.stringify(res.body.newToken));
                            } else {
                                localStorage.setItem('lms', JSON.stringify({}));
                                window.location.href = `${types.CLIENT_ROOT_URL}login`;
                            }
                        }
                    } else {
                        localStorage.setItem('lms', JSON.stringify(res.body.newToken));
                        if (getUrl === 'login' || getUrl === 'registration' || getUrl === 'forgot_password') {
                        } else {
                            window.location.href = `${types.CLIENT_ROOT_URL}login`;
                        }
                    }
                }
            })
    }
}


export function editPasswordModal(modal) {
    return dispatch => {
        if (modal) {
            dispatch(editPasswordModalExe(modal))
        } else {
            dispatch(editPasswordSuccess({ message: '' }))
            dispatch(editPasswordModalExe(modal))
        }
    }
}

export function editPasswordModalExe(modal) {
    return { type: types.EDIT_PASSWORD_MODAL, modal }
}

export function editPassword(id, oldPassword, newPassword) {
    return dispatch => {
        if (!oldPassword || !newPassword) {
            dispatch(editPasswordSuccess({ message: 'Please enter all value' }))
            setTimeout(function () {
                dispatch(editPasswordSuccess({ message: '' }));
            }, 2500);
        } else {
            return request
                .put(`${types.SERVER_URL}api/forgot_password/${id}`)
                .type('form')
                .send({ id: id })
                .send({ oldPassword: oldPassword })
                .send({ newPassword: newPassword })
                .end((err, res) => {
                    if (err) {
                        dispatch(editPasswordSuccess({ message: 'error server!' }));
                        setTimeout(function () {
                            dispatch(editPasswordSuccess({ message: '' }));
                        }, 2500);
                    } else {
                        dispatch(editPasswordSuccess(res.body));
                        if (res.body.status)
                            setTimeout(function () {
                                dispatch(editPasswordSuccess({ message: '' }));
                                dispatch(editPasswordModal(false));
                            }, 1000);
                    }
                })
        }
    }
}

export function newPassword(id, newPassword) {
    return dispatch => {
        if (!newPassword) {
            dispatch(editPasswordSuccess({ message: 'Please enter value' }))
            setTimeout(function () {
                dispatch(editPasswordSuccess({ message: '' }));
            }, 2500);
        } else {
            return request
                .put(`${types.SERVER_URL}api/new_password/${id}`)
                .type('form')
                .send({ newPassword: newPassword })
                .end((err, res) => {
                    if (err) {
                        dispatch(editPasswordSuccess({ message: 'error server!' }));
                        setTimeout(function () {
                            dispatch(editPasswordSuccess({ message: '' }));
                        }, 2500);
                    } else {
                        dispatch(editPasswordSuccess(res.body));
                        if (res.body.status)
                            setTimeout(function () {
                                dispatch(editPasswordSuccess({ message: '' }));
                                dispatch(editPasswordModal(false));
                                window.location.href = `${types.CLIENT_ROOT_URL}login`;
                            }, 1000);
                    }
                })
        }
    }
}

export function editPasswordSuccess(users) {
    return { type: types.EDIT_PASSWORD, users }
}
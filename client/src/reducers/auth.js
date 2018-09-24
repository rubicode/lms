import * as types from '../actions/actionTypes';

const INITIAL_STATE = { error: '', message: '', modal: false, content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.AUTH_USER:
            return { ...state, error: '', message: '', authenticated: true };
        case types.UNAUTH_USER:
            return { ...state, authenticated: false, error: action.payload };
        case types.AUTH_ERROR:
            return { ...state, error: action.payload };
        case types.FORGOT_PASSWORD_REQUEST:
            return { ...state, message: action.payload.message };
        case types.RESET_PASSWORD_REQUEST:
            return { ...state, message: action.payload.message };
        case types.PROTECTED_TEST:
            return { ...state, content: action.payload.message };
        case types.EDIT_PASSWORD_MODAL:
            return { ...state, modal: action.modal };
        case types.EDIT_PASSWORD:
            return { ...state, message: action.users.message };
    }

    return state;
}

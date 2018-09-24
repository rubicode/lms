import * as types from '../actions/actionTypes';

const initialState = { password: { modal: false, message: '' }, data: [] };

export default function users(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_USER_DATA:
            return state

        case types.LOAD_USER_SUCCESS:
            let dataAdd = state.data
            return { ...state, data: [...dataAdd, ...action.users] }

        case types.LOAD_USER_FAILURE:
        case types.ADD_USER_FAILURE:
        case types.EDIT_USER_FAILURE:
            return state

        case types.ADD_USER_DATA:
            return {
                ...state, data: [...state.data, {
                    id: action.id,
                    email: action.email,
                    password: action.password,
                    role: action.role,
                    firstname: action.firstname,
                    lastname: action.lastname,
                    id_user: action.id_user
                }]
            }

        case types.ADD_USER_SUCCESS:
            let users = state.data
            let idObject = users.findIndex(x => x.id === action.users.id)
            if (idObject === -1) {
                return state
            } else {
                return { data: action.users, ...state }
            }

        case types.EDIT_USER_DATA:
            let dataEdit = state.data
            let res = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.email = action.email;
                    x.password = action.password;
                    x.role = action.role;
                    x.firstname = action.firstname;
                    x.lastname = action.lastname;
                    x.id_user = action.id_user;
                }
                return x;
            });
            return { ...state, data: res }

        case types.EDIT_USER_SUCCESS:
            return state

        case types.EDIT_USER_PASSWORD_MODAL:
            return { ...state, password: { ...state.password, modal: action.modal } }

        case types.EDIT_USER_PASSWORD:
            return { ...state, password: { ...state.password, message: action.users.message } }

        case types.DELETE_USER_DATA:
            let dataDel = state.data;
            return { ...state, data: dataDel.filter(data => data.id !== action.id) }

        case types.DELETE_USER_ALL:
            return []

        default:
            return state

    }
}


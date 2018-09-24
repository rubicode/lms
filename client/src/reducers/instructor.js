import * as types from '../actions/actionTypes';

const initialState = [];

export default function instructor(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_INSTRUCTOR_DATA:
            return state

        case types.LOAD_INSTRUCTOR_SUCCESS:
            return [...state, ...action.instructor]

        case types.LOAD_INSTRUCTOR_FAILURE:
        case types.ADD_INSTRUCTOR_FAILURE:
        case types.EDIT_INSTRUCTOR_FAILURE:
            return state

        case types.ADD_INSTRUCTOR_DATA:
            return [
                {
                    id: action.id,
                    name: action.name,
                    gender: action.gender,
                    contact: action.contact
                },
                ...state
            ]

        case types.ADD_INSTRUCTOR_SUCCESS:
            let dataAdd = state
            let add = dataAdd.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.gender = action.gender;
                    x.contact = action.contact;
                }
                return x;
            });
            return add

        case types.EDIT_INSTRUCTOR_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { name: action.name, gender: action.gender, contact: action.contact }) : data)

        case types.EDIT_INSTRUCTOR_SUCCESS:
            let dataEdit = state
            let edit = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.gender = action.gender;
                    x.contact = action.contact;
                }
                return x;
            });
            return edit


        case types.DELETE_INSTRUCTOR_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_INSTRUCTOR_ALL:
            return []

        default:
            return state

    }
}


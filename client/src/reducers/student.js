import * as types from '../actions/actionTypes';

const initialState = [];

export default function student(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_STUDENT_DATA:
            return state

        case types.LOAD_STUDENT_SUCCESS:
            return [...state, ...action.student]

        case types.LOAD_STUDENT_ID_SUCCESS:
            return [action.student]

        case types.LOAD_STUDENT_FAILURE:
        case types.ADD_STUDENT_FAILURE:
        case types.EDIT_STUDENT_FAILURE:
            return state

        case types.ADD_STUDENT_DATA:
            return [
                {
                    id: action.id,
                    name: action.name,
                    nim: action.nim,
                    file: action.name + action.nim
                },
                ...state
            ]

        case types.ADD_STUDENT_SUCCESS:
            let dataAdd = state
            let add = dataAdd.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.nim = action.nim;
                    x.file = action.name + action.nim;
                }
                return x;
            });
            return add

        case types.EDIT_STUDENT_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { name: action.name, nim: action.nim, file: action.name + action.nim }) : data)

        case types.CHANGE_CHALLENGE_STUDENT:
            let dataEdit = state
            let edit = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.nim = action.nim;
                    x.file = action.name + action.nim;
                }
                return x;
            });
            return edit

        case types.EDIT_STUDENT_SUCCESS:
            return state


        case types.DELETE_STUDENT_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_STUDENT_ALL:
            return []

        default:
            return state

    }
}


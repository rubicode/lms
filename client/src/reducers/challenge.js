import * as types from '../actions/actionTypes';

const initialState = [];

export default function challenge(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_CHALLENGE_DATA:
            return state

        case types.LOAD_CHALLENGE_SUCCESS:
            return [...state, ...action.challenge]

        case types.LOAD_CHALLENGE_FAILURE:
        case types.ADD_CHALLENGE_FAILURE:
        case types.EDIT_CHALLENGE_FAILURE:
            return state

        case types.ADD_CHALLENGE_DATA:
            return [
                {
                    id: action.id,
                    title: action.title,
                    content: action.content,
                    category: action.category,
                    file: action.id,
                    student_access: JSON.parse('[]')
                },
                ...state
            ]

        case types.ADD_CHALLENGE_SUCCESS:
            let dataAdd = state
            let add = dataAdd.map(function (x) {
                if (x.id === action.id) {
                    x.title = action.title;
                    x.content = action.content;
                    x.category = action.category;
                    x.file = action.id;
                    x.student_access = JSON.parse(action.student_access);
                }
                return x;
            });
            return add

        case types.EDIT_CHALLENGE_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { title: action.title, content: action.content, category: action.category, file: action.id, student_access: JSON.parse(action.student_access) }) : data)

        case types.EDIT_CHALLENGE_SUCCESS:
            let dataEdit = state
            let edit = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.title = action.title;
                    x.content = action.content;
                    x.category = action.category;
                    x.file = action.id;
                    x.student_access = JSON.parse(action.student_access);
                }
                return x;
            });
            return edit


        case types.DELETE_CHALLENGE_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_CHALLENGE_ALL:
            return []

        default:
            return state

    }
}


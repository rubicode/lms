import * as types from '../actions/actionTypes';

const initialState = [];

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_CATEGORY_DATA:
            return state

        case types.LOAD_CATEGORY_SUCCESS:
            return [...state, ...action.category]

        case types.LOAD_CATEGORY_FAILURE:
        case types.ADD_CATEGORY_FAILURE:
        case types.EDIT_CATEGORY_FAILURE:
            return state

        case types.ADD_CATEGORY_DATA:
            return [
                {
                    id: action.id,
                    title: action.title
                },
                ...state
            ]

        case types.ADD_CATEGORY_SUCCESS:
            let dataAdd = state
            let add = dataAdd.map(function (x) {
                if (x.id === action.id) {
                    x.title = action.title;
                }
                return x;
            });
            return add

        case types.EDIT_CATEGORY_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { title: action.title }) : data)

        case types.EDIT_CATEGORY_SUCCESS:
            let dataEdit = state
            let edit = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.title = action.title;
                }
                return x;
            });
            return edit


        case types.DELETE_CATEGORY_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_CATEGORY_ALL:
            return []

        default:
            return state

    }
}


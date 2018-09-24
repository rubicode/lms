import * as types from '../actions/actionTypes';

const initialState = [];

export default function hiringpartner(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_HIRINGPARTNER_DATA:
            return state

        case types.LOAD_HIRINGPARTNER_SUCCESS:
            return [...state, ...action.hiringpartner]

        case types.LOAD_HIRINGPARTNER_FAILURE:
        case types.ADD_HIRINGPARTNER_FAILURE:
        case types.EDIT_HIRINGPARTNER_FAILURE:
            return state

        case types.ADD_HIRINGPARTNER_DATA:
            return [
                {
                    id: action.id,
                    name: action.name,
                    name_company: action.name_company,
                    address: action.address,
                    contact: action.contact
                },
                ...state
            ]

        case types.ADD_HIRINGPARTNER_SUCCESS:
            let dataAdd = state
            let add = dataAdd.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.name_company = action.name_company;
                    x.address = action.address;
                    x.contact = action.contact;
                }
                return x;
            });
            return add

        case types.EDIT_HIRINGPARTNER_DATA:
            return state.map(data => data.id === action.id ? Object.assign({}, data, { name: action.name, name_company: action.name_company, address: action.address, contact: action.contact }) : data)

        case types.EDIT_HIRINGPARTNER_SUCCESS:
            let dataEdit = state
            let edit = dataEdit.map(function (x) {
                if (x.id === action.id) {
                    x.name = action.name;
                    x.name_company = action.name_company;
                    x.address = action.address;
                    x.contact = action.contact;
                }
                return x;
            });
            return edit


        case types.DELETE_HIRINGPARTNER_DATA:
            return state.filter(data => data.id !== action.id)

        case types.DELETE_HIRINGPARTNER_ALL:
            return []

        default:
            return state

    }
}


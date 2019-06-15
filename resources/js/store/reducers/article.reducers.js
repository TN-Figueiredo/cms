import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    id: null,
    title: null,
    body: null,
    loading: false,
    created_at: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_ARTICLES:
            return updateObject(state, { loading: true })
        case actionTypes.GET_ALL_ARTICLES_ERROR:
            return updateObject(state, { error: true })
        default:
            return state;
    }
}

export default reducer;
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    article: null,
    links: null,
    meta: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ARTICLES:
            return updateObject(state, {
                article: action.article,
                links: action.links,
                meta: action.meta
            });
        case actionTypes.GET_ALL_ARTICLES_ERROR:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;

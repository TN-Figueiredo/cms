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
        case actionTypes.GET_ALL_ARTICLES_SUCCESS:
            return updateObject(state, {
                article: action.article,
                links: action.links,
                meta: action.meta
            });
        case actionTypes.GET_ALL_ARTICLES_ERROR:
            return updateObject(state, { error: true });
        case actionTypes.POST_NEW_ARTICLE_SUCCESS:
            return postNewArticleSuccess(state, action);
        case actionTypes.POST_NEW_ARTICLE_ERROR:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

const postNewArticleSuccess = (state, action) => {
    const newPost = { ...state };
    // Remove last article from the array
    newPost.article.pop();
    // Add new article to the first position
    newPost.article.unshift(action.newArticle);
    // Add +1 to the total articles
    newPost.meta.total++;
    return updateObject(state, { newPost });
};

export default reducer;

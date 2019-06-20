// API
import * as articleAPI from "../../api/article.api";

// Actions
import * as actionTypes from "./actionTypes";

// Get All Articles
export const fetchAllArticles = () => {
    return async dispatch => {
        let response;

        try {
            response = await articleAPI.getAllArticles();
        } catch (error) {
            console.log(error);
            return dispatch({ type: actionTypes.GET_ALL_ARTICLES_ERROR });
        }
        return dispatch({
            type: actionTypes.GET_ALL_ARTICLES_SUCCESS,
            article: response.data.data,
            links: response.data.links,
            meta: response.data.meta
        });
    };
};

// Post New Article
export const addNewArticle = data => {
    return async dispatch => {
        let response;
        try {
            response = await articleAPI.postNewArticle(data);
        } catch (error) {
            console.log(error);
            return dispatch({ type: actionTypes.POST_NEW_ARTICLE_ERROR });
        }
        fetchAllArticles();
        return dispatch({
            type: actionTypes.POST_NEW_ARTICLE_SUCCESS,
            newArticle: response.data
        });
    };
};

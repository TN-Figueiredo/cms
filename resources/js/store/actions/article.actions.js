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
        console.log(response);
        return dispatch({
            type: actionTypes.GET_ALL_ARTICLES,
            article: response.data
        });
    };
};

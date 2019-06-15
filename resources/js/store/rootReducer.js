import { combineReducers } from "redux";

// Reducers
import authReducer from "./reducers/auth.reducers";
import articleReducer from "./reducers/article.reducers";

export const rootReducer = combineReducers({
    auth: authReducer,
    article: articleReducer
});
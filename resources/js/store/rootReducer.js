import { combineReducers } from "redux";

// Reducers
import authReducer from "./reducers/auth";

export const rootReducer = combineReducers({
    auth: authReducer
});
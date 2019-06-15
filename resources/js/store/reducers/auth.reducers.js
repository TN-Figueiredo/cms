import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: "teste",
    userId: "001",
    permission: 5,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return state;
        default:
            return state;
    }
}

export default reducer;
import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
    loggedIn: false,
    user: {}
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                user: payload.user
            };
        case LOGOUT_USER:
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        default:
            return state;
    }
}

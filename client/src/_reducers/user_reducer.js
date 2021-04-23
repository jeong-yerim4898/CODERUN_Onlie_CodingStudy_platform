import { LOGIN_USER, SIGNUP_USER } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login: action.payload };
        case SIGNUP_USER:
            return { ...state, signup: action.payload };
        default:
            return state;
    }
}

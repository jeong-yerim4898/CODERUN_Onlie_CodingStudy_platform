import axios from 'axios';
import { LOGIN_USER, SIGNUP_USER } from './types';
import { SERVER } from 'Config.js';

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${SERVER}/api/login`, dataToSubmit)
        .then(res => res.data)
        .catch(err => console.log(err));
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function signupUser(dataToSumbmit) {
    const request = axios
        .post(`${SERVER}/api/signup`, dataToSumbmit)
        .then(res => res.data)
        .catch(err => console.log(err));
    return {
        type: SIGNUP_USER,
        payload: request,
    };
}

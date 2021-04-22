import axios from 'axios';
import { SERVER } from 'Config.js';

export function signupUser(user_info) {
    return axios.post(`${SERVER}/api/signup`, user_info);
}

export function loginUser(user_info) {
    return axios.post(`${SERVER}/api/login`, user_info);
}

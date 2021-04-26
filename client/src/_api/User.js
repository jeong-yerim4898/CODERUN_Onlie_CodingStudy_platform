import axios from 'axios';
import { SERVER } from 'Config.js';

// 인증메일이 가지 않으면 다시요청
export function redirectEmail(email) {
    return axios.get(`${SERVER}/api/emailconfirm/message/${email}`);
}
// 이메일 중복 확인
export function checkEmail(email) {
    return axios.get(`${SERVER}/api/emailcheck/${email}`);
}

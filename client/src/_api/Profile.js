import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

export function fetchProfileImage(user_id) {
    return axios.get(`${SERVER}/image/profile/${user_id}`);
}

export function createProfileImage(user_id, data) {
    return axios.post(`${SERVER}/image/profile/create/${user_id}`, data, {
        headers: { token: ACCESS_TOKEN, 'Content-Type': 'multipart/form-data' },
    });
}

// 유저 이미지 삭제하기
export function deleteProfileImage(user_id) {
    return axios.delete(`${SERVER}/image/profile/delete/${user_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

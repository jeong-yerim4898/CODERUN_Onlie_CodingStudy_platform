import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 유저 이미지 가져오기
export function fetchProfileImage(user_id) {
    return axios.get(`${SERVER}/image/profile/${user_id}`);
}

// 유저 이미지 업로드하기
export function createProfileImage(user_id) {
    return axios.post(`${SERVER}/image/profile/create/${user_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

// 유저 이미지 삭제하기
export function deleteProfileImage(user_id) {
    return axios.delete(`${SERVER}/image/profile/delete/${user_id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

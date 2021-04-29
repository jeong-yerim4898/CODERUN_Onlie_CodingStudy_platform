import axios from 'axios';
import { SERVER } from 'Config.js';

// 유저 이미지 가져오기
export function fetchProfileImage(user_id) {
    return axios.get(`${SERVER}/image/profile/${user_id}`);
}

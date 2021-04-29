import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 글쓰기
export function createArticle(data) {
    return axios.post(`${SERVER}/api/board`, data, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function detailArticle(id) {
    return axios.get(`${SERVER}/api/board/detail/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

export function deleteArticle(id) {
    return axios.delete(`${SERVER}/api/board/delete/${id}`, {
        headers: { token: ACCESS_TOKEN },
    });
}

import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

// 비디오 업로드 (내용)
export function postVideoContentUpload(video_info) {
    return axios.post(`${SERVER}/api/video/create`, video_info, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

// 비디오 업로드 (비디오)
export function postVideoUpload(video_id, file_extension, video_info) {
    return axios.post(`${SERVER}/video/create/${video_id}/${file_extension}`, video_info, {
        headers: { token: `${ACCESS_TOKEN}`, 'Content-Type': 'multipart/form-data' },
    });
}
// 비디오 디테일 보기
export function fetchVideoDetail(video_id) {
    return axios.get(`${SERVER}/api/video/detail/${video_id}`, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}
// 비디오 좋아요 post
export function postVideoLike(video_id) {
    return axios.post(`${SERVER}/api/video/${video_id}`, '', {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

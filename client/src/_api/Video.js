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

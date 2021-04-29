import axios from 'axios';
import { SERVER, ACCESS_TOKEN } from 'Config.js';

export function postVideoUpload(video_info) {
    return axios.post(`${SERVER}/api/video/create`, video_info, {
        headers: { token: `${ACCESS_TOKEN}` },
    });
}

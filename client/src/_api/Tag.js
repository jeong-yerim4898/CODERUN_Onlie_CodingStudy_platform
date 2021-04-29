import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchLanguageTag() {
    return axios.get(`${SERVER}/api/tag/language`);
}
export function fetchAlgorithmTag() {
    return axios.get(`${SERVER}/api/tag/algorithm`);
}
export function fetchCSTag() {
    return axios.get(`${SERVER}/api/tag/subject`);
}

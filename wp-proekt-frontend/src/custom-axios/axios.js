import axios from 'axios';
import LocalStorageService from '../services/localStorageService';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});

instance.interceptors.request.use(
    config => {
        const token = LocalStorageService.getToken();
        if(token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    }, error => {
        Promise.reject(error);
    }
);

export default instance;

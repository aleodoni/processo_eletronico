import axios from 'axios';
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL+'/spa2-api/',
    headers: {
        common: {
            'authorization': sessionStorage.getItem('token'),
            'usuario': sessionStorage.getItem('usuario'),
        },
        post: {
            'Content-Type': 'application/json',
        },
    },
});
instance.interceptors.request.use(
    request => {
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.data.error === 'Token inválido.') {
            alert('Sua sessão expirou.');
            window.location.href = '/processo-eletronico';
        }
        return Promise.reject(error);
    }
);

export default instance;

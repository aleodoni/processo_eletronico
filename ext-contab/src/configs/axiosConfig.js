import axios from 'axios';

require('dotenv').config();

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
        common: {
            authorization: sessionStorage.getItem('token'),
            usuario: sessionStorage.getItem('usuario'),
            nomeUsuario: sessionStorage.getItem('nomeUsuario'),
            areaUsuario: sessionStorage.getItem('areaUsuario'),
            setorUsuario: sessionStorage.getItem('setorUsuario'),
        },
        post: {
            'Content-Type': 'application/json',
        },
    },
});
instance.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.log(error);
        if (error.response.data.error === 'Token inválido.') {
            // eslint-disable-next-line no-alert
            alert('Sua sessão expirou.');
            window.location.href = '/processo-eletronico-ext-contab';
        }
        return Promise.reject(error);
    }
);

export default instance;

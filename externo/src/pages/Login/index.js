import React, { useState, useEffect, useRef } from 'react';
import { FaKey } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Logo from '../../assets/brasao.png';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/button/Button';

import api from '../../service/api';

import { Centro, Versao } from './styles';

require('dotenv').config();

function Login() {
    const [bd, setBd] = useState('');
    const history = useHistory();
    const formRef = useRef(null);

    function limparSessao() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('nomeUsuario');
        sessionStorage.removeItem('areaUsuario');
        sessionStorage.removeItem('setorUsuario');
        sessionStorage.removeItem('nomeSetorUsuario');
        sessionStorage.removeItem('nomeAreaUsuario');
        sessionStorage.removeItem('orgao');
        sessionStorage.removeItem('permissoes');
    }

    useEffect(() => {
        async function nomeBd() {
            try {
                const response = await api.get('/bd');

                if (response.data.bd === 'des' || response.data.bd === 'postgres') {
                    setBd(`Desenvolvimento - versão:${response.data.versao}`);
                } else if (response.data.bd === 'pro') {
                    setBd(`Produção - versão:${response.data.versao}`);
                } else {
                    setBd(`${response.data.bd} - versão:${response.data.versao}`);
                }
            } catch (err) {
                setBd(`Não conectado`);
            }
        }
        nomeBd();
    }, []);

    async function logar(data) {
        console.log('logando...');

        limparSessao();

        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                login: Yup.string().required('O usuário é obrigatório'),
                senha: Yup.string().required('A senha é obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            try {
                const { login, senha, timeout } = data;

                const response = await api.post('/autorizacao-externa', {
                    login,
                    senha,
                    timeout,
                });

                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('usuario', response.data.usuario);
                sessionStorage.setItem('nomeUsuario', response.data.nomeUsuario);
                sessionStorage.setItem('areaUsuario', response.data.areaUsuario);
                sessionStorage.setItem('setorUsuario', response.data.setorUsuario);
                sessionStorage.setItem('nomeSetorUsuario', response.data.nomeSetorUsuario);
                sessionStorage.setItem('nomeAreaUsuario', response.data.nomeAreaUsuario);
                sessionStorage.setItem('orgao', response.data.orgao);
                sessionStorage.setItem('permissoes', response.data.permissoes);

                history.push('/home');
            } catch (err) {
                toast.error(`Falha na autenticação - ${err.response.data.error}`);
            }
        } catch (err) {
            const validationErrors = {};

            toast.error(`Erro de validação - Verifique Usuário e Senha.`);

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    }

    return (
        <>
            <Centro>
                <Form ref={formRef} onSubmit={logar}>
                    <img src={Logo} alt="Câmara Municipal de Curitiba" />
                    <span>Processo eletrônico</span>
                    <div>Acesso externo</div>

                    <Input type="text" name="login" placeholder="Usuário" />

                    <Input type="password" name="senha" placeholder="Senha" />

                    <Input type="hidden" id="timeout" name="timeout" value="1440" />
                    <Button type="submit">
                        <FaKey color="#FFF" />
                        Acessar
                    </Button>

                    <Versao>{bd}</Versao>
                </Form>
            </Centro>
        </>
    );
}
export default Login;

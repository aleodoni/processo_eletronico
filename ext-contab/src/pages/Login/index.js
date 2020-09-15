import React, { useState, useEffect, useRef } from 'react';
import { FaKey } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Reaptcha from 'reaptcha';
import Logo from '../../assets/brasao.png';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/button/Button';
import InputMask from '../../components/layout/InputMask';

import api from '../../service/api';

import { Centro, Versao } from './styles';

require('dotenv').config();

function Login() {
    const [bd, setBd] = useState('');
    const history = useHistory();
    const formRef = useRef(null);
    const [verificado, setVerificado] = useState(false);
    const chaveCaptcha = process.env.REACT_APP_CHAVE_CAPTCHA;

    function verifica() {
        setVerificado(true);
    }

    function limparSessao() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cnpj');
        sessionStorage.removeItem('fornecedor');
        sessionStorage.removeItem('ip');
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
        if (!verificado) {
            toast.error(`Confirme que não é um robô.`);
            return;
        }
        limparSessao();

        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                login: Yup.string().required('O CPF ou CNPJ é obrigatório'),
                senha: Yup.string().required('A senha é obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            try {
                const { login, senha, timeout } = data;
                const response = await api.post('/autorizacao-ext-contab', {
                    login,
                    senha,
                    timeout,
                });

                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('cnpj', response.data.cnpj);
                sessionStorage.setItem('fornecedor', response.data.fornecedor);

                let meuIp = response.data.ip;

                if (meuIp.substr(0, 7) === '::ffff:') {
                    meuIp = meuIp.substr(7);
                }

                sessionStorage.setItem('ip', meuIp);

                if (response.data.acessoDefault) {
                    history.push('/altera-senha');
                } else {
                    history.push('/home');
                }
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
                    <InputMask
                        name="login"
                        placeholder="CNPJ ou CPF (somente números)"
                        mask="99999999999999"
                        maskChar=" "
                    />
                    <Input type="password" name="senha" placeholder="Senha" />
                    <Reaptcha sitekey={chaveCaptcha} onVerify={verifica} />
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

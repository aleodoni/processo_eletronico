import React, { useState, useEffect } from 'react';
import { FaKey } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';

import Logo from '../../assets/brasao.png';
import Input from '../../components/layout/Input';

import { Centro, BotaoLogin, Versao, ErroLogin } from './styles';

require('dotenv').config();

function Login() {
    // const [usuario, setUsuario] = useState('');
    // const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [bd, setBd] = useState('');
    const history = useHistory();

    function limparSessao() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('nomeUsuario');
        sessionStorage.removeItem('areaUsuario');
        sessionStorage.removeItem('setorUsuario');
        sessionStorage.removeItem('nomeSetorUsuario');
        sessionStorage.removeItem('nomeAreaUsuario');
        sessionStorage.removeItem('menu');
    }

    useEffect(() => {
        async function nomeBd() {
            // axios({
            //     method: 'GET',
            //     url: `${process.env.REACT_APP_API_URL}/spa2-api/bd`,
            // }).then(res => {
            //     if (res.data.bd === 'des' || res.data.bd === 'postgres') {
            //         setBd(`Desenvolvimento - versão:${res.data.versao}`);
            //     } else if (res.data.bd === 'pro') {
            //         setBd(`Produção - versão:${res.data.versao}`);
            //     } else {
            //         setBd(`Não conectado - versão:${res.data.versao}`);
            //     }
            // });
            setBd(`Não conectado`);
        }
        nomeBd();
    }, []);

    function logar({ usuario, senha }) {
        // console.log(usuario, senha);
        // e.preventDefault();
        if (!usuario || !senha) {
            setErro('Usuário ou senha em branco.');
        } else {
            const timeOut = 1440;
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}/spa2-api/autorizacao`,
                data: {
                    usuario,
                    senha,
                    timeout: timeOut,
                },
            })
                .then(res => {
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('usuario', res.data.usuario);
                    sessionStorage.setItem('nomeUsuario', res.data.nomeUsuario);
                    sessionStorage.setItem('areaUsuario', res.data.areaUsuario);
                    sessionStorage.setItem('setorUsuario', res.data.setorUsuario);
                    sessionStorage.setItem('nomeSetorUsuario', res.data.nomeSetorUsuario);
                    sessionStorage.setItem('nomeAreaUsuario', res.data.nomeAreaUsuario);
                    sessionStorage.setItem('menu', res.data.menu);
                    history.push('/home');
                })
                .catch(err => {
                    if (err === 'Error: Network Error') {
                        setErro('Não conectado a API.');
                    } else {
                        setErro(err.response.data.error);
                    }
                    limparSessao();
                });
        }
    }

    return (
        <>
            <Centro>
                <Form onSubmit={logar}>
                    <img src={Logo} alt="Câmara Municipal de Curitiba" />
                    <span>Processo eletrônico</span>
                    <br />
                    {/* <label>Usuário</label> */}
                    {/* <input type="text" id="usuario" name="usuario" size="30" autoFocus onChange={e => setUsuario(e.target.value)} /> */}
                    <Input type="text" name="usuario" placeholder="Usuário" />
                    <Input type="password" name="senha" placeholder="Senha" />
                    {/* <label>Senha</label> */}
                    {/* <input type="password" id="senha" name="senha" size="30" onChange={e => setSenha(e.target.value)} /> */}
                    <input type="hidden" id="timeout" name="timeout" value="1440" />
                    <BotaoLogin>
                        <FaKey color="#FFF" />
                        &nbsp;Acessar
                    </BotaoLogin>
                    <Versao>{bd}</Versao>
                    <ErroLogin>
                        <p>{erro && erro}</p>
                    </ErroLogin>
                </Form>
            </Centro>
        </>
    );
}
export default Login;

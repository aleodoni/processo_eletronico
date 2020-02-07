import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import axios from 'axios';
import { useHistory } from 'react-router';
import Logo from '../../assets/brasao.png';

import { Centro, BotaoLogin, Versao, ErroLogin } from './styles';

require('dotenv').config();

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
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

    function logar(e) {
        e.preventDefault();
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
                        setErro('err.response.data.message');
                    }
                    limparSessao();
                });
        }
    }

    return (
        <>
            <Centro>
                <form onSubmit={logar}>
                    <img src={Logo} alt="Câmara Municipal de Curitiba" />
                    <span>Processo eletrônico</span>
                    <br />
                    <label>Usuário</label>
                    <input type="text" id="usuario" name="usuario" size="30" autoFocus onChange={e => setUsuario(e.target.value)} />
                    <label>Senha</label>
                    <input type="password" id="senha" name="senha" size="30" onChange={e => setSenha(e.target.value)} />
                    <input type="hidden" id="timeout" name="timeout" value="1440" />
                    <BotaoLogin>
                        <FaKey color="#FFF" />
                        &nbsp;Acessar
                    </BotaoLogin>
                    <Versao>Versão: 1.0.0 - API - Desenvolvimento</Versao>
                    <ErroLogin>
                        <p>{erro && erro}</p>
                    </ErroLogin>
                </form>
            </Centro>
        </>
    );
}
export default Login;

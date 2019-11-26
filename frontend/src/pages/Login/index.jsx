import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../assets/brasao.png';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';
import { styles } from './estilos';
require('dotenv').config();

class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.centro}>
                <form onSubmit={this.logar} className={classes.formLogin}>
                    <img src={Logo} alt="Câmara Municipal de Curitiba" className={classes.imgLogin} />
                    <span className={classes.tituloSistema}>Processo eletrônico</span>
                    <br />
                    <label>Usuário</label>
                    <input type="text" id="usuario" name="usuario" className={classes.usuario} size="30" autoFocus onChange={e => this.setState({ usuario: e.target.value })} />
                    <label>Senha</label>
                    <input type="password" id="senha" name="senha" className={classes.senha} size="30" onChange={e => this.setState({ senha: e.target.value })} />
                    <input type="hidden" id="timeout" name="timeout" value="1440"/>
                    <Button id="btnLoga" variant="contained" color="primary" type="submit" className={classes.botaoLogin} startIcon={<VpnKey />}>
                    Acessar
                    </Button>
                    <span className={classes.versao}>Versão: 1.0.0 - API - Desenvolvimento</span>
                    <span className={classes.erroLogin}>{this.state.erro && <p>{this.state.erro}</p>}</span>
                </form>
            </div>
        );
    }

    constructor(props, context) {
        super(props, context);
        this.state = { erro: '', usuario: '', senha: '', };
    }

    componentDidMount() {

    }

    logar = async e => {
        e.preventDefault();
        const { usuario, senha } = this.state;
        if (!usuario || !senha) {
            this.setState({ erro: 'Usuário ou senha em branco.' });
        } else {
            const timeOut = 1440;
            axios({
                method: 'POST',
                url: process.env.REACT_APP_API_URL+'/spa2-api/autorizacao',
                data: {
                    usuario: usuario,
                    senha: senha,
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
                    this.props.history.push('/home');
                })
                .catch(err => {
                    if (err === 'Error: Network Error'){
                        this.setState({ erro: 'Não conectado a API.' });
                    }else{
                        this.setState({ erro: err.response.data.message });
                    }
                    this.limparSessao();
                });
        }
    };

    limparSessao = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('nomeUsuario');
        sessionStorage.removeItem('areaUsuario');
        sessionStorage.removeItem('setorUsuario');
        sessionStorage.removeItem('nomeSetorUsuario');
        sessionStorage.removeItem('nomeAreaUsuario');
        sessionStorage.removeItem('menu');
    }
}
export default withStyles(styles)(Login);

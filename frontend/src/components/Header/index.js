import React from 'react';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import Logo from '../../assets/brasao.png';
import Button from '../layout/button/Button';
import { Container } from './styles';

function Header() {
    function sair() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('nomeUsuario');
        sessionStorage.removeItem('areaUsuario');
        sessionStorage.removeItem('setorUsuario');
        sessionStorage.removeItem('nomeSetorUsuario');
        sessionStorage.removeItem('nomeAreaUsuario');
        sessionStorage.removeItem('menu');
        window.location.href = '/processo-eletronico';
    }

    return (
        <Container>
            <nav>
                <div>
                    <img src={Logo} alt="Processo Eletrônico" />
                    <label>{sessionStorage.getItem('nomeAreaUsuario')} - </label>
                    <label>{sessionStorage.getItem('nomeSetorUsuario')}</label>
                    <div>
                        <span>
                            <FaUserCircle size="20px" />
                        </span>
                        <label>&nbsp;{sessionStorage.getItem('nomeUsuario')}</label>
                        <Button onClick={() => sair()}>
                            <FaPowerOff />
                            Sair
                        </Button>
                    </div>
                </div>
            </nav>
        </Container>
    );
}

export default Header;

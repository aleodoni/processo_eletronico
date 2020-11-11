import React from 'react';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import Logo from '../../assets/brasao.png';
import Button from '../layout/button/Button';
import { Container, Titulo, UserData } from './styles';

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
        sessionStorage.removeItem('permissoes');
        sessionStorage.removeItem('tamanhoAnexo');
        window.location.href = '/processo-eletronico';
    }

    return (
        <Container>
            <nav>
                <div>
                    <Titulo>
                        <img src={Logo} alt="Processo Eletrônico" />
                        Câmara Municipal de Curitiba - Processo Eletrônico
                    </Titulo>
                    <UserData>
                        <div>
                            <FaUserCircle size="20px" />
                            <label>{sessionStorage.getItem('nomeUsuario')}</label>
                        </div>
                        <span>
                            <label>{sessionStorage.getItem('nomeSetorUsuario')}</label>
                        </span>
                    </UserData>
                    <div>
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

import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import Logo from '../../assets/brasao.png';
import Button from '../layout/button/Button';
import { Container, Titulo, UserData } from './styles';

function Header() {
    function sair() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cnpj');
        sessionStorage.removeItem('fornecedor');
        sessionStorage.removeItem('ip');
        window.location.href = '/processo-eletronico-ext-contab';
    }

    return (
        <Container>
            <nav>
                <div>
                    <Titulo>
                        <img src={Logo} alt="Processo Eletrônico - Acesso externo" />
                        Câmara Municipal de Curitiba - Processo Eletrônico
                    </Titulo>
                    <UserData>
                        <div>
                            <label>IP: {sessionStorage.getItem('ip')}</label>
                        </div>
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

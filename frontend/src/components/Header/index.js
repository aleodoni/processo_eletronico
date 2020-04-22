import React from 'react';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import Logo from '../../assets/brasao.png';

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
        <>
            <nav>
                <div>
                    <img src={Logo} alt="Processo Eletrônico" />
                    <label>{sessionStorage.getItem('nomeAreaUsuario')} - </label>
                    <label>{sessionStorage.getItem('nomeSetorUsuario')}</label>
                    <div>
                        <span>
                            <FaUserCircle size="2em" />
                        </span>
                        <label>&nbsp;{sessionStorage.getItem('nomeUsuario')}</label>
                        <button type="button" onClick={() => sair()}>
                            <FaPowerOff />
                            &nbsp; Sair
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;

import React from 'react';
import { FaUserCircle, FaPowerOff } from 'react-icons/fa';
import Logo from '../../assets/brasao.png';
import ModalSair from '../ModalSair';
import useModal from '../ModalSair/useModal';

function Header() {
    const { isShowing, toggle } = useModal();

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
                        <button type="button" onClick={toggle}>
                            <FaPowerOff />
                            &nbsp; Sair
                        </button>
                    </div>
                    <ModalSair isShowing={isShowing} hide={toggle} />
                </div>
            </nav>
        </>
    );
}

export default Header;

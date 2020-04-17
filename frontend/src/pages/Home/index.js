import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaSistrix, FaUpload } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { Container, AsideLeft, Main } from './styles';

function Home() {
    return (
        <>
            <Container>
                <Autorizacao tela="Home" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Acesso rápido</legend>
                        <Link to="/processo-cria">
                            <button type="button">
                                <FaFileAlt />
                                &nbsp;Criar processo
                            </button>
                        </Link>
                        <Link to="/processo-consulta">
                            <button type="button">
                                <FaSistrix />
                                &nbsp;Consultar processos
                            </button>
                        </Link>
                        <Link to="/envia">
                            <button type="button">
                                <FaUpload />
                                &nbsp;Enviar
                            </button>
                        </Link>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default Home;

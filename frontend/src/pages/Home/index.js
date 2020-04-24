import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaSistrix, FaUpload, FaDownload } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';

import { Container, Main } from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import DefaultLayout from '../_layouts/default';

function Home() {
    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Home" />
                <Main>
                    <ButtonAcessoRapido>
                        <Link to="/processo-cria">
                            <FaFileAlt />
                            Criar processo
                        </Link>
                    </ButtonAcessoRapido>

                    <ButtonAcessoRapido>
                        <Link to="/processo-consulta">
                            <FaSistrix />
                            Consultar processos
                        </Link>
                    </ButtonAcessoRapido>

                    <ButtonAcessoRapido>
                        <Link to="/envia">
                            <FaUpload />
                            Enviar
                        </Link>
                    </ButtonAcessoRapido>

                    <ButtonAcessoRapido>
                        <Link to="/recebe">
                            <FaDownload />
                            Receber
                        </Link>
                    </ButtonAcessoRapido>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

import React, { useState } from 'react';
// import { toast as mensagem } from 'react-toastify';
// import Autorizacao from '../../components/Autorizacao';

import { Container, Main, Erro, ContainerTitulo } from './styles';
// import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
// import Button from '../../components/layout/button/Button';

function AlteraSenha() {
    const [erro, setErro] = useState('');

    return (
        <DefaultLayout>
            <Container>
                <Main>
                    <Erro>{erro}</Erro>
                    <ContainerTitulo>
                        Alterar senha provisória - Fornecedor:{' '}
                        {sessionStorage.getItem('fornecedor')}
                    </ContainerTitulo>
                    <hr />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default AlteraSenha;

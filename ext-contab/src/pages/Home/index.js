import React, { useState, useEffect } from 'react';
import Autorizacao from '../../components/Autorizacao';

import { Container, Main, ContainerProcessos, Erro } from './styles';
import DefaultLayout from '../_layouts/default';

function Home() {
    const [erro, setErro] = useState('');

    useEffect(() => {
        // gfhgfgh
    }, []);

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Home" />

                <Main>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <hr />
                    <ContainerProcessos>kjjljlk</ContainerProcessos>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

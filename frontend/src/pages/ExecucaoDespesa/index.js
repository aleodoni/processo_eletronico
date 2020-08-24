import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';

import { Container, Main, ContainerBotoes, Erro } from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import CriaRubrica from '../../components/layout/button/CriaRubrica';
import DefaultLayout from '../_layouts/default';

function ExecucaoDespesa() {
    const [erro, setErro] = useState('');

    useEffect(() => {
        // zzzzz
    }, []);

    function criaRubrica() {
        const ordem = document.getElementById('ordemAssinatura').value;
        axios({
            method: 'POST',
            url: '/cria-rubrica',
            data: {
                ordem,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
                Accept: 'application/pdf',
            },
            responseType: 'blob',
        })
            .then(res => {
                const blob = new Blob([res.data], { type: res.data.type });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = res.headers['content-disposition'];
                let fileName = 'documento-teste.pdf';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                mensagem.success('Assinado com sucesso.');
            })
            .catch(e => {
                setErro(e);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Execução de despesas" />
                <Main>
                    <Erro>{erro}</Erro>
                    <ContainerBotoes>
                        <ButtonAcessoRapido>
                            <Link to="/processo-cria-pagamento">
                                <FaFileAlt />
                                Criar processo de pagamento
                            </Link>
                        </ButtonAcessoRapido>
                        <CriaRubrica name="btnCriaRubrica" clickHandler={criaRubrica} />
                        <input
                            id="ordemAssinatura"
                            name="ordemAssinatura"
                            label="Ordem"
                            type="text"
                            size="1"
                            maxLength="1"
                        />
                    </ContainerBotoes>
                    <hr />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default ExecucaoDespesa;

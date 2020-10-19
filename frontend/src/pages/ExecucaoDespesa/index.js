import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FaFileAlt } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';
import ModalProcesso from '../../components/ModalProcessoPagamento';
import axios from '../../configs/axiosConfig';

import {
    Container,
    Main,
    ContainerProcessos,
    ContainerBotoes,
    BotaoComoLink,
    LinkFornecedor,
    Erro,
} from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import DefaultLayout from '../_layouts/default';

function ExecucaoDespesa() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [gridProcessos, setGridProcessos] = useState([]);
    const [processoModal, setProcessoModal] = useState([]);
    const [modalProcesso, setModalProcesso] = useState(false);

    const colunaCodigoProcesso = {
        width: '50px',
    };
    const colunaFornecedor = {
        textAlign: 'left',
    };

    function abreModalProcesso(id) {
        axios({
            method: 'GET',
            url: `/ver-processo-pagamento/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProcessoModal(res.data);
                setModalProcesso(true);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo de pagamento.');
            });
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
    }

    function editaProcesso(id) {
        history.push(`/edita-processo-pagamento/${id}`);
    }

    const carregaGridProcessos = useCallback(() => {
        axios({
            method: 'GET',
            url: `/processos-fornecedores/`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGridProcessos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    useEffect(() => {
        carregaGridProcessos();
    }, [carregaGridProcessos]);

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
                    </ContainerBotoes>
                    <hr />
                    <h3>Processos abertos por fornecedores</h3>
                    <ContainerProcessos>
                        {gridProcessos.length > 0 ? (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th style={colunaFornecedor}>Fornecedor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessos.map(proc => (
                                            <tr key={proc.pro_id}>
                                                <td style={colunaCodigoProcesso}>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={() =>
                                                            abreModalProcesso(proc.pro_id)
                                                        }>
                                                        {proc.pro_codigo}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>
                                                    <LinkFornecedor
                                                        name="btnEdita"
                                                        onClick={() => {
                                                            editaProcesso(proc.pro_id);
                                                        }}>
                                                        {proc.pro_nome}
                                                    </LinkFornecedor>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </ContainerProcessos>
                    <ModalProcesso
                        fechaModalProcesso={fechaModalProcesso}
                        modalProcesso={modalProcesso}
                        processo={processoModal}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default ExecucaoDespesa;

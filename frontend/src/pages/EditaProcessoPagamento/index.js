import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApagaEmpenho from '../../components/ModalExcluirEmpenho';
import ModalApagaNotaFiscal from '../../components/ModalExcluirNotaFiscal';
import Autorizacao from '../../components/Autorizacao';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/button/Button';
import InputSemLabel from '../../components/layout/InputSemLabel';
import axios from '../../configs/axiosConfig';

import {
    Container,
    Main,
    ContainerBotoes,
    ContainerDadosProcesso,
    ContainerReferencia,
    ContainerBanco,
    ContainerAutorizacao,
    ContainerDadosAutorizacao,
    ContainerEmpenhosNotasFiscais,
    ContainerEmpenhos,
    ContainerInsereEmpenhos,
    ContainerInsereNotasFiscais,
    ContainerNotasFiscais,
    LinkExcluir,
    Erro,
} from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import DefaultLayout from '../_layouts/default';

function EditaProcessoPagamento({ match }) {
    const { proId } = match.params;
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [idEmpenho, setIdEmpenho] = useState('');
    const [idNotaFiscal, setIdNotaFiscal] = useState('');
    const [processo, setProcesso] = useState([]);
    const formRef = useRef(null);
    const [modalExcluirEmpenho, setModalExcluirEmpenho] = useState(false);
    const [modalExcluirNotaFiscal, setModalExcluirNotaFiscal] = useState(false);

    function abreModalExcluirEmpenho(id) {
        setIdEmpenho(id);
        setModalExcluirEmpenho(true);
    }

    function fechaModalExcluirEmpenho() {
        setModalExcluirEmpenho(false);
    }

    function abreModalExcluirNotaFiscal(id) {
        setIdNotaFiscal(id);
        setModalExcluirNotaFiscal(true);
    }

    function fechaModalExcluirNotaFiscal() {
        setModalExcluirNotaFiscal(false);
    }

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo-pagamento/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                formRef.current.setFieldValue('proNome', res.data.pro_nome);
                for (let i = 0; i < res.data.autorizacao.length; i++) {
                    document.getElementById(
                        'lblAutId'
                    ).innerHTML = `Autorização nº: ${res.data.autorizacao[i].aut_id}`;
                    document.getElementById(
                        'lblReferencia'
                    ).innerHTML = `Referente: ${res.data.autorizacao[i].aut_referencia}`;
                    document.getElementById(
                        'lblBanco'
                    ).innerHTML = `Banco: ${res.data.autorizacao[i].ban_nome}`;
                    document.getElementById(
                        'lblAgencia'
                    ).innerHTML = `Agência: ${res.data.autorizacao[i].aut_ban_agencia}`;
                    document.getElementById(
                        'lblContaCorrente'
                    ).innerHTML = `Conta corrente: ${res.data.autorizacao[i].aut_ban_conta_corrente}`;
                    document.getElementById(
                        'lblValor'
                    ).innerHTML = `Valor: ${res.data.autorizacao[i].aut_valor}`;
                }

                setProcesso(res.data);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [proId]);

    useEffect(() => {
        mensagem.success('Carregando processo...');
        carregaDadosProcesso();
    }, [carregaDadosProcesso]);

    function editaProcesso() {
        // jhgfdsjhjg
    }

    function apagaEmpenho(id) {
        processo.empenhos = processo.empenhos.filter(lista => {
            return lista.pen_id !== id;
        });
    }

    function insereEmpenho() {
        // kjlkj
    }

    function apagaNotaFiscal(id) {
        processo.notas_fiscais = processo.notas_fiscais.filter(lista => {
            return lista.pnf_id !== id;
        });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Execução de despesas" />
                <Main>
                    <Erro>{erro}</Erro>
                    <h3>Editar processo de execução de despesa nº: {processo.pro_codigo}</h3>
                    <hr />

                    <Form ref={formRef} onSubmit={editaProcesso}>
                        <ContainerDadosProcesso>
                            <Input name="proNome" label="Fornecedor" type="text" maxLength="200" />
                            <Input
                                name="proProcessoPai"
                                label="Processo de origem"
                                type="text"
                                maxLength="15"
                            />
                        </ContainerDadosProcesso>
                        <ContainerAutorizacao>
                            <legend>Dados da autorização</legend>
                            <ContainerReferencia>
                                <label id="lblAutId" />
                                <label id="lblReferencia" />
                            </ContainerReferencia>
                            <ContainerBanco>
                                <label id="lblBanco" />
                            </ContainerBanco>
                            <ContainerDadosAutorizacao>
                                <label id="lblAgencia" />
                                <label id="lblContaCorrente" />
                                <label id="lblValor" />
                            </ContainerDadosAutorizacao>
                        </ContainerAutorizacao>
                        <ContainerEmpenhosNotasFiscais>
                            <ContainerEmpenhos>
                                <legend>Empenhos</legend>
                                <ContainerInsereEmpenhos>
                                    <InputSemLabel
                                        name="editNovoEmpenho"
                                        type="text"
                                        maxLength="15"
                                    />
                                    <Button
                                        type="button"
                                        name="btnNovoEmpenho"
                                        onClick={insereEmpenho}>
                                        <FaFileAlt color="#FFF" />
                                        Novo empenho
                                    </Button>
                                </ContainerInsereEmpenhos>
                                <>
                                    {processo.empenhos ? (
                                        <ul>
                                            {processo.empenhos.map(empenho => (
                                                <li key={empenho.pen_id}>
                                                    {empenho.pen_empenho}{' '}
                                                    <LinkExcluir
                                                        onClick={() => {
                                                            abreModalExcluirEmpenho(empenho.pen_id);
                                                        }}>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerEmpenhos>
                            <ContainerNotasFiscais>
                                <legend>Notas fiscais</legend>
                                <ContainerInsereNotasFiscais>
                                    <InputSemLabel
                                        name="editNovaNotaFiscal"
                                        type="text"
                                        maxLength="15"
                                    />
                                    <Button type="button" name="btnNovaNotaFiscal">
                                        <FaFileAlt color="#FFF" />
                                        Nova nota fiscal
                                    </Button>
                                </ContainerInsereNotasFiscais>
                                <>
                                    {processo.notas_fiscais ? (
                                        <ul>
                                            {processo.notas_fiscais.map(notaFiscal => (
                                                <li key={notaFiscal.pnf_id}>
                                                    {notaFiscal.pnf_nota_fiscal}{' '}
                                                    <LinkExcluir
                                                        onClick={() => {
                                                            abreModalExcluirNotaFiscal(
                                                                notaFiscal.pnf_id
                                                            );
                                                        }}>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerNotasFiscais>
                        </ContainerEmpenhosNotasFiscais>
                    </Form>

                    <ContainerBotoes>
                        <ButtonAcessoRapido>
                            <Link to="/processo-cria-pagamento">
                                <FaFileAlt />
                                Salvar alterações
                            </Link>
                        </ButtonAcessoRapido>
                    </ContainerBotoes>
                    <ModalApagaEmpenho
                        modalExcluir={modalExcluirEmpenho}
                        fechaModalExcluir={fechaModalExcluirEmpenho}
                        apagaEmpenho={apagaEmpenho}
                        id={idEmpenho}
                    />
                    <ModalApagaNotaFiscal
                        modalExcluir={modalExcluirNotaFiscal}
                        fechaModalExcluir={fechaModalExcluirNotaFiscal}
                        apagaNotaFiscal={apagaNotaFiscal}
                        id={idNotaFiscal}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

EditaProcessoPagamento.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default EditaProcessoPagamento;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApagaEmpenho from '../../components/ModalExcluirEmpenho';
import ModalApagaNotaFiscal from '../../components/ModalExcluirNotaFiscal';
import ModalApagaNAD from '../../components/ModalExcluirNAD';
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
    ContainerInsereNads,
    ContainerNotasFiscais,
    ContainerNADs,
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
    const [idNAD, setIdNAD] = useState('');
    const [processo, setProcesso] = useState([]);
    const [vEmpenhos, setVEmpenhos] = useState([]);
    const [vNotasFiscais, setVNotasFiscais] = useState([]);
    const [vNADs, setVNADs] = useState([]);
    const formRef = useRef(null);
    const [modalExcluirEmpenho, setModalExcluirEmpenho] = useState(false);
    const [modalExcluirNotaFiscal, setModalExcluirNotaFiscal] = useState(false);
    const [modalExcluirNAD, setModalExcluirNAD] = useState(false);

    function abreModalExcluirEmpenho(e, id) {
        e.preventDefault();
        setIdEmpenho(id);
        setModalExcluirEmpenho(true);
    }

    function fechaModalExcluirEmpenho() {
        setModalExcluirEmpenho(false);
    }

    function abreModalExcluirNotaFiscal(e, id) {
        e.preventDefault();
        setIdNotaFiscal(id);
        setModalExcluirNotaFiscal(true);
    }

    function fechaModalExcluirNotaFiscal() {
        setModalExcluirNotaFiscal(false);
    }

    function abreModalExcluirNAD(e, id) {
        e.preventDefault();
        setIdNAD(id);
        setModalExcluirNAD(true);
    }

    function fechaModalExcluirNAD() {
        setModalExcluirNAD(false);
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
                setVEmpenhos(res.data.empenhos);
                setVNotasFiscais(res.data.notas_fiscais);
                setVNADs(res.data.nads);
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
        const p = formRef.current.getData();
        setErro('');
        if (p.proNome.trim() === '') {
            mensagem.error('Nome do fornecedor em branco.');
            return;
        }
        if (p.proProcessoPai.trim() === '') {
            mensagem.error('Processo de origem em branco.');
            return;
        }
        processo.pro_nome = p.proNome;
        processo.pro_processo_pai = p.proProcessoPai;

        const id = processo.pro_id;
        const proNome = processo.pro_nome;
        const proProcessoPai = processo.pro_processo_pai;

        axios({
            method: 'PUT',
            url: `edita-processo-pagamento/${id}`,
            data: {
                proNome,
                proProcessoPai,
                vEmpenhos,
                vNotasFiscais,
                vNADs,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Processo de pagamento editado com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao editar processo.');
            });
    }

    function apagaEmpenho(id) {
        setVEmpenhos(
            vEmpenhos.filter(lista => {
                return lista.pen_empenho !== id;
            })
        );
    }

    function insereEmpenho() {
        if (document.getElementById('editNovoEmpenho').value === '') {
            mensagem.error('Número do empenho em branco.');
            return;
        }
        const objEmpenho = {};
        objEmpenho.pen_id = null;
        objEmpenho.pro_id_pai = processo.pro_id;
        objEmpenho.pen_empenho = document.getElementById('editNovoEmpenho').value;
        setVEmpenhos([...vEmpenhos, objEmpenho]);
        document.getElementById('editNovoEmpenho').value = '';
    }

    function insereNotaFiscal() {
        if (document.getElementById('editNovaNotaFiscal').value === '') {
            mensagem.error('Número da nota fiscal em branco.');
            return;
        }
        const objNotaFiscal = {};
        objNotaFiscal.pnf_id = null;
        objNotaFiscal.pro_id_pai = processo.pro_id;
        objNotaFiscal.pnf_nota_fiscal = document.getElementById('editNovaNotaFiscal').value;
        setVNotasFiscais([...vNotasFiscais, objNotaFiscal]);
        document.getElementById('editNovaNotaFiscal').value = '';
    }

    function apagaNotaFiscal(id) {
        setVNotasFiscais(
            vNotasFiscais.filter(lista => {
                return lista.pnf_nota_fiscal !== id;
            })
        );
    }

    function insereNAD() {
        if (document.getElementById('editNovaNAD').value === '') {
            mensagem.error('Número da autorização em branco.');
            return;
        }
        const objNAD = {};
        objNAD.pna_id = null;
        objNAD.pro_id_pai = processo.pro_id;
        objNAD.pna_nad = document.getElementById('editNovaNAD').value;
        setVNADs([...vNADs, objNAD]);
        document.getElementById('editNovaNAD').value = '';
    }

    function apagaNAD(id) {
        setVNADs(
            vNADs.filter(lista => {
                return lista.pna_nad !== id;
            })
        );
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
                                    {vEmpenhos ? (
                                        <ul>
                                            {vEmpenhos.map(empenho => (
                                                <li key={empenho.pen_empenho}>
                                                    {empenho.pen_empenho}{' '}
                                                    <LinkExcluir
                                                        onClick={e =>
                                                            abreModalExcluirEmpenho(
                                                                e,
                                                                empenho.pen_empenho
                                                            )
                                                        }>
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
                                    <Button
                                        type="button"
                                        name="btnNovaNotaFiscal"
                                        onClick={insereNotaFiscal}>
                                        <FaFileAlt color="#FFF" />
                                        Nova nota fiscal
                                    </Button>
                                </ContainerInsereNotasFiscais>
                                <>
                                    {vNotasFiscais ? (
                                        <ul>
                                            {vNotasFiscais.map(notaFiscal => (
                                                <li key={notaFiscal.pnf_nota_fiscal}>
                                                    {notaFiscal.pnf_nota_fiscal}{' '}
                                                    <LinkExcluir
                                                        onClick={e => {
                                                            abreModalExcluirNotaFiscal(
                                                                e,
                                                                notaFiscal.pnf_nota_fiscal
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
                            <ContainerNADs>
                                <legend>Autorizações de fornecimento</legend>
                                <ContainerInsereNads>
                                    <InputSemLabel name="editNovaNAD" type="text" maxLength="15" />
                                    <Button type="button" name="btnNovaNAD" onClick={insereNAD}>
                                        <FaFileAlt color="#FFF" />
                                        Nova autorização de fornecimento
                                    </Button>
                                </ContainerInsereNads>
                                <>
                                    {vNADs ? (
                                        <ul>
                                            {vNADs.map(nad => (
                                                <li key={nad.pna_nad}>
                                                    {nad.pna_nad}{' '}
                                                    <LinkExcluir
                                                        onClick={e => {
                                                            abreModalExcluirNAD(e, nad.pna_nad);
                                                        }}>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerNADs>
                        </ContainerEmpenhosNotasFiscais>
                        <ContainerBotoes>
                            <Button type="submit" name="btnSalva">
                                <FaFileAlt color="#FFF" />
                                Salvar alterações
                            </Button>
                        </ContainerBotoes>
                    </Form>

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
                    <ModalApagaNAD
                        modalExcluir={modalExcluirNAD}
                        fechaModalExcluir={fechaModalExcluirNAD}
                        apagaNAD={apagaNAD}
                        id={idNAD}
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Container1, ContainerBotoes, Main, Erro } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';

function TipoDocumento() {
    const [erro, setErro] = useState('');
    const [tpdId, setTpdId] = useState(undefined);
    const [tpdNome, setTpdNome] = useState('');
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    function abreModalExcluir() {
        if (tpdNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleTpdId(e) {
        setTpdId(e.target.value);
    }

    function handleTpdNome(e) {
        setTpdNome(e.target.value);
    }

    function limpaCampos() {
        setErro('');
        setTpdId(undefined);
        setTpdNome('');
    }

    function preencheCampos(linha) {
        setErro('');
        setTpdId(linha.tpd_id);
        setTpdNome(linha.tpd_nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tipos-documento',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTiposDocumento(res.data);
            })
            .catch(err => {
                console.log(err);
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaGrid();
        }
        carrega();
    }, []);

    function grava() {
        if (tpdNome.trim() === '') {
            setErro('Tipo de documento em branco.');
            return;
        }
        if (tpdId === undefined) {
            axios({
                method: 'POST',
                url: '/tipos-documento',
                data: {
                    tpd_id: null,
                    tpd_nome: tpdNome,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    mensagem.success('Inserido com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao inserir registro.');
                });
        } else {
            axios({
                method: 'PUT',
                url: `tipos-documento/${tpdId}`,
                data: {
                    tpd_nome: tpdNome,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    mensagem.success('Editado com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao editar registro.');
                });
        }
    }

    function apaga(id) {
        axios({
            method: 'DELETE',
            url: `tipos-documento/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaGrid();
                mensagem.success('Excluído com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Tipos de documento" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef}>
                        <input id="tpdId" value={tpdId} onChange={handleTpdId} type="hidden" />
                        <Container1>
                            <Input
                                required
                                name="tpdNome"
                                label="Tipo de documento"
                                type="text"
                                value={tpdNome}
                                onChange={handleTpdNome}
                                size="100"
                                maxLength="100"
                            />
                        </Container1>
                    </Form>
                    <br />
                    <ContainerBotoes>
                        <Salvar name="btnSalva" clickHandler={grava} />

                        <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                        <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                    </ContainerBotoes>
                    <Table
                        columns={[{ title: 'Tipo de documento', field: 'tpd_nome' }]}
                        data={tiposDocumento}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={tpdId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default TipoDocumento;

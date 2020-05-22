/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, ContainerDados, Main, Erro, Titulo } from './styles';
import Input from '../../components/layout/Input';
import ManifestacaoPublica from '../../components/system/select/ManifestacaoPublica';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function TipoManifestacao() {
    const [erro, setErro] = useState('');
    const [tipoManifestacao, setTipoManifestacao] = useState({
        tmnId: undefined,
        tmnNome: '',
        tmnPublica: -1,
    });

    const [tiposManifestacao, setTiposManifestacao] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(tipoManifestacao);
    }, [tipoManifestacao]);

    function abreModalExcluir() {
        if (tipoManifestacao.tmnNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setTipoManifestacao({
            ...tipoManifestacao,
            tmnId: null,
            tmnNome: '',
            tmnPublica: '-1',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setTipoManifestacao({
            ...tipoManifestacao,
            tmnId: linha.tmn_id,
            tmnNome: linha.tmn_nome,
            tmnPublica: linha.tmn_publica,
        });
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tipos-manifestacao',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTiposManifestacao(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaGrid();
            posiciona();
        }
        carrega();
    }, []);

    async function grava({ tmnId, tmnNome, tmnPublica }) {
        try {
            const schema = Yup.object().shape({
                tmnNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Tipo de manifestação é obrigatória'),
                tmnPublica: Yup.boolean().oneOf([true, false], 'Selecione pública ou não'),
            });

            await schema.validate({ tmnId, tmnNome, tmnPublica }, { abortEarly: false });

            if (!tmnId) {
                axios({
                    method: 'POST',
                    url: '/tipos-manifestacao',
                    data: {
                        tmn_id: null,
                        tmn_nome: tmnNome,
                        tmn_publica: tmnPublica,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Inserido com sucesso.');
                        limpaCampos();
                        carregaGrid();
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `tipos-manifestacao/${tmnId}`,
                    data: {
                        tmn_nome: tmnNome,
                        tmn_publica: tmnPublica,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Editado com sucesso.');
                        limpaCampos();
                        carregaGrid();
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao editar registro.');
                    });
            }
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    }

    function apaga(id) {
        axios({
            method: 'DELETE',
            url: `tipos-manifestacao/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Excluído com sucesso.');
                limpaCampos();
                carregaGrid();
                posiciona();
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Tipos de manifestação" />
                <Main>
                    <Titulo>
                        <p>Tipos de manifestação</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={tipoManifestacao} onSubmit={grava}>
                        <Input name="tmnId" type="hidden" />
                        <ContainerDados>
                            <FormLine>
                                <Input
                                    name="tmnNome"
                                    label="Nome"
                                    type="text"
                                    autoFocus
                                    maxLength="100"
                                />
                            </FormLine>
                            <FormLine>
                                <ManifestacaoPublica name="tmnPublica" />
                            </FormLine>
                        </ContainerDados>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <Table
                        columns={[
                            { title: 'Nome', field: 'tmn_nome' },
                            { title: 'Publica', field: 'publica' },
                        ]}
                        data={tiposManifestacao}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={tipoManifestacao.tmnId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default TipoManifestacao;

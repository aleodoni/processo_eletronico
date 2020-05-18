/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, Titulo } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function TipoDocumento() {
    const [erro, setErro] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState({
        tpdId: undefined,
        tpdNome: '',
    });

    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(tipoDocumento);
    }, [tipoDocumento]);

    function abreModalExcluir() {
        if (tipoDocumento.tpdNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setTipoDocumento({
            ...tipoDocumento,
            tpdId: null,
            tpdNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setTipoDocumento({
            ...tipoDocumento,
            tpdId: linha.tpd_id,
            tpdNome: linha.tpd_nome,
        });
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
            carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ tpdId, tpdNome }) {
        try {
            const schema = Yup.object().shape({
                tpdNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Nome do tipo de documento é obrigatório'),
            });

            await schema.validate({ tpdId, tpdNome }, { abortEarly: false });

            if (!tpdId) {
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
                    <Titulo>
                        <p>Tipos de documento</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={tipoDocumento} onSubmit={grava}>
                        <Input name="tpdId" type="hidden" />
                        <FormLine>
                            <Input
                                name="tpdNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="100"
                            />
                        </FormLine>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
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
                    id={tipoDocumento.tpdId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default TipoDocumento;

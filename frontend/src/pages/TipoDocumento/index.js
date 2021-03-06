/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, Titulo, Container1 } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import TipoDocVisivel from '../../components/system/select/TipoDocVisivel';
import TipoDocSolicitacaoPgto from '../../components/system/select/TipoDocSolicitacaoPgto';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function TipoDocumento() {
    const [erro, setErro] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState({
        tpdId: undefined,
        tpdNome: '',
        tpdVisivel: -1,
        tpdSolicitacaoPgto: -1,
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
            tpdVisivel: -1,
            tpdSolicitacaoPgto: -1,
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setTipoDocumento({
            ...tipoDocumento,
            tpdId: linha.tpd_id,
            tpdNome: linha.tpd_nome,
            tpdVisivel: linha.tpd_visivel,
            tpdSolicitacaoPgto: linha.tpd_solicitacao_pgto,
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
            posiciona();
        }
        carrega();
    }, []);

    async function grava({ tpdId, tpdNome, tpdVisivel, tpdSolicitacaoPgto }) {
        try {
            const schema = Yup.object().shape({
                tpdNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Nome do tipo de documento é obrigatório'),
                tpdVisivel: Yup.boolean().oneOf([true, false], 'Selecione se é visível'),
                tpdSolicitacaoPgto: Yup.boolean().oneOf(
                    [true, false],
                    'Selecione se é de solicitação de pagamento'
                ),
            });

            await schema.validate(
                { tpdId, tpdNome, tpdVisivel, tpdSolicitacaoPgto },
                { abortEarly: false }
            );

            if (!tpdId) {
                axios({
                    method: 'POST',
                    url: '/tipos-documento',
                    data: {
                        tpd_id: null,
                        tpd_nome: tpdNome,
                        tpd_visivel: tpdVisivel,
                        tpd_solicitacao_pgto: tpdSolicitacaoPgto,
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
                    url: `tipos-documento/${tpdId}`,
                    data: {
                        tpd_nome: tpdNome,
                        tpd_visivel: tpdVisivel,
                        tpd_solicitacao_pgto: tpdSolicitacaoPgto,
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
            url: `tipos-documento/${id}`,
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
                <Autorizacao tela="Tipos de documento" />
                <Main>
                    <Titulo>
                        <p>Tipos de documento</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={tipoDocumento} onSubmit={grava}>
                        <Input name="tpdId" type="hidden" />
                        <Container1>
                            <Input
                                name="tpdNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="100"
                            />
                            <TipoDocVisivel name="tpdVisivel" />
                            <TipoDocSolicitacaoPgto name="tpdSolicitacaoPgto" />
                        </Container1>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <Table
                        columns={[
                            { title: 'Tipo de documento', field: 'tpd_nome' },
                            { title: 'Visível', field: 'visivel', width: '70px' },
                            {
                                title: 'Solicitação de pagamento',
                                field: 'solicitacao_pgto',
                                width: '250px',
                            },
                        ]}
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

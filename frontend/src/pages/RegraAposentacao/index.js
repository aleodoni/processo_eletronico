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

function RegraAposentacao() {
    const [erro, setErro] = useState('');
    const [regra, setRegra] = useState({
        regId: undefined,
        regNome: '',
    });
    const [regras, setRegras] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(regra);
    }, [regra]);

    function abreModalExcluir() {
        if (regra.regNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setRegra({
            ...regra,
            regId: null,
            regNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setRegra({
            ...regra,
            regId: linha.reg_id,
            regNome: linha.reg_nome,
        });
        posiciona();
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/regras-aposentacao',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setRegras(res.data);
            })
            .catch(() => {
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

    async function grava({ regId, regNome }) {
        try {
            const schema = Yup.object().shape({
                regNome: Yup.string()
                    .max(100, 'Tamanho máximo 80 caracteres')
                    .required('Nome da regra é obrigatória'),
            });

            await schema.validate({ regId, regNome }, { abortEarly: false });

            if (!regId) {
                axios({
                    method: 'POST',
                    url: '/regras-aposentacao',
                    data: {
                        reg_id: null,
                        reg_nome: regNome,
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
                    url: `regras-aposentacao/${regId}`,
                    data: {
                        reg_nome: regNome,
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
            url: `regras-aposentacao/${id}`,
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
                <Autorizacao tela="Regras de aposentação" />
                <Main>
                    <Titulo>
                        <p>Regras de aposentação</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={regra} onSubmit={grava}>
                        <Input name="regId" type="hidden" />
                        <FormLine>
                            <Input
                                name="regNome"
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
                        columns={[{ title: 'Nome', field: 'reg_nome' }]}
                        data={regras}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={regra.regId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default RegraAposentacao;

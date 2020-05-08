import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, Container1, Container2 } from './styles';
import api from '../../service/api';
import Select from '../../components/layout/Select';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function Lotacao() {
    const [erro, setErro] = useState('');
    const [lotacao, setLotacao] = useState({
        id: undefined,
        matricula: '',
        setId: -1,
        pesNome: '',
        pesLogin: '',
    });
    const [setores, setSetores] = useState([]);
    const [lotacoes, setLotacoes] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(lotacao);
    }, [lotacao]);

    function abreModalExcluir() {
        if (lotacao.matricula !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setLotacao({
            ...lotacao,
            id: undefined,
            matricula: '',
            setId: -1,
            pesNome: '',
            pesLogin: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setLotacao({
            ...lotacao,
            id: linha.matricula,
            matricula: linha.matricula,
            setId: linha.set_id,
            pesNome: linha.pes_nome,
            pesLogin: linha.pes_login,
        });
    }

    async function carregaSetor() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/setores');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome.substring(0, 140),
                    value: area.set_id,
                };
            });

            setSetores(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/lotacoes',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setLotacoes(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaSetor();
            carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ id, matricula, setId, pesNome, pesLogin }) {
        try {
            const schema = Yup.object().shape({
                matricula: Yup.string()
                    .matches(/^[0-9]*$/, 'Somente números')
                    .max(5, 'Tamanho máximo 5 caracteres')
                    .required('Matrícula é obrigatória'),
                setId: Yup.number().positive('Setor é obrigatório'),
                pesNome: Yup.string()
                    .max(200, 'Tamanho máximo 200 caracteres')
                    .required('Nome é obrigatório'),
                pesLogin: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Login é obrigatório'),
            });

            await schema.validate({ matricula, setId, pesNome, pesLogin }, { abortEarly: false });

            if (!id) {
                axios({
                    method: 'POST',
                    url: '/lotacoes',
                    data: {
                        matricula,
                        set_id: setId,
                        pes_nome: pesNome,
                        pes_login: pesLogin,
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
                    url: `lotacoes/${matricula}`,
                    data: {
                        set_id: setId,
                        pes_nome: pesNome,
                        pes_login: pesLogin,
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
                    .catch(erroEdita => {
                        if (erroEdita.response.data.error === 'Lotação não encontrada') {
                            setErro('Matrícula não encontrada');
                        } else {
                            setErro('Erro ao editar registro');
                        }
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
            url: `lotacoes/${id}`,
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
                <Autorizacao tela="Lotações" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={lotacao} onSubmit={grava}>
                        <Input name="id" type="hidden" />
                        <Container1>
                            <Input
                                name="matricula"
                                label="Matrícula"
                                type="text"
                                autoFocus
                                maxLength="5"
                            />
                            <Select name="setId" label="Setor" options={setores} />
                        </Container1>
                        <Container2>
                            <Input
                                name="pesNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="200"
                            />
                            <Input
                                name="pesLogin"
                                label="Login"
                                type="text"
                                autoFocus
                                maxLength="100"
                            />
                        </Container2>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>

                    <Table
                        columns={[
                            { title: 'Matrícula', field: 'matricula' },
                            { title: 'Nome', field: 'pes_nome' },
                            { title: 'Login', field: 'pes_login' },
                        ]}
                        data={lotacoes}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={lotacao.matricula}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Lotacao;

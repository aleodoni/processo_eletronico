/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, Titulo } from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Ativo from '../../components/system/select/Ativo';
import Tipo from '../../components/system/select/Tipo';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function Setor() {
    const [erro, setErro] = useState('');
    const [setor, setSetor] = useState({
        setId: undefined,
        setArea: -1,
        setNome: null,
        setSigla: null,
        setAtivo: -1,
        setTipo: -1,
    });

    const [setores, setSetores] = useState([]);
    const [areas, setAreas] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(setor);
    }, [setor]);

    function abreModalExcluir() {
        if (setor.setNome !== null) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    async function carregaArea() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id,
                };
            });

            setAreas(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function limpaCampos() {
        setSetor({
            ...setor,
            setId: null,
            setArea: '-1',
            setNome: null,
            setSigla: null,
            setAtivo: '-1',
            setTipo: '-1',
        });

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setSetor({
            ...setor,
            setId: linha.set_id,
            setArea: linha.set_id_area,
            setNome: linha.set_nome,
            setSigla: linha.set_sigla,
            setAtivo: linha.set_ativo,
            setTipo: linha.set_tipo,
        });
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/setores',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setSetores(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaArea();
            carregaGrid();
            posiciona();
        }
        carrega();
    }, []);

    async function grava({ setId, setArea, setNome, setSigla, setAtivo, setTipo }) {
        try {
            const schema = Yup.object().shape({
                setNome: Yup.string()
                    .max(200, 'Tamanho máximo 200 caracteres')
                    .required('Nome do setor é obrigatório'),
                setSigla: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Sigla do setor é obrigatória'),
                setArea: Yup.number().positive('Área do setor é obrigatória'),
                setAtivo: Yup.boolean().oneOf([true, false], 'Selecione ativo ou inativo'),
                setTipo: Yup.string().oneOf(['N', 'G', 'E'], 'Tipo do setor é obrigatório'),
            });

            await schema.validate(
                { setId, setArea, setNome, setSigla, setAtivo, setTipo },
                { abortEarly: false }
            );

            if (!setId) {
                axios({
                    method: 'POST',
                    url: '/setores',
                    data: {
                        set_id: null,
                        set_nome: setNome,
                        set_sigla: setSigla,
                        set_id_area: setArea,
                        set_ativo: setAtivo,
                        set_tipo: setTipo,
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
                    url: `setores/${setId}`,
                    data: {
                        set_nome: setNome,
                        set_sigla: setSigla,
                        set_id_area: setArea,
                        set_ativo: setAtivo,
                        set_tipo: setTipo,
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
            url: `setores/${id}`,
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
                <Autorizacao tela="Setores" />
                <Main>
                    <Titulo>
                        <p>Setores</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={setor} onSubmit={grava}>
                        <Input name="setId" type="hidden" />
                        <FormLine>
                            <Input
                                name="setNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="200"
                            />
                        </FormLine>
                        <FormLine>
                            <Input
                                name="setSigla"
                                label="Sigla"
                                type="text"
                                size={1}
                                maxLength="100"
                            />

                            <Select name="setArea" label="Área" size={3} options={areas} />

                            <Ativo name="setAtivo" size={2} />

                            <Tipo name="setTipo" size={2} />
                        </FormLine>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>

                    <Table
                        columns={[
                            { title: 'Nome', field: 'set_nome', width: '500px' },
                            { title: 'Sigla', field: 'set_sigla', width: '100px' },
                        ]}
                        data={setores}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={setor.setId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Setor;

import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function ModeloMenu() {
    const [erro, setErro] = useState('');
    const [modeloMenu, setModeloMenu] = useState({
        mmuId: undefined,
        mmuNome: '',
    });
    const [modeloMenus, setModeloMenus] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(modeloMenu);
    }, [modeloMenu]);

    function abreModalExcluir() {
        if (modeloMenu.mmuNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setModeloMenu({
            ...modeloMenu,
            mmuId: null,
            mmuNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setModeloMenu({
            ...modeloMenu,
            mmuId: linha.mmu_id,
            mmuNome: linha.mmu_nome,
        });
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/modelo-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setModeloMenus(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ mmuId, mmuNome }) {
        try {
            const schema = Yup.object().shape({
                mmuNome: Yup.string()
                    .max(50, 'Tamanho máximo 50 caracteres')
                    .required('Modelo de menu é obrigatório'),
            });

            await schema.validate({ mmuId, mmuNome }, { abortEarly: false });

            if (!mmuId) {
                axios({
                    method: 'POST',
                    url: '/modelo-menu',
                    data: {
                        mmu_id: null,
                        mmu_nome: mmuNome,
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
                    url: `modelo-menu/${mmuId}`,
                    data: {
                        mmu_nome: mmuNome,
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
            url: `modelo-menu/${id}`,
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
                <Autorizacao tela="Modelo de menus" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={modeloMenu} onSubmit={grava}>
                        <Input name="mmuId" type="hidden" />
                        <FormLine>
                            <Input
                                name="mmuNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="50"
                            />
                        </FormLine>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <Table
                        columns={[{ title: 'Nome', field: 'mmu_nome' }]}
                        data={modeloMenus}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={modeloMenu.mmuId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default ModeloMenu;

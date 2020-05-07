import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro } from './styles';
import api from '../../service/api';
import Select from '../../components/layout/Select';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';
import FormLine from '../../components/layout/FormLine';

function AreaMenu() {
    const [erro, setErro] = useState('');
    const [areaMenu, setAreaMenu] = useState({
        amuId: undefined,
        setId: -1,
        mmuId: -1,
    });
    const [setores, setSetores] = useState([]);
    const [modelosMenu, setModelosMenu] = useState([]);
    const [areasMenu, setAreasMenu] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(areaMenu);
    }, [areaMenu]);

    function abreModalExcluir() {
        if (areaMenu.amuId !== undefined) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setAreaMenu({
            ...areaMenu,
            amuId: undefined,
            setId: -1,
            mmuId: -1,
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setAreaMenu({
            ...areaMenu,
            amuId: linha.amu_id,
            setId: linha.set_id,
            mmuId: linha.mmu_id,
        });
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

            setSetores(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaModelosMenu() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/modelo-menu');

            const data = response.data.map(modelo => {
                return {
                    label: modelo.mmu_nome,
                    value: modelo.mmu_id,
                };
            });

            setModelosMenu(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/areas-do-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAreasMenu(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaArea();
            await carregaModelosMenu();
            carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ amuId, setId, mmuId }) {
        try {
            const schema = Yup.object().shape({
                setId: Yup.number().positive('Área é obrigatória'),
                mmuId: Yup.number().positive('Modelo é obrigatório'),
            });

            await schema.validate({ amuId, setId, mmuId }, { abortEarly: false });

            if (!amuId) {
                axios({
                    method: 'POST',
                    url: '/area-menu',
                    data: {
                        amu_id: amuId,
                        set_id: setId,
                        mmu_id: mmuId,
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
                    url: `area-menu/${amuId}`,
                    data: {
                        set_id: setId,
                        mmu_id: mmuId,
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
                        setErro('Erro ao editar registro');
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
            url: `area-menu/${id}`,
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
                <Autorizacao tela="Áreas de menu" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={areaMenu} onSubmit={grava}>
                        <Input name="amuId" type="hidden" />
                        <FormLine>
                            <Select name="setId" label="Área" options={setores} />
                        </FormLine>
                        <FormLine>
                            <Select name="mmuId" label="Modelo" options={modelosMenu} />
                        </FormLine>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <Table
                        columns={[
                            { title: 'Área', field: 'set_nome' },
                            { title: 'Modelo', field: 'mmu_nome' },
                        ]}
                        data={areasMenu}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={areaMenu.amuId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default AreaMenu;

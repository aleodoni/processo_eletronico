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
import TelaInterna from '../../components/system/select/TelaInterna';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function TelaMenu() {
    const [erro, setErro] = useState('');
    const [telaMenu, setTelaMenu] = useState({
        menId: undefined,
        menIdPai: -1,
        menNome: '',
        menUrl: '',
        telId: -1,
        mmuId: -1,
        menOrdemPai: '',
        telInterna: -1,
    });

    const [telasMenu, setTelasMenu] = useState([]);
    const [menusPai, setMenusPai] = useState([]);
    const [telas, setTelas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(telaMenu);
    }, [telaMenu]);

    function abreModalExcluir() {
        if (telaMenu.menId !== undefined) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setTelaMenu({
            ...telaMenu,
            menId: undefined,
            menIdPai: -1,
            menNome: '',
            menUrl: '',
            telId: -1,
            mmuId: -1,
            menOrdemPai: '',
            telInterna: false,
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setTelaMenu({
            ...telaMenu,

            menId: linha.men_id,
            menIdPai: linha.men_id_pai,
            menNome: linha.men_nome,
            menUrl: linha.men_url,
            telId: linha.tel_id,
            mmuId: linha.mmu_id,
            menOrdemPai: linha.men_ordem_pai,
            telInterna: linha.tel_interna,
        });
    }

    async function carregaPai() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/menu-pai');

            const data = response.data.map(pai => {
                return {
                    label: pai.nome_pai,
                    value: pai.men_id,
                };
            });

            setMenusPai(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaModelo() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/modelo-menu');

            const data = response.data.map(modelo => {
                return {
                    label: modelo.mmu_nome,
                    value: modelo.mmu_id,
                };
            });

            setModelos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaTela() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/telas');

            const data = response.data.map(tela => {
                return {
                    label: tela.tel_nome,
                    value: tela.tel_id,
                };
            });

            setTelas(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tela-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTelasMenu(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaPai();
            await carregaModelo();
            await carregaTela();
            carregaGrid();
        }
        carrega();
    }, []);

    async function grava({
        menId,
        menIdPai,
        menNome,
        menUrl,
        telId,
        mmuId,
        menOrdemPai,
        telInterna,
    }) {
        try {
            const schema = Yup.object().shape({
                menNome: Yup.string()
                    .max(60, 'Tamanho máximo 60 caracteres')
                    .required('Nome do menu é obrigatório'),
                telId: Yup.number().positive('Tela é obrigatória'),
                mmuId: Yup.number().positive('Modelo é obrigatório'),
                telInterna: Yup.boolean().oneOf([true, false], 'Tela interna é obrigatória'),
            });

            await schema.validate(
                { menId, menNome, telId, mmuId, telInterna },
                { abortEarly: false }
            );

            if (!menId) {
                axios({
                    method: 'POST',
                    url: '/menu',
                    data: {
                        men_id: null,
                        men_id_pai: menIdPai,
                        men_nome: menNome,
                        men_url: menUrl,
                        tel_id: telId,
                        mmu_id: mmuId,
                        men_ordem_pai: menOrdemPai,
                        tel_interna: telInterna,
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
                    url: `menu/${menId}`,
                    data: {
                        men_id_pai: menIdPai,
                        men_nome: menNome,
                        men_url: menUrl,
                        tel_id: telId,
                        mmu_id: mmuId,
                        men_ordem_pai: menOrdemPai,
                        tel_interna: telInterna,
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
            url: `menu/${id}`,
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
                <Autorizacao tela="Menus" />
                <Main>
                    <p>Menus</p>
                    <hr />
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={telaMenu} onSubmit={grava}>
                        <Input name="menId" type="hidden" />
                        <Container1>
                            <Select name="menIdPai" label="Menu Pai" options={menusPai} />
                            <Select name="mmuId" label="Modelo" options={modelos} />
                        </Container1>
                        <Container1>
                            <Input
                                name="menNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="60"
                            />
                            <Input
                                name="menUrl"
                                label="Url"
                                type="text"
                                autoFocus
                                maxLength="200"
                            />
                        </Container1>
                        <Container2>
                            <Select name="telId" label="Tela" options={telas} />
                            <Input
                                name="menOrdemPai"
                                label="Ordem pai"
                                type="text"
                                autoFocus
                                maxLength="5"
                            />
                            <TelaInterna name="telInterna" />
                        </Container2>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <Table
                        columns={[
                            { title: 'Pai', field: 'nome_pai' },
                            { title: 'Modelo', field: 'mmu_nome' },
                            { title: 'Item', field: 'men_nome' },
                            { title: 'Url', field: 'men_url' },
                            { title: 'Tela', field: 'tel_nome' },
                            { title: 'Ordem do pai', field: 'men_ordem_pai' },
                        ]}
                        data={telasMenu}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={telaMenu.menId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default TelaMenu;

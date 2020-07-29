import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, ContainerArea, ContainerCampos, Titulo } from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function Sigilo() {
    const [erro, setErro] = useState('');
    const [sigilo, setSigilo] = useState({
        sigId: undefined,
        areaId: -1,
        tprId: -1,
        sigLogin: '',
    });

    const [sigilos, setSigilos] = useState([]);
    const [areas, setAreas] = useState([]);
    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(sigilo);
    }, [sigilo]);

    function abreModalExcluir() {
        if (sigilo.sigId !== null) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    async function carregaArea() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area-sigilo');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id_area,
                };
            });

            setAreas(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaTipoProcesso() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/tipo-processo-sigilo');

            const data = response.data.map(tipoProcesso => {
                return {
                    label: tipoProcesso.tpr_nome,
                    value: tipoProcesso.tpr_id,
                };
            });

            setTiposProcesso(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function limpaCampos() {
        setSigilo({
            ...sigilo,
            sigId: undefined,
            areaId: -1,
            tprId: -1,
            sigLogin: '',
        });

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: `/grid-sigilo/`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setSigilos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});
        setSigilo({
            ...sigilo,
            sigId: linha.sig_id,
            areaId: linha.area_id,
            tprId: linha.tpr_id,
            sigLogin: linha.sig_login,
        });
        posiciona();
    }

    useEffect(() => {
        async function carrega() {
            carregaArea();
            carregaTipoProcesso();
            await carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ sigId, areaId, tprId, sigLogin }) {
        try {
            const schema = Yup.object().shape({
                areaId: Yup.number().positive('Área é obrigatória'),
                tprId: Yup.number().positive('Tipo de processo é obrigatório'),
                sigLogin: Yup.string().required('Login é obrigatório'),
            });

            await schema.validate(
                {
                    sigId,
                    areaId,
                    tprId,
                    sigLogin,
                },
                { abortEarly: false }
            );

            if (!sigId) {
                axios({
                    method: 'POST',
                    url: '/sigilos',
                    data: {
                        sig_id: null,
                        area_id: areaId,
                        tpr_id: tprId,
                        sig_login: sigLogin,
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
                    url: `sigilos/${sigId}`,
                    data: {
                        area_id: areaId,
                        tpr_id: tprId,
                        sig_login: sigLogin,
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
            url: `sigilos/${id}`,
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
                <Autorizacao tela="Sigilos" />
                <Main>
                    <Titulo>
                        <p>Sigilos</p>
                        <hr />
                    </Titulo>

                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={sigilo} onSubmit={grava}>
                        <Input name="sigId" type="hidden" />
                        <ContainerCampos>
                            <Input name="sigLogin" label="Login" type="text" maxLength="50" />
                            <Select
                                name="tprId"
                                label="Selecione o tipo de processo"
                                options={tiposProcesso}
                            />
                        </ContainerCampos>
                        <ContainerArea>
                            <Select name="areaId" label="Selecione a área" options={areas} />
                        </ContainerArea>

                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                        <Table
                            columns={[
                                { title: 'Área', field: 'set_nome', width: 120 },
                                { title: 'Tipo do processo', field: 'tpr_nome', width: 120 },
                                { title: 'Login', field: 'sig_login', width: 50 },
                            ]}
                            data={sigilos}
                            fillData={preencheCampos}
                        />
                    </Form>
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={sigilo.sigId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Sigilo;

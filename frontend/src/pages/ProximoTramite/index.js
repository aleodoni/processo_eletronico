import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import ModalFluxo from '../../components/ModalFluxo';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import {
    Container,
    Main,
    Erro,
    ContainerNomeFluxo,
    ContainerCamposNodos,
    ContainerCamposNodos1,
    Titulo,
} from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import GeraFluxo from '../../components/layout/button/GeraFluxo';
import Limpar from '../../components/layout/button/Limpar';
import ConsultarOutroFluxo from '../../components/layout/button/ConsultarOutroFluxo';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function ProximoTramite() {
    const [erro, setErro] = useState('');
    const [proximoTramite, setProximoTramite] = useState({
        prxId: undefined,
        nodId: -1,
        nodIdProximo: -1,
        razId: -1,
        fluId: -1,
        prxPrioridade: 0,
    });

    const [fluxosVisiveis, setFluxosVisiveis] = useState(true);
    const [nomeFluxosVisiveis, setNomeFluxosVisiveis] = useState(false);
    const [nomeFluxo, setNomeFluxo] = useState('');
    const [grafo, setGrafo] = useState('');
    const [nodosVisiveis, setNodosVisiveis] = useState(false);
    const [fluxos, setFluxos] = useState([]);
    const [razoesTramite, setRazoesTramite] = useState([]);
    const [nodos, setNodos] = useState([]);
    const [nodosProximos, setNodosProximos] = useState([]);
    const [proximosTramites, setProximosTramites] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalFluxo, setModalFluxo] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(proximoTramite);
    }, [proximoTramite]);

    function abreModalExcluir() {
        if (proximoTramite.prxId !== null) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function abreModalFluxo() {
        setModalFluxo(true);
    }

    function fechaModalFluxo() {
        setModalFluxo(false);
    }

    async function carregaRazoesTramite() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/razao-tramite');

            const data = response.data.map(razaoTramite => {
                return {
                    label: razaoTramite.raz_nome,
                    value: razaoTramite.raz_id,
                };
            });

            setRazoesTramite(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaNodos(fluId1) {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/combo-nodo/${fluId1}`);

            const data = response.data.map(nodo => {
                return {
                    label: nodo.set_nome,
                    value: nodo.nod_id,
                };
            });

            setNodos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaNodosProximos(fluId2) {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/combo-nodo/${fluId2}`);

            const data = response.data.map(nodo => {
                return {
                    label: nodo.set_nome,
                    value: nodo.nod_id,
                };
            });

            setNodosProximos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function carregaGrid(fluxo) {
        axios({
            method: 'GET',
            url: `/grid-proximo-tramite/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProximosTramites(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function carregaGrafo(fluxo) {
        axios({
            method: 'GET',
            url: `/gera-grafo/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGrafo(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar grafo.');
            });
    }

    function handleFluId(e) {
        if (e.target.value !== '') {
            setNodosVisiveis(true);
            setFluxosVisiveis(false);
            setNomeFluxosVisiveis(true);
            const index = e.nativeEvent.target.selectedIndex;
            setNomeFluxo(e.nativeEvent.target[index].text);
            setProximoTramite({ fluId: e.target.value });
            carregaRazoesTramite();
            carregaNodos(e.target.value);
            carregaNodosProximos(e.target.value);
            carregaGrid(e.target.value);
            carregaGrafo(e.target.value);
        } else {
            setNodosVisiveis(false);
            setFluxosVisiveis(true);
            setNomeFluxo('');
            setNomeFluxosVisiveis(false);
            setProximoTramite({ fluId: '' });
        }
    }

    async function carregaFluxo() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/fluxos');

            const data = response.data.map(fluxo => {
                return {
                    label: fluxo.flu_nome,
                    value: fluxo.flu_id,
                };
            });

            setFluxos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function limpaCampos() {
        setProximoTramite({
            ...proximoTramite,
            prxId: null,
            nodId: -1,
            nodIdProximo: -1,
            razId: -1,
            fluId: -1,
            prxPrioridade: 0,
        });

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});
        setProximoTramite({
            ...proximoTramite,
            prxId: linha.prx_id,
            nodId: linha.nod_id,
            nodIdProximo: linha.nod_id_proximo,
            razId: linha.raz_id,
            fluId: linha.flu_id,
            prxPrioridade: linha.prx_prioridade,
        });
        posiciona();
    }

    function selecionaOutroFluxo() {
        setNodosVisiveis(false);
        setFluxosVisiveis(true);
        setNomeFluxosVisiveis(false);
        setNomeFluxo('');
        setProximoTramite({ fluId: '' });
    }

    useEffect(() => {
        async function carrega() {
            await carregaFluxo();
        }
        carrega();
    }, []);

    async function grava({ prxId, fluId, nodId, nodIdProximo, razId, prxPrioridade }) {
        try {
            const schema = Yup.object().shape({
                nodId: Yup.number().positive('Nó é obrigatório'),
                nodIdProximo: Yup.number().positive('Nó próximo é obrigatório'),
                razId: Yup.number().positive('Razão é obrigatória'),
                prxPrioridade: Yup.string().required('Prioridade é obrigatória'),
            });

            await schema.validate(
                { nodId, nodIdProximo, razId, prxPrioridade },
                { abortEarly: false }
            );

            if (!prxId) {
                axios({
                    method: 'POST',
                    url: '/proximos-tramites',
                    data: {
                        prx_id: null,
                        flu_id: fluId,
                        nod_id: nodId,
                        nod_id_proximo: nodIdProximo,
                        raz_id: razId,
                        prx_prioridade: prxPrioridade,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Inserido com sucesso.');
                        limpaCampos();
                        carregaGrid(fluId);
                        setProximoTramite({ fluId });
                        carregaGrafo(fluId);
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `proximos-tramites/${prxId}`,
                    data: {
                        flu_id: fluId,
                        nod_id: nodId,
                        nod_id_proximo: nodIdProximo,
                        raz_id: razId,
                        prx_prioridade: prxPrioridade,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Editado com sucesso.');
                        limpaCampos();
                        carregaGrid(fluId);
                        setProximoTramite({ fluId });
                        carregaGrafo(fluId);
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
            url: `proximos-tramites/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Excluído com sucesso.');
                limpaCampos();
                carregaGrid(proximoTramite.fluId);
                setProximoTramite({ fluId: proximoTramite.fluId });
                carregaGrafo(proximoTramite.fluId);
                posiciona();
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Próximos trâmites" />
                <Main>
                    <Titulo>
                        <p>Próximos trâmites</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={proximoTramite} onSubmit={grava}>
                        <Input name="prxId" type="hidden" />
                        <Input name="fluId" type="hidden" />
                        {fluxosVisiveis ? (
                            <FormLine>
                                <Select
                                    name="selectFluxo"
                                    label="Selecione o fluxo"
                                    size={3}
                                    options={fluxos}
                                    onChange={handleFluId}
                                />
                            </FormLine>
                        ) : null}
                        {nomeFluxosVisiveis ? (
                            <ContainerNomeFluxo>
                                <fieldset>
                                    <label>Fluxo: {nomeFluxo}</label>
                                </fieldset>
                                <div>
                                    <ConsultarOutroFluxo
                                        name="btnSelecionaOutroFluxo"
                                        clickHandler={selecionaOutroFluxo}
                                    />
                                </div>
                            </ContainerNomeFluxo>
                        ) : null}
                        {nodosVisiveis ? (
                            <div>
                                <ContainerCamposNodos>
                                    <Select name="nodId" label="Nodo" options={nodos} />
                                    <Select
                                        name="nodIdProximo"
                                        label="Nodo próximo"
                                        options={nodosProximos}
                                    />
                                </ContainerCamposNodos>
                                <ContainerCamposNodos1>
                                    <Select name="razId" label="Razão" options={razoesTramite} />
                                    <Input
                                        name="prxPrioridade"
                                        label="Prioridade"
                                        type="text"
                                        maxLength="2"
                                    />
                                </ContainerCamposNodos1>
                                <ButtonContainer>
                                    <Salvar name="btnSalva" type="submit" />

                                    <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />

                                    <GeraFluxo name="btnGrafico" clickHandler={abreModalFluxo} />
                                </ButtonContainer>
                                <Table
                                    columns={[
                                        { title: 'Nodo', field: 'nodo', width: 300 },
                                        {
                                            title: 'Nodo próximo',
                                            field: 'nodo_proximo',
                                            width: 300,
                                        },
                                        { title: 'Razão', field: 'raz_nome', width: 200 },
                                        {
                                            title: 'Prioridade',
                                            field: 'prx_prioridade',
                                            width: 100,
                                        },
                                    ]}
                                    data={proximosTramites}
                                    fillData={preencheCampos}
                                />
                            </div>
                        ) : null}
                    </Form>
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={proximoTramite.prxId}
                />
                <ModalFluxo fechaModalFluxo={fechaModalFluxo} modalFluxo={modalFluxo} id={grafo} />
            </Container>
        </DefaultLayout>
    );
}

export default ProximoTramite;

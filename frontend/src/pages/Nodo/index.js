import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
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
import Limpar from '../../components/layout/button/Limpar';
import ConsultarOutroFluxo from '../../components/layout/button/ConsultarOutroFluxo';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';
import NoInicio from '../../components/system/select/NoInicio';
import NoFim from '../../components/system/select/NoFim';
import NoAvalExecutiva from '../../components/system/select/NoAvalExecutiva';

function Nodo() {
    const [erro, setErro] = useState('');
    const [nodo, setNodo] = useState({
        nodId: undefined,
        fluId: -1,
        areaId: -1,
        nodInicio: -1,
        nodFim: -1,
        nodAvalExecutiva: -1,
        nodDiasPrazo: 0,
        nodOrdem: 0,
    });

    const [fluxosVisiveis, setFluxosVisiveis] = useState(true);
    const [nomeFluxosVisiveis, setNomeFluxosVisiveis] = useState(false);
    const [nomeFluxo, setNomeFluxo] = useState('');
    const [nodosVisiveis, setNodosVisiveis] = useState(false);
    const [fluxos, setFluxos] = useState([]);
    const [areas, setAreas] = useState([]);
    const [nodos, setNodos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(nodo);
    }, [nodo]);

    function abreModalExcluir() {
        if (nodo.nodId !== null) {
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
        setNodo({
            ...nodo,
            nodId: null,
            fluId: -1,
            areaId: -1,
            nodInicio: -1,
            nodFim: -1,
            nodAvalExecutiva: -1,
            nodDiasPrazo: 0,
            nodOrdem: 0,
        });

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function carregaGrid(fluxo) {
        axios({
            method: 'GET',
            url: `/grid-nodos/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setNodos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function handleFluId(e) {
        if (e.target.value !== '') {
            setNodosVisiveis(true);
            setFluxosVisiveis(false);
            setNomeFluxosVisiveis(true);
            const index = e.nativeEvent.target.selectedIndex;
            setNomeFluxo(e.nativeEvent.target[index].text);
            setNodo({ fluId: e.target.value });
            carregaArea();
            carregaGrid(e.target.value);
        } else {
            setNodosVisiveis(false);
            setFluxosVisiveis(true);
            setNomeFluxo('');
            setNomeFluxosVisiveis(false);
            setNodo({ fluId: '' });
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

    function preencheCampos(linha) {
        formRef.current.setErrors({});
        setNodo({
            ...nodo,
            nodId: linha.nod_id,
            fluId: linha.flu_id,
            areaId: linha.area_id,
            nodInicio: linha.nod_inicio,
            nodFim: linha.nod_fim,
            nodDiasPrazo: linha.nod_dias_prazo,
            nodOrdem: linha.nod_ordem,
            nodAvalExecutiva: linha.nod_aval_executiva,
        });
        posiciona();
    }

    function selecionaOutroFluxo() {
        setNodosVisiveis(false);
        setFluxosVisiveis(true);
        setNomeFluxosVisiveis(false);
        setNomeFluxo('');
        setNodo({ fluId: '' });
    }

    useEffect(() => {
        async function carrega() {
            await carregaFluxo();
        }
        carrega();
    }, []);

    async function grava({
        nodId,
        fluId,
        areaId,
        nodInicio,
        nodFim,
        nodDiasPrazo,
        nodOrdem,
        nodAvalExecutiva,
    }) {
        try {
            const schema = Yup.object().shape({
                areaId: Yup.number().positive('Área do setor é obrigatória'),
                nodInicio: Yup.boolean().oneOf([true, false], 'Selecione o nó inicial'),
                nodFim: Yup.boolean().oneOf([true, false], 'Selecione o nó final'),
                nodDiasPrazo: Yup.string().required('Prazo é obrigatório'),
                nodOrdem: Yup.string().required('Ordem é obrigatória'),
                nodAvalExecutiva: Yup.boolean().oneOf([true, false], 'Tem o aval da executiva?'),
            });

            await schema.validate(
                { areaId, nodInicio, nodFim, nodDiasPrazo, nodOrdem, nodAvalExecutiva },
                { abortEarly: false }
            );

            if (!nodId) {
                axios({
                    method: 'POST',
                    url: '/nodos',
                    data: {
                        nod_id: null,
                        area_id: areaId,
                        flu_id: fluId,
                        nod_inicio: nodInicio,
                        nod_fim: nodFim,
                        nod_dias_prazo: nodDiasPrazo,
                        nod_ordem: nodOrdem,
                        nod_aval_executiva: nodAvalExecutiva,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Inserido com sucesso.');
                        limpaCampos();
                        carregaGrid(fluId);
                        setNodo({ fluId });
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `nodos/${nodId}`,
                    data: {
                        area_id: areaId,
                        flu_id: fluId,
                        nod_inicio: nodInicio,
                        nod_fim: nodFim,
                        nod_dias_prazo: nodDiasPrazo,
                        nod_ordem: nodOrdem,
                        nod_aval_executiva: nodAvalExecutiva,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Editado com sucesso.');
                        limpaCampos();
                        carregaGrid(fluId);
                        setNodo({ fluId });
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
            url: `nodos/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Excluído com sucesso.');
                limpaCampos();
                carregaGrid(nodo.fluId);
                setNodo({ fluId: nodo.fluId });
                posiciona();
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Nodos" />
                <Main>
                    <Titulo>
                        <p>Nodos</p>
                        <hr />
                    </Titulo>

                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={nodo} onSubmit={grava}>
                        <Input name="nodId" type="hidden" />
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
                                    <Select name="areaId" label="Área" options={areas} />
                                    <NoInicio name="nodInicio" />
                                    <NoFim name="nodFim" />
                                </ContainerCamposNodos>
                                <ContainerCamposNodos1>
                                    <Input
                                        name="nodDiasPrazo"
                                        label="Dias de prazo"
                                        type="text"
                                        maxLength="2"
                                    />
                                    <Input
                                        name="nodOrdem"
                                        label="Ordem"
                                        type="text"
                                        maxLength="2"
                                    />
                                    <NoAvalExecutiva name="nodAvalExecutiva" />
                                </ContainerCamposNodos1>
                                <ButtonContainer>
                                    <Salvar name="btnSalva" type="submit" />

                                    <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                                </ButtonContainer>
                                <Table
                                    columns={[
                                        { title: 'Área', field: 'area', width: 480 },
                                        { title: 'Início', field: 'inicio', width: 100 },
                                        { title: 'Fim', field: 'fim', width: 100 },
                                        {
                                            title: 'Prazo(dias)',
                                            field: 'nod_dias_prazo',
                                            width: 100,
                                        },
                                        { title: 'Ordem', field: 'nod_ordem', width: 100 },
                                        { title: 'Aval', field: 'aval_executiva', width: 150 },
                                    ]}
                                    data={nodos}
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
                    id={nodo.nodId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Nodo;

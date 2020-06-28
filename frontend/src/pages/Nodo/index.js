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
    ContainerCamposNodos2,
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
import NoInteressado from '../../components/system/select/NoInteressado';
import NoCiencia from '../../components/system/select/NoCiencia';
import NoCienciaAverbacao from '../../components/system/select/NoCienciaAverbacao';
import NoAverbacao from '../../components/system/select/NoAverbacao';
import NoDecisao from '../../components/system/select/NoDecisao';
import NoAvalHorario from '../../components/system/select/NoAvalHorario';
import NoContagemTempo from '../../components/system/select/NoContagemTempo';
import NoCienciaCalculo from '../../components/system/select/NoCienciaCalculo';

function Nodo() {
    const [erro, setErro] = useState('');
    const [nodo, setNodo] = useState({
        nodId: undefined,
        fluId: -1,
        areaId: -1,
        nodInicio: -1,
        nodFim: -1,
        nodAvalExecutiva: -1,
        nodDecisao: -1,
        nodInteressado: -1,
        nodCiencia: -1,
        nodAverbacao: -1,
        nodCienciaAverbacao: -1,
        nodAvalHorario: -1,
        nodContagemTempo: -1,
        nodCienciaCalculo: -1,
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
            nodInteressado: -1,
            nodCiencia: -1,
            nodAverbacao: -1,
            nodCienciaAverbacao: -1,
            nodDecisao: -1,
            nodAvalHorario: -1,
            nodContagemTempo: -1,
            nodCienciaCalculo: -1,
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
            nodInteressado: linha.nod_interessado,
            nodCiencia: linha.nod_ciencia,
            nodAverbacao: linha.nod_averbacao,
            nodCienciaAverbacao: linha.nod_ciencia_averbacao,
            nodDecisao: linha.nod_decisao,
            nodAvalHorario: linha.nod_aval_horario,
            nodContagemTempo: linha.nod_contagem_tempo,
            nodCienciaCalculo: linha.nod_ciencia_calculo,
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
        nodInteressado,
        nodCiencia,
        nodAverbacao,
        nodCienciaAverbacao,
        nodDecisao,
        nodAvalHorario,
        nodContagemTempo,
        nodCienciaCalculo,
    }) {
        try {
            const schema = Yup.object().shape({
                areaId: Yup.number().positive('Área do setor é obrigatória'),
                nodInicio: Yup.boolean().oneOf([true, false], 'Selecione o nó inicial'),
                nodFim: Yup.boolean().oneOf([true, false], 'Selecione o nó final'),
                nodDiasPrazo: Yup.string().required('Prazo é obrigatório'),
                nodOrdem: Yup.string().required('Ordem é obrigatória'),
                nodAvalExecutiva: Yup.boolean().oneOf([true, false], 'Tem o aval da executiva?'),
                nodInteressado: Yup.boolean().oneOf([true, false], 'É um nó de interessado?'),
                nodCiencia: Yup.boolean().oneOf([true, false], 'É um nó de ciência?'),
                nodAverbacao: Yup.boolean().oneOf([true, false], 'É um nó de averbação?'),
                nodCienciaAverbacao: Yup.boolean().oneOf(
                    [true, false],
                    'É um nó de ciência de averbação?'
                ),
                nodDecisao: Yup.boolean().oneOf([true, false], 'É um nó de decisão?'),
                nodAvalHorario: Yup.boolean().oneOf([true, false], 'É um nó de aval de horário?'),
                nodContagemTempo: Yup.boolean().oneOf(
                    [true, false],
                    'É um nó de contagem de tempo?'
                ),
                nodCienciaCalculo: Yup.boolean().oneOf(
                    [true, false],
                    'É um nó de ciência de cálculo?'
                ),
            });

            await schema.validate(
                {
                    areaId,
                    nodInicio,
                    nodFim,
                    nodDiasPrazo,
                    nodOrdem,
                    nodAvalExecutiva,
                    nodInteressado,
                    nodDecisao,
                    nodAverbacao,
                    nodCiencia,
                    nodCienciaAverbacao,
                    nodAvalHorario,
                    nodContagemTempo,
                    nodCienciaCalculo,
                },
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
                        nod_interessado: nodInteressado,
                        nod_ciencia: nodCiencia,
                        nod_averbacao: nodAverbacao,
                        nod_ciencia_averbacao: nodCienciaAverbacao,
                        nod_decisao: nodDecisao,
                        nod_aval_horario: nodAvalHorario,
                        nod_contagem_tempo: nodContagemTempo,
                        nod_ciencia_calculo: nodCienciaCalculo,
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
                        nod_interessado: nodInteressado,
                        nod_ciencia: nodCiencia,
                        nod_averbacao: nodAverbacao,
                        nod_ciencia_averbacao: nodCienciaAverbacao,
                        nod_decisao: nodDecisao,
                        nod_aval_horario: nodAvalHorario,
                        nod_contagem_tempo: nodContagemTempo,
                        nod_ciencia_calculo: nodCienciaCalculo,
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
                                    <NoDecisao name="nodDecisao" />
                                    <NoInteressado name="nodInteressado" />
                                    <NoCiencia name="nodCiencia" />
                                    <NoAverbacao name="nodAverbacao" />
                                </ContainerCamposNodos1>
                                <ContainerCamposNodos2>
                                    <NoCienciaAverbacao name="nodCienciaAverbacao" />
                                    <NoAvalHorario name="nodAvalHorario" />
                                    <NoContagemTempo name="nodContagemTempo" />
                                    <NoCienciaCalculo name="nodCienciaCalculo" />
                                </ContainerCamposNodos2>
                                <ButtonContainer>
                                    <Salvar name="btnSalva" type="submit" />

                                    <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                                </ButtonContainer>
                                <Table
                                    columns={[
                                        { title: 'Área', field: 'area', width: 580 },
                                        { title: 'Início', field: 'inicio', width: 100 },
                                        { title: 'Fim', field: 'fim', width: 100 },
                                        {
                                            title: 'Prazo(dias)',
                                            field: 'nod_dias_prazo',
                                            width: 100,
                                        },
                                        { title: 'Ordem', field: 'nod_ordem', width: 100 },
                                        { title: 'Aval', field: 'aval_executiva', width: 100 },
                                        { title: 'Decisivo', field: 'decisao', width: 100 },
                                        { title: 'Interessado', field: 'interessado', width: 100 },
                                        { title: 'Ciência', field: 'ciencia', width: 100 },
                                        { title: 'Averbação', field: 'averbacao', width: 100 },
                                        {
                                            title: 'Ciência da averbação',
                                            field: 'ciencia_averbacao',
                                            width: 100,
                                        },
                                        {
                                            title: 'Aval de horário',
                                            field: 'aval_horario',
                                            width: 100,
                                        },
                                        {
                                            title: 'Contagem de tempo',
                                            field: 'contagem_tempo',
                                            width: 100,
                                        },
                                        {
                                            title: 'Ciência de cálculo',
                                            field: 'ciencia_calculo',
                                            width: 100,
                                        },
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

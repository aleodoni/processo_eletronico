/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Container1, Container2, Container3, Main, Erro, Titulo } from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Pessoal from '../../components/system/select/Pessoal';
import TipoProcessoVisivel from '../../components/system/select/TipoProcessoVisivel';
import TramitacaoAberta from '../../components/system/select/TramitacaoAberta';
import Visualizacao from '../../components/system/select/Visualizacao';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function TipoProcesso() {
    const [erro, setErro] = useState('');
    const [tipoProcesso, setTipoProcesso] = useState({
        tprId: undefined,
        tprNome: null,
        tprVisualizacao: -1,
        genId: -1,
        fluId: -1,
        tprPessoal: -1,
        tprPrazoRecurso: 0,
        tprVisivel: -1,
        tprTramitacaoAberta: -1,
    });

    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [fluxos, setFluxos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(tipoProcesso);
    }, [tipoProcesso]);

    function abreModalExcluir() {
        if (tipoProcesso.tprId !== undefined) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setTipoProcesso({
            ...tipoProcesso,
            tprId: undefined,
            tprNome: null,
            tprVisualizacao: -1,
            genId: -1,
            fluId: -1,
            tprPessoal: -1,
            tprPrazoRecurso: 0,
            tprVisivel: -1,
            tprTramitacaoAberta: -1,
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});
        setTipoProcesso({
            ...tipoProcesso,
            tprId: linha.tpr_id,
            tprNome: linha.tpr_nome,
            tprVisualizacao: linha.tpr_visualizacao,
            genId: linha.gen_id,
            fluId: linha.flu_id,
            tprPessoal: linha.tpr_pessoal,
            tprPrazoRecurso: linha.tpr_prazo_recurso,
            tprVisivel: linha.tpr_visivel,
            tprTramitacaoAberta: linha.tpr_tramitacao_aberta,
        });
        posiciona();
    }

    async function carregaGenero() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/generos-total');

            const data = response.data.map(genero => {
                return {
                    label: genero.gen_nome,
                    value: genero.gen_id,
                };
            });
            setGeneros(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
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

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tipos-de-processo',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTiposProcesso(res.data);
            })
            .catch(err => {
                console.log(err);
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaGenero();
            await carregaFluxo();
            carregaGrid();
            posiciona();
        }
        carrega();
    }, []);

    async function grava({
        tprId,
        tprNome,
        tprVisualizacao,
        genId,
        fluId,
        tprPessoal,
        tprPrazoRecurso,
        tprVisivel,
        tprTramitacaoAberta,
    }) {
        try {
            const schema = Yup.object().shape({
                tprNome: Yup.string()
                    .max(150, 'Tamanho máximo 150 caracteres')
                    .required('Nome é obrigatório'),

                tprVisualizacao: Yup.number().oneOf([0, 1, 2], 'Visualização é obrigatória'),
                genId: Yup.number().positive('Gênero é obrigatório'),
                fluId: Yup.number().positive('Fluxo é obrigatório'),
                tprPessoal: Yup.boolean().oneOf([true, false], 'Selecione se é pessoal'),
                tprPrazoRecurso: Yup.number().positive('Prazo de recurso é obrigatório'),
                tprVisivel: Yup.boolean().oneOf([true, false], 'Selecione se é visível'),
                tprTramitacaoAberta: Yup.boolean().oneOf(
                    [true, false],
                    'Selecione se é tramitação aberta'
                ),
            });

            await schema.validate(
                {
                    tprId,
                    tprNome,
                    tprVisualizacao,
                    genId,
                    fluId,
                    tprPessoal,
                    tprPrazoRecurso,
                    tprVisivel,
                    tprTramitacaoAberta,
                },
                { abortEarly: false }
            );

            if (!tprId) {
                axios({
                    method: 'POST',
                    url: '/tipos-processo',
                    data: {
                        tpr_id: null,
                        tpr_nome: tprNome,
                        tpr_visualizacao: tprVisualizacao,
                        gen_id: genId,
                        flu_id: fluId,
                        tpr_pessoal: tprPessoal,
                        tpr_prazo_recurso: tprPrazoRecurso,
                        tpr_visivel: tprVisivel,
                        tpr_tramitacao_aberta: tprTramitacaoAberta,
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
                    url: `tipos-processo/${tprId}`,
                    data: {
                        tpr_nome: tprNome,
                        tpr_visualizacao: tprVisualizacao,
                        gen_id: genId,
                        flu_id: fluId,
                        tpr_pessoal: tprPessoal,
                        tpr_prazo_recurso: tprPrazoRecurso,
                        tpr_visivel: tprVisivel,
                        tpr_tramitacao_aberta: tprTramitacaoAberta,
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
            url: `tipos-processo/${id}`,
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
                <Autorizacao tela="Tipos de processo" />

                <Main>
                    <Titulo>
                        <p>Tipos de processo</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={tipoProcesso} onSubmit={grava}>
                        <Input name="tprId" type="hidden" />
                        <Container1>
                            <Input
                                name="tprNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="150"
                            />
                            <Visualizacao name="tprVisualizacao" />
                        </Container1>
                        <Container2>
                            <Select name="genId" label="Gênero" size={3} options={generos} />
                            <Select name="fluId" label="Fluxo" size={3} options={fluxos} />
                        </Container2>
                        <Container3>
                            <Pessoal name="tprPessoal" />
                            <Input
                                name="tprPrazoRecurso"
                                label="Prazo de recurso"
                                type="text"
                                maxLength="2"
                            />
                            <TipoProcessoVisivel name="tprVisivel" />
                            <TramitacaoAberta name="tprTramitacaoAberta" />
                        </Container3>
                        <ButtonContainer>
                            <Salvar name="btnSalva" clickHandler={grava} />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                    <br />

                    <Table
                        columns={[
                            { title: 'Tipo', field: 'tpr_nome' },
                            { title: 'Visualização', field: 'visualizacao', width: '150px' },
                            { title: 'Gênero', field: 'gen_nome' },
                            { title: 'Fluxo', field: 'flu_nome' },
                            { title: 'Pessoal', field: 'pessoal', width: '70px' },
                            {
                                title: 'Prazo de recurso',
                                field: 'tpr_prazo_recurso',
                                width: '170px',
                            },
                            { title: 'Visível', field: 'visivel', width: '70px' },
                            {
                                title: 'Tramitação aberta',
                                field: 'tramitacao_aberta',
                                width: '100px',
                            },
                        ]}
                        data={tiposProcesso}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={tipoProcesso.tprId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default TipoProcesso;

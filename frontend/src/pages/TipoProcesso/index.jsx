/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Container1, Container2, ContainerBotoes, Main, Erro } from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Pessoal from '../../components/system/select/Pessoal';
import Visualizacao from '../../components/system/select/Visualizacao';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';

function TipoProcesso() {
    const [erro, setErro] = useState('');
    const [tprId, setTprId] = useState(undefined);
    const [tprNome, setTprNome] = useState('');
    const [tprVisualizacao, setTprVisualizacao] = useState('');
    const [genId, setGenId] = useState('');
    const [fluId, setFluId] = useState('');
    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [fluxos, setFluxos] = useState([]);
    const [tprPessoal, setTprPessoal] = useState('');
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    function abreModalExcluir() {
        if (tprNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleTprId(e) {
        setTprId(e.target.value);
    }

    function handleTprNome(e) {
        setTprNome(e.target.value);
    }

    function handleTprVisualizacao(e) {
        setTprVisualizacao(e.value);
    }

    function handleGenId(e) {
        setGenId(e.value);
    }

    function handleFluId(e) {
        setFluId(e.value);
    }

    function handleTprPessoal(e) {
        setTprPessoal(e.value);
    }

    async function carregaGenero() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/generos');

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

    function limpaCampos() {
        setTprId(undefined);
        setTprNome('');
        setTprVisualizacao('');
        setGenId('');
        setFluId('');
        setTprPessoal('');
        setErro('');
    }

    function preencheCampos(linha) {
        setTprId(linha.tpr_id);
        setTprNome(linha.tpr_nome);
        setTprVisualizacao(linha.tpr_visualizacao);
        setGenId(linha.gen_id);
        setFluId(linha.flu_id);
        setTprPessoal(linha.tpr_pessoal);
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
        }
        carrega();
    }, []);

    function grava() {
        if (tprNome.trim() === '') {
            setErro('Tipo de processo em branco.');
            return;
        }
        if (tprVisualizacao === undefined) {
            setErro('Visualização não selecionada.');
            return;
        }
        if (genId === '') {
            setErro('Gênero não selecionado.');
            return;
        }
        if (tprPessoal === '') {
            setErro('Selecione se é pessoal ou não.');
            return;
        }
        if (tprId === undefined) {
            axios({
                method: 'POST',
                url: '/tipos-processo',
                data: {
                    tpr_id: null,
                    tpr_visualizacao: tprVisualizacao,
                    tpr_nome: tprNome,
                    gen_id: genId,
                    flu_id: fluId,
                    tpr_pessoal: tprPessoal,
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
                url: `tipos-processo/${tprId}`,
                data: {
                    tpr_visualizacao: tprVisualizacao,
                    tpr_nome: tprNome,
                    gen_id: genId,
                    flu_id: fluId,
                    tpr_pessoal: tprPessoal,
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
                <Autorizacao tela="Tipos de processo" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef}>
                        <input id="tprId" value={tprId} onChange={handleTprId} type="hidden" />
                        <Container1>
                            <Input required name="tprNome" label="Tipo" type="text" value={tprNome} onChange={handleTprNome} size="100" maxLength="100" />
                            <Visualizacao name="selectVisualizacao" val={tprVisualizacao} onChange={handleTprVisualizacao} />
                        </Container1>
                        <Container2>
                            <Select id="selectGenero" name="selectGenero" label="Gênero" options={generos} onChange={handleGenId} value={generos.filter(({ value }) => value === genId)} />
                            <Select id="selectFluxo" name="selectFluxo" label="Fluxo" options={fluxos} onChange={handleFluId} value={fluxos.filter(({ value }) => value === fluId)} />
                            <Pessoal name="selectPessoal" val={tprPessoal} changeHandler={handleTprPessoal} />
                        </Container2>
                    </Form>
                    <br />
                    <ContainerBotoes>
                        <Salvar name="btnSalva" clickHandler={grava} />

                        <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                        <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                    </ContainerBotoes>
                    <Table
                        columns={[
                            { title: 'Tipo', field: 'tpr_nome' },
                            { title: 'Visualização', field: 'visualizacao' },
                            { title: 'Gênero', field: 'gen_nome' },
                            { title: 'Fluxo', field: 'flu_nome' },
                            { title: 'Pessoal', field: 'pessoal' },
                        ]}
                        data={tiposProcesso}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={tprId} />
            </Container>
        </DefaultLayout>
    );
}

export default TipoProcesso;

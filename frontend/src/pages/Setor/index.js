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
import Ativo from '../../components/system/select/Ativo';
import Tipo from '../../components/system/select/Tipo';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';

function Setor() {
    const [erro, setErro] = useState('');
    const [setId, setSetId] = useState(undefined);
    const [setIdArea, setSetIdArea] = useState('');
    const [setNome, setSetNome] = useState('');
    const [setSigla, setSetSigla] = useState('');
    const [setAtivo, setSetAtivo] = useState('');
    const [setTipo, setSetTipo] = useState('');
    const [setores, setSetores] = useState([]);
    const [areas, setAreas] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    function abreModalExcluir() {
        if (setNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleSetId(e) {
        setSetId(e.target.value);
    }

    function handleSetIdArea(e) {
        setSetIdArea(e.value);
    }

    function handleSetNome(e) {
        setSetNome(e.target.value);
    }

    function handleSetSigla(e) {
        setSetSigla(e.target.value);
    }

    function handleSetAtivo(e) {
        setSetAtivo(e.value);
    }

    function handleSetTipo(e) {
        setSetTipo(e.value);
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
        setSetId(undefined);
        setSetIdArea('');
        setSetNome('');
        setSetSigla('');
        setSetAtivo('');
        setSetTipo('');
        setErro('');
    }

    function preencheCampos(linha) {
        setSetId(linha.set_id);
        setSetIdArea(linha.set_id_area);
        setSetNome(linha.set_nome);
        setSetSigla(linha.set_sigla);
        setSetAtivo(linha.set_ativo);
        setSetTipo(linha.set_tipo);
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
        }
        carrega();
    }, []);

    function grava() {
        if (setNome.trim() === '') {
            setErro('Nome de setor em branco.');
            return;
        }
        if (setSigla.trim() === '') {
            setErro('Sigla de setor em branco.');
            return;
        }
        if (setIdArea === '') {
            setErro('Selecione uma área.');
            return;
        }
        if (setAtivo === '') {
            setErro('Selecione se está ativo o setor.');
            return;
        }
        if (setTipo === '') {
            setErro('Selecione o tipo do setor.');
            return;
        }
        if (setId === undefined) {
            axios({
                method: 'POST',
                url: '/setores',
                data: {
                    set_id: null,
                    set_nome: setNome.trim(),
                    set_sigla: setSigla.trim(),
                    set_id_area: setIdArea,
                    set_ativo: setAtivo,
                    set_tipo: setTipo,
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
                .catch(e => {
                    setErro('Erro ao inserir registro.');
                });
        } else {
            axios({
                method: 'PUT',
                url: `setores/${setId}`,
                data: {
                    set_id_area: setIdArea,
                    set_nome: setNome.trim(),
                    set_sigla: setSigla.trim(),
                    set_ativo: setAtivo,
                    set_tipo: setTipo,
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
            url: `setores/${id}`,
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
                <Autorizacao tela="Setores" />
                <Main>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef}>
                        <input id="setId" value={setId} onChange={handleSetId} type="hidden" />
                        <Container1>
                            <Input required name="setNome" label="Nome" type="text" value={setNome} onChange={handleSetNome} autoFocus size="100" maxLength="100" />
                        </Container1>
                        <Container2>
                            <Input required name="setSigla" label="Sigla" type="text" value={setSigla} onChange={handleSetSigla} size="20" maxLength="20" />

                            <Select id="selectArea" name="selectArea" label="Área" options={areas} onChange={handleSetIdArea} value={areas.filter(({ value }) => value === setIdArea)} />

                            <Ativo name="selectAtivo" val={setAtivo} changeHandler={handleSetAtivo} />

                            <Tipo name="selectAtivo" val={setTipo} changeHandler={handleSetTipo} />
                        </Container2>
                    </Form>
                    <ContainerBotoes>
                        <Salvar name="btnSalva" clickHandler={grava} />

                        <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                        <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                    </ContainerBotoes>

                    <Table
                        columns={[
                            { title: 'Nome', field: 'set_nome' },
                            { title: 'Sigla', field: 'set_sigla' },
                        ]}
                        data={setores}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={setId} />
            </Container>
        </DefaultLayout>
    );
}

export default Setor;

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from 'material-table';
import { FaRegSave, FaRegTrashAlt, FaRegEdit, FaSyncAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import { Container, Container1, Container2, ContainerBotoes, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Ativo from '../../components/system/select/Ativo';
import Tipo from '../../components/system/select/Tipo';

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

    function preencheCampos(set_id, set_id_area, set_nome, set_sigla, set_ativo, set_tipo) {
        setSetId(set_id);
        setSetIdArea(set_id_area);
        setSetNome(set_nome);
        setSetSigla(set_sigla);
        setSetAtivo(set_ativo);
        setSetTipo(set_tipo);
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
        <>
            <Container>
                <Autorizacao tela="Setores" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Setores</legend>
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
                            <button type="button" id="btnSalva" onClick={grava}>
                                <FaRegSave />
                                &nbsp;Salvar
                            </button>
                            <button type="button" id="btnExclui" onClick={abreModalExcluir}>
                                <FaRegTrashAlt />
                                &nbsp;Excluir
                            </button>
                            <button type="button" id="btnLimpa" onClick={limpaCampos}>
                                <FaSyncAlt />
                                &nbsp;Limpar campos
                            </button>
                        </ContainerBotoes>
                        <MaterialTable
                            columns={[
                                { title: 'Nome', field: 'set_nome' },
                                { title: 'Sigla', field: 'set_sigla' },
                            ]}
                            data={setores}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.set_id, linha.set_id_area, linha.set_nome, linha.set_sigla, linha.set_ativo, linha.set_tipo),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                    </fieldset>
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={setId} />
            </Container>
        </>
    );
}

export default Setor;

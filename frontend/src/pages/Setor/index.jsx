import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { FaRegSave, FaRegTrashAlt, FaRegEdit, FaSyncAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import { Container, Container1, Container2, ContainerBotoes, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

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
        setSetIdArea(e.target.value);
    }

    function handleSetNome(e) {
        setSetNome(e.target.value);
    }

    function handleSetSigla(e) {
        setSetSigla(e.target.value);
    }

    function handleSetAtivo(e) {
        setSetAtivo(e.target.value);
    }

    function handleSetTipo(e) {
        setSetTipo(e.target.value);
    }

    function carregaArea() {
        axios({
            method: 'GET',
            url: '/area',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboArea = [];
                comboArea.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboArea.push(
                        <option key={res.data[i].set_id} data-key={res.data[i].set_id} value={res.data[i].set_id}>
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                setAreas(comboArea);
            })
            .catch(() => {
                setErro('Erro ao carregar áreas.');
            });
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
            carregaArea();
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
                        <form noValidate autoComplete="off">
                            <input id="setId" value={setId} onChange={handleSetId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="setNome" type="text" value={setNome} onChange={handleSetNome} autoFocus size="100" maxLength="100" />
                                </fieldset>
                            </Container1>
                            <Container2>
                                <fieldset>
                                    <legend>Sigla</legend>
                                    <input required id="setSigla" type="text" value={setSigla} onChange={handleSetSigla} size="20" maxLength="20" />
                                </fieldset>
                                <fieldset>
                                    <legend>Área</legend>
                                    <select id="selectArea" onChange={handleSetIdArea} value={setIdArea}>
                                        {areas}
                                    </select>
                                </fieldset>

                                <fieldset>
                                    <legend>Ativo?</legend>
                                    <select id="selectAtivo" value={setAtivo} onChange={handleSetAtivo}>
                                        <option key="" data-key="" value="">
                                            Selecione...
                                        </option>
                                        <option key data-key value>
                                            Sim
                                        </option>
                                        <option key={false} data-key={false} value={false}>
                                            Não
                                        </option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Tipo</legend>
                                    <select id="selectTipo" value={setTipo} onChange={handleSetTipo}>
                                        <option key="" data-key="" value="">
                                            Selecione...
                                        </option>
                                        <option key="N" data-key="N" value="N">
                                            Normal
                                        </option>
                                        <option key="G" data-key="G" value="G">
                                            Gabinete
                                        </option>
                                        <option key="E" data-key="E" value="E">
                                            Especial
                                        </option>
                                    </select>
                                </fieldset>
                            </Container2>
                        </form>
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

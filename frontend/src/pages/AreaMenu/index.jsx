import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { FaRegSave, FaRegTrashAlt, FaRegEdit, FaSyncAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import { Container, Container1, ContainerBotoes, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

function AreaMenu() {
    const [erro, setErro] = useState('');
    const [amuId, setAmuId] = useState('');
    const [setId, setSetId] = useState('');
    const [mmuId, setMmuId] = useState('');
    const [setores, setSetores] = useState([]);
    const [modelosMenu, setModelosMenu] = useState([]);
    const [areasMenu, setAreasMenu] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (setId === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleAmuId(e) {
        setAmuId(e.target.value);
    }

    function handleSetId(e) {
        setSetId(e.target.value);
    }

    function handleMmuId(e) {
        setMmuId(e.target.value);
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
                const comboSetor = [];
                comboSetor.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboSetor.push(
                        <option key={res.data[i].set_id} data-key={res.data[i].set_id} value={res.data[i].set_id}>
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                setSetores(comboSetor);
            })
            .catch(() => {
                setErro('Erro ao carregar setores.');
            });
    }

    function carregaModelosMenu() {
        axios({
            method: 'GET',
            url: '/modelo-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboModeloMenu = [];
                comboModeloMenu.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboModeloMenu.push(
                        <option key={res.data[i].mmu_id} data-key={res.data[i].mmu_id} value={res.data[i].mmu_id}>
                            {res.data[i].mmu_nome}
                        </option>
                    );
                }
                setModelosMenu(comboModeloMenu);
            })
            .catch(() => {
                setErro('Erro ao carregar modelos de menu.');
            });
    }

    function limpaCampos() {
        setAmuId('');
        setSetId('');
        setMmuId('');
        setErro('');
    }

    function preencheCampos(amu_id, set_id, mmu_id) {
        setAmuId(amu_id);
        setSetId(parseInt(set_id, 10));
        setMmuId(mmu_id);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/areas-do-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAreasMenu(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaArea();
            carregaModelosMenu();
            carregaGrid();
        }
        carrega();
    }, []);

    function grava() {
        if (setId === '') {
            setErro('Selecione uma área.');
            return;
        }
        if (mmuId === '') {
            setErro('Selecione um modelo de menu.');
            return;
        }
        if (amuId === '') {
            axios({
                method: 'POST',
                url: '/area-menu',
                data: { amu_id: null, set_id: setId, mmu_id: mmuId },
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
                url: `area-menu/${amuId}`,
                data: {
                    set_id: setId,
                    mmu_id: mmuId,
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
            url: `area-menu/${id}`,
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
                <Autorizacao tela="Áreas de menu" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Áreas de menu</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="amuId" value={amuId} onChange={handleAmuId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Área</legend>
                                    <select id="selectArea" onChange={handleSetId} value={setId}>
                                        {setores}
                                    </select>
                                </fieldset>
                                <br />
                                <fieldset>
                                    <legend>Modelo de menu</legend>
                                    <select id="selectModeloMenu" onChange={handleMmuId} value={mmuId}>
                                        {modelosMenu}
                                    </select>
                                </fieldset>
                            </Container1>
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
                                { title: 'Setor', field: 'set_nome' },
                                { title: 'Modelo', field: 'mmu_nome' },
                            ]}
                            data={areasMenu}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.amu_id, linha.set_id, linha.mmu_id),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                    </fieldset>
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={amuId} />
            </Container>
        </>
    );
}

export default AreaMenu;

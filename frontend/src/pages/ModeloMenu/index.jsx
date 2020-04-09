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

function ModeloMenu() {
    const [erro, setErro] = useState('');
    const [mmuId, setMmuId] = useState(undefined);
    const [mmuNome, setMmuNome] = useState('');
    const [modeloMenus, setModeloMenus] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (mmuNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleMmuId(e) {
        setMmuId(e.target.value);
    }

    function handleMmuNome(e) {
        setMmuNome(e.target.value);
    }

    function limpaCampos() {
        setMmuId(undefined);
        setMmuNome('');
        setErro('');
    }

    function preencheCampos(id, nome) {
        setMmuId(id);
        setMmuNome(nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/modelo-menu',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setModeloMenus(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        carregaGrid();
    }, []);

    function grava() {
        if (mmuNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (mmuId === undefined) {
            axios({
                method: 'POST',
                url: '/modelo-menu',
                data: { mmu_id: null, mmu_nome: mmuNome.trim() },
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
                url: `modelo-menu/${mmuId}`,
                data: {
                    mmu_nome: mmuNome.trim(),
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
            url: `modelo-menu/${id}`,
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
                <Autorizacao tela="Modelo de menus" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Modelos de menus</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="mmuId" value={mmuId} onChange={handleMmuId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="mmuNome" type="text" value={mmuNome} onChange={handleMmuNome} autoFocus size="100" maxLength="100" />
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
                                {
                                    hidden: true,
                                    field: 'mmu_id',
                                    type: 'numeric',
                                },
                                { title: 'Nome', field: 'mmu_nome' },
                            ]}
                            data={modeloMenus}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.mmu_id, linha.mmu_nome),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={mmuId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default ModeloMenu;

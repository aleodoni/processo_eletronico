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

function Tela() {
    const [erro, setErro] = useState('');
    const [telId, setTelId] = useState(undefined);
    const [telNome, setTelNome] = useState('');
    const [telas, setTelas] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (telNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleTelId(e) {
        setTelId(e.target.value);
    }

    function handleTelNome(e) {
        setTelNome(e.target.value);
    }

    function limpaCampos() {
        setTelId(undefined);
        setTelNome('');
        setErro('');
    }

    function preencheCampos(id, nome) {
        setTelId(id);
        setTelNome(nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/telas',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTelas(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        carregaGrid();
    }, []);

    function grava() {
        if (telNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (telId === undefined) {
            axios({
                method: 'POST',
                url: '/telas',
                data: { tel_id: null, tel_nome: telNome.trim() },
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
                url: `telas/${telId}`,
                data: {
                    tel_nome: telNome.trim(),
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
            url: `telas/${id}`,
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
                <Autorizacao tela="Telas" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Telas</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="telId" value={telId} onChange={handleTelId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="telNome" type="text" value={telNome} onChange={handleTelNome} autoFocus size="100" maxLength="100" />
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
                                    field: 'tel_id',
                                    type: 'numeric',
                                },
                                { title: 'Nome', field: 'tel_nome' },
                            ]}
                            data={telas}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.tel_id, linha.tel_nome),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={telId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default Tela;

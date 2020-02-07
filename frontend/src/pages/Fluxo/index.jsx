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

function Fluxo() {
    const [erro, setErro] = useState('');
    const [fluId, setFluId] = useState(undefined);
    const [fluNome, setFluNome] = useState('');
    const [fluxos, setFluxos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (fluNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleFluId(e) {
        setFluId(e.target.value);
    }

    function handleFluNome(e) {
        setFluNome(e.target.value);
    }

    function limpaCampos() {
        setFluId(undefined);
        setFluNome('');
        setErro('');
    }

    function preencheCampos(id, nome) {
        setFluId(id);
        setFluNome(nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/fluxos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setFluxos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        carregaGrid();
    }, []);

    function grava() {
        if (fluNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (fluId === undefined) {
            axios({
                method: 'POST',
                url: '/fluxos',
                data: { flu_id: null, flu_nome: fluNome.trim() },
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
                url: `fluxos/${fluId}`,
                data: {
                    flu_nome: fluNome.trim(),
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
            url: `fluxos/${id}`,
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
                <Autorizacao tela="Fluxos" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Fluxos</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="fluId" value={fluId} onChange={handleFluId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="fluNome" type="text" value={fluNome} onChange={handleFluNome} autoFocus size="100" maxLength="100" />
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
                                    field: 'flu_id',
                                    type: 'numeric',
                                },
                                { title: 'Nome', field: 'flu_nome' },
                            ]}
                            data={fluxos}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.flu_id, linha.flu_nome),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={fluId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default Fluxo;

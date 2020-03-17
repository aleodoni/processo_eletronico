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

function RazaoTramite() {
    const [erro, setErro] = useState('');
    const [razId, setRazId] = useState(undefined);
    const [razNome, setRazNome] = useState('');
    const [razoes, setRazoes] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (razNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleRazId(e) {
        setRazId(e.target.value);
    }

    function handleRazNome(e) {
        setRazNome(e.target.value);
    }

    function limpaCampos() {
        setRazId(undefined);
        setRazNome('');
        setErro('');
    }

    function preencheCampos(id, nome) {
        setRazId(id);
        setRazNome(nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/razao-tramite',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setRazoes(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        carregaGrid();
    }, []);

    function grava() {
        if (razNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (razId === undefined) {
            axios({
                method: 'POST',
                url: '/razao-tramite',
                data: { raz_id: null, raz_nome: razNome.trim() },
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
                url: `razao-tramite/${razId}`,
                data: {
                    raz_nome: razNome.trim(),
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
            url: `razao-tramite/${id}`,
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
                <Autorizacao tela="Razões de trâmite" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Razões de trâmite</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="razId" value={razId} onChange={handleRazId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="razNome" type="text" value={razNome} onChange={handleRazNome} autoFocus size="100" maxLength="100" />
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
                                    field: 'raz_id',
                                    type: 'numeric',
                                },
                                { title: 'Nome', field: 'raz_nome' },
                            ]}
                            data={razoes}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.raz_id, linha.raz_nome),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={razId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default RazaoTramite;

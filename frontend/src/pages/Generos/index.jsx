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

function Genero() {
    const [erro, setErro] = useState('');
    const [genId, setGenId] = useState(undefined);
    const [genNome, setGenNome] = useState('');
    const [generos, setGeneros] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (genNome === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function handleGenId(e) {
        setGenId(e.target.value);
    }

    function handleGenNome(e) {
        setGenNome(e.target.value);
    }

    function limpaCampos() {
        setGenId(undefined);
        setGenNome('');
        setErro('');
    }

    function preencheCampos(id, nome) {
        setGenId(id);
        setGenNome(nome);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/generos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGeneros(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        carregaGrid();
    }, []);

    function grava() {
        if (genNome.trim() === '') {
            setErro('Nome em branco.');
            return;
        }
        if (genId === undefined) {
            axios({
                method: 'POST',
                url: '/generos',
                data: { gen_id: null, gen_nome: genNome.trim() },
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
                url: `generos/${genId}`,
                data: {
                    gen_nome: genNome.trim(),
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
            url: `generos/${id}`,
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
                <Autorizacao tela="Gêneros" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Gêneros</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="genId" value={genId} onChange={handleGenId} type="hidden" />
                            <Container1>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input required id="genNome" type="text" value={genNome} onChange={handleGenNome} autoFocus size="100" maxLength="100" />
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
                                    field: 'gen_id',
                                    type: 'numeric',
                                },
                                { title: 'Nome', field: 'gen_nome' },
                            ]}
                            data={generos}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) => preencheCampos(linha.gen_id, linha.gen_nome),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={genId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default Genero;

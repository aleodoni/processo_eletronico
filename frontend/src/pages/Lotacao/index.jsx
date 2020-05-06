import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { FaRegSave, FaRegTrashAlt, FaRegEdit, FaSyncAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import {
    Container,
    Container1,
    Container2,
    ContainerBotoes,
    AsideLeft,
    Main,
    Erro,
} from './styles';
import Header from '../../components/Header';

function Lotacao() {
    const [erro, setErro] = useState('');
    const [matricula, setMatricula] = useState('');
    const [setId, setSetId] = useState('');
    const [pesNome, setPesNome] = useState('');
    const [pesLogin, setPesLogin] = useState('');
    const [setores, setSetores] = useState([]);
    const [lotacoes, setLotacoes] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (pesNome === '') {
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

    function handleMatricula(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setMatricula(e.target.value);
        }
    }

    function handlePesNome(e) {
        setPesNome(e.target.value);
    }

    function handlePesLogin(e) {
        setPesLogin(e.target.value);
    }

    function carregaSetor() {
        axios({
            method: 'GET',
            url: '/setores',
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
                        <option
                            key={res.data[i].set_id}
                            data-key={res.data[i].set_id}
                            value={res.data[i].set_id}>
                            {res.data[i].set_nome.substring(0, 140)}
                        </option>
                    );
                }
                setSetores(comboSetor);
            })
            .catch(() => {
                setErro('Erro ao carregar setores.');
            });
    }

    function limpaCampos() {
        setSetId('');
        setMatricula('');
        setPesNome('');
        setPesLogin('');
        setErro('');
    }

    function preencheCampos(set_id, matricula1, pes_nome, pes_login) {
        setSetId(set_id);
        setMatricula(matricula1);
        setPesNome(pes_nome);
        setPesLogin(pes_login);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/lotacoes',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setLotacoes(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaSetor();
            carregaGrid();
        }
        carrega();
    }, []);

    function insere() {
        if (matricula.trim() === '') {
            setErro('Matrícula em branco.');
            return;
        }
        if (pesNome.trim() === '') {
            setErro('Nome da pessoa em branco.');
            return;
        }
        if (pesLogin.trim() === '') {
            setErro('Login em branco.');
            return;
        }
        if (setId === '') {
            setErro('Selecione um setor.');
            return;
        }

        axios({
            method: 'POST',
            url: '/lotacoes',
            data: {
                matricula: matricula.trim(),
                pes_nome: pesNome.trim(),
                set_id: setId,
                pes_login: pesLogin.trim(),
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
    }

    function apaga(id) {
        axios({
            method: 'DELETE',
            url: `lotacoes/${id}`,
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
                <Autorizacao tela="Lotações" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Lotações</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <Container1>
                                <fieldset>
                                    <legend>Matrícula</legend>
                                    <input
                                        required
                                        id="matricula"
                                        type="text"
                                        value={matricula}
                                        autoFocus
                                        onChange={handleMatricula}
                                        size="6"
                                        maxLength="5"
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Nome</legend>
                                    <input
                                        required
                                        id="pesNome"
                                        type="text"
                                        value={pesNome}
                                        onChange={handlePesNome}
                                        size="74"
                                        maxLength="80"
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Login</legend>
                                    <input
                                        required
                                        id="pesLogin"
                                        type="text"
                                        value={pesLogin}
                                        onChange={handlePesLogin}
                                        size="25"
                                        maxLength="25"
                                    />
                                </fieldset>
                            </Container1>
                            <Container2>
                                <fieldset>
                                    <legend>Setor</legend>
                                    <select id="selectSetor" onChange={handleSetId} value={setId}>
                                        {setores}
                                    </select>
                                </fieldset>
                            </Container2>
                        </form>
                        <ContainerBotoes>
                            <button type="button" id="btnInsere" onClick={insere}>
                                <FaRegSave />
                                &nbsp;Inserir
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
                                { title: 'Matrícula', field: 'matricula' },
                                { title: 'Nome', field: 'pes_nome' },
                                { title: 'Login', field: 'pes_login' },
                            ]}
                            data={lotacoes}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (_event, linha) =>
                                        preencheCampos(
                                            linha.set_id,
                                            linha.matricula,
                                            linha.pes_nome,
                                            linha.pes_login
                                        ),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                    </fieldset>
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={matricula}
                />
            </Container>
        </>
    );
}

export default Lotacao;

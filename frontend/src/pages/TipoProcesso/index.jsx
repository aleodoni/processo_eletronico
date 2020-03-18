import React, { useState, useEffect } from 'react';
import { FaRegSave, FaRegTrashAlt, FaSyncAlt, FaRegEdit } from 'react-icons/fa';
import MaterialTable from 'material-table';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { tabelas } from '../../configs/tabelas';
import { Container, ContainerMenu1, ContainerBotoes, AsideLeft, Main, Erro, ModalApaga } from './styles';
import Header from '../../components/Header';

function TipoProcesso() {
    const [erro, setErro] = useState('');
    const [tprId, setTprId] = useState(undefined);
    const [tprNome, setTprNome] = useState('');
    const [tprVisualizacao, setTprVisualizacao] = useState('');
    const [genId, setGenId] = useState('');
    const [fluId, setFluId] = useState('');
    const [tiposProcesso, setTiposProcesso] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [fluxos, setFluxos] = useState([]);
    const [salva, setSalva] = useState(false);
    const [show, setShow] = useState(false);
    const [mensagemHint, setMensagemHint] = useState('');

    function handleTprId(e) {
        setTprId(e.target.value);
    }

    function handleTprNome(e) {
        setTprNome(e.target.value);
    }

    function handleTprVisualizacao(e) {
        setTprVisualizacao(e.target.value);
    }

    function handleGenId(e) {
        setGenId(e.target.value);
    }

    function handleFluId(e) {
        setFluId(e.target.value);
    }

    function limpaCampos() {
        setTprId(undefined);
        setTprNome('');
        setTprVisualizacao('');
        setGenId('');
        setFluId('');
        setErro('');
    }

    function preencheCampos(tprId, tprVisualizacao, tprNome, genId, fluId) {
        setTprId(tprId);
        setTprNome(tprNome);
        setTprVisualizacao(tprVisualizacao);
        setGenId(genId);
        setFluId(fluId);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/tipos-de-processo',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTiposProcesso(res.data);
            })
            .catch(err => {
                console.log(err);
                setErro('Erro ao carregar registros.');
            });
    }

    function carregaGenero() {
        axios({
            method: 'GET',
            url: '/generos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboGenero = [];
                comboGenero.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboGenero.push(
                        <option key={res.data[i].gen_id} value={res.data[i].gen_id}>
                            {res.data[i].gen_nome}
                        </option>
                    );
                }
                setGeneros(comboGenero);
            })
            .catch(() => {
                setErro('Erro ao carregar gêneros.');
            });
    }

    function carregaFluxo() {
        axios({
            method: 'GET',
            url: '/fluxos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboFluxo = [];
                comboFluxo.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboFluxo.push(
                        <option key={res.data[i].flu_id} value={res.data[i].flu_id}>
                            {res.data[i].flu_nome}
                        </option>
                    );
                }
                setFluxos(comboFluxo);
            })
            .catch(() => {
                setErro('Erro ao carregar fluxos.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaGrid();
            carregaGenero();
            carregaFluxo();
        }
        carrega();
    }, []);

    function abreHint(mensagem) {
        setSalva(true);
        setMensagemHint(mensagem);
    }

    function salvaTela() {
        if (tprNome.trim() === '') {
            setErro('Tipo de processo em branco.');
            return;
        }
        if (tprVisualizacao === undefined) {
            setErro('Visualização não selecionada.');
            return;
        }
        if (genId === '') {
            setErro('Gênero não selecionado.');
            return;
        }
        if (tprId === undefined) {
            axios({
                method: 'POST',
                url: '/tipos-processo',
                data: {
                    tpr_id: null,
                    tpr_visualizacao: tprVisualizacao,
                    tpr_nome: tprNome,
                    gen_id: genId,
                    flu_id: fluId,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    abreHint('Inserido com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao inserir registro.');
                });
        } else {
            axios({
                method: 'PUT',
                url: `tipos-processo/${tprId}`,
                data: {
                    tpr_visualizacao: tprVisualizacao,
                    tpr_nome: tprNome,
                    gen_id: genId,
                    flu_id: fluId,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid();
                    abreHint('Editado com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao editar registro.');
                });
        }
    }

    function fechaModal() {
        setShow(false);
    }

    function exclui() {
        axios({
            method: 'DELETE',
            url: `tipos-processo/${tprId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaGrid();
                abreHint('Excluído com sucesso.');
                fechaModal();
            })
            .catch(err => {
                setErro(err.response.data.error);
                fechaModal();
            });
    }

    function fechaHint() {
        setSalva(false);
        setMensagemHint('');
    }

    function abreModal() {
        if (tprId === undefined) {
            setErro('Selecione um registro para excluir.');
        } else {
            setShow(true);
        }
    }

    return (
        <>
            <Container>
                <Autorizacao tela="Tipos de processo" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Tipos de processo</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="tprId" value={tprId} onChange={handleTprId} type="hidden" />
                            <ContainerMenu1>
                                <fieldset>
                                    <legend>Tipo</legend>
                                    <input required id="tprNome" type="text" value={tprNome} onChange={handleTprNome} size="60" maxLength="60" />
                                </fieldset>
                                <fieldset>
                                    <legend>Visualização</legend>
                                    <select id="selectVisualizacao" onChange={handleTprVisualizacao} value={tprVisualizacao}>
                                        <option key="" value="">
                                            Selecione...
                                        </option>
                                        <option key="0" value="0">
                                            Normal
                                        </option>
                                        <option key="1" value="1">
                                            Restrito
                                        </option>
                                        <option key="2" value="2">
                                            Sigiloso
                                        </option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Gênero</legend>
                                    <select id="selectGenero" onChange={handleGenId} value={genId}>
                                        {generos}
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <legend>Fluxo</legend>
                                    <select id="selectFluxo" onChange={handleFluId} value={fluId}>
                                        {fluxos}
                                    </select>
                                </fieldset>
                            </ContainerMenu1>
                        </form>
                        <ContainerBotoes>
                            <button type="button" id="btnSalva" onClick={salvaTela}>
                                <FaRegSave />
                                &nbsp;Salvar
                            </button>
                            <button type="button" id="btnExclui" onClick={abreModal}>
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
                                    field: 'tpr_id',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'gen_id',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'flu_id',
                                    type: 'numeric',
                                },
                                {
                                    hidden: true,
                                    field: 'tpr_visualizacao',
                                    type: 'numeric',
                                },
                                {
                                    title: 'Nome',
                                    field: 'tpr_nome',
                                },
                                {
                                    title: 'Visualização',
                                    field: 'visualizacao',
                                },
                                {
                                    title: 'Gênero',
                                    field: 'gen_nome',
                                },
                                {
                                    title: 'Fluxo',
                                    field: 'flu_nome',
                                },
                            ]}
                            data={tiposProcesso}
                            actions={[
                                {
                                    icon: () => <FaRegEdit />,
                                    tooltip: 'Editar',
                                    onClick: (event, rowData) => preencheCampos(rowData.tpr_id, rowData.tpr_visualizacao, rowData.tpr_nome, rowData.gen_id, rowData.flu_id),
                                },
                            ]}
                            options={tabelas.opcoes}
                            icons={tabelas.icones}
                            localization={tabelas.localizacao}
                        />
                        <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={salva} onClose={fechaHint} autoHideDuration={500} message={mensagemHint} />
                        <Modal open={show} onClose={fechaModal}>
                            <ModalApaga>
                                <h3>Deseja apagar o registro?</h3>
                                <div>
                                    <button type="submit" startIcon={<Check />} onClick={exclui}>
                                        Sim
                                    </button>
                                    <button type="submit" startIcon={<Clear />} onClick={fechaModal}>
                                        Não
                                    </button>
                                </div>
                            </ModalApaga>
                        </Modal>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default TipoProcesso;

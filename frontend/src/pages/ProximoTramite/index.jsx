import React, { useState, useEffect } from 'react';
import { FaSyncAlt, FaRegSave, FaRegTrashAlt, FaSitemap } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApaga from '../../components/ModalExcluir';
import ModalFluxo from '../../components/ModalFluxo';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { Container, Container1, ContainerNomeFluxo, ContainerCamposNodos, ContainerCamposNodos1, Centralizado, BotaoComoLink, ContainerBotoes, ContainerTabela, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

function ProximoTramite() {
    const [erro, setErro] = useState('');
    const [prxId, setPrxId] = useState('');
    const [prxPrioridade, setPrxPrioridade] = useState('');
    const [nodId, setNodId] = useState('');
    const [nodIdProximo, setNodIdProximo] = useState('');
    const [razId, setRazId] = useState('');
    const [fluId, setFluId] = useState('');
    const [fluxosVisiveis, setFluxosVisiveis] = useState(true);
    const [nomeFluxosVisiveis, setNomeFluxosVisiveis] = useState(false);
    const [nomeFluxo, setNomeFluxo] = useState('');
    const [grafo, setGrafo] = useState('');
    const [nodosVisiveis, setNodosVisiveis] = useState(false);
    const [fluxos, setFluxos] = useState([]);
    const [razoesTramite, setRazoesTramite] = useState([]);
    const [nodos, setNodos] = useState([]);
    const [nodosProximos, setNodosProximos] = useState([]);
    const [proximosTramites, setProximosTramites] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalFluxo, setModalFluxo] = useState(false);

    function abreModalExcluir() {
        if (prxId === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function abreModalFluxo() {
        setModalFluxo(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function fechaModalFluxo() {
        setModalFluxo(false);
    }

    function handleNodId(e) {
        setNodId(e.target.value);
    }

    function handleNodIdProximo(e) {
        setNodIdProximo(e.target.value);
    }

    function carregaRazoesTramite() {
        axios({
            method: 'GET',
            url: '/razao-tramite',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboRazoesTramite = [];
                comboRazoesTramite.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboRazoesTramite.push(
                        <option key={res.data[i].raz_id} data-key={res.data[i].raz_id} value={res.data[i].raz_id}>
                            {res.data[i].raz_nome}
                        </option>
                    );
                }
                setRazoesTramite(comboRazoesTramite);
            })
            .catch(() => {
                setErro('Erro ao carregar razões de trâmite.');
            });
    }

    function carregaNodos(fluId1) {
        axios({
            method: 'GET',
            url: `/combo-nodo/${fluId1}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboNodos = [];
                comboNodos.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboNodos.push(
                        <option key={res.data[i].nod_id} data-key={res.data[i].nod_id} value={res.data[i].nod_id}>
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                setNodos(comboNodos);
            })
            .catch(() => {
                setErro('Erro ao carregar nodos.');
            });
    }

    function carregaNodosProximos(fluId2) {
        axios({
            method: 'GET',
            url: `/combo-nodo/${fluId2}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboNodosProximos = [];
                comboNodosProximos.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboNodosProximos.push(
                        <option key={res.data[i].nod_id} data-key={res.data[i].nod_id} value={res.data[i].nod_id}>
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                setNodosProximos(comboNodosProximos);
            })
            .catch(() => {
                setErro('Erro ao carregar nodos.');
            });
    }

    function carregaGrid(fluxo) {
        axios({
            method: 'GET',
            url: `/grid-proximo-tramite/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProximosTramites(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function carregaGrafo(fluxo) {
        axios({
            method: 'GET',
            url: `/gera-grafo/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGrafo(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar grafo.');
            });
    }

    function handleFluId(e) {
        if (e.target.value !== '') {
            setNodosVisiveis(true);
            setFluxosVisiveis(false);
            setNomeFluxosVisiveis(true);
            const index = e.nativeEvent.target.selectedIndex;
            setNomeFluxo(e.nativeEvent.target[index].text);
            setFluId(e.target.value);
            carregaRazoesTramite();
            carregaNodos(e.target.value);
            carregaNodosProximos(e.target.value);
            carregaGrid(e.target.value);
            carregaGrafo(e.target.value);
        } else {
            setNodosVisiveis(false);
            setFluxosVisiveis(true);
            setNomeFluxo('');
            setNomeFluxosVisiveis(false);
            setFluId('');
        }
    }

    function handleRazId(e) {
        setRazId(e.target.value);
    }

    function handlePrxPrioridade(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPrxPrioridade(e.target.value);
        }
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
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboFluxo.push(
                        <option key={res.data[i].flu_id} data-key={res.data[i].flu_id} value={res.data[i].flu_id}>
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

    function limpaCampos() {
        setPrxId('');
        setPrxPrioridade('');
        setNodId('');
        setNodIdProximo('');
        setRazId('');
        setErro('');
    }

    function preencheCampos(prxId1) {
        axios({
            method: 'GET',
            url: `/seleciona-proximo-tramite/${prxId1}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setPrxId(prxId1);
                setPrxPrioridade(res.data.prx_prioridade);
                setNodId(res.data.nod_id);
                setNodIdProximo(res.data.nod_id_proximo);
                setFluId(res.data.flu_id);
                setRazId(res.data.raz_id);
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function selecionaOutroFluxo() {
        setNodosVisiveis(false);
        setFluxosVisiveis(true);
        setNomeFluxosVisiveis(false);
        setNomeFluxo('');
        setFluId('');
    }

    useEffect(() => {
        async function carrega() {
            carregaFluxo();
        }
        carrega();
    }, []);

    function grava() {
        if (nodId === '') {
            setErro('Selecione o nodo.');
            return;
        }
        if (nodIdProximo === '') {
            setErro('Selecione o nodo próximo.');
            return;
        }
        if (razId === '') {
            setErro('Selecione a razão de trâmite.');
            return;
        }

        if (prxPrioridade === '') {
            setErro('Prioridade em branco.');
            return;
        }

        if (prxId === '') {
            axios({
                method: 'POST',
                url: '/proximos-tramites',
                data: {
                    prx_id: null,
                    flu_id: fluId,
                    nod_id: nodId,
                    nod_id_proximo: nodIdProximo,
                    raz_id: razId,
                    prx_prioridade: prxPrioridade,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid(fluId);
                    mensagem.success('Inserido com sucesso.');
                })
                .catch(() => {
                    setErro('Erro ao inserir registro.');
                });
        } else {
            axios({
                method: 'PUT',
                url: `proximos-tramites/${prxId}`,
                data: {
                    flu_id: fluId,
                    nod_id: nodId,
                    nod_id_proximo: nodIdProximo,
                    raz_id: razId,
                    prx_prioridade: prxPrioridade,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    limpaCampos();
                    carregaGrid(fluId);
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
            url: `proximos-tramites/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaGrid(fluId);
                mensagem.success('Excluído com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <>
            <Container>
                <Autorizacao tela="Próximos trâmites" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Próximos trâmites</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            {fluxosVisiveis ? (
                                <Container1>
                                    <fieldset>
                                        <legend>Selecione o fluxo</legend>
                                        <select id="selectFluxo" onChange={handleFluId} value={fluId}>
                                            {fluxos}
                                        </select>
                                    </fieldset>
                                </Container1>
                            ) : null}
                            {nomeFluxosVisiveis ? (
                                <ContainerNomeFluxo>
                                    <fieldset>
                                        <legend>Fluxo</legend>
                                        {nomeFluxo}
                                    </fieldset>
                                    <button type="button" id="btnSelecionaOutroFluxo" onClick={selecionaOutroFluxo}>
                                        <FaSyncAlt />
                                        &nbsp;Selecionar outro fluxo
                                    </button>
                                </ContainerNomeFluxo>
                            ) : null}
                            {nodosVisiveis ? (
                                <fieldset>
                                    <legend>Próximos trâmites</legend>
                                    <ContainerCamposNodos>
                                        <fieldset>
                                            <legend>Nodo</legend>
                                            <select id="selectNodo" onChange={handleNodId} value={nodId}>
                                                {nodos}
                                            </select>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Nodo próximo</legend>
                                            <select id="selectNodoProximo" onChange={handleNodIdProximo} value={nodIdProximo}>
                                                {nodosProximos}
                                            </select>
                                        </fieldset>
                                    </ContainerCamposNodos>
                                    <ContainerCamposNodos1>
                                        <fieldset>
                                            <legend>Razão</legend>
                                            <select id="selectRazao" onChange={handleRazId} value={razId}>
                                                {razoesTramite}
                                            </select>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Prioridade</legend>
                                            <input id="prxPrioridade" type="text" value={prxPrioridade} onChange={handlePrxPrioridade} size="3" maxLength="2" />
                                        </fieldset>
                                        <button type="button" id="btnGrafico" onClick={abreModalFluxo}>
                                            <FaSitemap />
                                            &nbsp;Gerar fluxo
                                        </button>
                                    </ContainerCamposNodos1>
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
                                    <ContainerTabela>
                                        {proximosTramites.length > 0 ? (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Nodo</th>
                                                        <th>Nodo próximo</th>
                                                        <th>Razão</th>
                                                        <th>Prioridade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {proximosTramites.map(proximos => (
                                                        <tr key={proximos.prx_id}>
                                                            <td>
                                                                <BotaoComoLink type="button" onClick={() => preencheCampos(proximos.prx_id)}>
                                                                    {proximos.nodo}
                                                                </BotaoComoLink>
                                                            </td>
                                                            <td>
                                                                <BotaoComoLink type="button" onClick={() => preencheCampos(proximos.prx_id)}>
                                                                    {proximos.nodo_proximo}
                                                                </BotaoComoLink>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{proximos.raz_nome}</Centralizado>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{proximos.prx_prioridade}</Centralizado>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <label>Sem próximos trâmites no momento.</label>
                                        )}
                                    </ContainerTabela>
                                </fieldset>
                            ) : null}
                        </form>
                    </fieldset>
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={prxId} />
                <ModalFluxo fechaModalFluxo={fechaModalFluxo} modalFluxo={modalFluxo} id={grafo} />
            </Container>
        </>
    );
}

export default ProximoTramite;

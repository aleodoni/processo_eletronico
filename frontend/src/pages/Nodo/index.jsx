import React, { useState, useEffect } from 'react';
import { FaSyncAlt, FaRegSave, FaRegTrashAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { Container, Container1, ContainerNomeFluxo, ContainerCamposNodos, Centralizado, BotaoComoLink, ContainerBotoes, ContainerTabela, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

function Nodo() {
    const [erro, setErro] = useState('');
    const [nodId, setNodId] = useState('');
    const [fluId, setFluId] = useState('');
    const [fluxosVisiveis, setFluxosVisiveis] = useState(true);
    const [nomeFluxosVisiveis, setNomeFluxosVisiveis] = useState(false);
    const [nomeFluxo, setNomeFluxo] = useState('');
    const [nodosVisiveis, setNodosVisiveis] = useState(false);
    const [areaId, setAreaId] = useState('');
    const [nodInicio, setNodInicio] = useState('');
    const [nodFim, setNodFim] = useState('');
    const [fluxos, setFluxos] = useState([]);
    const [areas, setAreas] = useState([]);
    const [nodos, setNodos] = useState([]);
    const [nodDiasPrazo, setNodDiasPrazo] = useState('');
    const [nodOrdem, setNodOrdem] = useState('');
    const [modalExcluir, setModalExcluir] = useState(false);

    function abreModalExcluir() {
        if (nodId === '') {
            setErro('Selecione um registro para apagar.');
            return;
        }
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
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

    function carregaGrid(fluxo) {
        axios({
            method: 'GET',
            url: `/grid-nodos/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setNodos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
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
            carregaArea();
            carregaGrid(e.target.value);
        } else {
            setNodosVisiveis(false);
            setFluxosVisiveis(true);
            setNomeFluxo('');
            setNomeFluxosVisiveis(false);
            setFluId('');
        }
    }

    function handleAreaId(e) {
        setAreaId(e.target.value);
    }

    function handleNodDiasPrazo(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setNodDiasPrazo(e.target.value);
        }
    }

    function handleNodOrdem(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setNodOrdem(e.target.value);
        }
    }

    function handleSetNodInicio(e) {
        setNodInicio(e.target.value);
    }

    function handleSetNodFim(e) {
        setNodFim(e.target.value);
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
        setNodId('');
        setAreaId('');
        setNodInicio('');
        setNodFim('');
        setNodDiasPrazo('');
        setNodOrdem('');
        setErro('');
    }

    function preencheCampos(nodId1) {
        axios({
            method: 'GET',
            url: `/seleciona-nodo/${nodId1}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setNodId(nodId1);
                setNodDiasPrazo(res.data.nod_dias_prazo);
                setNodInicio(res.data.nod_inicio);
                setNodFim(res.data.nod_fim);
                setFluId(res.data.flu_id);
                setAreaId(parseInt(res.data.area_id, 10));
                setNodOrdem(res.data.nod_ordem);
            })
            .catch(() => {
                setErro('Erro ao carregar fluxos.');
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
        if (areaId === '') {
            setErro('Selecione a área.');
            return;
        }
        if (nodInicio === '') {
            setErro('Selecione se é nodo inicial.');
            return;
        }
        if (nodFim === '') {
            setErro('Selecione se é nodo final.');
            return;
        }
        if (nodDiasPrazo.trim() === '') {
            setErro('Dias de prazo em branco.');
            return;
        }
        if (nodOrdem.trim() === '') {
            setErro('Ordem em branco.');
            return;
        }
        if (nodId === '') {
            axios({
                method: 'POST',
                url: '/nodos',
                data: {
                    nod_id: null,
                    flu_id: fluId,
                    area_id: areaId,
                    nod_inicio: nodInicio,
                    nod_fim: nodFim,
                    nod_dias_prazo: nodDiasPrazo,
                    nod_ordem: nodOrdem,
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
                url: `nodos/${nodId}`,
                data: {
                    flu_id: fluId,
                    area_id: areaId,
                    nod_inicio: nodInicio,
                    nod_fim: nodFim,
                    nod_dias_prazo: nodDiasPrazo,
                    nod_ordem: nodOrdem,
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
            url: `nodos/${id}`,
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
                <Autorizacao tela="Nodos" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Nodos</legend>
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
                                    <legend>Nodos</legend>
                                    <ContainerCamposNodos>
                                        <fieldset>
                                            <legend>Área</legend>
                                            <select id="selectArea" onChange={handleAreaId} value={areaId}>
                                                {areas}
                                            </select>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Nó inicial</legend>
                                            <select id="selectNoInicial" value={nodInicio} onChange={handleSetNodInicio}>
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
                                            <legend>Nó final</legend>
                                            <select id="selectNoFinal" value={nodFim} onChange={handleSetNodFim}>
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
                                            <legend>Dias de prazo</legend>
                                            <input id="nodDiasPrazo" type="text" value={nodDiasPrazo} onChange={handleNodDiasPrazo} size="3" maxLength="2" />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Ordem</legend>
                                            <input id="nodOrdem" type="text" value={nodOrdem} onChange={handleNodOrdem} size="3" maxLength="2" />
                                        </fieldset>
                                    </ContainerCamposNodos>
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
                                        {nodos.length > 0 ? (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Área</th>
                                                        <th>Início</th>
                                                        <th>Fim</th>
                                                        <th>Prazo(dias)</th>
                                                        <th>Ordem</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {nodos.map(nodo => (
                                                        <tr key={nodo.nod_id}>
                                                            <td>
                                                                <BotaoComoLink type="button" onClick={() => preencheCampos(nodo.nod_id)}>
                                                                    {nodo.area}
                                                                </BotaoComoLink>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{nodo.inicio}</Centralizado>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{nodo.fim}</Centralizado>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{nodo.nod_dias_prazo}</Centralizado>
                                                            </td>
                                                            <td>
                                                                <Centralizado>{nodo.nod_ordem}</Centralizado>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <label>Sem nodos no momento.</label>
                                        )}
                                    </ContainerTabela>
                                </fieldset>
                            ) : null}
                        </form>
                    </fieldset>
                </Main>
                <ModalApaga modalExcluir={modalExcluir} fechaModalExcluir={fechaModalExcluir} apaga={apaga} id={nodId} />
            </Container>
        </>
    );
}

export default Nodo;

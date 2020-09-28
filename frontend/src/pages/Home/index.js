/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FaFileAlt, FaSistrix } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import Observacao from '../../assets/observacao.gif';
import Autorizacao from '../../components/Autorizacao';
import * as constantes from '../../utils/constantes';

import {
    Container,
    Main,
    ContainerProcessos,
    ContainerBotoes,
    BotaoComoLink,
    Erro,
    BotaoCriaManifestacao,
} from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import ButtonAposentadoriaAdm from '../../components/layout/button/ButtonAposentadoriaAdm';
import DefaultLayout from '../_layouts/default';
import axios from '../../configs/axiosConfig';
import ModalProcesso from '../../components/ModalProcesso';
import ModalProcessoPasPad from '../../components/ModalProcessoPasPad';
import ModalObservacao from '../../components/ModalObservacao';

function Home() {
    const colunaCodigoProcesso = {
        width: '50px',
    };
    const colunaManifestacao = {
        width: '180px',
    };
    const colunaPessoal = {
        textAlign: 'center',
    };

    const history = useHistory();
    const [gridProcessosArea, setGridProcessosArea] = useState([]);
    const [gridProcessosSetor, setGridProcessosSetor] = useState([]);
    const [gridProcessosSigiloso, setGridProcessosSigiloso] = useState([]);
    const [erro, setErro] = useState('');
    const [modalProcesso, setModalProcesso] = useState(false);
    const [modalObservacao, setModalObservacao] = useState(false);
    const [modalProcessoPasPad, setModalProcessoPasPad] = useState(false);
    const [botaoPasPadVisivel, setBotaoPasPadVisivel] = useState(false);
    const [botaoAposentadoriaAdmVisivel, setBotaoAposentadoriaAdmVisivel] = useState(false);
    const [processoModal, setProcessoModal] = useState([]);
    const [processoModalPasPad, setProcessoModalPasPad] = useState([]);
    const [observacaoModal, setObservacaoModal] = useState([]);

    function abreModalProcesso(id) {
        axios({
            method: 'GET',
            url: `/ver-processo/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const processo = res.data;
                for (let i = 0; i < processo.length; i++) {
                    setProcessoModal(processo[i]);
                    setModalProcesso(true);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
    }

    function abreModalObservacao(proId, nodId) {
        axios({
            method: 'GET',
            url: `/ver-observacao/${proId}/${nodId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const observacao = res.data;
                for (let i = 0; i < observacao.length; i++) {
                    setObservacaoModal(observacao[i]); //
                    setModalObservacao(true);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados da observação.');
            });
    }

    function fechaModalObservacao() {
        setModalObservacao(false);
    }

    function abreModalProcessoPasPad(id) {
        axios({
            method: 'GET',
            url: `/ver-processo-pas-pad/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const processo = res.data;
                for (let i = 0; i < processo.length; i++) {
                    setProcessoModalPasPad(processo[i]);
                    setModalProcessoPasPad(true);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    function fechaModalProcessoPasPad() {
        setModalProcessoPasPad(false);
    }

    const carregaGridArea = useCallback(() => {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        axios({
            method: 'GET',
            url: `/processos-area/${areaId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGridProcessosArea(res.data);
                const setId = Number(sessionStorage.getItem('setorUsuario'));
                axios({
                    method: 'GET',
                    url: `/processos-area/${setId}`,
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(resSetor => {
                        const vArea = res.data;
                        const vSetor = resSetor.data;
                        const vSetorNovo = [];
                        for (let i = 0; i < vSetor.length; i++) {
                            const obj = vArea.find(o => o.pro_codigo === vSetor[i].pro_codigo);
                            if (obj === undefined) {
                                vSetorNovo.push(vSetor[i]);
                            }
                        }
                        setGridProcessosSetor(vSetorNovo);
                    })
                    .catch(() => {
                        setErro('Erro ao carregar registros.');
                    });
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    const carregaGridSigiloso = useCallback(() => {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        const login = sessionStorage.getItem('usuario');
        axios({
            method: 'GET',
            url: `/processos-sigiloso/${areaId}/${login}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGridProcessosSigiloso(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    function verificaPadPas(areaId) {
        if (areaId === constantes.AREA_PRESIDENCIA) {
            setBotaoPasPadVisivel(true);
        }
    }

    function verificaAposentadoriaAdm(areaId) {
        if (areaId === constantes.AREA_DARH) {
            setBotaoAposentadoriaAdmVisivel(true);
        }
    }

    useEffect(() => {
        verificaPadPas(parseInt(sessionStorage.getItem('areaUsuario'), 10));
        verificaAposentadoriaAdm(parseInt(sessionStorage.getItem('areaUsuario'), 10));
        carregaGridArea();
        carregaGridSigiloso();
    }, [carregaGridArea, carregaGridSigiloso]);

    function criaManifestacaoPasPad(id, noDecisaoPad) {
        if (noDecisaoPad) {
            history.push(`/manifestacao-cria-decisao-pad/${id}`);
        } else {
            history.push(`/manifestacao-cria-pas-pad/${id}`);
        }
    }

    function criaManifestacao(
        id,
        aval,
        noDecisao,
        noCiencia,
        noAverbacao,
        noCienciaAverbacao,
        noAvalHorario,
        noContagemTempo,
        noCienciaCalculo,
        noParecerProjurisAposentadoria
    ) {
        // se tiver o aval da executiva a manifestação é diferenciada
        if (aval) {
            if (noDecisao) {
                history.push(`/manifestacao-cria-executiva/${id}`);
            } else {
                history.push(`/manifestacao-cria-visto/${id}`);
            }
            // se for uma ciência a manifestação é diferenciada
        } else if (noCiencia) {
            history.push(`/manifestacao-cria-ciencia/${id}`);
            // se se for uma averbação a manifestação é diferenciada
        } else if (noAverbacao) {
            history.push(`/manifestacao-cria-averbacao/${id}`);
            // se se for uma ciência de averbação a manifestação é diferenciada
        } else if (noCienciaAverbacao) {
            history.push(`/manifestacao-cria-ciencia-averbacao/${id}`);
            // se se for um aval de horário especial
        } else if (noAvalHorario) {
            history.push(`/manifestacao-cria-aval-horario/${id}`);
            // se se for uma contagem de tempo
        } else if (noContagemTempo) {
            history.push(`/manifestacao-cria-contagem-tempo/${id}`);
            // se se for uma ciência de cálculo de aposentadoria
        } else if (noCienciaCalculo) {
            history.push(`/manifestacao-cria-ciencia-calculo/${id}`);
            // se se for um parecer do Projuris de aposentadoria
        } else if (noParecerProjurisAposentadoria) {
            history.push(`/manifestacao-cria-parecer-projuris-aposentadoria/${id}`);
        } else {
            history.push(`/manifestacao-cria/${id}`);
        }
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Home" />
                <Main>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <ContainerBotoes>
                        <ButtonAcessoRapido>
                            <Link to="/processo-cria">
                                <FaFileAlt />
                                Criar processo
                            </Link>
                        </ButtonAcessoRapido>
                        <ButtonAcessoRapido>
                            <Link to="/processo-consulta">
                                <FaSistrix />
                                Consultar processos
                            </Link>
                        </ButtonAcessoRapido>
                        {botaoPasPadVisivel ? (
                            <ButtonAcessoRapido>
                                <Link to="/processo-pas-pad">
                                    <FaFileAlt />
                                    Instaurar PAS / PAD
                                </Link>
                            </ButtonAcessoRapido>
                        ) : null}
                        {botaoAposentadoriaAdmVisivel ? (
                            <ButtonAposentadoriaAdm>
                                <Link to="/processo-cria-aposentadoria-adm">
                                    <FaFileAlt />
                                    Criar processo de aposentadoria iniciativa da administração
                                </Link>
                            </ButtonAposentadoriaAdm>
                        ) : null}
                    </ContainerBotoes>
                    <hr />
                    <ContainerProcessos>
                        {gridProcessosSigiloso.length > 0 ? (
                            <div>
                                <p>Processo(s) sigiloso(s):</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessosSigiloso.map(proc => (
                                            <tr key={proc.pro_id}>
                                                <td style={colunaCodigoProcesso}>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={() =>
                                                            abreModalProcessoPasPad(proc.pro_id)
                                                        }>
                                                        {proc.pro_codigo}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>{proc.tpr_nome}</td>
                                                <td style={colunaManifestacao}>
                                                    <>
                                                        {(() => {
                                                            switch (proc.alerta) {
                                                                case 1:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacaoPasPad"
                                                                            cor="vermelho"
                                                                            corHover="vermelho-claro"
                                                                            onClick={() => {
                                                                                criaManifestacaoPasPad(
                                                                                    proc.pro_id,
                                                                                    proc.nod_decisao_pad
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 2:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacaoPasPad"
                                                                            cor="laranja"
                                                                            corHover="laranja-claro"
                                                                            onClick={() => {
                                                                                criaManifestacaoPasPad(
                                                                                    proc.pro_id,
                                                                                    proc.nod_decisao_pad
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 3:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacaoPasPad"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacaoPasPad(
                                                                                    proc.pro_id,
                                                                                    proc.nod_decisao_pad
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacaoPasPad"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacaoPasPad(
                                                                                    proc.pro_id,
                                                                                    proc.nod_decisao_pad
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                            }
                                                        })()}
                                                    </>
                                                </td>
                                                <td>
                                                    <>
                                                        {proc.ind_observacao ? (
                                                            <div data-tip data-for="obs1">
                                                                <img
                                                                    src={Observacao}
                                                                    alt="Existe uma observação de tramitação"
                                                                    width={40}
                                                                    height={40}
                                                                    onClick={() =>
                                                                        abreModalObservacao(
                                                                            proc.pro_id,
                                                                            proc.nod_id
                                                                        )
                                                                    }
                                                                />
                                                                <ReactTooltip
                                                                    id="obs1"
                                                                    effect="float"
                                                                    backgroundColor="#293689">
                                                                    Existe uma observação de
                                                                    tramitação
                                                                </ReactTooltip>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </ContainerProcessos>
                    <br />
                    <ContainerProcessos>
                        {gridProcessosArea.length > 0 ? (
                            <div>
                                <p>
                                    Processos na área: {sessionStorage.getItem('nomeAreaUsuario')}
                                </p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>Pessoal</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessosArea.map(proc => (
                                            <tr key={proc.pro_id}>
                                                <td style={colunaCodigoProcesso}>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={() =>
                                                            abreModalProcesso(proc.pro_id)
                                                        }>
                                                        {proc.pro_codigo}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>{proc.tpr_nome}</td>
                                                <td style={colunaPessoal}>{proc.pessoal}</td>
                                                <td style={colunaManifestacao}>
                                                    <>
                                                        {(() => {
                                                            switch (proc.alerta) {
                                                                case 1:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="vermelho"
                                                                            corHover="vermelho-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    proc.pro_id,
                                                                                    proc.nod_aval_executiva,
                                                                                    proc.nod_decisao,
                                                                                    proc.nod_ciencia,
                                                                                    proc.nod_averbacao,
                                                                                    proc.nod_ciencia_averbacao,
                                                                                    proc.nod_aval_horario,
                                                                                    proc.nod_contagem_tempo,
                                                                                    proc.nod_ciencia_calculo,
                                                                                    proc.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 2:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="laranja"
                                                                            corHover="laranja-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    proc.pro_id,
                                                                                    proc.nod_aval_executiva,
                                                                                    proc.nod_decisao,
                                                                                    proc.nod_ciencia,
                                                                                    proc.nod_averbacao,
                                                                                    proc.nod_ciencia_averbacao,
                                                                                    proc.nod_aval_horario,
                                                                                    proc.nod_contagem_tempo,
                                                                                    proc.nod_ciencia_calculo,
                                                                                    proc.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 3:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    proc.pro_id,
                                                                                    proc.nod_aval_executiva,
                                                                                    proc.nod_decisao,
                                                                                    proc.nod_ciencia,
                                                                                    proc.nod_averbacao,
                                                                                    proc.nod_ciencia_averbacao,
                                                                                    proc.nod_aval_horario,
                                                                                    proc.nod_contagem_tempo,
                                                                                    proc.nod_ciencia_calculo,
                                                                                    proc.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    proc.pro_id,
                                                                                    proc.nod_aval_executiva,
                                                                                    proc.nod_decisao,
                                                                                    proc.nod_ciencia,
                                                                                    proc.nod_averbacao,
                                                                                    proc.nod_ciencia_averbacao,
                                                                                    proc.nod_aval_horario,
                                                                                    proc.nod_contagem_tempo,
                                                                                    proc.nod_ciencia_calculo,
                                                                                    proc.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                            }
                                                        })()}
                                                    </>
                                                </td>
                                                <td>
                                                    <>
                                                        {proc.ind_observacao ? (
                                                            <div data-tip data-for="obs2">
                                                                <img
                                                                    src={Observacao}
                                                                    alt="Existe uma observação de tramitação"
                                                                    width={40}
                                                                    height={40}
                                                                    onClick={() =>
                                                                        abreModalObservacao(
                                                                            proc.pro_id,
                                                                            proc.nod_id
                                                                        )
                                                                    }
                                                                />
                                                                <ReactTooltip
                                                                    id="obs2"
                                                                    effect="float"
                                                                    backgroundColor="#293689">
                                                                    Existe uma observação de
                                                                    tramitação
                                                                </ReactTooltip>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </ContainerProcessos>
                    <ContainerProcessos>
                        {gridProcessosSetor.length > 0 ? (
                            <div>
                                <p>
                                    Processo(s) no(a) {sessionStorage.getItem('nomeSetorUsuario')}
                                </p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>Assunto</th>
                                            <th>Pessoal</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessosSetor.map(procSetor => (
                                            <tr key={procSetor.pro_id}>
                                                <td style={colunaCodigoProcesso}>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={() =>
                                                            abreModalProcesso(procSetor.pro_id)
                                                        }>
                                                        {procSetor.pro_codigo}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>{procSetor.tpr_nome}</td>
                                                <td>{procSetor.pro_nome}</td>
                                                <td style={colunaPessoal}>{procSetor.pessoal}</td>
                                                <td style={colunaManifestacao}>
                                                    <>
                                                        {(() => {
                                                            switch (procSetor.alerta) {
                                                                case 1:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="vermelho"
                                                                            corHover="vermelho-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    procSetor.pro_id,
                                                                                    procSetor.nod_aval_executiva,
                                                                                    procSetor.nod_decisao,
                                                                                    procSetor.nod_ciencia,
                                                                                    procSetor.nod_averbacao,
                                                                                    procSetor.nod_ciencia_averbacao,
                                                                                    procSetor.nod_aval_horario,
                                                                                    procSetor.nod_contagem_tempo,
                                                                                    procSetor.nod_ciencia_calculo,
                                                                                    procSetor.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 2:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="laranja"
                                                                            corHover="laranja-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    procSetor.pro_id,
                                                                                    procSetor.nod_aval_executiva,
                                                                                    procSetor.nod_decisao,
                                                                                    procSetor.nod_ciencia,
                                                                                    procSetor.nod_averbacao,
                                                                                    procSetor.nod_ciencia_averbacao,
                                                                                    procSetor.nod_aval_horario,
                                                                                    procSetor.nod_contagem_tempo,
                                                                                    procSetor.nod_ciencia_calculo,
                                                                                    procSetor.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                case 3:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    procSetor.pro_id,
                                                                                    procSetor.nod_aval_executiva,
                                                                                    procSetor.nod_decisao,
                                                                                    procSetor.nod_ciencia,
                                                                                    procSetor.nod_averbacao,
                                                                                    procSetor.nod_ciencia_averbacao,
                                                                                    procSetor.nod_aval_horario,
                                                                                    procSetor.nod_contagem_tempo,
                                                                                    procSetor.nod_ciencia_calculo,
                                                                                    procSetor.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                                default:
                                                                    return (
                                                                        <BotaoCriaManifestacao
                                                                            name="btnCriaManifestacao"
                                                                            cor="azul"
                                                                            corHover="azul-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
                                                                                    procSetor.pro_id,
                                                                                    procSetor.nod_aval_executiva,
                                                                                    procSetor.nod_decisao,
                                                                                    procSetor.nod_ciencia,
                                                                                    procSetor.nod_averbacao,
                                                                                    procSetor.nod_ciencia_averbacao,
                                                                                    procSetor.nod_aval_horario,
                                                                                    procSetor.nod_contagem_tempo,
                                                                                    procSetor.nod_ciencia_calculo,
                                                                                    procSetor.nod_parecer_projuris_aposentadoria
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Manifestação
                                                                        </BotaoCriaManifestacao>
                                                                    );
                                                            }
                                                        })()}
                                                    </>
                                                </td>
                                                <td>
                                                    <>
                                                        {procSetor.ind_observacao ? (
                                                            <div data-tip data-for="obs1">
                                                                <img
                                                                    src={Observacao}
                                                                    alt="Existe uma observação de tramitação"
                                                                    width={40}
                                                                    height={40}
                                                                    onClick={() =>
                                                                        abreModalObservacao(
                                                                            procSetor.pro_id,
                                                                            procSetor.nod_id
                                                                        )
                                                                    }
                                                                />
                                                                <ReactTooltip
                                                                    id="obsSetor"
                                                                    effect="float"
                                                                    backgroundColor="#293689">
                                                                    Existe uma observação de
                                                                    tramitação
                                                                </ReactTooltip>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </ContainerProcessos>
                    <ModalProcesso
                        fechaModalProcesso={fechaModalProcesso}
                        modalProcesso={modalProcesso}
                        processo={processoModal}
                    />
                    <ModalProcessoPasPad
                        fechaModalProcessoPasPad={fechaModalProcessoPasPad}
                        modalProcessoPasPad={modalProcessoPasPad}
                        processoPasPad={processoModalPasPad}
                    />
                    <ModalObservacao
                        fechaModalObservacao={fechaModalObservacao}
                        modalObservacao={modalObservacao}
                        observacao={observacaoModal}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

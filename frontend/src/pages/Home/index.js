import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FaFileAlt, FaSistrix } from 'react-icons/fa';
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
import DefaultLayout from '../_layouts/default';
import axios from '../../configs/axiosConfig';
import ModalProcesso from '../../components/ModalProcesso';
import ModalProcessoPasPad from '../../components/ModalProcessoPasPad';

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
    const [gridProcessosSigiloso, setGridProcessosSigiloso] = useState([]);
    const [erro, setErro] = useState('');
    const [modalProcesso, setModalProcesso] = useState(false);
    const [modalProcessoPasPad, setModalProcessoPasPad] = useState(false);
    const [processoPasPad, setProcessoPasPad] = useState([]);

    const [botaoPasPadVisivel, setBotaoPasPadVisivel] = useState(false);
    const [processoModal, setProcessoModal] = useState([]);
    const [processoModalPasPad, setProcessoModalPasPad] = useState([]);

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

    useEffect(() => {
        verificaPadPas(parseInt(sessionStorage.getItem('areaUsuario'), 10));
        carregaGridArea();
        carregaGridSigiloso();
    }, [carregaGridArea, carregaGridSigiloso]);

    function criaManifestacaoPasPad(id) {
        history.push(`/manifestacao-cria-pas-pad/${id}`);
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
                        {botaoPasPadVisivel ? (
                            <ButtonAcessoRapido>
                                <Link to="/processo-pas-pad">
                                    <FaFileAlt />
                                    Instaurar PAS / PAD
                                </Link>
                            </ButtonAcessoRapido>
                        ) : null}
                        <ButtonAcessoRapido>
                            <Link to="/processo-consulta">
                                <FaSistrix />
                                Consultar processos
                            </Link>
                        </ButtonAcessoRapido>
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
                                            <th />
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
                                                                                    proc.pro_id
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
                                                                                    proc.pro_id
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
                                                                                    proc.pro_id
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
                                                                                    proc.pro_id
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
                                            <th />
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
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

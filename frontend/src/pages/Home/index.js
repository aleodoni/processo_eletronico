import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaFileAlt, FaSistrix, FaHourglassEnd, FaThumbsUp } from 'react-icons/fa';
import api from '../../service/api';
import Autorizacao from '../../components/Autorizacao';

import {
    Container,
    Main,
    ContainerProcessos,
    ContainerBotoes,
    BotaoComoLink,
    Erro,
    BotaoCriaManifestacao,
    BotaoFinalizaProcesso,
    BotaoCienciaProcesso,
} from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import DefaultLayout from '../_layouts/default';
import axios from '../../configs/axiosConfig';
import ModalProcesso from '../../components/ModalProcesso';
import ModalFinalizar from '../../components/ModalFinalizar';
import ModalCienciaFinal from '../../components/ModalCienciaFinal';
import ModalCiencia from '../../components/ModalCiencia';

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
    const [erro, setErro] = useState('');
    const [modalProcesso, setModalProcesso] = useState(false);
    const [modalFinaliza, setModalFinaliza] = useState(false);
    const [modalCienciaFinal, setModalCienciaFinal] = useState(false);
    const [modalCiencia, setModalCiencia] = useState(false);
    const [proId, setProId] = useState(-1);
    const [proCodigo, setProCodigo] = useState('');
    const [tprId, setTprId] = useState('');
    const [decisao, setDecisao] = useState('');
    const [prazoRecurso, setPrazoRecurso] = useState('');

    function abreModalProcesso(id) {
        setProId(id);
        setModalProcesso(true);
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
    }

    function abreModalFinaliza(id, codigo) {
        setProId(id);
        setProCodigo(codigo);
        setModalFinaliza(true);
    }

    function fechaModalFinaliza() {
        setModalFinaliza(false);
    }

    async function abreModalCiencia(id, codigo, fim) {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/decisao/${id}`);
            if (fim) {
                setDecisao(response.data.visto);
                setPrazoRecurso(response.data.prazo);
                setProId(id);
                setProCodigo(codigo);
                setModalCienciaFinal(true);
            } else {
                setDecisao(response.data.visto);
                setPrazoRecurso(response.data.prazo);
                setProId(id);
                setProCodigo(codigo);
                setTprId(response.data.tpr_id);
                setModalCiencia(true);
            }
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function fechaModalCienciaFinal() {
        setModalCienciaFinal(false);
    }

    function fechaModalCiencia() {
        setModalCiencia(false);
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

    useEffect(() => {
        carregaGridArea();
    }, [carregaGridArea]);

    function criaManifestacao(id, aval, noDecisao) {
        // se tiver o aval da executiva a manifestação é diferenciada
        if (aval) {
            if (noDecisao) {
                history.push(`/manifestacao-cria-executiva/${id}`);
            } else {
                history.push(`/manifestacao-cria-visto/${id}`);
            }
        } else {
            history.push(`/manifestacao-cria/${id}`);
        }
    }

    function finaliza(id) {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        const usuario = sessionStorage.getItem('usuario');

        axios({
            method: 'PUT',
            url: `/encerra/${id}`,
            data: {
                usuario,
                areaId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Processo encerrado com sucesso.');
                carregaGridArea();
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function ciencia(id) {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        const usuario = sessionStorage.getItem('usuario');

        axios({
            method: 'PUT',
            url: `/ciencia/${id}`,
            data: {
                usuario,
                areaId,
                decisao,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Ciência dada com sucesso.');
                carregaGridArea();
            })
            .catch(() => {
                setErro('Erro ao executar ciência.');
            });
    }

    function cienciaTramita(id, tipo) {
        // se for processo do tipo de auxílio funeral
        const AUXILIO_FUNERAL = 22;
        const AREA_DCF = 168;
        const AREA_DARH = 7;
        if (tipo === AUXILIO_FUNERAL) {
            let area;
            // se for Concedido vai para o DCF se for Negado vai para o DARH
            if (decisao === 'Concedido') {
                area = AREA_DCF;
            }
            if (decisao === 'Negado') {
                area = AREA_DARH;
            }
            axios({
                method: 'GET',
                url: `/proximo-tramite/${id}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        // dependendo da decisão ou vai para o DCF ou para o DARH
                        if (res.data[i].set_id === area) {
                            axios({
                                method: 'POST',
                                url: '/tramites',
                                data: {
                                    tra_id: null,
                                    prx_id: res.data[i].prxId,
                                    pro_id: id,
                                    login_envia: sessionStorage.getItem('usuario'),
                                    area_id_envia: sessionStorage.getItem('areaUsuario'),
                                    area_id_recebe: area,
                                },
                                headers: {
                                    authorization: sessionStorage.getItem('token'),
                                },
                            })
                                .then(() => {
                                    mensagem.success('Ciência dada com sucesso.');
                                    carregaGridArea();
                                })
                                .catch(() => {
                                    setErro('Erro ao inserir trâmite.');
                                });
                        }
                    }
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
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
                    </ContainerBotoes>
                    <hr />
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
                                                    {proc.tpr_pessoal === true ? (
                                                        <>
                                                            {proc.nod_ciencia === true ? (
                                                                <BotaoCienciaProcesso
                                                                    name="btnCiencia"
                                                                    onClick={() =>
                                                                        abreModalCiencia(
                                                                            proc.pro_id,
                                                                            proc.pro_codigo,
                                                                            proc.nod_fim
                                                                        )
                                                                    }>
                                                                    <FaThumbsUp />
                                                                    Ciência do processo
                                                                </BotaoCienciaProcesso>
                                                            ) : (
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
                                                                                    </BotaoCriaManifestacao>
                                                                                );
                                                                        }
                                                                    })()}
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {proc.nod_fim === true ? (
                                                                <BotaoFinalizaProcesso
                                                                    name="btnCriaManifestacao"
                                                                    onClick={() =>
                                                                        abreModalFinaliza(
                                                                            proc.pro_id,
                                                                            proc.pro_codigo
                                                                        )
                                                                    }>
                                                                    <FaHourglassEnd />
                                                                    Finalizar processo
                                                                </BotaoFinalizaProcesso>
                                                            ) : (
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
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
                                                                                                proc.nod_decisao
                                                                                            );
                                                                                        }}>
                                                                                        <FaFileAlt />
                                                                                        Criar
                                                                                        manifestação
                                                                                    </BotaoCriaManifestacao>
                                                                                );
                                                                        }
                                                                    })()}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
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
                        proId={proId}
                    />
                    <ModalFinalizar
                        fechaModalFinaliza={fechaModalFinaliza}
                        modalFinaliza={modalFinaliza}
                        finaliza={finaliza}
                        id={proId}
                        proCodigo={proCodigo}
                    />
                    <ModalCienciaFinal
                        fechaModalCiencia={fechaModalCienciaFinal}
                        modalCiencia={modalCienciaFinal}
                        ciencia={ciencia}
                        id={proId}
                        proCodigo={proCodigo}
                        decisao={decisao}
                        prazo={prazoRecurso}
                    />
                    <ModalCiencia
                        fechaModalCiencia={fechaModalCiencia}
                        modalCiencia={modalCiencia}
                        cienciaTramita={cienciaTramita}
                        id={proId}
                        proCodigo={proCodigo}
                        decisao={decisao}
                        tprId={tprId}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

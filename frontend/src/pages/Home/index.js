import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FaFileAlt, FaSistrix } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';

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
    const [proId, setProId] = useState(-1);

    function abreModalProcesso(id) {
        setProId(id);
        setModalProcesso(true);
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
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

    function criaManifestacao(
        id,
        aval,
        noDecisao,
        noCiencia,
        noAverbacao,
        noCienciaAverbacao,
        noAvalHorario
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
                                                                                    proc.nod_aval_horario
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Criar manifestação
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
                                                                                    proc.nod_aval_horario
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Criar manifestação
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
                                                                                    proc.nod_aval_horario
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Criar manifestação
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
                                                                                    proc.nod_aval_horario
                                                                                );
                                                                            }}>
                                                                            <FaFileAlt />
                                                                            Criar manifestação
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
                        proId={proId}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

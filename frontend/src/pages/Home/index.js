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
} from './styles';
import ButtonAcessoRapido from '../../components/layout/button/ButtonAcessoRapido';
import DefaultLayout from '../_layouts/default';
import axios from '../../configs/axiosConfig';
import CriaManifestacao from '../../components/layout/button/CriaManifestacao';
import ModalProcesso from '../../components/ModalProcesso';

function Home() {
    const colunaCodigoProcesso = {
        width: '50px',
    };
    const colunaManifestacao = {
        width: '190px',
    };
    const history = useHistory();
    const [gridProcessosPessoal, setGridProcessosPessoal] = useState([]);
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

    const carregaGridPessoal = useCallback(() => {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        const usuario = sessionStorage.getItem('usuario');
        axios({
            method: 'GET',
            url: `/processos-pessoa/${areaId}/${usuario}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGridProcessosPessoal(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

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
        carregaGridPessoal();
        carregaGridArea();
    }, [carregaGridPessoal, carregaGridArea]);

    function criaManifestacao(id, aval) {
        // se tiver o aval da executiva a manifestação é diferenciada
        if (aval) {
            history.push(`/manifestacao-cria-executiva/${id}`);
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
                    <br />
                    <ContainerProcessos>
                        {gridProcessosPessoal.length > 0 ? (
                            <div>
                                <p>Processos de: {sessionStorage.getItem('nomeUsuario')}</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessosPessoal.map(proc => (
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
                                                <td style={colunaManifestacao}>
                                                    <CriaManifestacao
                                                        name="btnCriaManifestacao"
                                                        clickHandler={() => {
                                                            criaManifestacao(
                                                                proc.pro_id,
                                                                proc.nod_aval_executiva
                                                            );
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                        <br />
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
                                                <td style={colunaManifestacao}>
                                                    <CriaManifestacao
                                                        name="btnCriaManifestacao"
                                                        clickHandler={() => {
                                                            criaManifestacao(
                                                                proc.pro_id,
                                                                proc.nod_aval_executiva
                                                            );
                                                        }}
                                                    />
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

import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { FaFileAlt } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';

import {
    Container,
    Main,
    ContainerProcessos,
    BotaoComoLink,
    Erro,
    BotaoCriaManifestacao,
} from './styles';
import DefaultLayout from '../_layouts/default';
import axios from '../../configs/axiosConfig';
import ModalProcesso from '../../components/ModalProcesso';

function Home() {
    const colunaCodigoProcesso = {
        width: '50px',
    };
    const colunaManifestacao = {
        width: '100px',
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
            .then((res) => {
                setGridProcessosArea(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    useEffect(() => {
        carregaGridArea();
    }, [carregaGridArea]);

    function criaManifestacao(id) {
        history.push(`/manifestacao-cria/${id}`);
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Home" />

                <Main>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <hr />
                    <ContainerProcessos>
                        {gridProcessosArea.length > 0 ? (
                            <div>
                                <p>
                                    Processos no órgão: {sessionStorage.getItem('nomeAreaUsuario')}
                                </p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>Nome</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridProcessosArea.map((proc) => (
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
                                                <td>{proc.pro_nome}</td>
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
                                                                            name="btnCriaManifestacao"
                                                                            cor="laranja"
                                                                            corHover="laranja-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
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
                                                                            name="btnCriaManifestacao"
                                                                            cor="verde"
                                                                            corHover="verde-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
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
                                                                            name="btnCriaManifestacao"
                                                                            cor="verde"
                                                                            corHover="verde-claro"
                                                                            onClick={() => {
                                                                                criaManifestacao(
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

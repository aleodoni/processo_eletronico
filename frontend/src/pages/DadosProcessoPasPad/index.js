import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaFileAlt } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import GeraFluxo from '../../components/layout/button/GeraFluxo';
import Juntada from '../../components/layout/button/Juntada';
import CriaManifestacao from '../../components/layout/button/CriaManifestacao';
import TabelaManifestacoes from '../../components/TabelaManifestacoes';
import TabelaTramitacao from '../../components/TabelaTramitacao';
import TabelaMembrosComissao from '../../components/TabelaMembrosComissao';
import TabelaNomePasPad from '../../components/TabelaNomePasPad';
import {
    Container,
    Main,
    Erro,
    ContainerIniciativa,
    ContainerDados,
    ContainerBotoes,
    ContainerManifestacoes,
    ContainerTramitacao,
    ContainerMembros,
    ContainerNomes,
    ContainerProcessoOrigem,
} from './styles';

require('dotenv').config();

function DadosProcessoPasPad({ match }) {
    const proId = match.params.id;
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [processos, setProcessos] = useState([]);
    const [mostraProcesso, setMostraProcesso] = useState(false);
    const [processosOrigem, setProcessosOrigem] = useState([]);

    const formRef = useRef(null);

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo-pas-pad/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProcessos(res.data);
                setMostraProcesso(true);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [proId]);

    const carregaProcessoOrigem = useCallback(() => {
        if (proId !== undefined) {
            axios({
                method: 'GET',
                url: `/processo-origem/${proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    const processoOrigem = [];
                    for (let i = 0; i < res.data.length; i++) {
                        processoOrigem.push({
                            pro_id_origem: res.data[i].pro_id_origem,
                            processo_origem: res.data[i].processo_origem,
                            tpr_nome: res.data[i].tpr_nome,
                        });
                    }
                    setProcessosOrigem(processoOrigem);
                })
                .catch(() => {
                    console.log('Erro ao carregar processo de origem.');
                });
        }
    }, [proId]);

    useEffect(() => {
        mensagem.success('Carregando processo...');
        carregaDadosProcesso();
        carregaProcessoOrigem();
    }, [carregaDadosProcesso, carregaProcessoOrigem]);

    function criaGrafo(fluId) {
        axios({
            method: 'GET',
            responseType: 'blob',
            url: `/cria-grafo/${fluId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const blob = new Blob([res.data], { type: res.data.type });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = res.headers['content-disposition'];
                let fileName = `fluxo.png`;
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                setErro('Erro ao carregar grafo.');
            });
    }

    function criaManifestacao() {
        history.push(`/manifestacao-cria-pas-pad/${proId}`);
    }

    function geraJuntada(proIdJuntada) {
        axios({
            method: 'GET',
            url: `/gera-juntada/${proIdJuntada}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
                Accept: 'application/pdf',
            },
            responseType: 'blob',
        })
            .then(res => {
                const blob = new Blob([res.data], { type: res.data.type });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = res.headers['content-disposition'];
                let fileName = `juntada${proIdJuntada}.pdf`;
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                setErro('Erro ao gerar juntada.');
            });
    }

    return (
        <DefaultLayout>
            {mostraProcesso ? (
                <Container>
                    <Autorizacao tela="Dados processo" />
                    <Main>
                        <Form ref={formRef}>
                            {processos.map(pro => (
                                <div key={pro.pro_id}>
                                    <h3>
                                        <FaFileAlt />
                                        {` Processo nº ${pro.pro_codigo}`}
                                    </h3>
                                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                                    <input id="proId" value={proId} type="hidden" />
                                    {!pro.pro_encerramento &&
                                    parseInt(pro.area_id, 10) ===
                                        parseInt(sessionStorage.getItem('areaUsuario'), 10) &&
                                    !pro.nod_fim ? (
                                        <ContainerBotoes>
                                            <CriaManifestacao
                                                name="btnCriaManifestacao"
                                                clickHandler={() => {
                                                    criaManifestacao();
                                                }}
                                            />
                                            <GeraFluxo
                                                name="btnGrafico"
                                                clickHandler={() => criaGrafo(pro.flu_id)}
                                            />
                                            <Juntada
                                                name="btnJuntada"
                                                clickHandler={() => geraJuntada(pro.pro_id)}
                                            />
                                            <br />
                                        </ContainerBotoes>
                                    ) : (
                                        <ContainerBotoes>
                                            <GeraFluxo
                                                name="btnGrafico"
                                                clickHandler={() => criaGrafo(pro.flu_id)}
                                            />
                                            <Juntada
                                                name="btnJuntada"
                                                clickHandler={() => geraJuntada(pro.pro_id)}
                                            />
                                            <br />
                                        </ContainerBotoes>
                                    )}
                                    {processosOrigem.length > 0 ? (
                                        <>
                                            <p>Processo de origem</p>
                                            <ContainerProcessoOrigem>
                                                {processosOrigem.map(linha => (
                                                    <label key={linha.pro_id}>
                                                        {linha.processo_origem} - {linha.tpr_nome}
                                                    </label>
                                                ))}
                                            </ContainerProcessoOrigem>
                                        </>
                                    ) : null}
                                    <ContainerIniciativa>
                                        <p>Iniciativa</p>
                                        <fieldset>
                                            {pro.pro_iniciativa} - {pro.pro_tipo_iniciativa}
                                        </fieldset>
                                    </ContainerIniciativa>
                                    <br />
                                    <ContainerNomes>
                                        <p>Nomes</p>
                                        <TabelaNomePasPad proId={proId} />
                                    </ContainerNomes>
                                    <br />
                                    <ContainerDados>
                                        <p>Dados do processo</p>
                                        <br />
                                        <fieldset>
                                            {pro.gen_nome ? (
                                                <div>
                                                    <label>Espécie:</label>
                                                    <span>{pro.gen_nome}</span>
                                                </div>
                                            ) : null}
                                            {pro.tpr_nome ? (
                                                <div>
                                                    <label>Tipo do processo:</label>
                                                    <span>{pro.tpr_nome}</span>
                                                </div>
                                            ) : null}
                                            {pro.visualizacao ? (
                                                <div>
                                                    <label>Visualização:</label>
                                                    <span>{pro.visualizacao}</span>
                                                </div>
                                            ) : null}
                                            {pro.pro_assunto ? (
                                                <div>
                                                    <label>Irregularidade:</label>
                                                    <span>{pro.pro_assunto}</span>
                                                </div>
                                            ) : null}
                                            {pro.pro_autuacao ? (
                                                <div>
                                                    <label>Autuação:</label>
                                                    <span>{pro.pro_autuacao}</span>
                                                </div>
                                            ) : null}
                                            {pro.usu_autuador ? (
                                                <div>
                                                    <label>Usuário autuador:</label>
                                                    <span>{pro.usu_autuador}</span>
                                                </div>
                                            ) : null}
                                            {pro.flu_nome ? (
                                                <div>
                                                    <label>Fluxo:</label>
                                                    <span>{pro.flu_nome}</span>
                                                </div>
                                            ) : null}
                                            {pro.area_atual_processo ? (
                                                <div>
                                                    <label>Área atual do processo:</label>
                                                    <span>{pro.area_atual_processo}</span>
                                                </div>
                                            ) : null}
                                            {pro.pro_ultimo_tramite ? (
                                                <div>
                                                    <label>Último trâmite:</label>
                                                    <span>{pro.pro_ultimo_tramite}</span>
                                                </div>
                                            ) : null}
                                            {pro.usu_finalizador ? (
                                                <div>
                                                    <label>Usuário finalizador:</label>
                                                    <span>
                                                        {pro.usu_finalizador} -{' '}
                                                        {pro.setor_finalizador_processo}
                                                    </span>
                                                </div>
                                            ) : null}
                                        </fieldset>
                                    </ContainerDados>
                                </div>
                            ))}
                            <ContainerMembros>
                                <p>Membros da comissão</p>
                                <TabelaMembrosComissao proId={proId} />
                            </ContainerMembros>
                            <ContainerManifestacoes>
                                <p>Manifestações</p>
                                <TabelaManifestacoes proId={proId} />
                            </ContainerManifestacoes>
                            <ContainerTramitacao>
                                <p>Tramitação</p>
                                <TabelaTramitacao proId={proId} />
                            </ContainerTramitacao>
                        </Form>
                    </Main>
                </Container>
            ) : null}
        </DefaultLayout>
    );
}
DadosProcessoPasPad.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default DadosProcessoPasPad;

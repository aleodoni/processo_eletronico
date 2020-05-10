import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AnexoArquivo from './AnexoArquivo';
import axios from '../../configs/axiosConfig';
import './react-tabs.css';

import {
    ContainerCodigoProcesso,
    ContainerModal,
    ContainerBotaoFecha,
    ContainerIniciativa,
    ContainerDados,
    ContainerArquivos,
    ContainerManifestacoes,
    ContainerTramites,
    BotaoComoLinkManifestacoes,
} from './styles';

const ModalProcesso = props => {
    const dialogs = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #303f9f',
            backgroundColor: '#303f9f',
            padding: '5px',
        },
    };
    const { fechaModalProcesso, modalProcesso, proId } = props;
    const [processos, setProcessos] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [anexosManifestacao, setAnexosManifestacao] = useState([]);
    const [tramites, setTramites] = useState([]);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcesso(e.target.value);
        }
    }

    function downloadAnexoManifestacao(e, arqId, id, arqNome) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: `/download-manifestacao/${id}/${arqId}`,
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
                let fileName = arqNome;
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
                console.log('Erro ao efetuar o download do anexo.');
            });
    }

    const carregaAnexos = useCallback(() => {
        axios({
            method: 'GET',
            url: `/arquivos-processo/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAnexos(res.data);
            })
            .catch(() => {
                console.log('Erro ao carregar anexos.');
            });
    }, [proId]);

    const carregaAnexosManifestacao = useCallback(() => {
        axios({
            method: 'GET',
            url: `/arquivos-manifestacao/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAnexosManifestacao(res.data);
            })
            .catch(() => {
                console.log('Erro ao carregar manifestações.');
            });
    }, [proId]);

    const carregaTramites = useCallback(() => {
        axios({
            method: 'GET',
            url: `/grid-tramites/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setTramites(res.data);
            })
            .catch(() => {
                console.log('Erro ao carregar trâmites.');
            });
    }, [proId]);

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProcessos(res.data);
            })
            .catch(() => {
                console.log('Erro ao carregar trâmites.');
            });
    }, [proId]);

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
            await carregaAnexos();
            await carregaAnexosManifestacao();
            await carregaTramites();
        }
        carrega();
    }, [carregaDadosProcesso, carregaAnexos, carregaAnexosManifestacao, carregaTramites]);

    return (
        <>
            <Modal
                isOpen={modalProcesso}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                {processos.map(pro => (
                    <div key={pro.pro_id}>
                        <ContainerCodigoProcesso>
                            <p>{`Processo: ${pro.pro_codigo}`}</p>
                        </ContainerCodigoProcesso>

                        <ContainerModal>
                            <div>
                                <Tabs>
                                    <TabList>
                                        <Tab>Dados Gerais</Tab>
                                        <Tab>Anexos</Tab>
                                        <Tab>Manifestações</Tab>
                                        <Tab>Trâmites</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <ContainerIniciativa>
                                            <p>Iniciativa</p>
                                            <div>
                                                {pro.pro_iniciativa} - {pro.pro_tipo_iniciativa}
                                            </div>
                                            <hr />
                                        </ContainerIniciativa>
                                        {pro.pro_nome ? (
                                            <ContainerDados>
                                                <p>Dados da Iniciativa</p>
                                                {pro.pro_matricula ? (
                                                    <div>
                                                        <label>Matrícula:</label>
                                                        <span>{pro.pro_matricula}</span>
                                                    </div>
                                                ) : null}
                                                <div>
                                                    <label>Nome:</label>
                                                    <span>{pro.pro_nome}</span>
                                                </div>
                                                {pro.pro_cpf ? (
                                                    <div>
                                                        <label>Cpf:</label>
                                                        <span>{pro.pro_cpf}</span>
                                                    </div>
                                                ) : null}
                                                {pro.pro_cnpj ? (
                                                    <div>
                                                        <label>Cnpj:</label>
                                                        <span>{pro.pro_cnpj}</span>
                                                    </div>
                                                ) : null}
                                                {pro.pro_fone ? (
                                                    <div>
                                                        <label>Fone:</label>
                                                        <span>{pro.pro_fone}</span>
                                                    </div>
                                                ) : null}
                                                {pro.pro_celular ? (
                                                    <div>
                                                        <label>Celular:</label>
                                                        <span>{pro.pro_celular}</span>
                                                    </div>
                                                ) : null}
                                                {pro.pro_email ? (
                                                    <div>
                                                        <label>Email:</label>
                                                        <span>{pro.pro_email}</span>
                                                    </div>
                                                ) : null}
                                                {pro.pro_contato_pj ? (
                                                    <div>
                                                        <label>Contato PJ:</label>
                                                        <span>{pro.pro_contato_pj}</span>
                                                    </div>
                                                ) : null}
                                                <hr />
                                            </ContainerDados>
                                        ) : null}
                                        <ContainerDados>
                                            <p>Dados do processo</p>
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
                                                    <label>Assunto:</label>
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
                                                    <span>
                                                        {pro.usu_autuador} -{' '}
                                                        {pro.setor_autuador_processo}
                                                    </span>
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
                                            {pro.area_iniciativa_processo ? (
                                                <div>
                                                    <label>Área de iniciativa do processo:</label>
                                                    <span>{pro.area_iniciativa_processo}</span>
                                                </div>
                                            ) : null}
                                            {pro.pro_ultimo_tramite ? (
                                                <div>
                                                    <label>Último trâmite:</label>
                                                    <span>{pro.pro_ultimo_tramite}</span>
                                                </div>
                                            ) : null}
                                            {pro.pro_encerramento ? (
                                                <div>
                                                    <label>Encerramento:</label>
                                                    <span>{pro.pro_encerramento}</span>
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
                                        </ContainerDados>
                                    </TabPanel>
                                    <TabPanel>
                                        <ContainerArquivos>
                                            {anexos.length > 0 ? (
                                                <div>
                                                    <p>Arquivo(s) em anexo:</p>
                                                    <AnexoArquivo proId={proId} anexos={anexos} />
                                                </div>
                                            ) : (
                                                <p>Sem anexos.</p>
                                            )}
                                        </ContainerArquivos>
                                    </TabPanel>
                                    <TabPanel>
                                        <ContainerManifestacoes>
                                            {anexosManifestacao.length > 0 ? (
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Seq</th>
                                                                <th>Documento</th>
                                                                <th>Tipo</th>
                                                                <th>Arquivo</th>
                                                                <th>Data</th>
                                                                <th>Área</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {anexosManifestacao.map(anexo => (
                                                                <tr key={anexo.man_id}>
                                                                    <td>{anexo.contador}</td>
                                                                    <td>{anexo.tpd_nome}</td>
                                                                    <td>{anexo.tmn_nome}</td>
                                                                    <td>
                                                                        <BotaoComoLinkManifestacoes
                                                                            type="button"
                                                                            onClick={e =>
                                                                                downloadAnexoManifestacao(
                                                                                    e,
                                                                                    anexo.arq_id,
                                                                                    anexo.manId,
                                                                                    anexo.arq_nome
                                                                                )
                                                                            }>
                                                                            {anexo.arq_nome}
                                                                        </BotaoComoLinkManifestacoes>
                                                                    </td>
                                                                    <td>{anexo.data}</td>
                                                                    <td>{anexo.set_nome}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p>Sem manifestações.</p>
                                            )}
                                        </ContainerManifestacoes>
                                    </TabPanel>
                                    <TabPanel>
                                        <ContainerTramites>
                                            {tramites.length > 0 ? (
                                                <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Envio</th>
                                                                <th>Área que enviou</th>
                                                                <th>Área que recebeu</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tramites.map(tramite => (
                                                                <tr key={tramite.tra_id}>
                                                                    <td>
                                                                        {tramite.envio} -{' '}
                                                                        {tramite.login_envia}
                                                                    </td>
                                                                    <td>{tramite.setor_envia}</td>
                                                                    <td>{tramite.setor_recebe}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p>Sem trâmites.</p>
                                            )}
                                        </ContainerTramites>
                                    </TabPanel>
                                </Tabs>

                                <ContainerBotaoFecha type="button" onClick={fechaModalProcesso}>
                                    <FaRegTimesCircle />
                                    &nbsp;Fechar
                                </ContainerBotaoFecha>
                            </div>
                        </ContainerModal>
                    </div>
                ))}
            </Modal>
        </>
    );
};

ModalProcesso.propTypes = {
    fechaModalProcesso: PropTypes.func.isRequired,
    modalProcesso: PropTypes.bool.isRequired,
    proId: PropTypes.number.isRequired,
};

export default ModalProcesso;

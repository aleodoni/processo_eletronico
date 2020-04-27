import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from '../../configs/axiosConfig';
import './react-tabs.css';

import { ContainerModal, Centralizado, ContainerIniciativa, ContainerDados } from './styles';

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
        },
    };
    const { fechaModalProcesso, modalProcesso, id } = props;
    const [proCodigo, setProCodigo] = useState('');
    const [proIniciativa, setProIniciativa] = useState('');
    const [proTipoIniciativa, setProTipoIniciativa] = useState('');
    const [proMatricula, setProMatricula] = useState('');
    const [proNome, setProNome] = useState('');
    const [proCpf, setProCpf] = useState('');
    const [proCnpj, setProCnpj] = useState('');
    const [proFone, setProFone] = useState('');
    const [proCelular, setProCelular] = useState('');
    const [proEmail, setProEmail] = useState('');
    const [genNome, setGenNome] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [proEncerramento, setProEncerramento] = useState('');
    const [proAssunto, setProAssunto] = useState('');
    const [proAutuacao, setProAutuacao] = useState('');
    const [usuAutuador, setUsuAutuador] = useState('');
    const [proUltimoTramite, setProUltimoTramite] = useState('');
    const [visualizacao, setVisualizacao] = useState('');
    const [usuFinalizador, setUsuFinalizador] = useState('');
    const [proContatoPj, setProContatoPj] = useState('');
    const [fluNome, setFluNome] = useState('');
    const [areaAtualProcesso, setAreaAtualProcesso] = useState('');
    const [areaIniciativaProcesso, setAreaIniciativaProcesso] = useState('');
    const [setorAutuadorProcesso, setSetorAutuadorProcesso] = useState('');
    const [setorFinalizadorProcesso, setSetorFinalizadorProcesso] = useState('');
    const [anexos, setAnexos] = useState([]);
    const [anexosManifestacao, setAnexosManifestacao] = useState([]);
    const [tramites, setTramites] = useState([]);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcesso(e.target.value);
        }
    }

    function carregaDadosProcesso(proId) {
        axios({
            method: 'GET',
            url: `/ver-processo/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProCodigo(res.data.pro_codigo);
                setProIniciativa(res.data.pro_iniciativa);
                setProTipoIniciativa(res.data.pro_tipo_iniciativa);
                setProMatricula(res.data.pro_matricula);
                setProNome(res.data.pro_nome);
                setProFone(res.data.pro_fone);
                setProCelular(res.data.pro_celular);
                setProEmail(res.data.pro_email);
                setProCpf(res.data.cpf);
                setProCnpj(res.data.cnpj);
                setProEncerramento(res.data.pro_encerramento);
                setGenNome(res.data.gen_nome);
                setTprNome(res.data.tpr_nome);
                setProAssunto(res.data.pro_assunto);
                setProAutuacao(res.data.pro_autuacao);
                setUsuAutuador(res.data.usu_autuador);
                setProUltimoTramite(res.data.pro_ultimo_tramite);
                setVisualizacao(res.data.visualizacao);
                setUsuFinalizador(res.data.usu_finalizador);
                setProContatoPj(res.data.pro_contato_pj);
                setFluNome(res.data.flu_nome);
                setAreaAtualProcesso(res.data.area_atual_processo);
                setAreaIniciativaProcesso(res.data.area_iniciativa_processo);
                setSetorAutuadorProcesso(res.data.setor_autuador_processo);
                setSetorFinalizadorProcesso(res.data.setor_finalizador_processo);
            })
            .catch(err => {
                console.log(`Erro ao retornar dados do processo.${err}`);
            });
    }

    function carregaAnexos(proId) {
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
    }

    function carregaAnexosManifestacao(proId) {
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
    }

    function carregaTramites(proId) {
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
    }

    useEffect(() => {
        async function carrega() {
            carregaDadosProcesso(id);
            carregaAnexos(id);
            carregaAnexosManifestacao(id);
            carregaTramites(id);
        }
        carrega();
    }, [id]);

    return (
        <>
            <Modal isOpen={modalProcesso} onRequestClose={fechaHandler} style={dialogs} ariaHideApp={false}>
                <ContainerModal>
                    <div>
                        <p>{`Processo ${proCodigo}`}</p>
                        <Tabs>
                            <TabList>
                                <Tab defaultFocus>Dados Gerais</Tab>
                                <Tab>Anexos</Tab>
                                <Tab>Manifestações</Tab>
                                <Tab>Trâmites</Tab>
                            </TabList>

                            <TabPanel>
                                <ContainerIniciativa>
                                    <fieldset>
                                        <legend>Iniciativa</legend>
                                        {proIniciativa} - {proTipoIniciativa}
                                    </fieldset>
                                </ContainerIniciativa>
                                {proNome ? (
                                    <ContainerDados>
                                        <fieldset>
                                            <legend>Dados da Iniciativa</legend>
                                            {proMatricula ? (
                                                <div>
                                                    <label>Matrícula:</label>
                                                    <span>{proMatricula}</span>
                                                </div>
                                            ) : null}
                                            <div>
                                                <label>Nome:</label>
                                                <span>{proNome}</span>
                                            </div>
                                            {proCpf ? (
                                                <div>
                                                    <label>Cpf:</label>
                                                    <span>{proCpf}</span>
                                                </div>
                                            ) : null}
                                            {proCnpj ? (
                                                <div>
                                                    <label>Cnpj:</label>
                                                    <span>{proCnpj}</span>
                                                </div>
                                            ) : null}
                                            {proFone ? (
                                                <div>
                                                    <label>Fone:</label>
                                                    <span>{proFone}</span>
                                                </div>
                                            ) : null}
                                            {proCelular ? (
                                                <div>
                                                    <label>Celular:</label>
                                                    <span>{proCelular}</span>
                                                </div>
                                            ) : null}
                                            {proEmail ? (
                                                <div>
                                                    <label>Email:</label>
                                                    <span>{proEmail}</span>
                                                </div>
                                            ) : null}
                                            {proContatoPj ? (
                                                <div>
                                                    <label>Contato PJ:</label>
                                                    <span>{proContatoPj}</span>
                                                </div>
                                            ) : null}
                                        </fieldset>
                                    </ContainerDados>
                                ) : null}
                                <ContainerDados>
                                    <fieldset>
                                        <legend>Dados do processo</legend>
                                        {genNome ? (
                                            <div>
                                                <label>Espécie:</label>
                                                <span>{genNome}</span>
                                            </div>
                                        ) : null}
                                        {tprNome ? (
                                            <div>
                                                <label>Tipo do processo:</label>
                                                <span>{tprNome}</span>
                                            </div>
                                        ) : null}
                                        {visualizacao ? (
                                            <div>
                                                <label>Visualização:</label>
                                                <span>{visualizacao}</span>
                                            </div>
                                        ) : null}
                                        {proAssunto ? (
                                            <div>
                                                <label>Assunto:</label>
                                                <span>{proAssunto}</span>
                                            </div>
                                        ) : null}
                                        {proAutuacao ? (
                                            <div>
                                                <label>Autuação:</label>
                                                <span>{proAutuacao}</span>
                                            </div>
                                        ) : null}
                                        {usuAutuador ? (
                                            <div>
                                                <label>Usuário autuador:</label>
                                                <span>
                                                    {usuAutuador} - {setorAutuadorProcesso}
                                                </span>
                                            </div>
                                        ) : null}
                                        {fluNome ? (
                                            <div>
                                                <label>Fluxo:</label>
                                                <span>{fluNome}</span>
                                            </div>
                                        ) : null}
                                        {areaAtualProcesso ? (
                                            <div>
                                                <label>Área atual do processo:</label>
                                                <span>{areaAtualProcesso}</span>
                                            </div>
                                        ) : null}
                                        {areaIniciativaProcesso ? (
                                            <div>
                                                <label>Área de iniciativa do processo:</label>
                                                <span>{areaIniciativaProcesso}</span>
                                            </div>
                                        ) : null}
                                        {proUltimoTramite ? (
                                            <div>
                                                <label>Último trâmite:</label>
                                                <span>{proUltimoTramite}</span>
                                            </div>
                                        ) : null}
                                        {proEncerramento ? (
                                            <div>
                                                <label>Encerramento:</label>
                                                <span>{proEncerramento}</span>
                                            </div>
                                        ) : null}
                                        {usuFinalizador ? (
                                            <div>
                                                <label>Usuário finalizador:</label>
                                                <span>
                                                    {usuFinalizador} - {setorFinalizadorProcesso}
                                                </span>
                                            </div>
                                        ) : null}
                                    </fieldset>
                                </ContainerDados>
                            </TabPanel>
                            <TabPanel>
                                <h2>anexos</h2>
                            </TabPanel>
                            <TabPanel>
                                <h2>manifestacoes</h2>
                            </TabPanel>
                            <TabPanel>
                                <h2>tramites</h2>
                            </TabPanel>
                        </Tabs>
                        <Centralizado>
                            <button type="button" onClick={fechaModalProcesso}>
                                <FaRegTimesCircle />
                                &nbsp;Fechar
                            </button>
                        </Centralizado>
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalProcesso.propTypes = {
    fechaModalProcesso: PropTypes.func.isRequired,
    modalProcesso: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
};

export default ModalProcesso;

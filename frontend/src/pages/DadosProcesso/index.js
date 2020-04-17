import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { FaPaperclip, FaNetworkWired, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import Header from '../../components/Header';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import Menu from '../../components/Menu';
import AnexoArquivo from './AnexoArquivo';
import { Container, AsideLeft, Main, Erro, ContainerIniciativa, ContainerDados, ContainerBotoes, ContainerArquivos } from './styles';

require('dotenv').config();

function DadosProcesso({ match }) {
    const proId = match.params.id;
    const history = useHistory();
    const [erro, setErro] = useState('');
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

    function carregaAnexos(id) {
        axios({
            method: 'GET',
            url: `/arquivos-processo/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAnexos(res.data);
            })
            .catch(() => {
                console.log('Erro ao criar componente de anexo.');
            });
    }

    function carregaDadosProcesso(id) {
        axios({
            method: 'GET',
            url: `/ver-processo/${id}`,
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
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaDadosProcesso(proId);
            carregaAnexos(proId);
        }
        carrega();
    }, [proId]);

    function incluiAnexo(e) {
        setErro('');
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size <= tamanhoAnexo) {
            if (e.target.files[0].type === 'application/pdf') {
                const data = new FormData();
                data.append('file', e.target.files[0]);
                axios({
                    method: 'POST',
                    url: '/arquivos',
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data: {
                        arq_id: null,
                        arq_nome: e.target.files[0].name,
                        pro_id: proId,
                        man_id: null,
                        arq_tipo: e.target.files[0].type,
                        arq_doc_id: proId,
                        arq_doc_tipo: 'processo',
                    },
                })
                    .then(res => {
                        axios({
                            method: 'POST',
                            url: `/anexo-processo/${res.data.arq_id}`,
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                                'Content-Type': 'multipart/form-data',
                            },
                            data,
                        })
                            .then(resAnexos => {
                                if (resAnexos.status === 204) {
                                    carregaAnexos(proId);
                                }
                            })
                            .catch(() => {
                                const arqId = res.data.arq_id;
                                axios({
                                    method: 'DELETE',
                                    url: `arquivos/${arqId}`,
                                    headers: {
                                        authorization: sessionStorage.getItem('token'),
                                    },
                                })
                                    .then(() => {})
                                    .catch(erroDeleteArquivo => {
                                        setErro(erroDeleteArquivo.response.data.error);
                                    });
                                setErro('Erro ao criar arquivo anexo.');
                            });
                    })
                    .catch(() => {
                        setErro('Erro ao inserir na tabela arquivo.');
                    });
            } else {
                setErro('São válidos somente arquivos PDF.');
            }
        } else {
            setErro(`Arquivo maior que ${tamanhoAnexoMB}MB.`);
        }
    }

    function consulta() {
        history.push('/processo-consulta');
    }

    function criaManifestacao() {
        history.push(`/manifestacao-cria/${proId}`);
    }

    return (
        <>
            <Container>
                <Autorizacao tela="Dados processo" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>{`Processo ${proCodigo}`}</legend>
                        <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                        <input id="proId" value={proId} type="hidden" />
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
                        <ContainerBotoes>
                            <label htmlFor="anexo">
                                <FaPaperclip />
                                &nbsp;Inserir Anexo
                            </label>
                            <input type="file" name="file" onChange={incluiAnexo} id="anexo" />
                            <button
                                type="button"
                                id="btnCriaManifestacao"
                                onClick={() => {
                                    criaManifestacao();
                                }}>
                                <FaFileAlt />
                                &nbsp;Criar manifestação
                            </button>
                            <button type="button" id="btnTramita" onClick={null}>
                                <FaNetworkWired />
                                &nbsp;Tramitar
                            </button>
                            <button type="button" id="btnConsulta" onClick={consulta}>
                                <FaExternalLinkAlt />
                                &nbsp;Consultar outro
                            </button>
                        </ContainerBotoes>
                        <br />
                        <ContainerArquivos>
                            <fieldset>
                                <legend>Arquivo(s) do processo em anexo</legend>
                                <AnexoArquivo proId={proId} anexos={anexos} />
                            </fieldset>
                        </ContainerArquivos>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}
DadosProcesso.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default DadosProcesso;

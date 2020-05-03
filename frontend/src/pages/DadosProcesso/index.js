import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaPaperclip, FaFileAlt } from 'react-icons/fa';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import AnexoArquivo from './AnexoArquivo';
import DefaultLayout from '../_layouts/default';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import CriaManifestacao from '../../components/layout/button/CriaManifestacao';
import {
    Container,
    Main,
    Erro,
    ContainerIniciativa,
    Vermelho,
    Centralizado,
    ContainerDados,
    ContainerBotoes,
    ContainerArquivos,
    BotaoComoLink,
} from './styles';

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
    const [anexosManifestacao, setAnexosManifestacao] = useState([]);
    const [tramites, setTramites] = useState([]);
    const [nodAvalExecutiva, setNodAvalExecutiva] = useState(false);

    const formRef = useRef(null);

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
                console.log('Erro ao carregar anexos.');
            });
    }

    function carregaAnexosManifestacao(id) {
        axios({
            method: 'GET',
            url: `/arquivos-manifestacao/${id}`,
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

    function carregaTramites(id) {
        axios({
            method: 'GET',
            url: `/grid-tramites/${id}`,
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
                setNodAvalExecutiva(res.data.nod_aval_executiva);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso(proId);
            mensagem.success('Carregando processo...');
            await carregaAnexos(proId);
            await carregaAnexosManifestacao(proId);
            await carregaTramites(proId);
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
        // se tiver o aval da executiva a manifestação é diferenciada
        if (nodAvalExecutiva) {
            history.push(`/manifestacao-cria-executiva/${proId}`);
        } else {
            history.push(`/manifestacao-cria/${proId}`);
        }
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Dados processo" />
                <Main>
                    <Form ref={formRef}>
                        <h3>
                            <FaFileAlt />
                            {` Processo nº ${proCodigo}`}
                        </h3>
                        <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                        <input id="proId" value={proId} type="hidden" />
                        <ContainerIniciativa>
                            <p>Iniciativa</p>
                            <fieldset>
                                {proIniciativa} - {proTipoIniciativa}
                            </fieldset>
                        </ContainerIniciativa>
                        <br />
                        {proNome ? (
                            <ContainerDados>
                                <p>Dados da Iniciativa</p>
                                <br />
                                <fieldset>
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
                        <br />
                        <ContainerDados>
                            <p>Dados do processo</p>
                            <br />
                            <fieldset>
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
                        <br />
                        {!proEncerramento ? (
                            <ContainerBotoes>
                                <label htmlFor="anexo">
                                    <FaPaperclip />
                                    &nbsp;Inserir Anexo
                                </label>
                                <input type="file" name="file" onChange={incluiAnexo} id="anexo" />
                                <CriaManifestacao
                                    name="btnCriaManifestacao"
                                    clickHandler={() => {
                                        criaManifestacao();
                                    }}
                                />
                                <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
                                <br />
                            </ContainerBotoes>
                        ) : (
                            <ContainerBotoes>
                                <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
                                <br />
                            </ContainerBotoes>
                        )}

                        <ContainerArquivos>
                            {anexos.length > 0 ? (
                                <div>
                                    <p>Arquivo(s) em anexo</p>
                                    <fieldset>
                                        <AnexoArquivo proId={proId} anexos={anexos} />
                                    </fieldset>
                                    <br />
                                </div>
                            ) : null}
                            {anexosManifestacao.length > 0 ? (
                                <div>
                                    <p>Manifestações</p>
                                    <fieldset>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Seq</th>
                                                    <th>Documento</th>
                                                    <th>Tipo</th>
                                                    <th>Arquivo</th>
                                                    <th>Data</th>
                                                    <th>Área</th>
                                                    <th>Situação</th>
                                                    <th>Visto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {anexosManifestacao.map(anexo => (
                                                    <tr key={anexo.man_id}>
                                                        <td>{anexo.contador}</td>
                                                        <td>{anexo.tpd_nome}</td>
                                                        <td>{anexo.tmn_nome}</td>
                                                        <td>
                                                            <BotaoComoLink
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
                                                            </BotaoComoLink>
                                                        </td>
                                                        <td>{anexo.data}</td>
                                                        <td>{anexo.set_nome}</td>
                                                        <td>
                                                            <Centralizado>
                                                                {anexo.situacao === 'Cancelada' ? (
                                                                    <Vermelho>
                                                                        {anexo.situacao}
                                                                    </Vermelho>
                                                                ) : (
                                                                    anexo.situacao
                                                                )}
                                                            </Centralizado>
                                                        </td>
                                                        <td>
                                                            {anexo.man_visto_executiva ===
                                                            'Negado' ? (
                                                                <Vermelho>
                                                                    {anexo.man_visto_executiva}
                                                                </Vermelho>
                                                            ) : (
                                                                anexo.man_visto_executiva
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </fieldset>
                                    <br />
                                </div>
                            ) : null}
                            {tramites.length > 0 ? (
                                <div>
                                    <p>Tramitação</p>
                                    <fieldset>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Envio</th>
                                                    <th>Área</th>
                                                    <th>Recebimento</th>
                                                    <th>Área</th>
                                                    <th>Observação</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tramites.map(tramite => (
                                                    <tr key={tramite.tra_id}>
                                                        <td>
                                                            {tramite.envio} - {tramite.login_envia}
                                                        </td>
                                                        <td>{tramite.setor_envia}</td>
                                                        <td>
                                                            {tramite.recebimento} -{' '}
                                                            {tramite.login_recebe}
                                                        </td>
                                                        <td>{tramite.setor_recebe}</td>
                                                        <td>{tramite.tra_observacao}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </fieldset>
                                </div>
                            ) : null}
                        </ContainerArquivos>
                    </Form>
                </Main>
            </Container>
        </DefaultLayout>
    );
}
DadosProcesso.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default DadosProcesso;

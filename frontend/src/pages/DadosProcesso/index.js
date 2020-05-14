import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import GeraFluxo from '../../components/layout/button/GeraFluxo';
import CriaManifestacao from '../../components/layout/button/CriaManifestacao';
import ModalFluxo from '../../components/ModalFluxo';
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
    const [processos, setProcessos] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [grafo, setGrafo] = useState('');
    const [anexosManifestacao, setAnexosManifestacao] = useState([]);
    const [tramites, setTramites] = useState([]);
    const [mostraProcesso, setMostraProcesso] = useState(false);
    const [modalFluxo, setModalFluxo] = useState(false);

    const formRef = useRef(null);

    function abreModalFluxo(fluxo) {
        axios({
            method: 'GET',
            url: `/gera-grafo/${fluxo}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGrafo(res.data);
                setModalFluxo(true);
            })
            .catch(() => {
                setErro('Erro ao carregar grafo.');
            });
    }

    function fechaModalFluxo() {
        setModalFluxo(false);
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
                setMostraProcesso(true);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [proId]);

    useEffect(() => {
        mensagem.success('Carregando processo...');
        carregaDadosProcesso();
        carregaAnexos();
        carregaAnexosManifestacao();
        carregaTramites();
    }, [carregaDadosProcesso, carregaAnexos, carregaAnexosManifestacao, carregaTramites]);

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
                                    mensagem.success('Arquivo anexado ao processo');
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
        if (processos.nodAvalExecutiva) {
            history.push(`/manifestacao-cria-executiva/${proId}`);
        } else {
            history.push(`/manifestacao-cria/${proId}`);
        }
    }

    return (
        <DefaultLayout>
            {mostraProcesso ? (
                <Container>
                    <Autorizacao tela="Dados processo" />
                    <Main>
                        <Form ref={formRef}>
                            {processos.map(pro => (
                                <div>
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
                                            <label htmlFor="anexo">
                                                <FaPaperclip />
                                                &nbsp;Inserir Anexo
                                            </label>
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={incluiAnexo}
                                                id="anexo"
                                            />
                                            <CriaManifestacao
                                                name="btnCriaManifestacao"
                                                clickHandler={() => {
                                                    criaManifestacao();
                                                }}
                                            />
                                            <ConsultarOutro
                                                name="btnConsulta"
                                                clickHandler={consulta}
                                            />
                                            <GeraFluxo
                                                name="btnGrafico"
                                                clickHandler={() => abreModalFluxo(pro.flu_id)}
                                            />
                                            <br />
                                        </ContainerBotoes>
                                    ) : (
                                        <ContainerBotoes>
                                            <ConsultarOutro
                                                name="btnConsulta"
                                                clickHandler={consulta}
                                            />
                                            <GeraFluxo
                                                name="btnGrafico"
                                                clickHandler={() => abreModalFluxo(pro.flu_id)}
                                            />
                                            <br />
                                        </ContainerBotoes>
                                    )}
                                    <ContainerIniciativa>
                                        <p>Iniciativa</p>
                                        <fieldset>
                                            {pro.pro_iniciativa} - {pro.pro_tipo_iniciativa}
                                        </fieldset>
                                    </ContainerIniciativa>
                                    <br />

                                    {pro.pro_nome ? (
                                        <ContainerDados>
                                            <p>Dados da Iniciativa</p>
                                            <br />
                                            <fieldset>
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
                                            </fieldset>
                                        </ContainerDados>
                                    ) : null}
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
                                        </fieldset>
                                    </ContainerDados>
                                    <ModalFluxo
                                        fechaModalFluxo={fechaModalFluxo}
                                        modalFluxo={modalFluxo}
                                        id={grafo}
                                    />
                                </div>
                            ))}
                            <br />

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
                                                    {anexosManifestacao.map((anexo, index) => (
                                                        <tr key={anexo.man_id}>
                                                            <td>{index + 1}</td>
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
                                                                    {anexo.situacao ===
                                                                    'Cancelada' ? (
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
                                        </fieldset>
                                    </div>
                                ) : null}
                            </ContainerArquivos>
                        </Form>
                    </Main>
                </Container>
            ) : null}
        </DefaultLayout>
    );
}
DadosProcesso.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default DadosProcesso;

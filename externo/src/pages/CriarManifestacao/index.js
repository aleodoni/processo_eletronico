/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast as mensagem } from 'react-toastify';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { FaPaperclip } from 'react-icons/fa';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import api from '../../service/api';
import Select from '../../components/layout/Select';
import Input from '../../components/layout/Input';
import DefaultLayout from '../_layouts/default';
import Tramitar from '../../components/layout/button/Tramitar';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalProcesso from '../../components/ModalProcesso';
import * as constantes from '../../utils/constantes';
import { download } from '../../utils/downloadArquivo';
import {
    Container,
    Container3,
    Main,
    Erro,
    BotaoComoLink,
    LinkProcesso,
    ContainerBotoes,
} from './styles';

function CriarManifestacao(props) {
    const [erro, setErro] = useState('');
    const { match } = props;
    const history = useHistory();
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: match.params.proId,
        manVistoExecutiva: '',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [proIdModal, setProId] = useState(-1);
    const [tpdId, setTpdId] = useState('-1');
    const [nodId, setNodId] = useState('');
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);

    const [dadosTramite, setDadosTramite] = useState([]);

    const [manifestacaoProcesso, setManifestacaoProcesso] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

    function handleTpdId(e) {
        setTpdId(e.target.value);
    }

    function abreModalProcesso(id) {
        setProId(id);
        setModalProcesso(true);
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
    }

    function abreModalExcluir(id) {
        setArqId(id);
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function abreModalTramitaUm(dados) {
        setDadosTramite(dados);
        setModalTramitaUm(true);
    }

    function fechaModalTramitaUm() {
        setModalTramitaUm(false);
    }

    function limpaCampos() {
        formRef.current.setFieldValue('tmnId', '-1');
        formRef.current.setFieldValue('tpdId', '-1');
        setManId(null);
        setNodId('');
        setManifestacao({
            ...manifestacao,
            manVistoExecutiva: '',
        });

        formRef.current.setErrors({});
    }

    async function carregaAnexos(id) {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/arquivos-manifestacao/${id}`);
            setAnexos(response.data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaManifestacaoProcesso() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get(`/manifestacao-processo/${props.match.params.proId}`);
            setManifestacaoProcesso(response.data);
            if (response.data.length > 0) {
                carregaAnexos(response.data[0].man_id);
                setManId(response.data[0].man_id);
                document.getElementById('manId').value = response.data[0].man_id;
                setManifestacao({ manId: response.data[0].man_id });
            }
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    const verificaArquivo = (e) => {
        if (tpdId === '-1') {
            setErro('Selecione o tipo de documento.');
            e.preventDefault();
        }
    };

    function incluiManifestacao(e) {
        setErro('');
        const arq = e.target.files[0];
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size > tamanhoAnexo) {
            setErro(`Arquivo maior que ${tamanhoAnexoMB}MB.`);
            return;
        }
        if (e.target.files[0].type !== 'application/pdf') {
            setErro('São válidos somente arquivos PDF.');
            return;
        }
        axios({
            method: 'POST',
            url: '/manifestacoes',
            data: {
                man_id: null,
                pro_id: Number(match.params.proId),
                tmn_id: constantes.TMN_MANIFESTACAO_ORGAO_EXTERNO,
                man_login: sessionStorage.getItem('usuario'),
                man_id_area: sessionStorage.getItem('areaUsuario'),
                nod_id: nodId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                setManifestacao({ manId: res.data.man_id });
                const data = new FormData();
                data.append('file', arq);
                data.append('pro_id', Number(match.params.proId));
                data.append('man_id', res.data.man_id);
                data.append('tpd_id', constantes.TPD_MANIFESTACAO);
                data.append('arq_login', sessionStorage.getItem('usuario'));
                data.append('arq_doc_tipo', 'manifestação');
                axios({
                    method: 'POST',
                    url: `/anexo-manifestacao/${Number(match.params.proId)}/${proCodigo.substr(
                        proCodigo.length - 4
                    )}`,
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    },
                    data,
                })
                    .then((resAnexos) => {
                        if (resAnexos.status === 204) {
                            limpaCampos();
                            mensagem.success('Manifestação inserida com sucesso.');
                            carregaManifestacaoProcesso();
                            document.getElementById('anexo').value = '';
                        }
                    })
                    .catch(() => {
                        limpaCampos();
                        setErro('Erro ao criar arquivo anexo.');
                        carregaManifestacaoProcesso();
                        document.getElementById('anexo').value = '';
                    });
            })
            .catch(() => {
                setErro('Erro ao inserir manifestação.');
            });
    }

    function incluiAnexoManifestacao(e) {
        setErro('');
        const arq = e.target.files[0];
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size <= tamanhoAnexo) {
            if (e.target.files[0].type === 'application/pdf') {
                const data = new FormData();
                data.append('file', arq);
                data.append('pro_id', document.getElementById('proId').value);
                data.append('man_id', manId);
                data.append('tpd_id', tpdId);
                data.append('arq_login', sessionStorage.getItem('usuario'));
                data.append('arq_doc_tipo', 'manifestação');
                axios({
                    method: 'POST',
                    url: `/anexo-manifestacao/${Number(match.params.proId)}/${proCodigo.substr(
                        proCodigo.length - 4
                    )}`,
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data,
                })
                    .then((res) => {
                        if (res.status === 204) {
                            limpaCampos();
                            mensagem.success('Documento inserido com sucesso.');
                            carregaAnexos(manId);
                            carregaManifestacaoProcesso();
                            document.getElementById('anexo').value = '';
                        }
                    })
                    .catch(() => {
                        limpaCampos();
                        setErro('Erro ao criar arquivo anexo.');
                        carregaManifestacaoProcesso();
                        document.getElementById('anexo').value = '';
                    });
            } else {
                setErro('São válidos somente arquivos PDF.');
            }
        } else {
            setErro(`Arquivo maior que ${tamanhoAnexoMB}MB.`);
        }
    }

    async function carregaTipoDocumento() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/tipos-documento-combo');

            const data = response.data.map((tipoDocumento) => {
                return {
                    label: tipoDocumento.tpd_nome,
                    value: tipoDocumento.tpd_id,
                };
            });
            setTiposDocumento(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    const carregaDadosProcesso = useCallback(() => {
        const NO_IPMC = 276;
        const NO_IPMC_ADM = 316;
        axios({
            method: 'GET',
            url: `/ver-processo/${props.match.params.proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                const processo = res.data;
                for (let i = 0; i < processo.length; i++) {
                    const urlInicio = '/processo-eletronico-externo';
                    // se não for o tipo certo e não está no nó certo sai do sistema
                    if (
                        processo[i].tpr_id !== constantes.TPR_APOSENTADORIA &&
                        processo[i].tpr_id !== constantes.TPR_APOSENTADORIA_INICIATIVA_ADM
                    ) {
                        window.location.href = urlInicio;
                    }
                    if (processo[i].nod_id !== NO_IPMC && processo[i].nod_id !== NO_IPMC_ADM) {
                        window.location.href = urlInicio;
                    }
                    setManifestacao({ proId: processo[i].pro_id });
                    setProCodigo(processo[i].pro_codigo);
                    setTprNome(processo[i].tpr_nome);
                    setNodId(processo[i].nod_id);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [manifestacao.proId]);

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
            await carregaManifestacaoProcesso();
            await carregaTipoDocumento();
        }
        carrega();
    }, []);

    function apaga(id) {
        if (anexos.length === 1) {
            axios({
                method: 'DELETE',
                url: `arquivos/${id}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    axios({
                        method: 'DELETE',
                        url: `manifestacoes/${manId}`,
                        headers: {
                            authorization: sessionStorage.getItem('token'),
                        },
                    })
                        .then(() => {
                            mensagem.success('Documento e manifestação apagados com sucesso.');
                            carregaAnexos(manId);
                            carregaManifestacaoProcesso();
                            carregaDadosProcesso();
                        })
                        .catch((err) => {
                            setErro(err.response.data.error);
                        });
                })
                .catch((erroDeleteArquivo) => {
                    setErro(erroDeleteArquivo.response.data.error);
                });
        } else {
            axios({
                method: 'DELETE',
                url: `arquivos/${id}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    mensagem.success('Documento apagado com sucesso.');
                    carregaAnexos(manId);
                    carregaManifestacaoProcesso();
                })
                .catch((erroDeleteArquivo) => {
                    setErro(erroDeleteArquivo.response.data.error);
                });
        }
    }

    function tramita() {
        axios({
            method: 'GET',
            url: `/proximo-tramite/${props.match.params.proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                // se não tiver registros
                if (res.data.length === 0) {
                    mensagem.info('Sem próximos trâmites.');
                    return;
                }
                abreModalTramitaUm(res.data[0]);
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function insereTramite(prxId, setId) {
        axios({
            method: 'POST',
            url: '/tramites',
            data: {
                tra_id: null,
                prx_id: prxId,
                pro_id: Number(props.match.params.proId),
                login_envia: sessionStorage.getItem('usuario'),
                area_id_envia: sessionStorage.getItem('areaUsuario'),
                area_id_recebe: setId,
                man_id: manId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Trâmite inserido com sucesso.');
                history.push(`/home/`);
            })
            .catch(() => {
                setErro('Erro ao inserir trâmite.');
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar manifestação" />
                <Main>
                    {manifestacaoProcesso.length > 0 ? (
                        <p>Manifestação - {manifestacaoProcesso[0].tmn_nome}</p>
                    ) : (
                        <p>Criar manifestação</p>
                    )}
                    <hr />
                    <Erro>{erro}</Erro>
                    <label>Processo: </label>
                    <span>
                        <LinkProcesso
                            type="button"
                            onClick={() => abreModalProcesso(props.match.params.proId)}>
                            {proCodigo}
                        </LinkProcesso>
                        - {tprNome}
                    </span>
                    <Form ref={formRef} initialData={manifestacao} onSubmit={incluiManifestacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />
                        <label>
                            Manifestação do órgão: {sessionStorage.getItem('nomeAreaUsuario')}
                        </label>
                        <br />
                        {manifestacaoProcesso.length > 0 ? (
                            <Container3>
                                <Select
                                    name="tpdId"
                                    label="Tipo do documento"
                                    options={tiposDocumento}
                                    onChange={handleTpdId}
                                />
                            </Container3>
                        ) : null}

                        <ContainerBotoes>
                            {manifestacaoProcesso.length > 0 ? (
                                <>
                                    <label htmlFor="anexo">
                                        <FaPaperclip />
                                        &nbsp;Inserir documento
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        onChange={incluiAnexoManifestacao}
                                        id="anexo"
                                        onClick={(e) => {
                                            verificaArquivo(e);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <label htmlFor="anexo">
                                        <FaPaperclip />
                                        &nbsp;Inserir manifestação
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        onChange={incluiManifestacao}
                                        id="anexo"
                                    />
                                </>
                            )}
                            {manifestacaoProcesso.length > 0 ? (
                                <Tramitar name="btnTramita" clickHandler={tramita} />
                            ) : null}
                        </ContainerBotoes>
                    </Form>
                    <ModalApaga
                        modalExcluir={modalExcluir}
                        fechaModalExcluir={fechaModalExcluir}
                        apaga={apaga}
                        id={arqId}
                    />
                    <ModalTramitaUm
                        modalTramitaUm={modalTramitaUm}
                        fechaModalTramitaUm={fechaModalTramitaUm}
                        tramita={insereTramite}
                        dados={dadosTramite}
                    />
                    <ModalProcesso
                        fechaModalProcesso={fechaModalProcesso}
                        modalProcesso={modalProcesso}
                        proId={proIdModal}
                    />

                    {anexos.length > 0 ? (
                        <div>
                            <p>Arquivos da manifestação</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Seq</th>
                                        <th>Documento</th>
                                        <th>Arquivo</th>
                                        <th>Data</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anexos.map((anexo, index) => (
                                        <tr key={anexo.arq_id}>
                                            <td>{index + 1}</td>
                                            <td>{anexo.tpd_nome}</td>
                                            <td>
                                                <BotaoComoLink
                                                    type="button"
                                                    onClick={(e) =>
                                                        download(
                                                            e,
                                                            Number(match.params.proId),
                                                            proCodigo.substr(proCodigo.length - 4),
                                                            anexo.arq_nome
                                                        )
                                                    }>
                                                    {anexo.arq_nome.substr(
                                                        33,
                                                        anexo.arq_nome.length
                                                    )}
                                                </BotaoComoLink>
                                            </td>
                                            <td>{anexo.data}</td>

                                            <td>
                                                {anexo.arq_login ===
                                                sessionStorage.getItem('usuario') ? (
                                                    <BotaoComoLink
                                                        onClick={() =>
                                                            abreModalExcluir(anexo.arq_id)
                                                        }>
                                                        Excluir
                                                    </BotaoComoLink>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </Main>
            </Container>
        </DefaultLayout>
    );
}

CriarManifestacao.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            proId: PropTypes.string,
        }),
    }).isRequired,
};

export default CriarManifestacao;

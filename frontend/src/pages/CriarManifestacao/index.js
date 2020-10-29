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
import Finalizar from '../../components/layout/button/Finalizar';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalTramitaVolta from '../../components/ModalTramitaVolta';
import ModalTramitaVarios from '../../components/ModalTramitaVarios';
import ModalProcesso from '../../components/ModalProcesso';
import * as constantes from '../../utils/constantes';
import {
    Container,
    Titulo,
    Container2,
    Container3,
    Main,
    Erro,
    BotaoComoLink,
    LinkProcesso,
    ContainerBotoes,
} from './styles';
import { download } from '../../utils/downloadArquivo';
import { AlternateEmailRounded } from '@material-ui/icons';

function CriarManifestacao(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const { match } = props;
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: match.params.proId,
        manVistoExecutiva: '',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [nodFim, setNodFim] = useState(false);
    const [tmnId, setTmnId] = useState('-1');
    const [tpdId, setTpdId] = useState('-1');
    const [nodId, setNodId] = useState('');
    const [proCodigo, setProCodigo] = useState('');
    const [tprId, setTprId] = useState(undefined);
    const [tprNome, setTprNome] = useState('');
    const [tiposManifestacao, setTiposManifestacao] = useState([]);
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalTramitaVolta, setModalTramitaVolta] = useState(false);
    const [modalTramitaVarios, setModalTramitaVarios] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);
    const [processoModal, setProcessoModal] = useState([]);

    const [dadosTramite, setDadosTramite] = useState([]);
    const [dadosTramiteVolta, setDadosTramiteVolta] = useState([]);

    const [manifestacaoProcesso, setManifestacaoProcesso] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

    function handleTmnId(e) {
        setTmnId(e.target.value);
    }

    function handleTpdId(e) {
        setTpdId(e.target.value);
    }

    function abreModalProcesso() {
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

    function abreModalTramitaVolta(dados) {
        setDadosTramiteVolta(dados);
        setModalTramitaVolta(true);
    }

    function fechaModalTramitaVolta() {
        setModalTramitaVolta(false);
    }

    function abreModalTramitaVarios(dados) {
        setDadosTramite(dados);
        setModalTramitaVarios(true);
    }

    function fechaModalTramitaVarios() {
        setModalTramitaVarios(false);
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
            const response = await api.get(`/manifestacao-processo/${match.params.proId}`);
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

    const verificaManifestacao = e => {
        if (tmnId === '-1') {
            setErro('Selecione o tipo da manifestação.');
            e.preventDefault();
        }
    };

    const verificaArquivo = e => {
        if (tpdId === '-1') {
            setErro('Selecione o tipo de documento.');
            e.preventDefault();
        }
    };

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo/${match.params.proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const processo = res.data;
                for (let i = 0; i < processo.length; i++) {
                    setManifestacao({ proId: processo[i].pro_id });
                    setProCodigo(processo[i].pro_codigo);
                    setTprId(processo[i].tpr_id);
                    setTprNome(processo[i].tpr_nome);
                    setNodId(processo[i].nod_id);
                    setNodFim(processo[i].nod_fim);
                    setProcessoModal(processo[i]);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [manifestacao.proId]);

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
                tmn_id: tmnId,
                man_login: sessionStorage.getItem('usuario'),
                man_id_area: sessionStorage.getItem('areaUsuario'),
                nod_id: nodId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
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
                    .then(resAnexos => {
                        if (resAnexos.status === 204) {
                            limpaCampos();
                            mensagem.success('Manifestação inserida com sucesso.');
                            carregaManifestacaoProcesso();
                            carregaDadosProcesso();
                            document.getElementById('anexo').value = '';
                            setTpdId('-1');
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
                    .then(resAnexos => {
                        if (resAnexos.status === 204) {
                            limpaCampos();
                            mensagem.success('Documento inserido com sucesso.');
                            carregaAnexos(manId);
                            carregaManifestacaoProcesso();
                            carregaDadosProcesso();
                            document.getElementById('anexo').value = '';
                            setTpdId('-1');
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

    async function carregaTipoManifestacao() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/tipos-manifestacao-combo');

            const data = response.data.map(tipoManifestacao => {
                return {
                    label: tipoManifestacao.tmn_nome,
                    value: tipoManifestacao.tmn_id,
                };
            });
            setTiposManifestacao(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaTipoDocumento() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/tipos-documento-combo');

            const data = response.data.map(tipoDocumento => {
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

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
            await carregaManifestacaoProcesso();
            await carregaTipoManifestacao();
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
                        .catch(err => {
                            setErro(err.response.data.error);
                        });
                })
                .catch(erroDeleteArquivo => {
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
                .catch(erroDeleteArquivo => {
                    setErro(erroDeleteArquivo.response.data.error);
                });
        }
    }

    function tramita() {
        // Pagamento de auxílio funeral
        if (tprId === constantes.TPR_AUXILIO_FUNERAL && nodId === 229) {
            axios({
                method: 'GET',
                url: `/proximo-tramite/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    // se não tiver registros
                    if (res.data.length === 0) {
                        mensagem.info('Sem próximos trâmites.');
                        return;
                    }
                    abreModalTramitaVolta(res.data);
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
            return;
        }

        // Pagamento por determinação judicial
        if (tprId === constantes.TPR_DESCONTO_PENSAO_ALIMENTICIA && nodId === 364) {
            axios({
                method: 'GET',
                url: `/proximo-tramite/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    // se não tiver registros
                    if (res.data.length === 0) {
                        mensagem.info('Sem próximos trâmites.');
                        return;
                    }
                    abreModalTramitaVolta(res.data);
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
            return;
        }

        if (tprId === constantes.TPR_APOSENTADORIA_INICIATIVA_ADM && nodId === 130) {
            const prxId = 130;
            axios({
                method: 'GET',
                url: `/proximo-tramite-direcionado/${match.params.proId}/${prxId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(resDirecionado => {
                    // se não tiver registros
                    if (resDirecionado.data.length === 0) {
                        mensagem.info('Sem próximos trâmites.');
                        return;
                    }
                    abreModalTramitaUm(resDirecionado.data[0]);
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
            return;
        }

        // se o tipo de processo for de recurso e o nó for
        if (tprId === constantes.TPR_RECURSO && nodId === 281) {
            /*
            const prxId = 103;
            axios({
                method: 'GET',
                url: `/proximo-tramite-direcionado/${match.params.proId}/${prxId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(resDirecionado => {
                    // se não tiver registros
                    if (resDirecionado.data.length === 0) {
                        mensagem.info('Sem próximos trâmites.');
                        return;
                    }
                    abreModalTramitaUm(resDirecionado.data[0]);
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
            */
            axios({
                method: 'GET',
                url: `/verifica-decisao-executiva/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(resDecisao => {
                    const decisao = resDecisao.data;

                    axios({
                        method: 'GET',
                        url: `/proximo-tramite-recurso/${match.params.proId}`,
                        headers: {
                            authorization: sessionStorage.getItem('token'),
                        },
                    })
                        .then(resProximoRecurso => {
                            // se não tiver registros
                            if (resProximoRecurso.data.length === 0) {
                                mensagem.info('Sem próximos trâmites.');
                                return;
                            }
                            if (decisao === 'Concedido') {
                                abreModalTramitaUm(resProximoRecurso.data[0]);
                            }
                            if (decisao === 'Negado') {
                                abreModalTramitaUm(resProximoRecurso.data[1]);
                            }
                        })
                        .catch(() => {
                            setErro('Erro ao carregar próximos trâmites.');
                        });
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
            return;
        }
        // se o nó for o 291 e o tipo for de aposentadoria voluntária
        if (tprId === constantes.TPR_APOSENTADORIA && nodId === 291) {
            // verifica qual foi a decisão da comissão executiva,
            // se foi deferido vai para ciencia e toca o barco
            // se foi indeferido vai para ciencia e termina
            axios({
                method: 'GET',
                url: `/proximo-tramite-decisao-aposentadoria/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
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
            return;
        }
        // se o nó for o 321 e o tipo for de aposentadoria iniciativa da administração
        if (tprId === constantes.TPR_APOSENTADORIA_INICIATIVA_ADM && nodId === 321) {
            // verifica qual foi a decisão da comissão executiva,
            // se foi deferido vai para ciencia e toca o barco
            // se foi indeferido vai para ciencia e termina
            axios({
                method: 'GET',
                url: `/proximo-tramite-decisao-aposentadoria/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
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
            return;
        }
        // se o tipo de processo for de recurso e estiver no nó especificado
        // se o tipo for de aposentadoria encaminha para ciência do interessado
        // e ele encaminha para o DARH, para enviar ao Tribunal de Contas
        // outro tipo encaminha para o interessado
        /*
        if (tprId === constantes.TPR_RECURSO && nodId === 281) {
            axios({
                method: 'GET',
                url: `/processo-origem/${match.params.proId}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        let prxId;
                        if (res.data[i].tpr_id === constantes.TPR_APOSENTADORIA) {
                            prxId = 102;
                        } else {
                            prxId = 103;
                        }
                        axios({
                            method: 'GET',
                            url: `/proximo-tramite-direcionado/${match.params.proId}/${prxId}`,
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                            },
                        })
                            .then(resDirecionado => {
                                // se não tiver registros
                                if (resDirecionado.data.length === 0) {
                                    mensagem.info('Sem próximos trâmites.');
                                    return;
                                }
                                abreModalTramitaUm(resDirecionado.data[0]);
                            })
                            .catch(() => {
                                setErro('Erro ao carregar próximos trâmites.');
                            });
                    }
                })
                .catch(() => {
                    console.log('Erro ao carregar processo de origem.');
                });
            return;
        }
        */
        // aqui vai verificar se vai tramitar para um ou para vários
        axios({
            method: 'GET',
            url: `/proximo-tramite/${match.params.proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                // se não tiver registros
                if (res.data.length === 0) {
                    mensagem.info('Sem próximos trâmites.');
                    return;
                }
                // se for um abre modal para um
                if (res.data.length === 1) {
                    abreModalTramitaUm(res.data[0]);
                }
                if (res.data.length > 1) {
                    abreModalTramitaVarios(res.data);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function finaliza() {
        const areaId = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        const usuario = sessionStorage.getItem('usuario');

        axios({
            method: 'PUT',
            url: `/encerra/${match.params.proId}`,
            data: {
                usuario,
                areaId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                const msg = `Processo encerrado com sucesso.`;
                mensagem.success(msg, {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push('/home');
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function consulta() {
        history.push('/processo-consulta');
    }

    function insereTramite(prxId, setId, tprId1) {

        if (
            tprId1 === constantes.TPR_APOSENTADORIA_INICIATIVA_ADM ||
            tprId1 === constantes.TPR_APOSENTADORIA ||
            tprId1 === constantes.TPR_AUXILIO_FUNERAL ||
            tprId1 === constantes.TPR_DESCONTO_PENSAO_ALIMENTICIA ||
            tprId1 === constantes.TPR_RECURSO
        ) {
            axios({
                method: 'POST',
                url: '/tramites-direcionado',
                data: {
                    tra_id: null,
                    prx_id: prxId,
                    pro_id: Number(match.params.proId),
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
        } else {
            axios({
                method: 'POST',
                url: '/tramites',
                data: {
                    tra_id: null,
                    prx_id: prxId,
                    pro_id: Number(match.params.proId),
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
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar manifestação" />
                <Main>
                    <Titulo>
                        {manifestacaoProcesso.length > 0 ? (
                            <p>Manifestação - {manifestacaoProcesso[0].tmn_nome}</p>
                        ) : (
                            <p>Criar manifestação</p>
                        )}
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <label>Processo: </label>
                    <span>
                        <LinkProcesso type="button" onClick={() => abreModalProcesso()}>
                            {proCodigo}
                        </LinkProcesso>
                        - {tprNome}
                    </span>
                    <Form ref={formRef} initialData={manifestacao} onSubmit={incluiManifestacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />

                        {manifestacaoProcesso.length === 0 ? (
                            <Container2>
                                <Select
                                    name="tmnId"
                                    label="Tipo da manifestação"
                                    options={tiposManifestacao}
                                    onChange={handleTmnId}
                                />
                            </Container2>
                        ) : null}

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
                                        onClick={e => {
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
                                        onClick={e => {
                                            verificaManifestacao(e);
                                        }}
                                    />
                                </>
                            )}
                            {manifestacaoProcesso.length > 0 ? (
                                <>
                                    {nodFim ? (
                                        <Finalizar name="btnFinaliza" clickHandler={finaliza} />
                                    ) : (
                                        <Tramitar name="btnTramita" clickHandler={tramita} />
                                    )}
                                </>
                            ) : null}
                            <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
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
                    <ModalTramitaVolta
                        modalTramitaVolta={modalTramitaVolta}
                        fechaModalTramitaVolta={fechaModalTramitaVolta}
                        tramita={insereTramite}
                        dados={dadosTramiteVolta}
                        tprId={tprId}
                    />
                    <ModalTramitaVarios
                        modalTramitaVarios={modalTramitaVarios}
                        fechaModalTramitaVarios={fechaModalTramitaVarios}
                        tramita={insereTramite}
                        dados={dadosTramite}
                    />
                    <ModalProcesso
                        fechaModalProcesso={fechaModalProcesso}
                        modalProcesso={modalProcesso}
                        processo={processoModal}
                    />

                    {anexos.length > 0 ? (
                        <div>
                            <p>Arquivos da manifestação</p>
                            <fieldset>
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
                                                        onClick={e =>
                                                            download(
                                                                e,
                                                                Number(match.params.proId),
                                                                proCodigo.substr(
                                                                    proCodigo.length - 4
                                                                ),
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
                            </fieldset>
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

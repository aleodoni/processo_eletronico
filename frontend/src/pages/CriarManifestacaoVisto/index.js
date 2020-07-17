/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast as mensagem } from 'react-toastify';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import ModalApaga from '../../components/ModalExcluirVisto';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import DefaultLayout from '../_layouts/default';
import Tramitar from '../../components/layout/button/Tramitar';
import BotaoVistoExecutiva from '../../components/layout/button/VistoExecutiva';
import VistoExecutiva from '../../components/system/select/VistoExecutiva';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalTramitaVarios from '../../components/ModalTramitaVarios';
import ModalProcesso from '../../components/ModalProcesso';

import {
    Container,
    Container2,
    Main,
    Erro,
    LinkProcesso,
    ContainerBotoes,
    Titulo,
    BotaoComoLink,
} from './styles';
import { download } from '../../utils/downloadArquivo';

function CriarManifestacaoVisto(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const { match } = props;
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manVistoExecutiva: '-1',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [proIdModal, setProId] = useState(-1);
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalTramitaVarios, setModalTramitaVarios] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);
    const [dadosTramite, setDadosTramite] = useState([]);
    const [nodId, setNodId] = useState('');
    const [anexos, setAnexos] = useState([]);

    const [manifestacaoProcesso, setManifestacaoProcesso] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

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

    function abreModalTramitaVarios(dados) {
        setDadosTramite(dados);
        setModalTramitaVarios(true);
    }

    function fechaModalTramitaVarios() {
        setModalTramitaVarios(false);
    }

    function limpaCampos() {
        setManId(null);
        setManifestacao({
            ...manifestacao,
            manVistoExecutiva: '-1',
        });
        setErro('');

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
                setManifestacao({ manId: response.data[0].man_id });
            }
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function criaManifestacao({ manVistoExecutiva }) {
        // Manifestação da executiva
        const TIPO_MANIFESTACAO_EXECUTIVA = 5;

        // Aval da Comissão Executiva
        const TIPO_DOCUMENTO_EXECUTIVA = 27;

        const manLogin = sessionStorage.getItem('usuario');
        const manIdArea = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        if (manVistoExecutiva === '-1') {
            setErro('Selecione o visto da executiva.');
            return;
        }
        axios({
            method: 'POST',
            url: '/manifestacoes',
            data: {
                man_id: null,
                pro_id: match.params.proId,
                tmn_id: TIPO_MANIFESTACAO_EXECUTIVA,
                tpd_id: TIPO_DOCUMENTO_EXECUTIVA,
                man_login: manLogin,
                man_id_area: manIdArea,
                man_visto_executiva: manVistoExecutiva,
                nod_id: nodId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(resultado => {
                setManId(resultado.data.man_id);
                const ARQ_VISTO_EXECUTIVA = `visto-executiva-${resultado.data.man_id}.pdf`;
                const TIPO_DOCUMENTO_VISTO_EXECUTIVA = 30;
                axios({
                    method: 'POST',
                    url: '/arquivos',
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data: {
                        arq_id: null,
                        arq_nome: ARQ_VISTO_EXECUTIVA,
                        pro_id: resultado.data.pro_id,
                        man_id: resultado.data.man_id,
                        arq_tipo: 'application/pdf',
                        arq_doc_id: resultado.data.man_id,
                        arq_doc_tipo: 'manifestação',
                        tpd_id: TIPO_DOCUMENTO_VISTO_EXECUTIVA,
                        arq_login: sessionStorage.getItem('usuario'),
                    },
                })
                    .then(res => {
                        axios({
                            method: 'POST',
                            url: `/arquivo-visto-executiva`,
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                            },
                            data: {
                                arq_id: res.data.arq_id,
                                man_id: resultado.data.man_id,
                            },
                        })
                            .then(resAnexos => {
                                if (resAnexos.status === 204) {
                                    limpaCampos();
                                    mensagem.success('Arquivo de visto inserido com sucesso.');
                                    carregaManifestacaoProcesso();
                                }
                            })
                            .catch(() => {
                                const idArquivo = res.data.arq_id;
                                axios({
                                    method: 'DELETE',
                                    url: `arquivos/${idArquivo}`,
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
                limpaCampos();
                carregaManifestacaoProcesso();
                mensagem.success('Manifestação inserida com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao inserir manifestação.');
            });
    }

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo/${props.match.params.proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const processo = res.data;
                for (let i = 0; i < processo.length; i++) {
                    setManifestacao({ proId: processo[i].pro_id });
                    setProCodigo(processo[i].pro_codigo);
                    setTprNome(processo[i].tpr_nome);
                    setNodId(processo[i].nod_id);
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [match.params.proId]);

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
            await carregaManifestacaoProcesso();
        }
        carrega();
    }, []);

    function apaga(id) {
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
                        mensagem.success('Decisão apagada com sucesso.');
                        carregaAnexos(manId);
                        carregaManifestacaoProcesso();
                    })
                    .catch(err => {
                        setErro(err.response.data.error);
                    });
            })
            .catch(erroDeleteArquivo => {
                setErro(erroDeleteArquivo.response.data.error);
            });
    }

    function tramita() {
        // aqui vai verificar se vai tramitar para um ou para vários
        axios({
            method: 'GET',
            url: `/proximo-tramite/${props.match.params.proId}`,
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

    function limpaErros() {
        setErro('');
    }

    function consulta() {
        history.push('/processo-consulta');
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
                man_id: document.getElementById('manId').value,
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
                <Autorizacao tela="Criar visto" />
                <Main>
                    <Titulo>
                        {manifestacaoProcesso.length > 0 ? (
                            <p>Visto: {manifestacaoProcesso[0].man_visto_executiva}</p>
                        ) : (
                            <p>Vistar</p>
                        )}
                        <hr />
                    </Titulo>
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
                    <Form ref={formRef} initialData={manifestacao} onSubmit={criaManifestacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />
                        {manifestacaoProcesso.length === 0 ? (
                            <Container2>
                                <VistoExecutiva
                                    name="manVistoExecutiva"
                                    changeHandler={() => limpaErros()}
                                />
                            </Container2>
                        ) : null}
                        <ContainerBotoes>
                            {manifestacaoProcesso.length === 0 ? (
                                <BotaoVistoExecutiva name="btnVistoExecutiva" type="submit" />
                            ) : null}
                            {manifestacaoProcesso.length > 0 ? (
                                <Tramitar name="btnTramita" clickHandler={tramita} />
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
                    <ModalTramitaVarios
                        modalTramitaVarios={modalTramitaVarios}
                        fechaModalTramitaVarios={fechaModalTramitaVarios}
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
                            <fieldset>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Documento</th>
                                            <th>Arquivo</th>
                                            <th>Data</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {anexos.map(anexo => (
                                            <tr key={anexo.arq_id}>
                                                <td>{anexo.tpd_nome}</td>
                                                <td>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={e =>
                                                            download(
                                                                e,
                                                                anexo.arq_id,
                                                                anexo.man_id,
                                                                anexo.arq_nome
                                                            )
                                                        }>
                                                        {anexo.arq_nome}
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

CriarManifestacaoVisto.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            proId: PropTypes.string,
        }),
    }).isRequired,
};

export default CriarManifestacaoVisto;

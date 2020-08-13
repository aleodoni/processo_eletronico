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
import ModalTramitaUm from '../../components/ModalTramitaUm';
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
import * as constantes from '../../utils/constantes';

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
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);
    const [dadosTramite, setDadosTramite] = useState([]);
    const [nodId, setNodId] = useState('');
    const [anexos, setAnexos] = useState([]);
    const [processoModal, setProcessoModal] = useState([]);

    const [manifestacaoProcesso, setManifestacaoProcesso] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

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

    function incluiManifestacao({ manVistoExecutiva }) {
        setErro('');
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
                tmn_id: constantes.TMN_MANIFESTACAO_EXECUTIVA,
                man_login: manLogin,
                man_id_area: manIdArea,
                man_visto_executiva: manVistoExecutiva,
                nod_id: nodId,

                arq_id: null,
                arq_nome: `visto-executiva.pdf`,
                arq_tipo: 'application/pdf',
                arq_doc_id: null,
                arq_doc_tipo: 'manifestação',
                tpd_id: constantes.TPD_VISTO_EXECUTIVA,
                arq_login: sessionStorage.getItem('usuario'),
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(resultado => {
                setManId(resultado.data.man_id);
                axios({
                    method: 'POST',
                    url: `/arquivo-visto-executiva`,
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data: {
                        arq_id: resultado.data.arq_id,
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
                        const idArquivo = resultado.data.arq_id;
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
                    setProcessoModal(processo[i]);
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
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function limpaErros() {
        setErro('');
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
                        processo={processoModal}
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

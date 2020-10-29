/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast as mensagem } from 'react-toastify';
import { useHistory } from 'react-router';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import DefaultLayout from '../_layouts/default';
import Tramitar from '../../components/layout/button/Tramitar';
import CienciaAverbacao from '../../components/system/select/CienciaAverbacao';
import Ciencia from '../../components/layout/button/Ciencia';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalProcesso from '../../components/ModalProcesso';
import * as constantes from '../../utils/constantes';

import {
    Container,
    Container2,
    Main,
    Erro,
    BotaoComoLink,
    LinkProcesso,
    ContainerBotoes,
    Titulo,
} from './styles';
import { download } from '../../utils/downloadArquivo';

function CriarManifestacaoCienciaAverbacao(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const { match } = props;
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manCienciaAverbacao: '-1',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [anexos, setAnexos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);
    const [dadosTramite, setDadosTramite] = useState([]);
    const [nodId, setNodId] = useState('');
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
            manCienciaAverbacao: '-1',
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
            const response = await api.get(`/manifestacao-processo/${match.params.proId}`);
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

    function criaManifestacaoCienciaAverbacao({ proId, manCienciaAverbacao }) {
        setErro('');
        axios({
            method: 'POST',
            url: '/manifestacoes',
            data: {
                man_id: null,
                pro_id: match.params.proId,
                tmn_id: constantes.TMN_CIENCIA_AVERBACAO,
                man_login: sessionStorage.getItem('usuario'),
                man_id_area: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                man_ciencia_averbacao: manCienciaAverbacao,
                nod_id: nodId,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setManId(res.data.man_id);
                const data = new FormData();
                data.append('pro_id', Number(match.params.proId));
                data.append('man_id', res.data.man_id);
                data.append('arq_login', sessionStorage.getItem('usuario'));
                data.append('arq_doc_tipo', 'manifestação');
                axios({
                    method: 'POST',
                    url: `/arquivo-ciencia-averbacao/${Number(
                        match.params.proId
                    )}/${proCodigo.substr(proCodigo.length - 4)}/${sessionStorage.getItem(
                        'usuario'
                    )}/${res.data.man_id}`,
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data,
                })
                    .then(resAnexos => {
                        if (resAnexos.status === 204) {
                            limpaCampos();
                            mensagem.success(
                                'Arquivo de ciência de averbação inserido com sucesso.'
                            );
                            carregaManifestacaoProcesso();
                        }
                    })
                    .catch(() => {
                        setErro('');
                        carregaManifestacaoProcesso();
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
                        mensagem.success('Ciência apagada com sucesso.');
                        carregaDadosProcesso();
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
        // Verifica qual foi a averbação selecionada
        const ciencia_averbacao = manifestacaoProcesso[0].man_ciencia_averbacao;

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
                if (ciencia_averbacao === 'Concordo com a averbação parcial') {
                    abreModalTramitaUm(res.data[0]);
                } else if (ciencia_averbacao === 'Nova apresentação de CTC') {
                    abreModalTramitaUm(res.data[2]);
                } else if (ciencia_averbacao === 'Desisto do pedido') {
                    abreModalTramitaUm(res.data[1]);
                } else {
                    mensagem.info('Erro ao tramitar.');
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
            url: '/tramites-averbacao',
            data: {
                tra_id: null,
                prx_id: prxId,
                pro_id: Number(match.params.proId),
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
                <Autorizacao tela="Criar ciência averbação" />
                <Main>
                    <Titulo>
                        {manifestacaoProcesso.length > 0 ? (
                            <p>
                                Ciência da averbação:{' '}
                                {manifestacaoProcesso[0].man_ciencia_averbacao}
                            </p>
                        ) : (
                            <p>Ciência da averbação de tempo de serviço</p>
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
                    <Form
                        ref={formRef}
                        initialData={manifestacao}
                        onSubmit={criaManifestacaoCienciaAverbacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />
                        {manifestacaoProcesso.length === 0 ? (
                            <Container2>
                                <CienciaAverbacao
                                    name="manCienciaAverbacao"
                                    changeHandler={() => limpaErros()}
                                />
                            </Container2>
                        ) : null}
                        <ContainerBotoes>
                            {manifestacaoProcesso.length === 0 ? (
                                <Ciencia name="btnCienciaAverbacao" type="submit" />
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

CriarManifestacaoCienciaAverbacao.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            proId: PropTypes.string,
        }),
    }).isRequired,
};

export default CriarManifestacaoCienciaAverbacao;

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
import Input from '../../components/layout/Input';
import DefaultLayout from '../_layouts/default';
import Tramitar from '../../components/layout/button/Tramitar';
import CienciaCalculo from '../../components/system/select/CienciaCalculo';
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
    LinkJuntada,
    ContainerBotoes,
    Titulo,
} from './styles';
import { download } from '../../utils/downloadArquivo';

function CriarManifestacaoCienciaCalculo(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const { match } = props;
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manCienciaCalculo: '-1',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [mostraRegra, setMostraRegra] = useState(false);
    const [mostraCiencia, setMostraCiencia] = useState(false);
    const [mostraBotaoDiscorda, setMostraBotaoDiscorda] = useState(false);
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

    function selecionaCiencia() {
        if (document.getElementById('manCienciaCalculo').value === 'Estou ciente do cálculo') {
            setMostraRegra(true);
            setMostraBotaoDiscorda(true);
            setMostraCiencia(true);
        } else if (document.getElementById('manCienciaCalculo').value === 'Discordo do cálculo') {
            setMostraRegra(false);
            setMostraBotaoDiscorda(true);
            setMostraCiencia(false);
        } else {
            setMostraRegra(false);
            setMostraBotaoDiscorda(false);
            setMostraCiencia(false);
        }
    }

    function limpaCampos() {
        setManId(null);
        setManifestacao({
            ...manifestacao,
            manCienciaCalculo: '-1',
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

    function criaManifestacao({ proId, manCienciaCalculo }) {
        setErro('');
        axios({
            method: 'POST',
            url: '/manifestacoes',
            data: {
                man_id: null,
                pro_id: proId,
                tmn_id: constantes.TMN_CIENCIA_CALCULO_APOSENTADORIA,
                man_login: sessionStorage.getItem('usuario'),
                man_id_area: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                nod_id: nodId,
                man_ciencia_calculo: manCienciaCalculo,

                arq_id: null,
                arq_nome: `ciencia-cálculo.pdf`,
                arq_tipo: 'application/pdf',
                arq_doc_id: null,
                arq_doc_tipo: 'manifestação',
                tpd_id: constantes.TPD_CIENCIA_CALCULO_APOSENTADORIA,
                arq_login: sessionStorage.getItem('usuario'),
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(resultado => {
                axios({
                    method: 'POST',
                    url: `/arquivo-ciencia-calculo`,
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
                            mensagem.success('Manifestação inserida com sucesso.');
                            carregaManifestacaoProcesso();
                            setMostraRegra(false);
                            setMostraBotaoDiscorda(false);
                            setMostraCiencia(false);
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
        // Verifica qual foi a ciência
        const ciencia_calculo = manifestacaoProcesso[0].man_ciencia_calculo;
        if (ciencia_calculo === 'Discordo do cálculo') {
            const NODO_CALCULO_RH = 91;
            axios({
                method: 'GET',
                url: `/proximo-tramite-direcionado/${match.params.proId}/${NODO_CALCULO_RH}`,
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
        }
        if (ciencia_calculo === 'Estou ciente do cálculo') {
            const NODO_CALCULO_RH = 92;
            axios({
                method: 'GET',
                url: `/proximo-tramite-direcionado/${match.params.proId}/${NODO_CALCULO_RH}`,
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
        }
    }

    function incluiAnexoDiscorda(e) {
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
                tmn_id: constantes.TMN_DISCORDANCIA_CALCULO,
                man_login: sessionStorage.getItem('usuario'),
                man_id_area: sessionStorage.getItem('areaUsuario'),
                nod_id: nodId,
                man_ciencia_calculo: document.getElementById('manCienciaCalculo').value,

                arq_id: null,
                arq_nome: arq.name,
                arq_tipo: arq.type,
                arq_doc_id: null,
                arq_doc_tipo: 'manifestação',
                tpd_id: constantes.TPD_DISCORDANCIA_CALCULO,
                arq_login: sessionStorage.getItem('usuario'),
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(resultado => {
                setManifestacao({ manId: resultado.data.man_id });
                const data = new FormData();
                data.append('file', arq);
                axios({
                    method: 'POST',
                    url: `/anexo-manifestacao/${resultado.data.arq_id}`,
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
                            setMostraRegra(false);
                            setMostraBotaoDiscorda(false);
                            setMostraCiencia(false);
                        }
                    })
                    .catch(err => {
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
            })
            .catch(() => {
                setErro('Erro ao inserir manifestação.');
            });
    }

    function insereTramite(prxId, setId) {
        const ciencia_calculo = manifestacaoProcesso[0].man_ciencia_calculo;
        let url = '';
        if (ciencia_calculo === 'Discordo do cálculo') {
            url = '/tramites';
        } else if (ciencia_calculo === 'Estou ciente do cálculo') {
            url = '/tramites-direcionado';
        } else {
            mensagem.error('Ciência em branco.');
            return;
        }

        axios({
            method: 'POST',
            url,
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

    function geraJuntada() {
        axios({
            method: 'GET',
            url: `/gera-juntada/${Number(match.params.proId)}`,
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
                let fileName = `juntada${Number(match.params.proId)}.pdf`;
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
                setErro('Erro ao gerar juntada.');
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar ciência do cálculo" />
                <Main>
                    <Titulo>
                        {manifestacaoProcesso.length > 0 ? (
                            <p>Ciência do cálculo: {manifestacaoProcesso[0].man_ciencia_calculo}</p>
                        ) : (
                            <p>Ciência do cálculo</p>
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
                    <Form ref={formRef} initialData={manifestacao} onSubmit={criaManifestacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />
                        {manifestacaoProcesso.length === 0 ? (
                            <Container2>
                                <CienciaCalculo
                                    name="manCienciaCalculo"
                                    changeHandler={selecionaCiencia}
                                />
                                <LinkJuntada type="button" onClick={geraJuntada}>
                                    Ver juntada do processo
                                </LinkJuntada>
                            </Container2>
                        ) : null}
                        <ContainerBotoes>
                            {mostraCiencia ? (
                                <Ciencia name="btnCienciaCalculo" type="submit" />
                            ) : null}
                            {manifestacaoProcesso.length > 0 ? (
                                <Tramitar name="btnTramita" clickHandler={tramita} />
                            ) : null}
                            {mostraBotaoDiscorda && !mostraRegra ? (
                                <>
                                    <label htmlFor="anexo">
                                        <FaPaperclip />
                                        &nbsp;Inserir documento
                                    </label>

                                    <input
                                        type="file"
                                        name="file"
                                        onChange={incluiAnexoDiscorda}
                                        id="anexo"
                                    />
                                </>
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
                            <p>Manifestação</p>
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

CriarManifestacaoCienciaCalculo.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            proId: PropTypes.string,
        }),
    }).isRequired,
};

export default CriarManifestacaoCienciaCalculo;

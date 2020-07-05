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
import Select from '../../components/layout/Select';
import DefaultLayout from '../_layouts/default';
import Tramitar from '../../components/layout/button/Tramitar';
import CienciaCalculo from '../../components/system/select/CienciaCalculo';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import Ciencia from '../../components/layout/button/Ciencia';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalProcesso from '../../components/ModalProcesso';

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

function CriarManifestacaoCienciaCalculo(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manCienciaCalculo: '-1',
    });
    const [manId, setManId] = useState(undefined);
    const [arqId, setArqId] = useState(undefined);
    const [proIdModal, setProId] = useState(-1);
    const [mostraRegra, setMostraRegra] = useState(false);
    const [mostraCiencia, setMostraCiencia] = useState(false);
    const [mostraBotaoDiscorda, setMostraBotaoDiscorda] = useState(false);
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [anexos, setAnexos] = useState([]);
    const [anexosDiscordancia, setAnexosDiscordancia] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalProcesso, setModalProcesso] = useState(false);
    const [dadosTramite, setDadosTramite] = useState([]);
    const [nodId, setNodId] = useState('');
    const [regras, setRegras] = useState([]);

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

    async function carregaRegraAposentacao() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/regras-aposentacao');

            const data = response.data.map(regra => {
                return {
                    label: regra.reg_nome,
                    value: regra.reg_id,
                };
            });
            setRegras(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
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

    function criaManifestacaoCienciaCalculo({ proId, manCienciaCalculo }) {
        // Manifestação de ciência do cálculo
        const TIPO_MANIFESTACAO_CIENCIA_CALCULO = 15;

        // Tipo de documento de ciência do cálculo
        const TIPO_DOCUMENTO_CIENCIA_CALCULO = 36;

        const manLogin = sessionStorage.getItem('usuario');
        const manIdArea = parseInt(sessionStorage.getItem('areaUsuario'), 10);
        if (manCienciaCalculo === '-1') {
            setErro('Selecione a ciência do cálculo.');
            return;
        }
        axios({
            method: 'POST',
            url: '/manifestacoes',
            data: {
                man_id: null,
                pro_id: proId,
                tmn_id: TIPO_MANIFESTACAO_CIENCIA_CALCULO,
                tpd_id: TIPO_DOCUMENTO_CIENCIA_CALCULO,
                man_login: manLogin,
                man_id_area: manIdArea,
                man_visto_executiva: 'Não necessário',
                nod_id: nodId,
                man_ciencia: 'Não necessário',
                man_averbacao: 'Não necessário',
                man_ciencia_averbacao: 'Não necessário',
                man_ciencia_calculo: manCienciaCalculo,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(resultado => {
                const ARQ_CIENCIA_CALCULO = `ciencia-cálculo-${resultado.data.man_id}.pdf`;
                axios({
                    method: 'POST',
                    url: '/arquivos',
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                    data: {
                        arq_id: null,
                        arq_nome: ARQ_CIENCIA_CALCULO,
                        pro_id: resultado.data.pro_id,
                        man_id: resultado.data.man_id,
                        arq_tipo: 'application/pdf',
                        arq_doc_id: resultado.data.man_id,
                        arq_doc_tipo: 'manifestação',
                        tpd_id: TIPO_DOCUMENTO_CIENCIA_CALCULO,
                        arq_login: sessionStorage.getItem('usuario'),
                    },
                })
                    .then(res => {
                        axios({
                            method: 'POST',
                            url: `/arquivo-ciencia-calculo`,
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                            },
                            data: {
                                arq_id: res.data.arq_id,
                                usuario: sessionStorage.getItem('usuario'),
                            },
                        })
                            .then(resAnexos => {
                                if (resAnexos.status === 204) {
                                    limpaCampos();
                                    mensagem.success('Arquivo de ciência inserido com sucesso.');
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
    }, [props.match.params.proId]);

    function downloadAnexo(e, idArquivo, id, arqNome) {
        e.preventDefault();
        axios({
            method: 'GET',
            url: `/download-manifestacao/${id}/${idArquivo}`,
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

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
            await carregaManifestacaoProcesso();
            await carregaRegraAposentacao();
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
                        // setMostraRegra(false);
                        // setMostraBotaoDiscorda(false);
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
                url: `/proximo-tramite-direcionado/${props.match.params.proId}/${NODO_CALCULO_RH}`,
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
                    alert(JSON.stringify(res.data, null, 4));
                    abreModalTramitaUm(res.data[0]);
                })
                .catch(() => {
                    setErro('Erro ao carregar próximos trâmites.');
                });
        }
    }

    function incluiAnexoDiscorda(e) {
        // Manifestação de discordância de cálculo
        const TIPO_MANIFESTACAO_DISCORDA_CALCULO = 16;

        // Tipo de documento de discordância de cálculo
        const TIPO_DOCUMENTO_DISCORDA_CALCULO = 37;
        setErro('');
        const arq = e.target.files[0];
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size <= tamanhoAnexo) {
            if (e.target.files[0].type === 'application/pdf') {
                // aqui vai gravar na manifestação
                axios({
                    method: 'POST',
                    url: '/manifestacoes',
                    data: {
                        man_id: null,
                        pro_id: Number(props.match.params.proId),
                        tmn_id: TIPO_MANIFESTACAO_DISCORDA_CALCULO,
                        man_login: sessionStorage.getItem('usuario'),
                        man_id_area: sessionStorage.getItem('areaUsuario'),
                        man_visto_executiva: 'Não necessário',
                        nod_id: nodId,
                        man_ciencia: 'Não necessário',
                        man_averbacao: 'Não necessário',
                        man_ciencia_averbacao: 'Não necessário',
                        man_aval_horario: 'Não necessário',
                        man_contagem_tempo: 'Não necessário',
                        man_ciencia_calculo: document.getElementById('manCienciaCalculo').value,
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
                            url: '/arquivos',
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                            },
                            data: {
                                arq_id: null,
                                arq_nome: arq.name,
                                pro_id: resultado.data.pro_id,
                                man_id: resultado.data.man_id,
                                arq_tipo: arq.type,
                                arq_doc_id: resultado.data.man_id,
                                arq_doc_tipo: 'manifestação',
                                tpd_id: TIPO_DOCUMENTO_DISCORDA_CALCULO,
                                arq_login: sessionStorage.getItem('usuario'),
                            },
                        })
                            .then(res => {
                                axios({
                                    method: 'POST',
                                    url: `/anexo-manifestacao/${res.data.arq_id}`,
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
                    })
                    .catch(() => {
                        setErro('Erro ao inserir manifestação.');
                    });
                //
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
                        <LinkProcesso
                            type="button"
                            onClick={() => abreModalProcesso(props.match.params.proId)}>
                            {proCodigo}
                        </LinkProcesso>
                        - {tprNome}
                    </span>
                    <Form
                        ref={formRef}
                        initialData={manifestacao}
                        onSubmit={criaManifestacaoCienciaCalculo}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />
                        {manifestacaoProcesso.length === 0 ? (
                            <Container2>
                                <CienciaCalculo
                                    name="manCienciaCalculo"
                                    changeHandler={selecionaCiencia}
                                />
                                {mostraRegra ? (
                                    <Select
                                        name="regId"
                                        label="Regra de aposentação"
                                        options={regras}
                                    />
                                ) : null}
                            </Container2>
                        ) : null}
                        <ContainerBotoes>
                            {mostraCiencia ? (
                                <Ciencia name="btnCienciaCalculo" type="submit" />
                            ) : null}
                            {manifestacaoProcesso.length > 0 ? (
                                <Tramitar name="btnTramita" clickHandler={tramita} />
                            ) : null}
                            <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
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
                                        onClick={e => {
                                            // verificaArquivo(e);
                                        }}
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
                        proId={proIdModal}
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
                                                            downloadAnexo(
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
                    <br />
                    {anexosDiscordancia.length > 0 ? (
                        <div>
                            <p>Discordância(s) de cálculo</p>
                            <fieldset>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Documento</th>
                                            <th>Arquivo</th>
                                            <th>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {anexosDiscordancia.map(anexoDiscordancia => (
                                            <tr key={anexoDiscordancia.arq_id}>
                                                <td>{anexoDiscordancia.tpd_nome}</td>
                                                <td>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={e =>
                                                            downloadAnexo(
                                                                e,
                                                                anexoDiscordancia.arq_id,
                                                                anexoDiscordancia.man_id,
                                                                anexoDiscordancia.arq_nome
                                                            )
                                                        }>
                                                        {anexoDiscordancia.arq_nome}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>{anexoDiscordancia.data}</td>
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

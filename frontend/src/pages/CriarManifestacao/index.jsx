/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useHistory } from 'react';
import { toast as mensagem } from 'react-toastify';
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
import Limpar from '../../components/layout/button/Limpar';
import Tramitar from '../../components/layout/button/Tramitar';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';

import ModalCancela from '../../components/ModalCancelar';
import {
    Container,
    Container2,
    Main,
    Erro,
    BotaoComoLink,
    Cancelado,
    ContainerBotoes,
} from './styles';

function CriarManifestacao(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manVistoExecutiva: '',
    });
    const [manId, setManId] = useState(undefined);
    const [tmnId, setTmnId] = useState('');
    const [tpdId, setTpdId] = useState('');
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [tiposManifestacao, setTiposManifestacao] = useState([]);
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

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

    function abreModalCancelar(id) {
        setManId(id);
        setModalCancelar(true);
    }

    function fechaModalCancelar() {
        setModalCancelar(false);
    }

    function abreModalExcluir(id) {
        setManId(id);
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setTmnId('');
        setTpdId('');
        setManId(null);
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

    const verificaTipos = e => {
        if (tmnId === '') {
            setErro('Selecione o tipo da manifestação.');
            e.preventDefault();
        } else if (tpdId === '') {
            setErro('Selecione o tipo de documento.');
            e.preventDefault();
        }
    };

    function incluiAnexo(e) {
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
                        pro_id: manifestacao.proId,
                        tmn_id: tmnId,
                        tpd_id: tpdId,
                        man_login: sessionStorage.getItem('usuario'),
                        man_id_area: sessionStorage.getItem('areaUsuario'),
                        man_visto_executiva: 'Não necessário',
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(resultado => {
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
                                pro_id: null,
                                man_id: resultado.data.man_id,
                                arq_tipo: arq.type,
                                arq_doc_id: resultado.data.man_id,
                                arq_doc_tipo: 'manifestação',
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
                                            carregaAnexos(manifestacao.proId);
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
            const response = await api.get('/tipos-documento');

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

    function carregaDadosProcesso(id) {
        axios({
            method: 'GET',
            url: `/ver-processo/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setManifestacao({ proId: res.data.pro_id });
                setProCodigo(res.data.pro_codigo);
                setTprNome(res.data.tpr_nome);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    function cancela(manId1) {
        axios({
            method: 'PUT',
            url: `manifestacoes/${manId1}`,
            data: {
                man_cancelada: true,
                man_login_cancelamento: sessionStorage.getItem('usuario'),
                man_data_cancelamento: null,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                carregaAnexos(manifestacao.proId);
                mensagem.success('Cancelada com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao cancelar manifestação.');
            });
    }

    function downloadAnexo(e, arqId, id, arqNome) {
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

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso(props.match.params.proId);
            await carregaTipoManifestacao();
            await carregaTipoDocumento();
            await carregaAnexos(props.match.params.proId);
            await setManifestacao({ proId: props.match.params.proId });
        }
        carrega();
    }, []);

    function apaga(id) {
        axios({
            method: 'DELETE',
            url: `manifestacoes/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaAnexos(manifestacao.proId);
                mensagem.success('Excluído com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    function tramita() {
        alert('tramitar');
    }

    function consulta() {
        history.push('/processo-consulta');
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar manifestação" />
                <Main>
                    <Erro>{erro}</Erro>
                    <fieldset>
                        <label>Processo: </label>
                        <span>
                            {proCodigo} - {tprNome}
                        </span>
                    </fieldset>
                    <Form ref={formRef} initialData={manifestacao} onSubmit={incluiAnexo}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />

                        <Container2>
                            <Select
                                name="tmnId"
                                label="Tipo da manifestação"
                                options={tiposManifestacao}
                                onChange={handleTmnId}
                            />
                            <Select
                                name="tpdId"
                                label="Tipo do documento"
                                options={tiposDocumento}
                                onChange={handleTpdId}
                            />
                        </Container2>
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
                                onClick={e => {
                                    verificaTipos(e);
                                }}
                            />
                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                            <Tramitar name="btnTramita" clickHandler={tramita} />
                            <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
                        </ContainerBotoes>
                    </Form>
                    <ModalCancela
                        modalCancelar={modalCancelar}
                        fechaModalCancelar={fechaModalCancelar}
                        cancela={cancela}
                        id={manId}
                    />
                    <ModalApaga
                        modalExcluir={modalExcluir}
                        fechaModalExcluir={fechaModalExcluir}
                        apaga={apaga}
                        id={manId}
                    />

                    {anexos.length > 0 ? (
                        <div>
                            <p>Manifestações</p>
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
                                        <th>Cancelar</th>
                                        <th>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anexos.map(anexo => (
                                        <tr key={anexo.arq_id}>
                                            <td>{anexo.contador}</td>
                                            <td>{anexo.tpd_nome}</td>
                                            <td>{anexo.tmn_nome}</td>
                                            <td>
                                                <BotaoComoLink
                                                    type="button"
                                                    onClick={e =>
                                                        downloadAnexo(
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
                                                {anexo.situacao === 'Cancelada' ? (
                                                    <Cancelado>{anexo.situacao}</Cancelado>
                                                ) : (
                                                    anexo.situacao
                                                )}
                                            </td>
                                            <td>{anexo.man_visto_executiva}</td>
                                            <td>
                                                {anexo.man_login ===
                                                    sessionStorage.getItem('usuario') &&
                                                anexo.situacao === 'Ativa' ? (
                                                    <BotaoComoLink
                                                        onClick={() =>
                                                            abreModalCancelar(anexo.man_id)
                                                        }>
                                                        Cancelar
                                                    </BotaoComoLink>
                                                ) : null}
                                            </td>
                                            <td>
                                                {anexo.man_login ===
                                                    sessionStorage.getItem('usuario') &&
                                                anexo.situacao === 'Ativa' ? (
                                                    <BotaoComoLink
                                                        onClick={() =>
                                                            abreModalExcluir(anexo.man_id)
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

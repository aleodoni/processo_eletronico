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
import Limpar from '../../components/layout/button/Limpar';
import Tramitar from '../../components/layout/button/Tramitar';
import BotaoVistoExecutiva from '../../components/layout/button/VistoExecutiva';
import VistoExecutiva from '../../components/system/select/VistoExecutiva';
import FormLine from '../../components/layout/FormLine';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import ModalTramitaVarios from '../../components/ModalTramitaVarios';

import {
    Container,
    Container2,
    Main,
    Erro,
    BotaoComoLink,
    Vermelho,
    ContainerBotoes,
} from './styles';

function CriarManifestacaoExecutiva(props) {
    const [erro, setErro] = useState('');
    const history = useHistory();
    const [manifestacao, setManifestacao] = useState({
        manId: undefined,
        proId: undefined,
        manVistoExecutiva: -1,
    });
    const [manId, setManId] = useState(undefined);
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [anexos, setAnexos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [modalTramitaVarios, setModalTramitaVarios] = useState(false);
    const [dadosTramite, setDadosTramite] = useState([]);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

    function abreModalExcluir(id) {
        setManId(id);
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
            manVistoExecutiva: -1,
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

    function criaManifestacao({ proId, manVistoExecutiva }) {
        // Manifestação da executiva
        const TIPO_MANIFESTACAO = 5;
        // Aval da Comissão Executiva
        const TIPO_DOCUMENTO = 27;
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
                pro_id: proId,
                tmn_id: TIPO_MANIFESTACAO,
                tpd_id: TIPO_DOCUMENTO,
                man_login: manLogin,
                man_id_area: manIdArea,
                man_visto_executiva: manVistoExecutiva,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                mensagem.success('Manifestação inserida com sucesso.');
                carregaAnexos(proId);
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
                }
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [manifestacao.proId]);

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
            await carregaDadosProcesso();
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
        // aqui vai verificar se vai tramitar para um ou para vários
        axios({
            method: 'GET',
            url: `/proximo-tramite/${manifestacao.proId}`,
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
                pro_id: manifestacao.proId,
                login_envia: sessionStorage.getItem('usuario'),
                area_id_envia: sessionStorage.getItem('areaUsuario'),
                area_id_recebe: setId,
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
                <Autorizacao tela="Criar manifestação executiva" />
                <Main>
                    <Erro>{erro}</Erro>
                    <fieldset>
                        <label>Processo: </label>
                        <span>
                            {proCodigo} - {tprNome}
                        </span>
                    </fieldset>
                    <Form ref={formRef} initialData={manifestacao} onSubmit={criaManifestacao}>
                        <Input name="manId" type="hidden" />
                        <Input name="proId" type="hidden" />

                        <Container2>
                            <FormLine>
                                <VistoExecutiva
                                    name="manVistoExecutiva"
                                    changeHandler={() => limpaErros()}
                                />
                            </FormLine>
                        </Container2>
                        <ContainerBotoes>
                            <BotaoVistoExecutiva name="btnVistoExecutiva" type="submit" />
                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                            <Tramitar name="btnTramita" clickHandler={tramita} />
                            <ConsultarOutro name="btnConsulta" clickHandler={consulta} />
                        </ContainerBotoes>
                    </Form>
                    <ModalApaga
                        modalExcluir={modalExcluir}
                        fechaModalExcluir={fechaModalExcluir}
                        apaga={apaga}
                        id={manId}
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

                    {anexos.length > 0 ? (
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
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {anexos.map((anexo, index) => (
                                            <tr key={anexo.man_id}>
                                                <td>{index + 1}</td>
                                                <td>{anexo.tpd_nome}</td>
                                                <td>{anexo.tmn_nome}</td>
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
                                                <td>{anexo.set_nome}</td>
                                                <td>
                                                    {anexo.situacao === 'Cancelada' ? (
                                                        <Vermelho>{anexo.situacao}</Vermelho>
                                                    ) : (
                                                        anexo.situacao
                                                    )}
                                                </td>
                                                <td>
                                                    {anexo.man_visto_executiva === 'Negado' ? (
                                                        <Vermelho>
                                                            {anexo.man_visto_executiva}
                                                        </Vermelho>
                                                    ) : (
                                                        anexo.man_visto_executiva
                                                    )}
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
                            </fieldset>
                        </div>
                    ) : null}
                </Main>
            </Container>
        </DefaultLayout>
    );
}

CriarManifestacaoExecutiva.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            proId: PropTypes.string,
        }),
    }).isRequired,
};

export default CriarManifestacaoExecutiva;

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef, useHistory } from 'react';
import { toast as mensagem } from 'react-toastify';
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
import CriaManifestacao from '../../components/layout/button/CriaManifestacao';
import VistoExecutiva from '../../components/system/select/VistoExecutiva';
import FormLine from '../../components/layout/FormLine';
import ConsultarOutro from '../../components/layout/button/ConsultarOutro';

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

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(manifestacao);
    }, [manifestacao]);

    function abreModalExcluir(id) {
        alert(id);
        setManId(id);
        setModalExcluir(true);
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
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

    function limpaErros() {
        setErro('');
    }

    function consulta() {
        history.push('/processo-consulta');
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
                            <CriaManifestacao name="btnCriaManifestacao" type="submit" />
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
                                        {anexos.map(anexo => (
                                            <tr key={anexo.man_id}>
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

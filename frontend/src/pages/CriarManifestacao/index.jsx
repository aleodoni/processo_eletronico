import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaPaperclip, FaSyncAlt } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalCancela from '../../components/ModalCancelar';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { Container, Container1, Container2, ContainerBotoes, AsideLeft, Main, Erro, BotaoComoLink, Cancelado, Centralizado } from './styles';
import Header from '../../components/Header';

function CriarManifestacao(props) {
    const [erro, setErro] = useState('');
    const [manId, setManId] = useState(undefined);
    const [proId, setProId] = useState('');
    const [tmnId, setTmnId] = useState('');
    const [proCodigo, setProCodigo] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [tiposManifestacao, setTiposManifestacao] = useState([]);
    const [anexos, setAnexos] = useState([]);
    const [modalCancelar, setModalCancelar] = useState(false);

    function abreModalCancelar(manId2) {
        setManId(manId2);
        setModalCancelar(true);
    }

    function fechaModalCancelar() {
        setModalCancelar(false);
    }

    function handleManId(e) {
        setManId(e.target.value);
    }

    function handleTmnId(e) {
        setErro('');
        setTmnId(e.target.value);
    }

    function limpaCampos() {
        setManId(undefined);
        setTmnId('');
        setErro('');
    }

    function carregaAnexos(id) {
        axios({
            method: 'GET',
            url: `/arquivos-manifestacao/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setAnexos(res.data);
            })
            .catch(() => {
                console.log('Erro ao criar componente de anexo.');
            });
    }

    const verificaTipoManifestacao = event => {
        if (tmnId === '') {
            setErro('Selecione o tipo da manifestação.');
            event.preventDefault();
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
                        pro_id: proId,
                        tmn_id: tmnId,
                        man_login: sessionStorage.getItem('usuario'),
                        man_id_area: sessionStorage.getItem('areaUsuario'),
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
                                            carregaAnexos(proId);
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
                    .catch(err => {
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

    function carregaTipoManifestacao() {
        axios({
            method: 'GET',
            url: '/tipos-manifestacao',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const comboTipoManifestacao = [];
                comboTipoManifestacao.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboTipoManifestacao.push(
                        <option key={res.data[i].tmn_id} data-key={res.data[i].tmn_id} value={res.data[i].tmn_id}>
                            {res.data[i].tmn_nome}
                        </option>
                    );
                }
                setTiposManifestacao(comboTipoManifestacao);
            })
            .catch(() => {
                setErro('Erro ao carregar setores.');
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
                setProId(res.data.pro_id);
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
                carregaAnexos(proId);
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
        carregaDadosProcesso(props.match.params.proId);
        carregaTipoManifestacao();
        carregaAnexos(props.match.params.proId);
    }, [props.match.params.proId]);

    return (
        <>
            <Container>
                <Autorizacao tela="Criar manifestação" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Manifestações</legend>
                        <Erro>{erro}</Erro>
                        <form noValidate autoComplete="off">
                            <input id="manId" value={manId} onChange={handleManId} type="hidden" />
                            <Container1>
                                <div>
                                    <label>Processo:</label>
                                    <span>
                                        {proCodigo} - {tprNome}
                                    </span>
                                </div>
                            </Container1>
                            <Container2>
                                <fieldset>
                                    <legend>Tipo da manifestação</legend>
                                    <select id="selectTipoManifestacao" onChange={handleTmnId} value={tmnId}>
                                        {tiposManifestacao}
                                    </select>
                                </fieldset>
                            </Container2>
                        </form>
                        <ContainerBotoes>
                            <label htmlFor="anexo">
                                <FaPaperclip />
                                &nbsp;Inserir manifestação
                            </label>
                            <input type="file" name="file" onChange={incluiAnexo} key={new Date()} id="anexo" onClick={verificaTipoManifestacao} />
                            <button type="button" id="btnLimpa" onClick={limpaCampos}>
                                <FaSyncAlt />
                                &nbsp;Limpar campos
                            </button>
                        </ContainerBotoes>

                        <ModalCancela modalCancelar={modalCancelar} fechaModalCancelar={fechaModalCancelar} cancela={cancela} id={manId} />
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>Manifestações do processo</legend>
                        {anexos.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Arquivo</th>
                                        <th>Tipo da manifestação</th>
                                        <th>Data</th>
                                        <th>Área</th>
                                        <th>Login</th>
                                        <th>Situação</th>
                                        <th>Cancelar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anexos.map(anexo => (
                                        <tr key={anexo.arq_id}>
                                            <td>
                                                <BotaoComoLink type="button" onClick={e => downloadAnexo(e, anexo.arq_id, anexo.manId, anexo.arq_nome)}>
                                                    {anexo.arq_nome}
                                                </BotaoComoLink>
                                            </td>
                                            <td>{anexo.tmn_nome}</td>
                                            <td>{anexo.data}</td>
                                            <td>{anexo.set_nome}</td>
                                            <td>{anexo.man_login}</td>
                                            <td>
                                                <Centralizado>{anexo.situacao === 'Cancelada' ? <Cancelado>{anexo.situacao}</Cancelado> : anexo.situacao}</Centralizado>
                                            </td>
                                            <td>
                                                <Centralizado>
                                                    {anexo.man_login === sessionStorage.getItem('usuario') && anexo.situacao === 'Ativa' ? <BotaoComoLink onClick={() => abreModalCancelar(anexo.man_id)}>Cancelar</BotaoComoLink> : null}
                                                </Centralizado>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <label>Sem manifestações no momento.</label>
                        )}
                    </fieldset>
                </Main>
            </Container>
        </>
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

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { FaFileAlt, FaUndoAlt, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApagaEmpenho from '../../components/ModalExcluirEmpenho';
import ModalCancelar from '../../components/ModalCancelar';
import ModalApagaNotaFiscal from '../../components/ModalExcluirNotaFiscal';
import ModalApagaNAD from '../../components/ModalExcluirNAD';
import ModalTramitaFiscal from '../../components/ModalTramitaFiscal';
import Autorizacao from '../../components/Autorizacao';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/button/Button';
import ButtonCancelaArquivo from '../../components/layout/button/ButtonCancelaArquivo';
import InputSemLabel from '../../components/layout/InputSemLabel';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import { download } from '../../utils/downloadArquivoProcesso';
import Tramitar from '../../components/layout/button/Tramitar';
import * as constantes from '../../utils/constantes';
import {
    Container,
    Main,
    ContainerBotoes,
    ContainerDadosProcesso,
    ContainerReferencia,
    ContainerBanco,
    ContainerAutorizacao,
    ContainerDadosAutorizacao,
    ContainerEmpenhosNotasFiscais,
    ContainerEmpenhos,
    ContainerInsereEmpenhos,
    ContainerInsereNotasFiscais,
    ContainerInsereNads,
    ContainerNotasFiscais,
    ContainerArquivos,
    ContainerListaArquivos,
    ContainerNADs,
    LinkExcluir,
    BotaoComoLink,
    Erro,
} from './styles';

function EditaProcessoPagamento({ match }) {
    const { proId } = match.params;
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [idEmpenho, setIdEmpenho] = useState('');
    const [idArquivo, setIdArquivo] = useState('');
    const [idNotaFiscal, setIdNotaFiscal] = useState('');
    const [idNAD, setIdNAD] = useState('');
    const [processo, setProcesso] = useState([]);
    const [vEmpenhos, setVEmpenhos] = useState([]);
    const [vNotasFiscais, setVNotasFiscais] = useState([]);
    const [vArquivos, setVArquivos] = useState([]);
    const [vNADs, setVNADs] = useState([]);
    const [dadosTramite, setDadosTramite] = useState([]);
    const [razaoTramite, setRazaoTramite] = useState('');
    const formRef = useRef(null);
    const [modalExcluirEmpenho, setModalExcluirEmpenho] = useState(false);
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalExcluirNotaFiscal, setModalExcluirNotaFiscal] = useState(false);
    const [modalExcluirNAD, setModalExcluirNAD] = useState(false);
    const [modalTramitaFiscal, setModalTramitaFiscal] = useState(false);

    const colunaCancelado = {
        textAlign: 'center',
    };

    const arquivoCancelado = {
        color: 'red',
    };

    function abreModalExcluirEmpenho(e, id) {
        e.preventDefault();
        setIdEmpenho(id);
        setModalExcluirEmpenho(true);
    }

    function fechaModalExcluirEmpenho() {
        setModalExcluirEmpenho(false);
    }

    function abreModalCancelar(e, id) {
        e.preventDefault();
        setIdArquivo(id);
        setModalCancelar(true);
    }

    function fechaModalCancelar() {
        setModalCancelar(false);
    }

    function abreModalExcluirNotaFiscal(e, id) {
        e.preventDefault();
        setIdNotaFiscal(id);
        setModalExcluirNotaFiscal(true);
    }

    function fechaModalExcluirNotaFiscal() {
        setModalExcluirNotaFiscal(false);
    }

    function abreModalExcluirNAD(e, id) {
        e.preventDefault();
        setIdNAD(id);
        setModalExcluirNAD(true);
    }

    function fechaModalExcluirNAD() {
        setModalExcluirNAD(false);
    }

    function abreModalTramitaFiscal(dados, razao) {
        setErro('');
        setDadosTramite(dados);
        setRazaoTramite(razao);
        setModalTramitaFiscal(true);
    }

    function fechaModalTramitaFiscal() {
        setErro('');
        setModalTramitaFiscal(false);
    }

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo-pagamento/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                formRef.current.setFieldValue('proNome', res.data.pro_nome);
                formRef.current.setFieldValue('proProcessoPai', res.data.pro_processo_pai);
                for (let i = 0; i < res.data.autorizacao.length; i++) {
                    document.getElementById(
                        'lblAutId'
                    ).innerHTML = `Autorização nº: ${res.data.autorizacao[i].aut_id}`;
                    document.getElementById(
                        'lblReferencia'
                    ).innerHTML = `Referente: ${res.data.autorizacao[i].aut_referencia}`;
                    document.getElementById(
                        'lblBanco'
                    ).innerHTML = `Banco: ${res.data.autorizacao[i].ban_nome}`;
                    document.getElementById(
                        'lblAgencia'
                    ).innerHTML = `Agência: ${res.data.autorizacao[i].aut_ban_agencia}`;
                    document.getElementById(
                        'lblContaCorrente'
                    ).innerHTML = `Conta corrente: ${res.data.autorizacao[i].aut_ban_conta_corrente}`;
                    document.getElementById(
                        'lblValor'
                    ).innerHTML = `Valor: ${res.data.autorizacao[i].aut_valor}`;
                }
                setVEmpenhos(res.data.empenhos);
                setVNotasFiscais(res.data.notas_fiscais);
                setVNADs(res.data.nads);
                setProcesso(res.data);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }, [proId]);

    const carregaArquivosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-arquivos-processo-pgto/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setVArquivos(res.data);
            })
            .catch(() => {
                setErro('Erro ao retornar arquivos do processo.');
            });
    }, [proId]);

    useEffect(() => {
        mensagem.success('Carregando processo...');
        carregaDadosProcesso();
        carregaArquivosProcesso();
    }, [carregaDadosProcesso, carregaArquivosProcesso]);

    function editaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        if (p.proNome.trim() === '') {
            mensagem.error('Nome do fornecedor em branco.');
            return;
        }
        if (p.proProcessoPai.trim() === '') {
            mensagem.error('Processo de origem em branco.');
            return;
        }
        processo.pro_nome = p.proNome;
        processo.pro_processo_pai = p.proProcessoPai;

        const id = processo.pro_id;
        const proNome = processo.pro_nome;
        const proProcessoPai = processo.pro_processo_pai;

        axios({
            method: 'PUT',
            url: `edita-processo-pagamento/${id}`,
            data: {
                proNome,
                proProcessoPai,
                vEmpenhos,
                vNotasFiscais,
                vNADs,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Processo de pagamento editado com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao editar processo.');
            });
    }

    function apagaEmpenho(id) {
        setVEmpenhos(
            vEmpenhos.filter(lista => {
                return lista.pen_empenho !== id;
            })
        );
    }

    function insereEmpenho() {
        if (document.getElementById('editNovoEmpenho').value === '') {
            mensagem.error('Número do empenho em branco.');
            return;
        }
        const objEmpenho = {};
        objEmpenho.pen_id = null;
        objEmpenho.pro_id_pai = processo.pro_id;
        objEmpenho.pen_empenho = document.getElementById('editNovoEmpenho').value;
        setVEmpenhos([...vEmpenhos, objEmpenho]);
        document.getElementById('editNovoEmpenho').value = '';
    }

    function insereNotaFiscal() {
        if (document.getElementById('editNovaNotaFiscal').value === '') {
            mensagem.error('Número da nota fiscal em branco.');
            return;
        }
        const objNotaFiscal = {};
        objNotaFiscal.pnf_id = null;
        objNotaFiscal.pro_id_pai = processo.pro_id;
        objNotaFiscal.pnf_nota_fiscal = document.getElementById('editNovaNotaFiscal').value;
        setVNotasFiscais([...vNotasFiscais, objNotaFiscal]);
        document.getElementById('editNovaNotaFiscal').value = '';
    }

    function apagaNotaFiscal(id) {
        setVNotasFiscais(
            vNotasFiscais.filter(lista => {
                return lista.pnf_nota_fiscal !== id;
            })
        );
    }

    function insereNAD() {
        if (document.getElementById('editNovaNAD').value === '') {
            mensagem.error('Número da autorização em branco.');
            return;
        }
        const objNAD = {};
        objNAD.pna_id = null;
        objNAD.pro_id_pai = processo.pro_id;
        objNAD.pna_nad = document.getElementById('editNovaNAD').value;
        setVNADs([...vNADs, objNAD]);
        document.getElementById('editNovaNAD').value = '';
    }

    function apagaNAD(id) {
        setVNADs(
            vNADs.filter(lista => {
                return lista.pna_nad !== id;
            })
        );
    }

    function voltar() {
        history.push(`/processo-execucao-despesa`);
    }

    function inserirArquivo(e) {
        setErro('');
        const arq = e.target.files[0];
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size > tamanhoAnexo) {
            mensagem.error(`Arquivo maior que ${tamanhoAnexoMB}MB.`);
            return;
        }
        if (e.target.files[0].type !== 'application/pdf') {
            mensagem.error('São válidos somente arquivos PDF.');
        }
        const data = new FormData();
        data.append('pro_id', processo.pro_id);
        data.append('tpd_id', constantes.TPD_EXECUCAO_DESPESA);
        data.append('arq_login', sessionStorage.getItem('usuario'));
        data.append('ano', processo.pro_ano);
        data.append('file', arq);
        axios({
            method: 'POST',
            url: `/anexo-documentos`,
            headers: {
                authorization: sessionStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
            data,
        })
            .then(resAnexos => {
                if (resAnexos.status === 204) {
                    mensagem.success('Arquivo inserido com sucesso.');
                    carregaArquivosProcesso();
                }
            })
            .catch(() => {
                setErro('Erro ao inserir arquivos em anexo.');
            });
    }

    function tramita() {
        axios({
            method: 'GET',
            url: `/proximo-tramite-fiscal/${processo.pro_id}`,
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
                console.log(res.data);
                abreModalTramitaFiscal(res.data.combo, res.data.razao);
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function cancelarArquivo() {
        axios({
            method: 'PUT',
            url: `cancela-arquivo-processo-pagamento/${idArquivo}`,
            data: {},
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Arquivo cancelado com sucesso.');
                carregaArquivosProcesso();
            })
            .catch(() => {
                setErro('Erro ao editar processo.');
            });
    }

    function insereTramite(prxId, setId, observacao) {
        axios({
            method: 'POST',
            url: '/tramites-fiscal',
            data: {
                tra_id: null,
                prx_id: prxId,
                pro_id: processo.pro_id,
                login_envia: sessionStorage.getItem('usuario'),
                area_id_envia: sessionStorage.getItem('areaUsuario'),
                area_id_recebe: setId,
                tra_observacao: observacao,
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
                <Autorizacao tela="Execução de despesas" />
                <Main>
                    <Erro>{erro}</Erro>
                    <h3>Editar processo de execução de despesa nº: {processo.pro_codigo}</h3>
                    <hr />

                    <Form ref={formRef} onSubmit={editaProcesso}>
                        <ContainerDadosProcesso>
                            <Input name="proNome" label="Fornecedor" type="text" maxLength="200" />
                            <Input
                                name="proProcessoPai"
                                label="Processo de origem"
                                type="text"
                                maxLength="15"
                            />
                        </ContainerDadosProcesso>
                        <ContainerAutorizacao>
                            <legend>Dados da autorização</legend>
                            <ContainerReferencia>
                                <label id="lblAutId" />
                                <label id="lblReferencia" />
                            </ContainerReferencia>
                            <ContainerBanco>
                                <label id="lblBanco" />
                            </ContainerBanco>
                            <ContainerDadosAutorizacao>
                                <label id="lblAgencia" />
                                <label id="lblContaCorrente" />
                                <label id="lblValor" />
                            </ContainerDadosAutorizacao>
                        </ContainerAutorizacao>
                        <ContainerEmpenhosNotasFiscais>
                            <ContainerEmpenhos>
                                <legend>Empenhos</legend>
                                <ContainerInsereEmpenhos>
                                    <InputSemLabel
                                        name="editNovoEmpenho"
                                        type="text"
                                        maxLength="15"
                                    />
                                    <Button
                                        type="button"
                                        name="btnNovoEmpenho"
                                        onClick={insereEmpenho}>
                                        <FaFileAlt color="#FFF" />
                                        Novo empenho
                                    </Button>
                                </ContainerInsereEmpenhos>
                                <>
                                    {vEmpenhos ? (
                                        <ul>
                                            {vEmpenhos.map(empenho => (
                                                <li key={empenho.pen_empenho}>
                                                    {empenho.pen_empenho}{' '}
                                                    <LinkExcluir
                                                        onClick={e =>
                                                            abreModalExcluirEmpenho(
                                                                e,
                                                                empenho.pen_empenho
                                                            )
                                                        }>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerEmpenhos>
                            <ContainerNotasFiscais>
                                <legend>Notas fiscais</legend>
                                <ContainerInsereNotasFiscais>
                                    <InputSemLabel
                                        name="editNovaNotaFiscal"
                                        type="text"
                                        maxLength="15"
                                    />
                                    <Button
                                        type="button"
                                        name="btnNovaNotaFiscal"
                                        onClick={insereNotaFiscal}>
                                        <FaFileAlt color="#FFF" />
                                        Nova nota fiscal
                                    </Button>
                                </ContainerInsereNotasFiscais>
                                <>
                                    {vNotasFiscais ? (
                                        <ul>
                                            {vNotasFiscais.map(notaFiscal => (
                                                <li key={notaFiscal.pnf_nota_fiscal}>
                                                    {notaFiscal.pnf_nota_fiscal}{' '}
                                                    <LinkExcluir
                                                        onClick={e => {
                                                            abreModalExcluirNotaFiscal(
                                                                e,
                                                                notaFiscal.pnf_nota_fiscal
                                                            );
                                                        }}>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerNotasFiscais>
                            <ContainerNADs>
                                <legend>Autorizações de fornecimento</legend>
                                <ContainerInsereNads>
                                    <InputSemLabel name="editNovaNAD" type="text" maxLength="15" />
                                    <Button type="button" name="btnNovaNAD" onClick={insereNAD}>
                                        <FaFileAlt color="#FFF" />
                                        Nova autorização
                                    </Button>
                                </ContainerInsereNads>
                                <>
                                    {vNADs ? (
                                        <ul>
                                            {vNADs.map(nad => (
                                                <li key={nad.pna_nad}>
                                                    {nad.pna_nad}{' '}
                                                    <LinkExcluir
                                                        onClick={e => {
                                                            abreModalExcluirNAD(e, nad.pna_nad);
                                                        }}>
                                                        <FaTimes color="#FFF" />
                                                    </LinkExcluir>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </>
                            </ContainerNADs>
                        </ContainerEmpenhosNotasFiscais>
                        <ContainerBotoes>
                            <Button type="submit" name="btnSalva">
                                <FaCheck color="#FFF" />
                                Salvar alterações
                            </Button>
                            <Button type="button" name="btnVolta" onClick={voltar}>
                                <FaUndoAlt color="#FFF" />
                                Voltar
                            </Button>
                            <>
                                <label htmlFor="anexo">
                                    <FaFilePdf />
                                    &nbsp;Inserir documento
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    onChange={inserirArquivo}
                                    id="anexo"
                                />
                            </>
                            <Tramitar name="btnTramita" clickHandler={tramita} />
                        </ContainerBotoes>
                        <ContainerArquivos>
                            <legend>Arquivos</legend>
                            <ContainerListaArquivos>
                                {vArquivos.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Arquivo</th>
                                                <th>Tipo de documento</th>
                                                <th>Data</th>
                                                <th>Cancelado</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vArquivos.map(arq => (
                                                <tr key={arq.arq_id}>
                                                    <td>
                                                        <BotaoComoLink
                                                            type="button"
                                                            onClick={e =>
                                                                download(
                                                                    e,
                                                                    arq.pro_id,
                                                                    arq.pro_ano,
                                                                    arq.arq_nome_visivel,
                                                                    arq.arq_nome
                                                                )
                                                            }>
                                                            {arq.arq_nome_visivel}
                                                        </BotaoComoLink>
                                                    </td>
                                                    <td>{arq.tpd_nome}</td>
                                                    <td>{arq.arq_data}</td>
                                                    <td style={colunaCancelado}>
                                                        {arq.arq_cancelado ? (
                                                            <span style={arquivoCancelado}>
                                                                Sim
                                                            </span>
                                                        ) : (
                                                            'Não'
                                                        )}
                                                    </td>
                                                    <td>
                                                        {arq.arq_cancelado ? null : (
                                                            <ButtonCancelaArquivo
                                                                type="button"
                                                                name="btnCancela"
                                                                onClick={e => {
                                                                    abreModalCancelar(
                                                                        e,
                                                                        arq.arq_id
                                                                    );
                                                                }}>
                                                                <FaTimes color="#FFF" />
                                                            </ButtonCancelaArquivo>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : null}
                            </ContainerListaArquivos>
                        </ContainerArquivos>
                    </Form>

                    <ModalApagaEmpenho
                        modalExcluir={modalExcluirEmpenho}
                        fechaModalExcluir={fechaModalExcluirEmpenho}
                        apagaEmpenho={apagaEmpenho}
                        id={idEmpenho}
                    />
                    <ModalApagaNotaFiscal
                        modalExcluir={modalExcluirNotaFiscal}
                        fechaModalExcluir={fechaModalExcluirNotaFiscal}
                        apagaNotaFiscal={apagaNotaFiscal}
                        id={idNotaFiscal}
                    />
                    <ModalApagaNAD
                        modalExcluir={modalExcluirNAD}
                        fechaModalExcluir={fechaModalExcluirNAD}
                        apagaNAD={apagaNAD}
                        id={idNAD}
                    />
                    <ModalCancelar
                        modalCancelar={modalCancelar}
                        fechaModalCancelar={fechaModalCancelar}
                        cancela={cancelarArquivo}
                        id={idArquivo}
                    />
                    <ModalTramitaFiscal
                        modalTramitaFiscal={modalTramitaFiscal}
                        fechaModalTramitaFiscal={fechaModalTramitaFiscal}
                        tramita={insereTramite}
                        dados={dadosTramite}
                        razao={razaoTramite}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

EditaProcessoPagamento.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

export default EditaProcessoPagamento;

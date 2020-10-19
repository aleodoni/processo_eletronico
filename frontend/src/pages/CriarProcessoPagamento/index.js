import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import { FaFileAlt, FaUndoAlt, FaCheck, FaTimes, FaFilePdf } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import ModalApagaEmpenho from '../../components/ModalExcluirEmpenho';
import ModalCancelar from '../../components/ModalCancelar';
import ModalApagaNotaFiscal from '../../components/ModalExcluirNotaFiscal';
import ModalApagaNAD from '../../components/ModalExcluirNAD';
import ModalTramitaUm from '../../components/ModalTramitaUm';
import Autorizacao from '../../components/Autorizacao';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import InputMask from '../../components/layout/InputMask';
import TextArea from '../../components/layout/TextArea';
import Select from '../../components/layout/Select';
import Button from '../../components/layout/button/Button';
import ButtonNovoItemProcessoPagamento from '../../components/layout/button/ButtonNovoItemProcessoPagamento';
import ButtonCancelaArquivo from '../../components/layout/button/ButtonCancelaArquivo';
import InputSemLabel from '../../components/layout/InputSemLabel';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import { download } from '../../utils/downloadArquivoProcesso';
import Tramitar from '../../components/layout/button/Tramitar';
import FaturaBoleto from '../../components/system/select/FaturaBoleto';
import * as constantes from '../../utils/constantes';
import { dataValida } from '../../utils/validaCpfCnpj';
import {
    Container,
    Main,
    ContainerBotoes,
    ContainerDadosProcesso,
    ContainerDadosBanco,
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

function CriarProcessoPagamento() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [idEmpenho, setIdEmpenho] = useState('');
    const [titulo, setTitulo] = useState('Criar processo de execução de despesa');
    const [idArquivo, setIdArquivo] = useState('');
    const [idNotaFiscal, setIdNotaFiscal] = useState('');
    const [idNAD, setIdNAD] = useState('');
    const [proId, setProId] = useState('');
    const [autId, setAutId] = useState('');
    const [proAno, setProAno] = useState('');
    const [vEmpenhos, setVEmpenhos] = useState([]);
    const [vNotasFiscais, setVNotasFiscais] = useState([]);
    const [vArquivos, setVArquivos] = useState([]);
    const [vNADs, setVNADs] = useState([]);
    const [dadosTramite, setDadosTramite] = useState([]);
    const formRef = useRef(null);
    const [modalExcluirEmpenho, setModalExcluirEmpenho] = useState(false);
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalExcluirNotaFiscal, setModalExcluirNotaFiscal] = useState(false);
    const [modalExcluirNAD, setModalExcluirNAD] = useState(false);
    const [modalTramitaUm, setModalTramitaUm] = useState(false);
    const [desabilitaNovoEmpenho, setDesabilitaNovoEmpenho] = useState(false);
    const [banId, setBanId] = useState('-1');
    const [bancos, setBancos] = useState([]);
    const [forId, setForId] = useState('-1');
    const [fornecedores, setFornecedores] = useState([]);

    const colunaCancelado = {
        textAlign: 'center',
    };

    const arquivoCancelado = {
        color: 'red',
    };

    function handleBanId(e) {
        setBanId(e.target.value);
    }

    function handleForId(e) {
        setForId(e.target.value);
    }

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

    function formataMoeda(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = `${(v / 100).toFixed(2)}`;
        v = v.replace('.', ',');
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
        v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
        e.target.value = v;
    }

    async function carregaFornecedores() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/combo-fornecedores');

            const data = response.data.map(f => {
                return {
                    label: f.for_nome,
                    value: f.for_id,
                };
            });
            setFornecedores(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    async function carregaBancos() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/bancos');

            const data = response.data.map(b => {
                return {
                    label: b.ban_nome,
                    value: b.ban_id,
                };
            });
            setBancos(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
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

    function abreModalTramitaUm(dados) {
        setDadosTramite(dados);
        setModalTramitaUm(true);
    }

    function fechaModalTramitaUm() {
        setModalTramitaUm(false);
    }

    const carregaArquivosProcesso = useCallback(idProcesso => {
        axios({
            method: 'GET',
            url: `/ver-arquivos-processo-pgto/${idProcesso}`,
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
    }, []);

    useEffect(() => {
        carregaBancos();
        carregaFornecedores();
        setDesabilitaNovoEmpenho(true);
    }, [carregaArquivosProcesso]);

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        const erros = [];
        if (p.forId === '-1') {
            erros.push('Selecione o fornecedor.');
        }
        if (p.proProcessoPai.trim() === '') {
            erros.push('Processo de origem em branco.');
        }
        if (p.referencia.trim() === '') {
            erros.push('Referência em branco.');
        }
        if (p.notaFiscal.trim() === '') {
            erros.push('Nota fiscal em branco.');
        }
        if (p.dataExpedicao === '') {
            erros.push('Data de expedição em branco.');
        }
        if (p.dataExpedicao !== '' && p.dataExpedicao !== undefined) {
            if (!dataValida(p.dataExpedicao)) {
                erros.push('Data de expedição inválida.');
            }
        }
        if (p.valor.trim() === '') {
            erros.push('Valor em branco.');
        }
        if (p.autFaturaBoleto === '-1') {
            erros.push('Selecione se é fatura ou boleto.');
        }
        if (p.autFaturaBoleto === 'false' || p.autFaturaBoleto === '-1') {
            if (p.banId === '-1') {
                erros.push('Selecione o banco.');
            }
            if (p.agencia.trim() === '') {
                erros.push('Agência em branco.');
            }
            if (p.contaCorrente.trim() === '') {
                erros.push('Conta corrente em branco.');
            }
        }

        const valorAPI = parseFloat(
            p.valor
                .replace(/[^0-9,.]/g, '')
                .replace(/[.]/g, '')
                .replace(',', '.')
        );

        if (erros.length > 0) {
            let listaErros = '<ul>';
            for (let i = 0; i < erros.length; i++) {
                listaErros += `<li>${erros[i]}</li>`;
            }
            listaErros += '</ul>';
            setErro(listaErros);
            return;
        }

        // começa a abrir o processo
        if (proId === '') {
            axios({
                method: 'POST',
                url: '/processo-pagamento-interno',
                data: {
                    pro_id: null,
                    pro_nome: null,
                    pro_matricula: null,
                    pro_cpf: null,
                    pro_cnpj: null,
                    pro_fone: null,
                    pro_celular: null,
                    pro_email: null,
                    pro_encerramento: null,
                    pro_assunto: 'Execução de despesas',
                    usu_autuador: sessionStorage.getItem('usuario'),
                    pro_ultimo_tramite: null,
                    usu_finalizador: null,
                    nod_id: null,
                    set_id_autuador: `00${constantes.AREA_DCF}`,
                    area_id: constantes.AREA_DCF,
                    set_id_finalizador: null,
                    pro_iniciativa: 'Externa',
                    pro_tipo_iniciativa: 'Pessoa Jurídica',
                    area_id_iniciativa: null,
                    tpr_id: constantes.TPR_EXECUCAO_DESPESAS,
                    pro_contato_pj: null,
                    pro_autuacao: null,
                    pro_recurso: false,
                    pro_com_abono: false,
                    pro_num_com_abono: null,
                    pro_enviado_externo: false,
                    pro_ip_externo: 'Não necessário',
                    pro_processo_pai: p.proProcessoPai,
                    // aqui são os campos da autorização do fornecedor
                    aut_id: null,
                    for_id: forId,
                    aut_referencia: p.referencia,
                    aut_nf: p.notaFiscal,
                    aut_data_expedicao_nf: p.dataExpedicao,
                    aut_valor: valorAPI,
                    ban_id: banId,
                    aut_ban_agencia: p.agencia,
                    aut_ban_conta_corrente: p.contaCorrente,
                    aut_data_cadastro: null,
                    aut_fatura_boleto: p.autFaturaBoleto,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(resProcesso => {
                    mensagem.success('Processo criado com sucesso.');
                    setProId(resProcesso.data.pro_id);
                    setAutId(resProcesso.data.aut_id);
                    setProAno(resProcesso.data.ano);
                    formRef.current.setFieldValue('proId', resProcesso.data.pro_id);
                    setTitulo(`Processo: ${resProcesso.data.pro_codigo}`);
                    carregaArquivosProcesso(resProcesso.data.pro_id);
                    setDesabilitaNovoEmpenho(false);
                })
                .catch(erroCriaProcesso => {
                    if (
                        erroCriaProcesso.response.data.error ===
                        'Processo sem fluxo. Cadastre um fluxo primeiro.'
                    ) {
                        setErro(erroCriaProcesso.response.data.error);
                    } else {
                        setErro('Erro ao inserir processo.');
                    }
                });
        } else {
            axios({
                method: 'PUT',
                url: `/processo-pagamento-interno/${proId}`,
                data: {
                    pro_nome: formRef.current.getFieldValue('proNome'),
                    pro_processo_pai: formRef.current.getFieldValue('proProcessoPai'),
                    // aqui são os campos da autorização do fornecedor
                    aut_id: autId,
                    aut_referencia: formRef.current.getFieldValue('referencia'),
                    aut_nf: formRef.current.getFieldValue('notaFiscal'),
                    aut_data_expedicao_nf: formRef.current.getFieldValue('dataExpedicao'),
                    aut_valor: valorAPI,
                    ban_id: formRef.current.getFieldValue('banId'),
                    aut_ban_agencia: formRef.current.getFieldValue('agencia'),
                    aut_ban_conta_corrente: formRef.current.getFieldValue('contaCorrente'),
                    aut_fatura_boleto: formRef.current.getFieldValue('autFaturaBoleto'),
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(resProcessoEdita => {
                    mensagem.success('Processo editado com sucesso.');
                    carregaArquivosProcesso(resProcessoEdita.data.pro_id);
                })
                .catch(() => {
                    setErro('Erro ao editar processo.');
                });
        }
    }

    function apagaEmpenho(id) {
        axios({
            method: 'DELETE',
            url: `processo-empenho/${proId}`,
            data: {
                pen_empenho: id,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Empenho excluído com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
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
        objEmpenho.pro_id_pai = proId;
        objEmpenho.pen_empenho = document.getElementById('editNovoEmpenho').value;
        // aqui grava o empenho na tabela
        axios({
            method: 'POST',
            url: '/processo-empenho',
            data: {
                pen_id: null,
                pro_id_pai: proId,
                pen_empenho: document.getElementById('editNovoEmpenho').value,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Empenho inserido com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao inserir registro.');
            });
        //
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
        objNotaFiscal.pro_id_pai = proId;
        objNotaFiscal.pnf_nota_fiscal = document.getElementById('editNovaNotaFiscal').value;
        // aqui grava a nota fiscal na tabela
        axios({
            method: 'POST',
            url: '/processo-nota-fiscal',
            data: {
                pnf_id: null,
                pro_id_pai: proId,
                pnf_nota_fiscal: document.getElementById('editNovaNotaFiscal').value,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Nota fiscal inserida com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao inserir registro.');
            });
        //
        setVNotasFiscais([...vNotasFiscais, objNotaFiscal]);
        document.getElementById('editNovaNotaFiscal').value = '';
    }

    function apagaNotaFiscal(id) {
        axios({
            method: 'DELETE',
            url: `processo-nota-fiscal/${proId}`,
            data: {
                pnf_nota_fiscal: id,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Nota fiscal excluída com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
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
        objNAD.pro_id_pai = proId;
        objNAD.pna_nad = document.getElementById('editNovaNAD').value;
        // aqui grava a autorização na tabela
        axios({
            method: 'POST',
            url: '/processo-nad',
            data: {
                pna_id: null,
                pro_id_pai: proId,
                pna_nad: document.getElementById('editNovaNAD').value,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Autorização inserida com sucesso.');
            })
            .catch(() => {
                setErro('Erro ao inserir registro.');
            });
        //
        setVNADs([...vNADs, objNAD]);
        document.getElementById('editNovaNAD').value = '';
    }

    function apagaNAD(id) {
        axios({
            method: 'DELETE',
            url: `processo-nad/${proId}`,
            data: {
                pna_nad: id,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Autorização excluída com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
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
        data.append('pro_id', proId);
        data.append('tpd_id', constantes.TPD_EXECUCAO_DESPESA);
        data.append('arq_login', sessionStorage.getItem('usuario'));
        data.append('ano', proAno);
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
                    carregaArquivosProcesso(proId);
                }
            })
            .catch(() => {
                setErro('Erro ao inserir arquivos em anexo.');
            });
    }

    function tramita() {
        axios({
            method: 'GET',
            url: `/proximo-tramite/${proId}`,
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

    function insereTramite(prxId, setId) {
        axios({
            method: 'POST',
            url: '/tramites',
            data: {
                tra_id: null,
                prx_id: prxId,
                pro_id: proId,
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
                <Autorizacao tela="Execução de despesas" />
                <Main>
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    <h3>{titulo}</h3>
                    <hr />

                    <Form ref={formRef} onSubmit={criaProcesso}>
                        <Input name="proId" type="hidden" />
                        <ContainerDadosProcesso>
                            <Select
                                name="forId"
                                label="Fornecedor*"
                                options={fornecedores}
                                onChange={handleForId}
                            />
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
                                <TextArea
                                    name="referencia"
                                    label="Referente*"
                                    type="text"
                                    rows={2}
                                    cols={120}
                                />
                            </ContainerReferencia>
                            <ContainerDadosAutorizacao>
                                <Input
                                    name="notaFiscal"
                                    label="Nota fiscal*"
                                    type="text"
                                    maxLength="30"
                                />
                                <InputMask
                                    name="dataExpedicao"
                                    label="Data de emissão*"
                                    mask="99/99/9999"
                                    maskChar=" "
                                />
                                <Input
                                    name="valor"
                                    label="Valor*"
                                    type="text"
                                    maxLength="10"
                                    onKeyUp={formataMoeda}
                                />
                                <FaturaBoleto name="autFaturaBoleto" />
                            </ContainerDadosAutorizacao>
                        </ContainerAutorizacao>
                        <ContainerDadosBanco>
                            <legend>Dados bancários</legend>
                            <ContainerBanco>
                                <Select
                                    name="banId"
                                    label="Banco*"
                                    options={bancos}
                                    onChange={handleBanId}
                                />
                                <Input name="agencia" label="Agência*" type="text" maxLength="10" />
                                <Input
                                    name="contaCorrente"
                                    label="Conta corrente*"
                                    type="text"
                                    maxLength="20"
                                />
                            </ContainerBanco>
                        </ContainerDadosBanco>
                        {!desabilitaNovoEmpenho ? (
                            <ContainerEmpenhosNotasFiscais>
                                <ContainerEmpenhos
                                    cor={desabilitaNovoEmpenho}
                                    corBorda={desabilitaNovoEmpenho}>
                                    <legend>Empenhos</legend>
                                    <ContainerInsereEmpenhos>
                                        <InputSemLabel
                                            name="editNovoEmpenho"
                                            type="text"
                                            maxLength="15"
                                            corBackground={desabilitaNovoEmpenho}
                                            disabled={desabilitaNovoEmpenho}
                                        />
                                        <ButtonNovoItemProcessoPagamento
                                            type="button"
                                            name="btnNovoEmpenho"
                                            onClick={insereEmpenho}
                                            cor={desabilitaNovoEmpenho}
                                            corHover={desabilitaNovoEmpenho}
                                            disabled={desabilitaNovoEmpenho}>
                                            <FaFileAlt cor={desabilitaNovoEmpenho} />
                                            Novo empenho
                                        </ButtonNovoItemProcessoPagamento>
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
                                <ContainerNotasFiscais
                                    cor={desabilitaNovoEmpenho}
                                    corBorda={desabilitaNovoEmpenho}>
                                    <legend>Notas fiscais</legend>
                                    <ContainerInsereNotasFiscais>
                                        <InputSemLabel
                                            name="editNovaNotaFiscal"
                                            type="text"
                                            maxLength="15"
                                            disabled={desabilitaNovoEmpenho}
                                            corBackground={desabilitaNovoEmpenho}
                                        />
                                        <ButtonNovoItemProcessoPagamento
                                            type="button"
                                            name="btnNovaNotaFiscal"
                                            onClick={insereNotaFiscal}
                                            cor={desabilitaNovoEmpenho}
                                            corHover={desabilitaNovoEmpenho}
                                            disabled={desabilitaNovoEmpenho}>
                                            <FaFileAlt cor={desabilitaNovoEmpenho} />
                                            Nova nota fiscal
                                        </ButtonNovoItemProcessoPagamento>
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
                                <ContainerNADs
                                    cor={desabilitaNovoEmpenho}
                                    corBorda={desabilitaNovoEmpenho}>
                                    <legend>Autorizações de fornecimento</legend>
                                    <ContainerInsereNads>
                                        <InputSemLabel
                                            name="editNovaNAD"
                                            type="text"
                                            maxLength="15"
                                            disabled={desabilitaNovoEmpenho}
                                            corBackground={desabilitaNovoEmpenho}
                                        />
                                        <ButtonNovoItemProcessoPagamento
                                            type="button"
                                            name="btnNovaNAD"
                                            onClick={insereNAD}
                                            cor={desabilitaNovoEmpenho}
                                            corHover={desabilitaNovoEmpenho}
                                            disabled={desabilitaNovoEmpenho}>
                                            <FaFileAlt cor={desabilitaNovoEmpenho} />
                                            Nova autorização
                                        </ButtonNovoItemProcessoPagamento>
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
                        ) : null}
                        <ContainerBotoes>
                            <Button type="submit" name="btnSalva">
                                <FaCheck color="#FFF" />
                                Salvar alterações
                            </Button>
                            <Button type="button" name="btnVolta" onClick={voltar}>
                                <FaUndoAlt color="#FFF" />
                                Voltar
                            </Button>
                            {!desabilitaNovoEmpenho ? (
                                <>
                                    <>
                                        <label htmlFor="anexo">
                                            <FaFilePdf />
                                            &nbsp;Inserir documento
                                        </label>

                                        <input
                                            type="file"
                                            name="file"
                                            onChange={inserirArquivo}
                                            disabled={desabilitaNovoEmpenho}
                                            id="anexo"
                                        />
                                    </>

                                    <Tramitar name="btnTramita" clickHandler={tramita} />
                                </>
                            ) : null}
                        </ContainerBotoes>
                        {!desabilitaNovoEmpenho ? (
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
                        ) : null}
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
                    <ModalTramitaUm
                        modalTramitaUm={modalTramitaUm}
                        fechaModalTramitaUm={fechaModalTramitaUm}
                        tramita={insereTramite}
                        dados={dadosTramite}
                    />
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcessoPagamento;

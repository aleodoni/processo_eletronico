import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaCheckDouble, FaReply, FaUpload } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import api from '../../service/api';
import Check from '../../assets/check.gif';
import * as constantes from '../../utils/constantes';
import { dataValida } from '../../utils/validaCpfCnpj';

import {
    Container,
    Main,
    ContainerEmpenhos,
    Erro,
    ContainerBotaoVoltarEnviar,
    ContainerArquivos,
    ContainerUpload,
    ContainerTitulo,
    ContainerListaDocumentos,
    ContainerBanco,
    ContainerNota,
    ContainerReferencia,
    ContainerAviso,
} from './styles';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import ButtonPagamento from '../../components/layout/button/ButtonPagamento';
import Button from '../../components/layout/button/Button';
import Select from '../../components/layout/Select';
import Input from '../../components/layout/Input';
import TextArea from '../../components/layout/TextArea';
import InputMask from '../../components/layout/InputMask';
import ModalErros from '../../components/ModalErros';

function Home() {
    const [erro, setErro] = useState('');
    const [vErro, setVErro] = useState([]);
    const [vSelecionado, setVSelecionado] = useState([]);
    const [gridEmpenhos, setGridEmpenhos] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [mostraLista, setMostraLista] = useState(true);
    const [empenho, setEmpenho] = useState('');
    const [valorGlobal, setValorGlobal] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [fornecedor, setFornecedor] = useState('');
    const [banId, setBanId] = useState('-1');
    const [bancos, setBancos] = useState([]);
    const [modalErros, setModalErros] = useState(false);

    const selecionado = [];

    const formRef = useRef(null);

    function handleBanId(e) {
        setBanId(e.target.value);
    }

    function fechaModalErros() {
        setModalErros(false);
    }

    function abreModalErros() {
        setModalErros(true);
    }

    function formataMoeda(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = `${(v / 100).toFixed(2)}`;
        v = v.replace('.', ',');
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
        v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
        e.target.value = v;
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    const carregaSolicitacoes = useCallback(() => {
        const cnpj = sessionStorage.getItem('cnpj').toString();
        axios({
            method: 'GET',
            url: `/empenhos/${cnpj}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                setGridEmpenhos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    function verificaArquivo(e, id, documento) {
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const labelId = `label_${id}`;
        const imageId = `img_${id}`;
        const tamanhoAnexoMB = Math.round(tamanhoAnexo / 1024 / 1024);
        if (e.target.files[0].size > tamanhoAnexo) {
            mensagem.error(`Arquivo maior que ${tamanhoAnexoMB}MB.`);
            document.getElementById(id).value = '';
            return;
        }
        if (e.target.files[0].type !== 'application/pdf') {
            mensagem.error(`São válidos somente arquivos PDF.`);
            document.getElementById(id).value = '';
            return;
        }
        document.getElementById(labelId).innerHTML = e.target.files[0].name;
        document.getElementById(imageId).style.visibility = 'visible';
        selecionado.push(documento);
        setVSelecionado((oldArray) => [...oldArray, documento]);
    }

    function carregaDadosFornecedor() {
        const cnpj = sessionStorage.getItem('cnpj').toString();
        axios({
            method: 'GET',
            url: `/fornecedores/${cnpj}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                setFornecedor(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    async function carregaBancos() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/bancos');

            const data = response.data.map((b) => {
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

    function carregaDocumentos() {
        axios({
            method: 'GET',
            url: `/lista-documentos`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                setDocumentos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function requisitaPagamento(numEmpenho, valor) {
        setMostraLista(false);
        setEmpenho(numEmpenho);
        setValorGlobal(valor);
        carregaDadosFornecedor();
        carregaDocumentos();
        carregaBancos();
    }

    function voltaLista() {
        setMostraLista(true);
    }

    // eslint-disable-next-line no-unused-vars
    function enviaArquivos(e) {
        setErro('');
        const vErros = [];
        const referencia = formRef.current.getFieldValue('referencia');
        const banco = formRef.current.getFieldValue('banId');
        const agencia = formRef.current.getFieldValue('agencia');
        const contaCorrente = formRef.current.getFieldValue('contaCorrente');
        const valor = formRef.current.getFieldValue('valor');
        const dataExpedicao = formRef.current.getFieldValue('dataExpedicao');
        const notaFiscal = formRef.current.getFieldValue('notaFiscal');
        const valorAPI = parseFloat(
            valor
                .replace(/[^0-9,.]/g, '')
                .replace(/[.]/g, '')
                .replace(',', '.')
        );

        const valorGlobalAPI = parseFloat(
            valorGlobal
                .replace(/[^0-9,.]/g, '')
                .replace(/[.]/g, '')
                .replace(',', '.')
        );

        if (valorAPI > valorGlobalAPI) {
            vErros.push('Valor da nota fiscal maior que valor global.');
        }

        if (referencia.trim() === '') {
            vErros.push('Referência.');
        }
        if (banco.trim() === '-1') {
            vErros.push('Nome do banco.');
        }
        if (agencia.trim() === '') {
            vErros.push('Número da agência.');
        }
        if (contaCorrente.trim() === '') {
            vErros.push('Número da conta corrente.');
        }
        if (notaFiscal.trim() === '') {
            vErros.push('Número da nota fiscal.');
        }
        if (dataExpedicao !== '' && dataExpedicao !== undefined) {
            if (!dataValida(dataExpedicao)) {
                vErros.push('Data de expedição da nota fiscal inválida.');
            }
        }
        if (valor.trim() === '') {
            vErros.push('Valor da nota fiscal.');
        }

        if (document.getElementById('anexo42').value === '') {
            vErros.push('Nota fiscal / fatura discriminativa original.');
        }

        if (document.getElementById('anexo44').value === '') {
            vErros.push('Prova de regularidade para com a Fazenda Estadual da sede da empresa.');
        }

        if (document.getElementById('anexo43').value === '') {
            vErros.push('Prova de regularidade para com a Fazenda Municipal da sede da empresa.');
        }

        if (document.getElementById('anexo45').value === '') {
            vErros.push(
                'Prova de regularidade conjunta, relativa a Tributos Federais e à Dívida Ativa da União.'
            );
        }

        if (document.getElementById('anexo46').value === '') {
            vErros.push('Comprovante de regularidade do FGTS.');
        }

        if (document.getElementById('anexo51').value === '') {
            vErros.push(
                'Cópia da autorização do Fornecimento ou de execução de serviços expedida pela Câmara.'
            );
        }

        if (document.getElementById('anexo52').value === '') {
            vErros.push('Cópia da Nota de Empenho.');
        }

        if (vErros.length > 0) {
            setVErro(vErros);
            abreModalErros();
            posiciona();
            return;
        }

        // começa a abrir o processo
        axios({
            method: 'POST',
            url: '/processo-pagamento',
            data: {
                pro_id: null,
                pro_nome: sessionStorage.getItem('fornecedor'),
                pro_matricula: null,
                pro_cpf: null,
                pro_cnpj: sessionStorage.getItem('cnpj'),
                pro_fone: null,
                pro_celular: null,
                pro_email: null,
                pro_encerramento: null,
                pro_assunto: 'Execução de despesas',
                usu_autuador: 'externo',
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
                pro_enviado_externo: true,
                pro_ip_externo: sessionStorage.getItem('ip'),
                // aqui são os campos da autorização do fornecedor
                aut_id: null,
                for_id: null,
                aut_referencia: referencia,
                aut_nf: notaFiscal,
                aut_data_expedicao_nf: dataExpedicao,
                aut_valor: valorAPI,
                ban_id: banId,
                aut_ban_agencia: agencia,
                aut_ban_conta_corrente: contaCorrente,
                aut_data_cadastro: null,
                documentos: vSelecionado,
                empenho,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((resProcesso) => {
                const proId = resProcesso.data.pro_id;
                const { ano } = resProcesso.data;
                for (let i = 0; i < document.forms.length; i++) {
                    const data = new FormData();
                    let campoCodigo = '';
                    let campoArquivo;
                    for (let j = 0; j < document.forms[i].elements.length; j++) {
                        if (document.forms[i].elements[j].type === 'hidden') {
                            campoCodigo = document.forms[i].elements[j].value;
                        }
                        if (document.forms[i].elements[j].type === 'file') {
                            campoArquivo = document.forms[i].elements[j].files[0];
                        }
                    }
                    data.append('pro_id', proId);
                    data.append('tpd_id', campoCodigo);
                    data.append('ano', ano);
                    data.append('file', campoArquivo);
                    if (campoArquivo !== undefined) {
                        axios({
                            method: 'POST',
                            url: `/anexo-documentos`,
                            headers: {
                                authorization: sessionStorage.getItem('token'),
                                'Content-Type': 'multipart/form-data',
                            },
                            data,
                        })
                            .then((resAnexos) => {
                                if (resAnexos.status === 204) {
                                    // alert(contador);
                                }
                            })
                            .catch(() => {
                                setErro('Erro ao inserir arquivos em anexo.');
                            });
                    }
                }
                mensagem.success(`Arquivos enviados com sucesso.`);
                setVSelecionado([]);
                setMostraLista(true);
            })
            .catch((erroCriaProcesso) => {
                if (
                    erroCriaProcesso.response.data.error ===
                    'Processo sem fluxo. Cadastre um fluxo primeiro.'
                ) {
                    setErro(erroCriaProcesso.response.data.error);
                } else {
                    setErro('Erro ao inserir processo.');
                }
            });
    }

    useEffect(() => {
        carregaSolicitacoes();
    }, [carregaSolicitacoes]);

    return (
        <DefaultLayout>
            <Container>
                <Main>
                    <ContainerTitulo>
                        Fornecedor: {sessionStorage.getItem('fornecedor')}
                    </ContainerTitulo>
                    <hr />
                    <Erro dangerouslySetInnerHTML={{ __html: erro }} />
                    {mostraLista ? (
                        <ContainerEmpenhos>
                            {gridEmpenhos.length > 0 ? (
                                <div>
                                    <ContainerTitulo>Empenhos</ContainerTitulo>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Empenho</th>
                                                <th>Data de emissão</th>
                                                <th>Valor global</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gridEmpenhos.map((emp) => (
                                                <tr key={emp.emf_id}>
                                                    <td>{`${emp.emf_numero_empenho}/${emp.emf_ano_empenho}`}</td>
                                                    <td>{emp.emf_data_emissao}</td>
                                                    <td>{emp.emf_valor_global}</td>
                                                    <td>
                                                        <div>
                                                            <ButtonPagamento
                                                                name="btnRequisitarPagamento"
                                                                onClick={() => {
                                                                    requisitaPagamento(
                                                                        `${emp.emf_numero_empenho}/${emp.emf_ano_empenho}`,
                                                                        emp.emf_valor_global
                                                                    );
                                                                }}>
                                                                <FaCheckDouble />
                                                                Requisitar pagamento
                                                            </ButtonPagamento>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : null}
                        </ContainerEmpenhos>
                    ) : (
                        <>
                            <ContainerTitulo>
                                <p>Empenho: {empenho}</p>
                            </ContainerTitulo>
                            <ContainerAviso>
                                Todos os campos com <span> * </span> são obrigatórios
                            </ContainerAviso>
                            <Form ref={formRef} id="frmAutorizacao">
                                <ContainerReferencia>
                                    <TextArea
                                        name="referencia"
                                        label="Referente*"
                                        type="text"
                                        rows={3}
                                        cols={100}
                                    />
                                </ContainerReferencia>
                                <ContainerNota>
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
                                </ContainerNota>
                                <ContainerBanco>
                                    <Select
                                        name="banId"
                                        label="Banco*"
                                        options={bancos}
                                        onChange={handleBanId}
                                    />
                                    <Input
                                        name="agencia"
                                        label="Agência*"
                                        type="text"
                                        maxLength="10"
                                    />
                                    <Input
                                        name="contaCorrente"
                                        label="Conta corrente*"
                                        type="text"
                                        maxLength="20"
                                    />
                                </ContainerBanco>
                            </Form>
                            <ContainerTitulo>
                                * Clique na descrição para inserir ou substituir o documento
                            </ContainerTitulo>
                            <ContainerArquivos>
                                {documentos.map((doc) => (
                                    <div key={doc.tpd_id}>
                                        <form>
                                            <input name="selecionado" value="" type="hidden" />
                                            <ContainerListaDocumentos>
                                                <>
                                                    <input
                                                        name="manId"
                                                        value={doc.tpd_id}
                                                        type="hidden"
                                                    />
                                                    <ContainerUpload>
                                                        <label htmlFor={doc.nome_campo_anexo}>
                                                            - {doc.tpd_nome}
                                                        </label>

                                                        <input
                                                            type="file"
                                                            name={doc.nome_campo_anexo}
                                                            id={doc.nome_campo_anexo}
                                                            onChange={(e) => {
                                                                verificaArquivo(
                                                                    e,
                                                                    doc.nome_campo_anexo,
                                                                    doc.tpd_nome
                                                                );
                                                            }}
                                                        />
                                                    </ContainerUpload>
                                                    <img
                                                        src={Check}
                                                        alt=""
                                                        style={{ visibility: 'hidden' }}
                                                        id={`img_${doc.nome_campo_anexo}`}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </>
                                                <>
                                                    <span id={`label_${doc.nome_campo_anexo}`}>
                                                        &nbsp;
                                                    </span>
                                                </>
                                            </ContainerListaDocumentos>
                                        </form>
                                    </div>
                                ))}
                            </ContainerArquivos>
                            <ContainerBotaoVoltarEnviar>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        voltaLista();
                                    }}>
                                    <FaReply color="#FFF" />
                                    Voltar
                                </Button>
                                <Button type="button" onClick={enviaArquivos}>
                                    <FaUpload color="#FFF" />
                                    Enviar arquivos
                                </Button>
                            </ContainerBotaoVoltarEnviar>
                        </>
                    )}
                </Main>
                <ModalErros
                    modalErros={modalErros}
                    fechaModalErros={fechaModalErros}
                    mensagem={vErro}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Home;

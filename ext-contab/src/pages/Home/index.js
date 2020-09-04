import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckDouble, FaReply, FaUpload } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import Check from '../../assets/check.gif';
import * as constantes from '../../utils/constantes';

import {
    Container,
    Main,
    ContainerProcessos,
    Erro,
    ContainerBotaoVoltarEnviar,
    ContainerArquivos,
    ContainerUpload,
    ContainerTitulo,
    ContainerListaDocumentos,
} from './styles';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import ButtonPagamento from '../../components/layout/button/ButtonPagamento';
import Button from '../../components/layout/button/Button';

function Home() {
    const [erro, setErro] = useState('');
    const [gridEmpenhos, setGridEmpenhos] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [mostraLista, setMostraLista] = useState(true);
    const [requisicao, setRequisicao] = useState('');

    const carregaSolicitacoes = useCallback(() => {
        const fornecedor = sessionStorage.getItem('cnpj').toString();
        axios({
            method: 'GET',
            url: `/empenhos/${fornecedor}`,
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

    function verificaArquivo(e, id) {
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
    }

    function carregaDocumentos(tipo) {
        axios({
            method: 'GET',
            url: `/lista-documentos/${tipo}`,
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

    function requisitaPagamento(id) {
        // alert(id);
        setMostraLista(false);
        carregaDocumentos();
    }

    function voltaLista() {
        setMostraLista(true);
    }

    function enviaArquivos(e) {
        // primeiro tenho que varrer se o usuário deixou de anexar algum arquivo
        for (let i = 0; i < document.forms.length; i++) {
            for (let j = 0; j < document.forms[i].elements.length; j++) {
                if (document.forms[i].elements[j].type === 'file') {
                    if (document.forms[i].elements[j].value === '') {
                        mensagem.error(`Todos os campos tem que ser preenchidos.`);
                        return;
                    }
                }
            }
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
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((resProcesso) => {
                const proId = resProcesso.data.pro_id;
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
                    data.append('file', campoArquivo);
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
                mensagem.success(`Arquivos enviados com sucesso.`);
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
                    <Erro>{erro}</Erro>
                    <ContainerTitulo>
                        Fornecedor: {sessionStorage.getItem('fornecedor')}
                    </ContainerTitulo>
                    <hr />
                    {mostraLista ? (
                        <ContainerProcessos>
                            {gridEmpenhos.length > 0 ? (
                                <div>
                                    <ContainerTitulo>Autorizações de fornecimento</ContainerTitulo>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Autorização</th>
                                                <th>Número NAD</th>
                                                <th>Data de emissão</th>
                                                <th>Valor global</th>
                                                <th>Data de liquidação</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gridEmpenhos.map((emp) => (
                                                <tr key={emp.emf_id}>
                                                    <td>{`${emp.emf_numero_empenho}'/'${emp.emf_ano_empenho}`}</td>
                                                    <td>{emp.emf_data_emissao}</td>
                                                    <td>{emp.emf_valor_global}</td>
                                                    <td>
                                                        <div>
                                                            <ButtonPagamento
                                                                name="btnRequisitarPagamento"
                                                                onClick={() => {
                                                                    requisitaPagamento(emp.emf_id);
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
                        </ContainerProcessos>
                    ) : (
                        <>
                            <ContainerTitulo>
                                <p>Autorização: {requisicao}</p>
                                <span>* Clique na descrição para inserir o documento</span>
                            </ContainerTitulo>

                            <ContainerArquivos>
                                {documentos.map((doc) => (
                                    <div key={doc.tpd_id}>
                                        <form>
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
                                                                    doc.nome_campo_anexo
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
            </Container>
        </DefaultLayout>
    );
}

export default Home;

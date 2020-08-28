import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckDouble, FaReply, FaUpload } from 'react-icons/fa';
import { useHistory } from 'react-router';
import Autorizacao from '../../components/Autorizacao';

import {
    Container,
    Main,
    ContainerProcessos,
    Erro,
    ContainerBotaoVoltarEnviar,
    ContainerArquivos,
} from './styles';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import ButtonPagamento from '../../components/layout/button/ButtonPagamento';
import Button from '../../components/layout/button/Button';

function Home() {
    const [erro, setErro] = useState('');
    const [gridSolicitacoes, setGridSolicitacoes] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [mostraLista, setMostraLista] = useState(true);
    const [requisicao, setRequisicao] = useState('');
    const history = useHistory();

    const carregaSolicitacoes = useCallback(() => {
        const fornecedor = sessionStorage.getItem('cnpj').toString();
        axios({
            method: 'GET',
            url: `/solicitacoes/${fornecedor}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                setGridSolicitacoes(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }, []);

    function verificaArquivo(e) {
        // hkjhkjh
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

    function requisitaPagamento(id, requisicao) {
        // alert(id);
        setMostraLista(false);
        setRequisicao(requisicao);
        carregaDocumentos();
    }

    function voltaLista() {
        setMostraLista(true);
    }

    function enviaArquivos(e) {
        const data = new FormData();
        let contador = 0;
        const vNomes = [];
        for (let i = 0; i < document.forms[0].length; i++) {
            if (document.forms[0].elements[i].type === 'file') {
                const nomeCampoArquivo = document.forms[0].elements[i].name;
                const campoArquivo = document.getElementById(nomeCampoArquivo);
                if (campoArquivo.value !== '') {
                    data.append(nomeCampoArquivo, campoArquivo.files[0]);
                    contador += 1;
                    vNomes.push(campoArquivo.files[0].name);
                }
            }
        }
        if (contador < document.forms[0].length) {
            alert('Estão faltando documentos');
        }
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
                    alert(vNomes);
                    setMostraLista(true);
                }
            })
            .catch(() => {
                setErro('Erro ao criar arquivo anexo.');
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
                    <label>Fornecedor: {sessionStorage.getItem('fornecedor')}</label>
                    <hr />
                    {mostraLista ? (
                        <ContainerProcessos>
                            {gridSolicitacoes.length > 0 ? (
                                <div>
                                    <p>Pedidos</p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Requisição</th>
                                                <th>Número NAD</th>
                                                <th>Empenho</th>
                                                <th>Data</th>
                                                <th>Valor global</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gridSolicitacoes.map((sol) => (
                                                <tr key={sol.afo_id}>
                                                    <td>{sol.afo_requisicao}</td>
                                                    <td>{sol.afo_numero_nad}</td>
                                                    <td>{sol.afo_empenho}</td>
                                                    <td>{sol.afo_data}</td>
                                                    <td>{sol.afo_valor_global}</td>
                                                    <td>
                                                        <div>
                                                            <ButtonPagamento
                                                                name="btnRequisitarPagamento"
                                                                onClick={() => {
                                                                    requisitaPagamento(
                                                                        sol.afo_id,
                                                                        sol.afo_requisicao
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
                        </ContainerProcessos>
                    ) : (
                        <>
                            <form>
                                <ContainerArquivos>
                                    Requisição: {requisicao}
                                    <table>
                                        {documentos.map((doc) => (
                                            <tr key={doc.tpd_id}>
                                                <td style={{ width: '70%' }}>{doc.tpd_nome}</td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name={doc.nome_campo_anexo}
                                                        id={doc.nome_campo_anexo}
                                                        onClick={(e) => {
                                                            verificaArquivo(e);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
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
                            </form>
                        </>
                    )}
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default Home;

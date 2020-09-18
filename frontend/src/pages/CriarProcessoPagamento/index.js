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
import * as constantes from '../../utils/constantes';
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
    const [idArquivo, setIdArquivo] = useState('');
    const [idNotaFiscal, setIdNotaFiscal] = useState('');
    const [idNAD, setIdNAD] = useState('');
    const [processo, setProcesso] = useState([]);
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

    const colunaCancelado = {
        textAlign: 'center',
    };

    const arquivoCancelado = {
        color: 'red',
    };

    function handleBanId(e) {
        setBanId(e.target.value);
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

    const carregaArquivosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-arquivos-processo-pgto/${123}`,
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
        carregaArquivosProcesso();
        carregaBancos();
        setDesabilitaNovoEmpenho(true);
    }, [carregaArquivosProcesso]);

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
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
            url: `/proximo-tramite/${processo.pro_id}`,
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
                pro_id: processo.pro_id,
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
                    <Erro>{erro}</Erro>
                    <h3>Criar processo de execução de despesa</h3>
                    <hr />

                    <Form ref={formRef} onSubmit={criaProcesso}>
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
                                <TextArea
                                    name="referencia"
                                    label="Referente*"
                                    type="text"
                                    rows={3}
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
                                        disabled={desabilitaNovoEmpenho}
                                        corBackground={desabilitaNovoEmpenho}
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

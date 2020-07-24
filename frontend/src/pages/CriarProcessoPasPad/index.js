import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaSearch, FaChild } from 'react-icons/fa';
import axios from '../../configs/axiosConfig';
import SelecionaPasPad from '../../components/system/select/SelecionaPasPad';
import InputMask from '../../components/layout/InputMask';
import ProcessoInputMask from '../../components/layout/InputMask/ProcessoInputMask';
import TableComissao from '../../components/layout/TableComissao';
import Input from '../../components/layout/Input';
import Autorizacao from '../../components/Autorizacao';
import * as constantes from '../../utils/constantes';
import {
    Container,
    Main,
    Erro,
    Titulo,
    ContainerTipoProcesso,
    ContainerMembrosTitulo,
    BotaoProcura,
    ContainerMatricula,
    ContainerDadosServidorPublico,
    ContainerLocalizaMembros,
    ContainerEmail,
    ContainerIrregularidade,
    ContainerProcessoPAS,
    ContainerMembros,
    ContainerNome,
} from './styles';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function CriarProcessoPasPad() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [matriculaVisivel, setMatriculaVisivel] = useState(false);
    const [listaComissao, setListaComissao] = useState([]);
    const [dadosVisivel, setDadosVisivel] = useState(false);
    const [processoPasVisivel, setProcessoPasVisivel] = useState(false);
    const formRef = useRef(null);

    function limpaCampos() {
        setErro('');
        formRef.current.reset();
        formRef.current.setFieldValue('tprId', '-1');
        formRef.current.setFieldValue('proId', undefined);
        formRef.current.setFieldValue('proMatricula', '');
        formRef.current.setFieldValue('proNome', '');
        formRef.current.setFieldValue('proCpf', '');
        formRef.current.setFieldValue('proFone', '');
        formRef.current.setFieldValue('proCelular', '');
        formRef.current.setFieldValue('proEmail', '');
        formRef.current.setFieldValue('proCodigoPas', '');
        formRef.current.setFieldValue('proIdPas', undefined);
        formRef.current.setFieldValue('proIrregularidade', '');
        setMatriculaVisivel(false);
        setDadosVisivel(false);
        setProcessoPasVisivel(false);
        setListaComissao([]);
    }

    function retiraMembro(linha) {
        setListaComissao(
            listaComissao.filter(lista => {
                return lista.matricula !== linha.matricula;
            })
        );
    }

    function criaProcesso() {
        const p = formRef.current.getData();
        setErro('');
        if (p.tprId === '-1') {
            setErro('Selecione o tipo de processo.');
        }
        if (p.proMatricula === '') {
            setErro('Matrícula em branco.');
        }
        if (p.proNome === '') {
            setErro('Nome em branco.');
        }
        if (p.proIrregularidade === '') {
            setErro('Irregularidade em branco.');
        }
        if (listaComissao.length === 0) {
            setErro('Selecione os membros da comissão.');
        }

        if (Number(p.tprId) === constantes.TPR_PAD) {
            if (p.proCodigoPas !== '') {
                const proCodigo = p.proCodigoPas;
                axios({
                    method: 'POST',
                    url: '/processo-por-codigo-pas',
                    data: { proCodigo },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(res => {
                        if (res.data === null) {
                            setErro('Código do processo PAS inválido ou inexistente.');
                            return;
                        }
                        formRef.current.setFieldValue('proIdPas', res.data.pro_id);
                    })
                    .catch(() => {
                        setErro('Erro ao localizar processo PAS.');
                    });
            }
        }
        let cpfNumeros;
        if (p.proCpf !== '' && p.proCpf !== undefined) {
            cpfNumeros = p.proCpf.replace(/[^\d]+/g, '');
        }
        alert(formRef.current.getFieldValue('proIdPas'));
        axios({
            method: 'POST',
            url: '/processo-pas-pad',
            data: {
                pro_id: null,
                pro_nome: p.proNome,
                pro_matricula: p.proMatricula,
                pro_cpf: cpfNumeros,
                pro_cnpj: null,
                pro_fone: p.proFone,
                pro_celular: p.proCelular,
                pro_email: p.proEmail,
                pro_encerramento: null,
                pro_assunto: p.proIrregularidade,
                usu_autuador: sessionStorage.getItem('usuario'),
                pro_ultimo_tramite: null,
                usu_finalizador: null,
                nod_id: null,
                set_id_autuador: sessionStorage.getItem('setorUsuario'),
                area_id: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                set_id_finalizador: null,
                pro_iniciativa: 'Interna',
                pro_tipo_iniciativa: 'Servidor Público',
                area_id_iniciativa: null,
                tpr_id: p.tprId,
                pro_contato_pj: null,
                pro_autuacao: null,
                pro_recurso: false,
                pro_com_abono: false,
                pro_num_com_abono: null,
                membros_comissao: listaComissao,
                pro_id_origem: p.proIdPas,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                history.push(`/dados-processo/${res.data.pro_id}`);
                mensagem.success('Processo criado com sucesso.');
            })
            .catch(erroCria => {
                if (
                    erroCria.response.data.error ===
                    'Processo sem fluxo. Cadastre um fluxo primeiro.'
                ) {
                    setErro(erroCria.response.data.error);
                } else {
                    setErro('Erro ao inserir processo.');
                }
            });
    }

    useEffect(() => {
        async function carrega() {
            // carregaGrid();
        }
        carrega();
    }, []);

    function selecionaPasPad() {
        const p = formRef.current.getData();
        setErro('');
        if (p.tprId === '-1') {
            setMatriculaVisivel(false);
            setDadosVisivel(false);
            setProcessoPasVisivel(false);
        } else {
            setMatriculaVisivel(true);
            setDadosVisivel(true);
            if (Number(p.tprId) === constantes.TPR_PAD) {
                setProcessoPasVisivel(true);
            }
            if (Number(p.tprId) === constantes.TPR_PAS) {
                setProcessoPasVisivel(false);
            }
        }
    }

    function localiza() {
        const matricula = formRef.current.getFieldValue('proMatricula');
        if (matricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        formRef.current.setFieldValue('proNome', '');
        formRef.current.setFieldValue('proCpf', '');
        formRef.current.setFieldValue('proFone', '');
        formRef.current.setFieldValue('proCelular', '');
        formRef.current.setFieldValue('proEmail', '');
        setErro('');
        axios({
            method: 'GET',
            url: `/dados-pessoa/${matricula}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                if (res.data === null) {
                    setErro('Matrícula inválida ou inexistente.');
                    formRef.current.setFieldValue('proMatricula', '');
                } else {
                    if (res.data.pes_email !== null) {
                        res.data.pes_email = res.data.pes_email.toLowerCase();
                    } else {
                        res.data.pes_email = '';
                    }
                    if (res.data.pes_cpf === null) {
                        res.data.pes_cpf = '';
                    }
                    if (res.data.fone === null) {
                        res.data.fone = '';
                    }
                    if (res.data.pes_celular === null) {
                        res.data.pes_celular = '';
                    }
                    if (res.data.pes_cpf.toString().length === 10) {
                        res.data.pes_cpf = `0${res.data.pes_cpf.toString()}`;
                    }
                    if (res.data.pes_cpf.toString().length === 9) {
                        res.data.pes_cpf = `00${res.data.pes_cpf.toString()}`;
                    }
                    formRef.current.setFieldValue('proNome', res.data.pes_nome);
                    formRef.current.setFieldValue('proCpf', res.data.pes_cpf);
                    formRef.current.setFieldValue('proFone', res.data.fone);
                    formRef.current.setFieldValue('proCelular', res.data.pes_celular);
                    formRef.current.setFieldValue('proEmail', res.data.pes_email);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar dados de pessoa.');
            });
    }

    function localizaMembro() {
        const matricula = formRef.current.getFieldValue('matriculaMembro');
        if (matricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        setErro('');
        axios({
            method: 'GET',
            url: `/dados-pessoa-comissao/${matricula}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                if (res.data === null || res.data === '') {
                    mensagem.error(`Matrícula inválida ou inexistente.`);
                } else if (listaComissao.length > 2) {
                    mensagem.error(`Número limite de membros excedido.`);
                } else {
                    const membro = {};
                    membro.matricula = res.data.matricula;
                    membro.nome = res.data.nome;
                    membro.areaId = res.data.areaId;
                    membro.areaNome = res.data.areaNome;
                    membro.login = res.data.login;
                    setListaComissao(arrayAntigo => [...arrayAntigo, membro]);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar dados de pessoa.');
            });
        formRef.current.setFieldValue('matriculaMembro', '');
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Criar processo Pas Pad" />
                <Main>
                    <Titulo>
                        <p>Criar processo</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} onSubmit={criaProcesso}>
                        <Input name="proId" type="hidden" />
                        <Input name="proIdPas" type="hidden" />
                        <ContainerTipoProcesso>
                            <SelecionaPasPad name="tprId" changeHandler={selecionaPasPad} />
                            {matriculaVisivel ? (
                                <ContainerMatricula>
                                    <InputMask
                                        name="proMatricula"
                                        label="Matrícula"
                                        mask="99999"
                                        maskChar=" "
                                    />
                                    <BotaoProcura
                                        id="btnLocaliza"
                                        name="btnLocaliza"
                                        type="button"
                                        onClick={localiza}>
                                        <FaSearch />
                                        Localizar
                                    </BotaoProcura>
                                </ContainerMatricula>
                            ) : null}
                        </ContainerTipoProcesso>
                        {processoPasVisivel ? (
                            <ContainerProcessoPAS>
                                <ProcessoInputMask
                                    name="proCodigoPas"
                                    label="Processo PAS"
                                    autoFocus
                                />
                            </ContainerProcessoPAS>
                        ) : null}
                        {dadosVisivel ? (
                            <>
                                <ContainerNome>
                                    <Input
                                        name="proNome"
                                        label="Nome"
                                        type="text"
                                        size="100"
                                        maxLength="100"
                                    />
                                </ContainerNome>

                                <ContainerDadosServidorPublico>
                                    <InputMask
                                        name="proCpf"
                                        label="Cpf"
                                        mask="999.999.999-99"
                                        maskChar=" "
                                    />
                                    <Input
                                        name="proFone"
                                        label="Fone"
                                        type="text"
                                        size="30"
                                        maxLength="31"
                                    />
                                    <Input
                                        name="proCelular"
                                        label="Celular"
                                        type="text"
                                        size="30"
                                        maxLength="30"
                                    />
                                </ContainerDadosServidorPublico>
                                <ContainerEmail>
                                    <Input
                                        name="proEmail"
                                        label="E-mail"
                                        type="text"
                                        size="101"
                                        maxLength="100"
                                    />
                                </ContainerEmail>
                                <ContainerIrregularidade>
                                    <Input
                                        name="proIrregularidade"
                                        label="Irregularidade"
                                        type="text"
                                        size="101"
                                        maxLength="100"
                                    />
                                </ContainerIrregularidade>
                                <ContainerMembrosTitulo>
                                    <p>Membros da comissão processante</p>
                                    <hr />
                                </ContainerMembrosTitulo>
                                <ContainerLocalizaMembros>
                                    <InputMask
                                        name="matriculaMembro"
                                        label="Matrícula"
                                        mask="99999"
                                        maskChar=" "
                                    />
                                    <BotaoProcura
                                        id="btnLocalizaMembro"
                                        name="btnLocalizaMembro"
                                        type="button"
                                        onClick={localizaMembro}>
                                        <FaChild />
                                        Inserir membro
                                    </BotaoProcura>
                                </ContainerLocalizaMembros>
                                <ContainerMembros>
                                    {listaComissao.length > 0 ? (
                                        <TableComissao
                                            columns={[
                                                {
                                                    title: 'Matrícula',
                                                    field: 'matricula',
                                                    width: '30px',
                                                },
                                                {
                                                    title: 'Login',
                                                    field: 'login',
                                                    width: '50px',
                                                },
                                                { title: 'Nome', field: 'nome' },
                                                { title: 'Área', field: 'areaNome' },
                                            ]}
                                            data={listaComissao}
                                            fillData={retiraMembro}
                                        />
                                    ) : null}
                                </ContainerMembros>
                            </>
                        ) : null}
                        <ButtonContainer>
                            <CriaProcesso name="btnCriaProcesso" />
                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default CriarProcessoPasPad;

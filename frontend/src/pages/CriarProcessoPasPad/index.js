import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import { FaChild } from 'react-icons/fa';
import axios from '../../configs/axiosConfig';
import SelecionaPasPad from '../../components/system/select/SelecionaPasPad';
import InputMask from '../../components/layout/InputMask';
import ProcessoInputMask from '../../components/layout/InputMask/ProcessoInputMask';
import TableComissao from '../../components/layout/TableComissao';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import api from '../../service/api';
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
    ContainerLocaliza,
    ContainerLocalizaMembros,
    ContainerIrregularidade,
    ContainerProcessoPAS,
    ContainerMembros,
} from './styles';
import CriaProcesso from '../../components/layout/button/CriaProcesso';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function CriarProcessoPasPad() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [listaNome, setListaNome] = useState([]);
    const [listaComissao, setListaComissao] = useState([]);
    const [dadosVisivel, setDadosVisivel] = useState(false);
    const [processoPasVisivel, setProcessoPasVisivel] = useState(false);
    const [membros, setMembros] = useState([]);
    const formRef = useRef(null);

    function limpaCampos() {
        setErro('');
        formRef.current.reset();
        formRef.current.setFieldValue('tprId', '-1');
        formRef.current.setFieldValue('mcoId', '-1');
        formRef.current.setFieldValue('proId', undefined);
        formRef.current.setFieldValue('proMatricula', '');
        formRef.current.setFieldValue('proCodigoPas', '');
        formRef.current.setFieldValue('proIrregularidade', '');
        formRef.current.setFieldValue('chkPresidente', false);
        setDadosVisivel(false);
        setProcessoPasVisivel(false);
        setListaComissao([]);
        setListaNome([]);
    }

    async function carregaMembros() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/membros-comissao');

            const data = response.data.map(m => {
                return {
                    label: `${m.mco_nome} - ${m.set_nome}`,
                    value: m.mco_matricula,
                };
            });
            setMembros(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function retiraMembro(linha) {
        setListaComissao(
            listaComissao.filter(lista => {
                return lista.matricula !== linha.matricula;
            })
        );
    }

    function retiraNome(linha) {
        setListaNome(
            listaNome.filter(lista => {
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
        // quando for PAD a irregularidade é obrigatória
        if (Number(p.tprId) === constantes.TPR_PAD && p.proIrregularidade === '') {
            setErro('Irregularidade em branco.');
        }
        if (listaComissao.length === 0) {
            setErro('Selecione os membros da comissão.');
        }

        // quando for PAD a lista de nome(s) é obrigatória
        if (Number(p.tprId) === constantes.TPR_PAD && listaNome.length === 0) {
            setErro('Selecione o(s) nome(s).');
        }

        axios({
            method: 'POST',
            url: '/processo-pas-pad',
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
                nomes_processo: listaNome,
                pro_codigo_origem: p.proCodigoPas,
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                history.push(`/dados-processo-pas-pad/${res.data.pro_id}`);
                mensagem.success('Processo criado com sucesso.');
            })
            .catch(erroCria => {
                if (
                    erroCria.response.data.error ===
                    'Processo sem fluxo. Cadastre um fluxo primeiro.'
                ) {
                    setErro(erroCria.response.data.error);
                } else if (
                    erroCria.response.data.error ===
                    'Processo de origem inexistente. Insira um código de processo válido.'
                ) {
                    setErro(erroCria.response.data.error);
                } else {
                    setErro('Erro ao inserir processo.');
                }
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaMembros();
        }
        carrega();
    }, []);

    function selecionaPasPad() {
        const p = formRef.current.getData();
        setErro('');
        formRef.current.setFieldValue('proIrregularidade', '');
        setListaComissao([]);
        setListaNome([]);
        if (p.tprId === '-1') {
            setDadosVisivel(false);
            setProcessoPasVisivel(false);
        } else {
            setDadosVisivel(true);
            if (Number(p.tprId) === constantes.TPR_PAD) {
                setProcessoPasVisivel(true);
            }
            if (Number(p.tprId) === constantes.TPR_PAS) {
                setProcessoPasVisivel(false);
            }
        }
    }

    function handleChange(e) {
        const isChecked = e.target.checked;
        formRef.current.setFieldValue('chkPresidente', isChecked);
        if (isChecked) {
            document.getElementById('chkPresidente').checked = true;
        } else {
            document.getElementById('chkPresidente').checked = false;
        }
    }

    function localiza() {
        const matricula = formRef.current.getFieldValue('proMatricula');
        if (matricula.trim() === '') {
            setErro('Digite a matrícula.');
            return;
        }
        formRef.current.setFieldValue('proNome', '');
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
                } else {
                    const nome = {};
                    nome.matricula = res.data.matricula;
                    nome.nome = res.data.nome;
                    nome.areaId = res.data.areaId;
                    nome.areaNome = res.data.areaNome;
                    nome.login = res.data.login;
                    setListaNome(arrayAntigo => [...arrayAntigo, nome]);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar dados de pessoa.');
            });
        formRef.current.setFieldValue('proMatricula', '');
    }

    function localizaMembro() {
        const matricula = formRef.current.getFieldValue('mcoId');

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
                    mensagem.error(`Selecione um membro.`);
                } else if (listaComissao.length > 2) {
                    mensagem.error(`Número limite de membros excedido.`);
                } else {
                    const membro = {};
                    membro.matricula = res.data.matricula;
                    membro.nome = res.data.nome;
                    membro.areaId = res.data.areaId;
                    membro.areaNome = res.data.areaNome;
                    membro.login = res.data.login;
                    if (document.getElementById('chkPresidente').checked) {
                        membro.cargo = 'Presidente';
                        membro.bCargo = true;
                    } else {
                        membro.cargo = 'Membro';
                        membro.bCargo = false;
                    }
                    // aqui verifica se já existe um membro cadastrado
                    const listaExistente = listaComissao.filter(lista => {
                        return lista.matricula === membro.matricula;
                    });
                    if (listaExistente.length === 1) {
                        mensagem.error(`Membro já consta na lista.`);
                    } else {
                        // aqui verifica se existe já um membro que é presidente
                        // se existir não pode cadastrar
                        const listaAntiga = listaComissao.filter(lista => {
                            return lista.bCargo === true;
                        });
                        if (listaAntiga.length === 1 && membro.bCargo) {
                            mensagem.error(`Só um membro da comissão pode ser presidente.`);
                        } else {
                            setListaComissao(arrayAntigo => [...arrayAntigo, membro]);
                            document.getElementById('chkPresidente').checked = false;
                            formRef.current.setFieldValue('mcoId', '-1');
                        }
                    }
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
                        <ContainerTipoProcesso>
                            <SelecionaPasPad name="tprId" changeHandler={selecionaPasPad} />
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
                                <ContainerMembrosTitulo>
                                    <p>Nome(s)</p>
                                    <hr />
                                </ContainerMembrosTitulo>
                                <ContainerLocaliza>
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
                                        <FaChild />
                                        Inserir nome
                                    </BotaoProcura>
                                </ContainerLocaliza>
                                <ContainerMembros>
                                    {listaNome.length > 0 ? (
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
                                            data={listaNome}
                                            fillData={retiraNome}
                                        />
                                    ) : null}
                                </ContainerMembros>
                                <br />
                                <ContainerIrregularidade>
                                    <Input
                                        name="proIrregularidade"
                                        label="Motivo"
                                        type="text"
                                        size="101"
                                        maxLength="100"
                                    />
                                </ContainerIrregularidade>
                                <ContainerMembrosTitulo>
                                    <p>Membros da comissão processante</p>
                                    <hr />
                                </ContainerMembrosTitulo>
                                <ContainerIrregularidade>
                                    <Select name="mcoId" label="Membro" options={membros} />
                                </ContainerIrregularidade>
                                <ContainerLocalizaMembros>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="chkPresidente"
                                            name="chkPresidente"
                                            onChange={e => handleChange(e)}
                                        />
                                        <label htmlFor="chkPresidente">Presidente</label>
                                    </div>
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
                                                { title: 'Cargo', field: 'cargo' },
                                            ]}
                                            data={listaComissao}
                                            fillData={retiraMembro}
                                        />
                                    ) : null}
                                </ContainerMembros>
                            </>
                        ) : null}
                        <br />
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

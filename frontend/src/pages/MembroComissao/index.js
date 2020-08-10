import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import {
    Container,
    Main,
    Erro,
    ContainerCamposArea,
    ContainerNomeComissao,
    ContainerCamposMembro,
    ContainerCamposMembroDados,
    ContainerSelecione,
    Titulo,
} from './styles';
import api from '../../service/api';
import Input from '../../components/layout/Input';
import Select from '../../components/layout/Select';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import ButtonContainer from '../../components/layout/button/ButtonContainer';
import ConsultarOutraComissao from '../../components/layout/button/ConsultarOutraComissao';
import ComissaoAtiva from '../../components/system/select/ComissaoAtiva';

function MembroComissao() {
    const [erro, setErro] = useState('');
    const [membroComissao, setMembroComissao] = useState({
        mcoId: undefined,
        areaId: -1,
        mcoMatricula: '',
        mcoNome: '',
        mcoAreaIdMembro: -1,
        mcoAtivo: -1,
        mcoLogin: '',
    });

    const [comissoesVisiveis, setComissoesVisiveis] = useState(true);
    const [membrosComissaoVisiveis, setMembrosComissaoVisiveis] = useState(false);
    const [nomeComissaoVisivel, setNomeComissaoVisivel] = useState(false);
    const [nomeComissao, setNomeComissao] = useState('');
    const [comissoes, setComissoes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [membrosComissao, setMembrosComissao] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(membroComissao);
    }, [membroComissao]);

    function abreModalExcluir() {
        if (membroComissao.mcoId !== null) {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    async function carregaArea() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/area');

            const data = response.data.map(area => {
                return {
                    label: area.set_nome,
                    value: area.set_id,
                };
            });

            setAreas(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function limpaCampos() {
        setMembroComissao({
            ...membroComissao,
            mcoId: undefined,
            areaId: -1,
            mcoMatricula: '',
            mcoNome: '',
            mcoAreaIdMembro: -1,
            mcoAtivo: -1,
            mcoLogin: '',
        });

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function carregaGrid(comissao) {
        axios({
            method: 'GET',
            url: `/grid-membros-comissao/${comissao}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setMembrosComissao(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function selecionaOutraComissao() {
        setMembrosComissaoVisiveis(false);
        setComissoesVisiveis(true);
        setNomeComissaoVisivel(false);
        setNomeComissao('');
        setErro('');
        setMembroComissao({ area: '' });
    }

    function handleAreaId(e) {
        if (e.target.value !== '') {
            setMembrosComissaoVisiveis(true);
            setComissoesVisiveis(false);
            setNomeComissaoVisivel(true);
            const index = e.nativeEvent.target.selectedIndex;
            setNomeComissao(e.nativeEvent.target[index].text);
            setMembroComissao({ areaId: e.target.value });
            carregaArea();
            carregaGrid(e.target.value);
        } else {
            setMembrosComissaoVisiveis(false);
            setComissoesVisiveis(true);
            setNomeComissao('');
            setNomeComissaoVisivel(false);
            setMembroComissao({ areaId: '' });
        }
    }

    async function carregaComissoes() {
        api.defaults.headers.Authorization = sessionStorage.getItem('token');

        try {
            const response = await api.get('/comissoes');

            const data = response.data.map(comissao => {
                return {
                    label: comissao.set_nome,
                    value: comissao.set_id_area,
                };
            });
            setComissoes(data);
        } catch (err) {
            mensagem.error(`Falha na autenticação - ${err}`);
        }
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});
        setMembroComissao({
            ...membroComissao,
            mcoId: linha.mco_id,
            areaId: linha.area_id,
            mcoMatricula: linha.mco_matricula,
            mcoNome: linha.mco_nome,
            mcoAreaIdMembro: linha.mco_area_id_membro,
            mcoAtivo: linha.mco_ativo,
            mcoLogin: linha.mco_login,
        });
        posiciona();
    }

    useEffect(() => {
        async function carrega() {
            await carregaComissoes();
        }
        carrega();
    }, []);

    async function grava({
        mcoId,
        areaId,
        mcoMatricula,
        mcoNome,
        mcoAreaIdMembro,
        mcoAtivo,
        mcoLogin,
    }) {
        try {
            const schema = Yup.object().shape({
                areaId: Yup.number().positive('Comissão é obrigatória'),
                mcoAreaIdMembro: Yup.number().positive('Área do membro é obrigatória'),
                mcoMatricula: Yup.string().required('Matrícula é obrigatório'),
                mcoNome: Yup.string().required('Nome é obrigatório'),
                mcoAtivo: Yup.boolean().oneOf([true, false], 'Selecione se está ativo ou não'),
                mcoLogin: Yup.string().required('Login é obrigatório'),
            });

            await schema.validate(
                {
                    mcoId,
                    areaId,
                    mcoMatricula,
                    mcoNome,
                    mcoAreaIdMembro,
                    mcoAtivo,
                    mcoLogin,
                },
                { abortEarly: false }
            );

            if (!mcoId) {
                axios({
                    method: 'POST',
                    url: '/membros-comissao',
                    data: {
                        mco_id: null,
                        area_id: membroComissao.areaId,
                        mco_matricula: mcoMatricula,
                        mco_nome: mcoNome,
                        mco_area_id_membro: mcoAreaIdMembro,
                        mco_ativo: mcoAtivo,
                        mco_login: mcoLogin,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Inserido com sucesso.');
                        limpaCampos();
                        carregaGrid(membroComissao.areaId);
                        setMembroComissao({ areaId });
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `membros-comissao/${mcoId}`,
                    data: {
                        area_id: membroComissao.areaId,
                        mco_matricula: mcoMatricula,
                        mco_nome: mcoNome,
                        mco_area_id_membro: mcoAreaIdMembro,
                        mco_ativo: mcoAtivo,
                        mco_login: mcoLogin,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Editado com sucesso.');
                        limpaCampos();
                        carregaGrid(membroComissao.areaId);
                        setMembroComissao({ areaId });
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao editar registro.');
                    });
            }
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    }

    function apaga(id) {
        axios({
            method: 'DELETE',
            url: `membros-comissao/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Excluído com sucesso.');
                limpaCampos();
                carregaGrid(membroComissao.areaId);
                setMembroComissao({ areaId: membroComissao.areaId });
                posiciona();
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Membros comissão" />
                <Main>
                    <Titulo>
                        <p>Membros de comissão</p>
                        <hr />
                    </Titulo>

                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={membroComissao} onSubmit={grava}>
                        <Input name="mcoId" type="hidden" />
                        <Input name="areaId" type="hidden" />
                        {comissoesVisiveis ? (
                            <ContainerSelecione>
                                <Select
                                    name="selectComissao"
                                    label="Selecione a comissão"
                                    options={comissoes}
                                    onChange={handleAreaId}
                                />
                            </ContainerSelecione>
                        ) : null}
                        {nomeComissaoVisivel ? (
                            <ContainerNomeComissao>
                                <fieldset>
                                    <label>{nomeComissao}</label>
                                </fieldset>
                                <div>
                                    <ConsultarOutraComissao
                                        name="btnSelecionaOutraComissao"
                                        clickHandler={selecionaOutraComissao}
                                    />
                                </div>
                            </ContainerNomeComissao>
                        ) : null}
                        {membrosComissaoVisiveis ? (
                            <div>
                                <ContainerCamposArea>
                                    <Select
                                        name="mcoAreaIdMembro"
                                        label="Área do membro"
                                        options={areas}
                                    />
                                </ContainerCamposArea>
                                <ContainerCamposMembro>
                                    <Input
                                        name="mcoMatricula"
                                        label="Matrícula"
                                        type="text"
                                        maxLength="5"
                                    />
                                    <Input
                                        name="mcoNome"
                                        label="Nome"
                                        type="text"
                                        maxLength="100"
                                    />
                                </ContainerCamposMembro>
                                <ContainerCamposMembroDados>
                                    <Input
                                        name="mcoLogin"
                                        label="Login"
                                        type="text"
                                        maxLength="50"
                                    />
                                    <ComissaoAtiva name="mcoAtivo" />
                                </ContainerCamposMembroDados>
                                <ButtonContainer>
                                    <Salvar name="btnSalva" type="submit" />

                                    <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                                    <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                                </ButtonContainer>
                                <Table
                                    columns={[
                                        { title: 'Área', field: 'set_nome', width: 350 },
                                        { title: 'Matrícula', field: 'mco_matricula', width: 30 },
                                        { title: 'Nome', field: 'mco_nome', width: 260 },
                                        { title: 'Login', field: 'mco_login', width: 80 },
                                        { title: 'Ativo', field: 'ativo', width: 30 },
                                    ]}
                                    data={membrosComissao}
                                    fillData={preencheCampos}
                                />
                            </div>
                        ) : null}
                    </Form>
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={membroComissao.mcoId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default MembroComissao;

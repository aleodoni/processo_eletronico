import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function Fluxo() {
    const [erro, setErro] = useState('');
    const [fluxo, setFluxo] = useState({
        fluId: undefined,
        fluNome: '',
    });
    const [fluxos, setFluxos] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(fluxo);
    }, [fluxo]);

    function abreModalExcluir() {
        if (fluxo.fluNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setFluxo({
            ...fluxo,
            fluId: null,
            fluNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function posiciona() {
        window.scrollTo(0, 0);
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setFluxo({
            ...fluxo,
            fluId: linha.flu_id,
            fluNome: linha.flu_nome,
        });
        posiciona();
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/fluxos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setFluxos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            carregaGrid();
            posiciona();
        }
        carrega();
    }, []);

    async function grava({ fluId, fluNome }) {
        try {
            const schema = Yup.object().shape({
                fluNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Nome do fluxo é obrigatório'),
            });

            await schema.validate({ fluId, fluNome }, { abortEarly: false });

            if (!fluId) {
                axios({
                    method: 'POST',
                    url: '/fluxos',
                    data: {
                        flu_id: null,
                        flu_nome: fluNome,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Inserido com sucesso.');
                        limpaCampos();
                        carregaGrid();
                        posiciona();
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `fluxos/${fluId}`,
                    data: {
                        flu_nome: fluNome,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        mensagem.success('Editado com sucesso.');
                        limpaCampos();
                        carregaGrid();
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
            url: `fluxos/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Excluído com sucesso.');
                limpaCampos();
                carregaGrid();
                posiciona();
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Fluxos" />
                <Main>
                    <p>Fluxos</p>
                    <hr />
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={fluxo} onSubmit={grava}>
                        <Input name="fluId" type="hidden" />
                        <FormLine>
                            <Input
                                name="fluNome"
                                label="Nome"
                                type="text"
                                autoFocus
                                maxLength="100"
                            />
                        </FormLine>
                        <ButtonContainer>
                            <Salvar name="btnSalva" type="submit" />

                            <Excluir name="btnExclui" clickHandler={abreModalExcluir} />

                            <Limpar name="btnLimpa" clickHandler={limpaCampos} />
                        </ButtonContainer>
                    </Form>

                    <Table
                        columns={[{ title: 'Nome', field: 'flu_nome' }]}
                        data={fluxos}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={fluxo.fluId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Fluxo;

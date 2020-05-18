import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import ModalApaga from '../../components/ModalExcluir';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import { Container, Main, Erro, Titulo } from './styles';
import Input from '../../components/layout/Input';
import Salvar from '../../components/layout/button/Salvar';
import Excluir from '../../components/layout/button/Excluir';
import Limpar from '../../components/layout/button/Limpar';
import DefaultLayout from '../_layouts/default';
import Table from '../../components/layout/Table';
import FormLine from '../../components/layout/FormLine';
import ButtonContainer from '../../components/layout/button/ButtonContainer';

function RazaoTramite() {
    const [erro, setErro] = useState('');
    const [razaoTramite, setRazaoTramite] = useState({
        razId: undefined,
        razNome: '',
    });

    const [razoes, setRazoes] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(razaoTramite);
    }, [razaoTramite]);

    function abreModalExcluir() {
        if (razaoTramite.razNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setRazaoTramite({
            ...razaoTramite,
            razId: null,
            razNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setRazaoTramite({
            ...razaoTramite,
            razId: linha.raz_id,
            razNome: linha.raz_nome,
        });
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/razao-tramite',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setRazoes(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    useEffect(() => {
        async function carrega() {
            await carregaGrid();
        }
        carrega();
    }, []);

    async function grava({ razId, razNome }) {
        try {
            const schema = Yup.object().shape({
                razNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Razão de trâmite é obrigatório'),
            });

            await schema.validate({ razId, razNome }, { abortEarly: false });

            if (!razId) {
                axios({
                    method: 'POST',
                    url: '/razao-tramite',
                    data: {
                        raz_id: null,
                        raz_nome: razNome,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        limpaCampos();
                        carregaGrid();
                        mensagem.success('Inserido com sucesso.');
                    })
                    .catch(() => {
                        setErro('Erro ao inserir registro.');
                    });
            } else {
                axios({
                    method: 'PUT',
                    url: `razao-tramite/${razId}`,
                    data: {
                        raz_nome: razNome,
                    },
                    headers: {
                        authorization: sessionStorage.getItem('token'),
                    },
                })
                    .then(() => {
                        limpaCampos();
                        carregaGrid();
                        mensagem.success('Editado com sucesso.');
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
            url: `razao-tramite/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                limpaCampos();
                carregaGrid();
                mensagem.success('Excluído com sucesso.');
            })
            .catch(err => {
                setErro(err.response.data.error);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Razões de trâmite" />
                <Main>
                    <Titulo>
                        <p>Razões de trâmite</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={razaoTramite} onSubmit={grava}>
                        <Input name="razId" type="hidden" />
                        <FormLine>
                            <Input
                                name="razNome"
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
                        columns={[{ title: 'Nome', field: 'raz_nome' }]}
                        data={razoes}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={razaoTramite.razId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default RazaoTramite;

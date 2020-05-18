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

function Genero() {
    const [erro, setErro] = useState('');
    const [genero, setGenero] = useState({
        genId: undefined,
        genNome: '',
    });
    const [generos, setGeneros] = useState([]);
    const [modalExcluir, setModalExcluir] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(genero);
    }, [genero]);

    function abreModalExcluir() {
        if (genero.genNome !== '') {
            setModalExcluir(true);
        }
    }

    function fechaModalExcluir() {
        setModalExcluir(false);
    }

    function limpaCampos() {
        setGenero({
            ...genero,
            genId: null,
            genNome: '',
        });
        setErro('');

        formRef.current.setErrors({});
    }

    function preencheCampos(linha) {
        formRef.current.setErrors({});

        setGenero({
            ...genero,
            genId: linha.gen_id,
            genNome: linha.gen_nome,
        });
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: '/generos',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setGeneros(res.data);
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

    async function grava({ genId, genNome }) {
        try {
            const schema = Yup.object().shape({
                genNome: Yup.string()
                    .max(100, 'Tamanho máximo 100 caracteres')
                    .required('Gênero é obrigatório'),
            });

            await schema.validate({ genId, genNome }, { abortEarly: false });

            if (!genId) {
                axios({
                    method: 'POST',
                    url: '/generos',
                    data: {
                        gen_id: null,
                        gen_nome: genNome,
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
                    url: `generos/${genId}`,
                    data: {
                        gen_nome: genNome,
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
            url: `generos/${id}`,
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
                <Autorizacao tela="Gêneros" />
                <Main>
                    <Titulo>
                        <p>Gêneros</p>
                        <hr />
                    </Titulo>
                    <Erro>{erro}</Erro>
                    <Form ref={formRef} initialData={genero} onSubmit={grava}>
                        <Input name="genId" type="hidden" />
                        <FormLine>
                            <Input
                                name="genNome"
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
                        columns={[{ title: 'Nome', field: 'gen_nome' }]}
                        data={generos}
                        fillData={preencheCampos}
                    />
                </Main>
                <ModalApaga
                    modalExcluir={modalExcluir}
                    fechaModalExcluir={fechaModalExcluir}
                    apaga={apaga}
                    id={genero.genId}
                />
            </Container>
        </DefaultLayout>
    );
}

export default Genero;

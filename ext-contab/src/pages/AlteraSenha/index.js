import React, { useState, useEffect, useRef } from 'react';
import { toast as mensagem } from 'react-toastify';
import { Form } from '@unform/web';
import ModalAlteracaoSenha from '../../components/ModalAlteracaoSenha';
import { Container, Main, Erro, ContainerTitulo, ContainerCampos, ContainerBotoes } from './styles';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import Input from '../../components/layout/Input';
import ButtonAlteraSenha from '../../components/layout/button/ButtonAlterarSenha';

function AlteraSenha() {
    const [erro, setErro] = useState('');
    const [modalAlteracaoSenha, setModalAlteracaoSenha] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [alteraSenha, setAlteraSenha] = useState({
        novaSenha: '',
        confirmaNovaSenha: '',
    });

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(alteraSenha);
    }, [alteraSenha]);

    function abreModalAlteracaoSenha() {
        setModalAlteracaoSenha(true);
    }

    function fechaModalAlteracaoSenha() {
        setModalAlteracaoSenha(false);
    }

    async function grava({ novaSenha, confirmaNovaSenha }) {
        if (novaSenha.trim() === '') {
            mensagem.error('Nova senha é obrigatória.');
            return;
        }
        if (confirmaNovaSenha.trim() === '') {
            mensagem.error('Confirmação de nova senha é obrigatória.');
            return;
        }
        if (novaSenha.trim() !== confirmaNovaSenha.trim()) {
            mensagem.error('Nova senha diferente da confirmação.');
            return;
        }
        try {
            axios({
                method: 'POST',
                url: '/altera-senha',
                data: {
                    acf_cpf_cnpj: sessionStorage.getItem('cnpj'),
                    acf_acesso: novaSenha,
                    acf_ativo: true,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    abreModalAlteracaoSenha();
                })
                .catch(() => {
                    setErro('Erro ao inserir nova senha.');
                });
        } catch (err) {
            console.log(err);
        }
    }

    function verifica() {
        axios({
            method: 'GET',
            url: `/verifica-fornecedor/${sessionStorage.getItem('cnpj')}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                const { primeiro } = res.data;
                if (!primeiro) {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('cnpj');
                    sessionStorage.removeItem('fornecedor');
                    sessionStorage.removeItem('ip');
                    window.location.href = '/processo-eletronico-ext-contab';
                }
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function desloga() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cnpj');
        sessionStorage.removeItem('fornecedor');
        sessionStorage.removeItem('ip');
        window.location.href = '/processo-eletronico-ext-contab';
    }

    useEffect(() => {
        async function carrega() {
            await verifica();
        }
        carrega();
    }, []);

    return (
        <DefaultLayout>
            <Container>
                <Main>
                    <Erro>{erro}</Erro>
                    <ContainerTitulo>
                        Alterar senha provisória - Fornecedor:{' '}
                        {sessionStorage.getItem('fornecedor')}
                    </ContainerTitulo>
                    <hr />
                    <Form ref={formRef} initialData={alteraSenha} onSubmit={grava}>
                        <ContainerCampos>
                            <Input
                                name="novaSenha"
                                label="Nova senha"
                                type="password"
                                autoFocus
                                maxLength="30"
                            />
                            <Input
                                name="confirmaNovaSenha"
                                label="Repita a nova senha"
                                type="password"
                                maxLength="30"
                            />
                        </ContainerCampos>
                        <ContainerBotoes>
                            <ButtonAlteraSenha name="btnAlteraSenha" type="submit" />
                        </ContainerBotoes>
                    </Form>
                </Main>
                <ModalAlteracaoSenha
                    modalAlteracaoSenha={modalAlteracaoSenha}
                    fechaModalAlteracaoSenha={fechaModalAlteracaoSenha}
                    desloga={desloga}
                />
            </Container>
        </DefaultLayout>
    );
}

export default AlteraSenha;

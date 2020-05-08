import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import Autorizacao from '../../components/Autorizacao';
import axios from '../../configs/axiosConfig';
import DefaultLayout from '../_layouts/default';
import Input from '../../components/layout/Input';
import Localizar from '../../components/layout/button/Localizar';
import { Container, ContainerConsultaProcesso, Main, Erro } from './styles';

require('dotenv').config();

function ConsultarProcesso() {
    const history = useHistory();
    const [erro, setErro] = useState('');

    const processo = {
        proCodigo: '',
    };

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current.setData(processo);
    }, [processo]);

    async function localiza({ proCodigo }) {
        try {
            const schema = Yup.object().shape({
                proCodigo: Yup.string().required('Código é obrigatório'),
            });

            await schema.validate({ proCodigo }, { abortEarly: false });

            axios({
                method: 'POST',
                url: '/processo-por-codigo',
                data: { proCodigo },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    if (res.data === null) {
                        setErro('Código inválido ou inexistente.');
                        return;
                    }
                    history.push(`/dados-processo/${res.data.pro_id}`);
                })
                .catch(() => {
                    setErro('Erro ao localizar registro.');
                });
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
            }
            setErro(validationErrors.proCodigo);
        }
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Consultar processo" />
                <Main>
                    <Form ref={formRef} initialData={processo} onSubmit={localiza}>
                        <ContainerConsultaProcesso>
                            <Input
                                name="proCodigo"
                                label="Digite o código"
                                type="text"
                                size={10}
                                maxLength="10"
                                autoFocus
                            />
                            <Localizar name="btnConsultaProcesso" type="submit" />
                            <div>
                                <Erro>{erro}</Erro>
                            </div>
                        </ContainerConsultaProcesso>
                    </Form>
                </Main>
            </Container>
        </DefaultLayout>
    );
}

export default ConsultarProcesso;

import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router';
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
    const [proCodigo, setProCodigo] = useState('');

    const formRef = useRef(null);

    function handleProCodigo(e) {
        // eslint-disable-next-line no-useless-escape
        const re = /^[0-9\/\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setProCodigo(e.target.value);
        }
    }

    function onKeyPressed(e) {
        if (e.keyCode === 111 || e.keyCode === 191) {
            if (proCodigo.length === 1) {
                setProCodigo(`0000${proCodigo}`);
            }
            if (proCodigo.length === 2) {
                setProCodigo(`000${proCodigo}`);
            }
            if (proCodigo.length === 3) {
                setProCodigo(`00${proCodigo}`);
            }
            if (proCodigo.length === 4) {
                setProCodigo(`0${proCodigo}`);
            }
            if (proCodigo.length === 5) {
                setProCodigo(proCodigo);
            }
        } else if (proCodigo.length === 5 && e.keyCode !== 8) {
            setProCodigo(`${proCodigo}/`);
        }
    }

    function consultaProcesso() {
        setErro('');
        if (proCodigo.trim() === '') {
            setErro('Código do processo em branco.');
            return;
        }
        axios({
            method: 'POST',
            url: '/processo-por-codigo/',
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
            data: { proCodigo },
        })
            .then(res => {
                if (res.data === null) {
                    setErro('Código do processo inválido ou inexistente.');
                    return;
                }
                history.push(`/dados-processo/${res.data.pro_id}`);
            })
            .catch(err => {
                console.log(`Erro ao carregar processo por código.${err}`);
            });
    }

    return (
        <DefaultLayout>
            <Container>
                <Autorizacao tela="Consultar processo" />
                <Main>
                    <Form ref={formRef}>
                        <ContainerConsultaProcesso>
                            <Input id="proCodigo" name="proCodigo" label="Digite o código" type="text" value={proCodigo} onKeyDown={onKeyPressed} onChange={handleProCodigo} size="10" maxLength="10" autoFocus />
                            <Localizar name="btnConsultaProcesso" clickHandler={consultaProcesso} />
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

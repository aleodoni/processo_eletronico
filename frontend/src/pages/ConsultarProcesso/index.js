import React, { useState } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { useHistory } from 'react-router';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import axios from '../../configs/axiosConfig';
import { Container, ContainerConsultaProcesso, AsideLeft, Main, Erro } from './styles';

require('dotenv').config();

function ConsultarProcesso() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [proCodigo, setProCodigo] = useState('');

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
        <>
            <Container>
                <Autorizacao tela="Consultar processo" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Consultar processos</legend>
                        <ContainerConsultaProcesso>
                            <input id="proCodigo" name="proCodigo" value={proCodigo} onKeyDown={onKeyPressed} onChange={handleProCodigo} type="text" size="10" maxLength="10" autoFocus />
                            <button type="button" id="btnConsultaProcesso" onClick={consultaProcesso}>
                                <FaSistrix />
                                &nbsp;Consultar
                            </button>
                            <div>
                                <Erro>{erro}</Erro>
                            </div>
                        </ContainerConsultaProcesso>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default ConsultarProcesso;

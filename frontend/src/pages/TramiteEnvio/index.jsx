import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useHistory } from 'react-router';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { Container, Centralizado, BotaoComoLink, ContainerTabela, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

function TramiteEnvio() {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [areaNome, setAreaNome] = useState('');
    const [processos, setProcessos] = useState([]);

    function tramita(proId) {
        history.push(`/tramita/${proId}`);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: `/processo-envia/${parseInt(sessionStorage.getItem('areaUsuario'), 10)}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProcessos(res.data);
            })
            .catch(() => {
                setErro('Erro ao carregar registros.');
            });
    }

    function abreProcesso(proId) {
        alert(proId);
    }

    useEffect(() => {
        setAreaNome(sessionStorage.getItem('nomeAreaUsuario'));
        carregaGrid();
    }, []);

    return (
        <>
            <Container>
                <Autorizacao tela="Enviar" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Processos para enviar na área: {areaNome}</legend>
                        <Erro>{erro}</Erro>
                        <ContainerTabela>
                            {processos.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo do processo</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {processos.map(proc => (
                                            <tr key={proc.pro_id}>
                                                <td>
                                                    <Centralizado>
                                                        <BotaoComoLink type="button" onClick={() => abreProcesso(proc.pro_id)}>
                                                            {proc.pro_codigo}
                                                        </BotaoComoLink>
                                                    </Centralizado>
                                                </td>
                                                <td>{proc.tpr_nome}</td>
                                                <td>
                                                    <Centralizado>
                                                        <button type="button" id="btnEnvia" onClick={() => tramita(proc.pro_id)}>
                                                            <FaUpload />
                                                            &nbsp;Enviar
                                                        </button>
                                                    </Centralizado>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <label>Sem processos para enviar no momento.</label>
                            )}
                        </ContainerTabela>
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default TramiteEnvio;

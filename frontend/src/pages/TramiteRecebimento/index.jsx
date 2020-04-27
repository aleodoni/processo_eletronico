import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import ModalRecebe from '../../components/ModalRecebe';
import ModalNega from '../../components/ModalNega';
import { Container, BotaoComoLink, ContainerTabela, AsideLeft, Main, Erro } from './styles';
import Header from '../../components/Header';

function TramiteRecebimento() {
    const [proId, setProId] = useState('');
    const [erro, setErro] = useState('');
    const [areaNome, setAreaNome] = useState('');
    const [processos, setProcessos] = useState([]);
    const [modalReceber, setModalReceber] = useState(false);
    const [modalNegar, setModalNegar] = useState(false);

    function abreModalReceber(id) {
        setModalReceber(true);
        setProId(id);
    }

    function fechaModalReceber() {
        setModalReceber(false);
    }

    function abreModalNegar(id) {
        setModalNegar(true);
        setProId(id);
    }

    function fechaModalNegar() {
        setModalNegar(false);
    }

    function carregaGrid() {
        axios({
            method: 'GET',
            url: `/processo-recebe/${parseInt(sessionStorage.getItem('areaUsuario'), 10)}`,
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

    function recebe(id) {
        axios({
            method: 'POST',
            url: '/tramite-recebe-ou-nega',
            data: {
                pro_id: id,
                area_id_recebe: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                tipo: 'recebe',
                login_recebe: sessionStorage.getItem('usuario'),
                set_id_recebe: parseInt(sessionStorage.getItem('setorUsuario'), 10),
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Recebido com sucesso.');
                carregaGrid();
            })
            .catch(() => {
                setErro('Erro ao receber processo.');
            });
    }

    function nega(id) {
        axios({
            method: 'POST',
            url: '/tramite-recebe-ou-nega',
            data: {
                pro_id: id,
                area_id_recebe: parseInt(sessionStorage.getItem('areaUsuario'), 10),
                tipo: 'nega',
                login_recebe: sessionStorage.getItem('usuario'),
            },
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(() => {
                mensagem.success('Negado com sucesso.');
                carregaGrid();
            })
            .catch(() => {
                setErro('Erro ao negar processo.');
            });
    }

    function abreProcesso(id) {
        alert(id);
    }

    useEffect(() => {
        setAreaNome(sessionStorage.getItem('nomeAreaUsuario'));
        carregaGrid();
    }, []);

    return (
        <>
            <Container>
                <Autorizacao tela="Receber" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <fieldset>
                        <legend>Processos para receber na área: {areaNome}</legend>
                        <Erro>{erro}</Erro>
                        <ContainerTabela>
                            {processos.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Tipo do processo</th>
                                            <th>Envio</th>
                                            <th>Login</th>
                                            <th />
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {processos.map(proc => (
                                            <tr key={proc.pro_id}>
                                                <td>
                                                    <BotaoComoLink type="button" onClick={() => abreProcesso(proc.pro_id)}>
                                                        {proc.pro_codigo}
                                                    </BotaoComoLink>
                                                </td>
                                                <td>{proc.tpr_nome}</td>
                                                <td>{proc.tra_envio}</td>
                                                <td>{proc.login_envia}</td>
                                                <td>
                                                    <button type="button" id="btnRecebe" onClick={() => abreModalReceber(proc.pro_id)}>
                                                        <FaThumbsUp />
                                                        &nbsp;Receber
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" id="btnNega" onClick={() => abreModalNegar(proc.pro_id)}>
                                                        <FaThumbsDown />
                                                        &nbsp;Negar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <label>Sem processos para receber no momento.</label>
                            )}
                        </ContainerTabela>
                        <ModalRecebe modalReceber={modalReceber} fechaModalReceber={fechaModalReceber} recebe={recebe} id={proId} />
                        <ModalNega modalNegar={modalNegar} fechaModalNegar={fechaModalNegar} nega={nega} id={proId} />
                    </fieldset>
                </Main>
            </Container>
        </>
    );
}

export default TramiteRecebimento;

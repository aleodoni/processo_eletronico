import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { toast as mensagem } from 'react-toastify';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import ModalTramita from '../../components/ModalTramita';
import Menu from '../../components/Menu';
import { Container, AsideLeft, BotaoComoLink, TextoCamposArea, Main, Erro } from './styles';
import Header from '../../components/Header';

function Tramite(props) {
    const history = useHistory();
    const [erro, setErro] = useState('');
    const [proCodigo, setProCodigo] = useState('');
    const [proAssunto, setProAssunto] = useState('');
    const [areaIniciativaProcesso, setAreaIniciativaProcesso] = useState('');
    const [genNome, setGenNome] = useState('');
    const [tprNome, setTprNome] = useState('');
    const [prxId, setPrxId] = useState('');
    const [setId, setSetId] = useState('');
    const [comboTramite, setComboTramite] = useState('');
    const [proximosTramites, setProximosTramites] = useState([]);
    const [modalTramitar, setModalTramitar] = useState(false);

    function abreModalTramitar() {
        if (comboTramite === '') {
            setErro('Selecione o destino da tramitação.');
            return;
        }
        setModalTramitar(true);
    }

    function fechaModalTramitar() {
        setModalTramitar(false);
    }

    function handleComboTramite(e) {
        setErro('');
        const valor = e.target.value;
        const n = valor.indexOf('|');
        const setor = valor.substring(0, n);
        const proximo = valor.substring(n + 1);
        setPrxId(proximo);
        setSetId(setor);
        setComboTramite(e.target.value);
    }

    function carregaDadosProcesso(id) {
        axios({
            method: 'GET',
            url: `/ver-processo/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProCodigo(res.data.pro_codigo);
                setProAssunto(res.data.pro_assunto);
                setAreaIniciativaProcesso(res.data.area_iniciativa_processo);
                setGenNome(res.data.gen_nome);
                setTprNome(res.data.tpr_nome);
            })
            .catch(() => {
                setErro('Erro ao retornar dados do processo.');
            });
    }

    function carregaProximoTramite(id) {
        axios({
            method: 'GET',
            url: `/proximo-tramite/${id}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                console.log(res.data);
                const comboProximoTramite = [];
                comboProximoTramite.push(
                    <option key="0|0" data-key="0|0" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboProximoTramite.push(
                        <option
                            key={`${res.data[i].set_id}|${res.data[i].prx_id}`}
                            data-key={`${res.data[i].set_id}|${res.data[i].prx_id}`}
                            value={`${res.data[i].set_id}|${res.data[i].prx_id}`}>
                            {res.data[i].set_nome} - {res.data[i].raz_nome}
                        </option>
                    );
                }
                setProximosTramites(comboProximoTramite);
                // se tiver somente dois registros(um o selecione), posiciona nele
                if (comboProximoTramite.length === 2) {
                    // setPrxId(comboProximoTramite[1].props.value);
                    const valor = comboProximoTramite[1].props.value;
                    const n = valor.indexOf('|');
                    const setor = valor.substring(0, n);
                    const proximo = valor.substring(n + 1);
                    setPrxId(proximo);
                    setSetId(setor);
                }
            })
            .catch(() => {
                setErro('Erro ao carregar próximos trâmites.');
            });
    }

    function mostraDetalhesProcesso() {
        alert('aqui vai mostrar dialog de dados do processo.');
    }

    function tramita() {
        if (prxId === '') {
            setErro('Selecione um local para tramitação.');
        } else {
            axios({
                method: 'POST',
                url: '/tramites',
                data: {
                    tra_id: null,
                    prx_id: prxId,
                    pro_id: props.match.params.id,
                    login_envia: sessionStorage.getItem('usuario'),
                    area_id_envia: sessionStorage.getItem('areaUsuario'),
                    area_id_recebe: setId,
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(() => {
                    mensagem.success('Trâmite inserido com sucesso.');
                    history.push(`/home/`);
                })
                .catch(() => {
                    setErro('Erro ao inserir trâmite.');
                });
        }
    }

    useEffect(() => {
        carregaDadosProcesso(props.match.params.id);
        carregaProximoTramite(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <>
            <Container>
                <Autorizacao tela="Tramitar" />
                <Header />
                <AsideLeft>
                    <Menu />
                </AsideLeft>
                <Main>
                    <Erro>{erro}</Erro>
                    <fieldset>
                        <legend>Tramitar processo</legend>

                        <div>
                            <label>Código:</label>
                            <span>
                                <BotaoComoLink onClick={mostraDetalhesProcesso}>
                                    {proCodigo}
                                </BotaoComoLink>
                            </span>
                        </div>
                        <div>
                            <label>Espécie:</label>
                            <span>{genNome}</span>
                        </div>
                        <div>
                            <label>Tipo do processo:</label>
                            <span>{tprNome}</span>
                        </div>
                        {proAssunto ? (
                            <div>
                                <label>Assunto:</label>
                                <span>{proAssunto}</span>
                            </div>
                        ) : null}
                        {areaIniciativaProcesso ? (
                            <div>
                                <label>Área de iniciativa do processo:</label>
                                <span>{areaIniciativaProcesso}</span>
                            </div>
                        ) : null}
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>Tramitar para:</legend>
                        <select
                            id="selectProximoTramite"
                            onChange={handleComboTramite}
                            value={comboTramite}>
                            {proximosTramites}
                        </select>
                    </fieldset>
                    <button type="button" id="btnTramita" onClick={() => abreModalTramitar()}>
                        <FaUpload />
                        &nbsp;Tramitar
                    </button>
                    <ModalTramita
                        modalTramitar={modalTramitar}
                        fechaModalTramitar={fechaModalTramitar}
                        tramita={tramita}
                    />
                </Main>
            </Container>
        </>
    );
}

Tramite.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }).isRequired,
};

export default Tramite;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal, Erro, BasicSelect, ContainerCampos, ContainerBotoes } from './styles';

const ModalTramitaVarios = props => {
    const dialogs = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #303f9f',
            backgroundColor: '#292E61',
        },
    };

    const [erro, setErro] = useState('');
    const [prxId, setPrxId] = useState('');
    const [setId, setSetId] = useState('');
    const [comboTramite, setComboTramite] = useState('');
    const [proximosTramites, setProximosTramites] = useState([]);
    const { fechaModalTramitaVarios, modalTramitaVarios, tramita, dados } = props;

    useEffect(() => {
        const comboProximoTramite = [];
        comboProximoTramite.push(
            <option key="0|0" data-key="0|0" value="">
                Selecione...
            </option>
        );
        for (let i = 0; i < dados.length; i++) {
            comboProximoTramite.push(
                <option
                    key={`${dados[i].set_id}|${dados[i].prx_id}`}
                    data-key={`${dados[i].set_id}|${dados[i].prx_id}`}
                    value={`${dados[i].set_id}|${dados[i].prx_id}`}>
                    {dados[i].set_nome} - {dados[i].raz_nome}
                </option>
            );
        }
        setProximosTramites(comboProximoTramite);
    }, [dados]);

    function tramitaVariosHandler(e) {
        if (comboTramite === '') {
            setErro('Selecione uma área para tramitar.');
        }
        tramita(prxId, setId);
        fechaModalTramitaVarios(e.target.value);
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

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitaVarios(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitaVarios}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja tramitar?</h1>
                    <br />
                    <Erro>{erro}</Erro>
                    <ContainerCampos>
                        <div>Selecione a área</div>
                        <BasicSelect
                            id="selectProximoTramite"
                            onChange={handleComboTramite}
                            value={comboTramite}>
                            {proximosTramites}
                        </BasicSelect>
                    </ContainerCampos>
                    <hr />
                    <ContainerBotoes>
                        <Sim name="btnSim" clickHandler={tramitaVariosHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalTramitaVarios} />
                    </ContainerBotoes>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaVarios.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaVarios: PropTypes.func.isRequired,
    modalTramitaVarios: PropTypes.bool.isRequired,
    dados: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            prx_id: PropTypes.number,
            set_id: PropTypes.number,
            set_nome: PropTypes.string,
            raz_nome: PropTypes.string,
        })
    ),
};

ModalTramitaVarios.defaultProps = {
    dados: {
        id: null,
        prx_id: null,
        set_id: null,
        set_nome: '',
        raz_nome: '',
    },
};

export default ModalTramitaVarios;

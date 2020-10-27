/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { toast as mensagem } from 'react-toastify';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal, ContainerTitulo, ContainerBotoes } from './styles';
import * as constantes from '../../utils/constantes';

const ModalTramitaVolta = props => {
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
    const { fechaModalTramitaVolta, modalTramitaVolta, tramita, dados, tprId } = props;

    function tramitaVoltaHandler(e) {
        if (document.getElementById('cboTramita').value === '') {
            mensagem.error('Selecione a área e a razão para tramitar');
        } else {
            console.log(tprId);
            if (Number(tprId) === Number(constantes.TPR_AUXILIO_FUNERAL)) {
                console.log(Number(document.getElementById('cboTramita').value));
                tramita(
                    Number(document.getElementById('cboTramita').value),
                    constantes.AREA_DARH,
                    tprId
                );
                fechaModalTramitaVolta(e.target.value);
            }
            if (Number(tprId) === Number(constantes.TPR_DESCONTO_PENSAO_ALIMENTICIA)) {
                console.log(Number(document.getElementById('cboTramita').value));
                if (Number(document.getElementById('cboTramita').value) === 228) {
                    tramita(
                        Number(document.getElementById('cboTramita').value),
                        constantes.AREA_DARH,
                        tprId
                    );
                    fechaModalTramitaVolta(e.target.value);
                } else {
                    tramita(
                        Number(document.getElementById('cboTramita').value),
                        constantes.AREA_DCF,
                        tprId
                    );
                    fechaModalTramitaVolta(e.target.value);
                }
            }
        }
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitaVolta(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitaVolta}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <ContainerTitulo>
                        <p>
                            <FaRegQuestionCircle color="#fff" size="3em" />
                        </p>
                        <br />
                        <h1>Deseja tramitar?</h1>
                    </ContainerTitulo>
                    <br />
                    <select name="cboTramita" id="cboTramita">
                        <option key={0} value="">
                            Selecione a área e a razão de tramitação...
                        </option>
                        {dados.map(dado => (
                            <option key={dado.id} value={dado.prx_id}>
                                {dado.set_nome} - {dado.raz_nome}
                            </option>
                        ))}
                        ;
                    </select>
                    <ContainerBotoes>
                        <Sim name="btnSim" clickHandler={tramitaVoltaHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalTramitaVolta} />
                    </ContainerBotoes>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaVolta.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaVolta: PropTypes.func.isRequired,
    modalTramitaVolta: PropTypes.bool.isRequired,
    dados: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number,
            prx_id: PropTypes.number,
            set_id: PropTypes.number,
            set_nome: PropTypes.string,
            raz_nome: PropTypes.string,
        })
    ),
    tprId: PropTypes.number.isRequired,
};

ModalTramitaVolta.defaultProps = {
    dados: {
        id: null,
        prx_id: null,
        set_id: null,
        set_nome: '',
        raz_nome: '',
    },
};

export default ModalTramitaVolta;

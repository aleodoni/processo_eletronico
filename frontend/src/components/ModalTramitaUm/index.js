/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal } from './styles';

const ModalTramitaUm = props => {
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
    const { fechaModalTramitaUm, modalTramitaUm, tramita, dados } = props;

    function tramitaUmHandler(e) {
        alert(JSON.stringify(dados, null, 4));
        tramita(dados.prx_id, dados.set_id, dados.tpr_id);
        fechaModalTramitaUm(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitaUm(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitaUm}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja tramitar?</h1>
                    <br />
                    {dados.pro_nome !== undefined ? (
                        <p>
                            <label>Interessado: </label>
                            {dados.pro_nome}
                        </p>
                    ) : null}
                    <p>
                        <label>Destino: </label>
                        {dados.set_nome}
                    </p>
                    <p>
                        <label>Razão: </label>
                        {dados.raz_nome}
                    </p>
                    <hr />
                    <div>
                        <Sim name="btnSim" clickHandler={tramitaUmHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalTramitaUm} />
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaUm.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaUm: PropTypes.func.isRequired,
    modalTramitaUm: PropTypes.bool.isRequired,
};

export default ModalTramitaUm;

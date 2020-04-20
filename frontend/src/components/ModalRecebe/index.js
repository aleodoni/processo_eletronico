import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle, FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { ContainerModal } from './styles';

const ModalReceber = props => {
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
        },
    };
    const { fechaModalReceber, modalReceber, recebe, id } = props;

    function recebeHandler(e) {
        recebe(id);
        fechaModalReceber(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalReceber(e.target.value);
        }
    }

    return (
        <>
            <Modal isOpen={modalReceber} onRequestClose={fechaHandler} style={dialogs} ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#303f9f" size="3em" />
                    </p>
                    <h1>Deseja receber o processo?</h1>
                    <hr />
                    <div>
                        <button type="button" onClick={recebeHandler}>
                            <FaRegCheckCircle />
                            &nbsp;Ok
                        </button>
                        <button type="button" onClick={fechaModalReceber}>
                            <FaRegTimesCircle />
                            &nbsp;Fechar
                        </button>
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalReceber.propTypes = {
    recebe: PropTypes.func.isRequired,
    fechaModalReceber: PropTypes.func.isRequired,
    modalReceber: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
};

export default ModalReceber;

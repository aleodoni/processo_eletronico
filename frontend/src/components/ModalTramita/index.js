import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle, FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { ContainerModal } from './styles';

const ModalTramitar = props => {
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
    const { fechaModalTramitar, modalTramitar, tramita } = props;

    function tramitaHandler(e) {
        tramita();
        fechaModalTramitar(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitar(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitar}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#303f9f" size="3em" />
                    </p>
                    <h1>Deseja tramitar o processo?</h1>
                    <hr />
                    <div>
                        <button type="button" onClick={tramitaHandler}>
                            <FaRegCheckCircle />
                            &nbsp;Ok
                        </button>
                        <button type="button" onClick={fechaModalTramitar}>
                            <FaRegTimesCircle />
                            &nbsp;Fechar
                        </button>
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitar.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitar: PropTypes.func.isRequired,
    modalTramitar: PropTypes.bool.isRequired,
};

export default ModalTramitar;

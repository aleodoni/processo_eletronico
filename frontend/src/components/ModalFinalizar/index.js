import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal } from './styles';

const ModalFinalizar = props => {
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
    const { fechaModalFinaliza, modalFinaliza, finaliza, id, proCodigo } = props;

    function finalizaHandler(e) {
        finaliza(id);
        fechaModalFinaliza(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalFinaliza(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalFinaliza}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja finalizar o processo {proCodigo}?</h1>
                    <hr />
                    <div>
                        <Sim name="btnSim" clickHandler={finalizaHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalFinaliza} />
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalFinalizar.propTypes = {
    finaliza: PropTypes.func.isRequired,
    fechaModalFinaliza: PropTypes.func.isRequired,
    modalFinaliza: PropTypes.bool.isRequired,
    id: PropTypes.number,
    proCodigo: PropTypes.string,
};

ModalFinalizar.defaultProps = {
    id: null,
    proCodigo: null,
};

export default ModalFinalizar;

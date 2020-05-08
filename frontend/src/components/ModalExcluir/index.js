import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal } from './styles';

const ModalExcluir = props => {
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
    const { fechaModalExcluir, modalExcluir, apaga, id } = props;

    function apagaHandler(e) {
        apaga(id);
        fechaModalExcluir(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalExcluir(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalExcluir}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja apagar o registro?</h1>
                    <hr />
                    <div>
                        <Sim name="btnSim" clickHandler={apagaHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalExcluir} />
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalExcluir.propTypes = {
    apaga: PropTypes.func.isRequired,
    fechaModalExcluir: PropTypes.func.isRequired,
    modalExcluir: PropTypes.bool.isRequired,
    id: PropTypes.number,
};

ModalExcluir.defaultProps = {
    id: null,
};

export default ModalExcluir;

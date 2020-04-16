import React from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { Graphviz } from 'graphviz-react';
import { ContainerModal, Centralizado } from './styles';

const ModalFluxo = props => {
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
    const { fechaModalFluxo, modalFluxo, id } = props;

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalFluxo(e.target.value);
        }
    }

    return (
        <>
            <Modal isOpen={modalFluxo} onRequestClose={fechaHandler} style={dialogs} ariaHideApp={false}>
                <ContainerModal>
                    <div>
                        <Centralizado>
                            <Graphviz dot={id} />
                            <hr />
                            <button type="button" onClick={fechaModalFluxo}>
                                <FaRegTimesCircle />
                                &nbsp;Fechar
                            </button>
                        </Centralizado>
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalFluxo.propTypes = {
    fechaModalFluxo: PropTypes.func.isRequired,
    modalFluxo: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
};

export default ModalFluxo;

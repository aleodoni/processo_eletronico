import React from 'react';
import PropTypes from 'prop-types';
import { FaExclamationCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { lighten } from 'polished';
import Ok from '../layout/button/Ok';
import { ContainerModal, ContainerErros, ContainerBotao } from './styles';

const ModalErros = (props) => {
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
            border: '1px solid #00796b',
            backgroundColor: lighten(0.0, '#00796b'),
        },
    };
    const { fechaModalErros, modalErros, mensagem } = props;

    function fechaHandler(e) {
        fechaModalErros(e.target.value);
    }

    return (
        <>
            <Modal
                isOpen={modalErros}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaExclamationCircle color="#fff" size="3em" />
                    </p>
                    <h1>As seguintes informações são obrigatórias:</h1>
                    <hr />
                    <ContainerErros>
                        <ul>
                            {mensagem.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </ContainerErros>
                    <hr />
                </ContainerModal>
                <ContainerBotao>
                    <Ok name="btnOk" clickHandler={fechaHandler} />
                </ContainerBotao>
            </Modal>
        </>
    );
};

ModalErros.propTypes = {
    fechaModalErros: PropTypes.func.isRequired,
    mensagem: PropTypes.string.isRequired,
    modalErros: PropTypes.bool.isRequired,
};

export default ModalErros;

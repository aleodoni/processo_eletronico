import React from 'react';
import PropTypes from 'prop-types';
import { FaRegCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { lighten } from 'polished';
import Ok from '../layout/button/Ok';
import { ContainerModal } from './styles';

const ModalAlteracaoSenha = (props) => {
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
            backgroundColor: lighten(0.1, '#00796b'),
        },
    };
    const { fechaModalAlteracaoSenha, modalAlteracaoSenha, desloga } = props;

    function apagaHandler(e) {
        desloga();
        fechaModalAlteracaoSenha(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalAlteracaoSenha(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalAlteracaoSenha}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegCheckCircle color="#fff" size="3em" />
                    </p>
                    <h1>Senha alterada com sucesso. Acesse o sistema novamente.</h1>
                    <hr />
                    <div>
                        <span>
                            <Ok name="btnOk" clickHandler={apagaHandler} />
                        </span>
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalAlteracaoSenha.propTypes = {
    desloga: PropTypes.func.isRequired,
    fechaModalAlteracaoSenha: PropTypes.func.isRequired,
    modalAlteracaoSenha: PropTypes.bool.isRequired,
};

export default ModalAlteracaoSenha;

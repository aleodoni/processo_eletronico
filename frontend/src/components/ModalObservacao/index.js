import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
// eslint-disable-next-line import/no-cycle

import { ContainerModal, ContainerBotaoFecha, ContainerDados } from './styles';

const ModalObservacao = props => {
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
            backgroundColor: '#303f9f',
            padding: '5px',
            overflow: 'scroll',
        },
    };
    const { fechaModalObservacao, modalObservacao, observacao } = props;

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalObservacao(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalObservacao}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <ContainerDados>
                        <div>
                            <label>Área / setor que enviou:</label>
                            <span>{observacao.set_nome}</span>
                        </div>
                        <div>
                            <label>Enviado por </label>
                            <span>{observacao.login_envia}</span>
                            <label> em </label>
                            <span>{observacao.data_hora}</span>
                        </div>
                        <fieldset>
                            <legend>Observação</legend>
                            <span>{observacao.tra_observacao}</span>
                        </fieldset>
                    </ContainerDados>
                    <ContainerBotaoFecha type="button" onClick={fechaModalObservacao}>
                        <FaRegTimesCircle />
                        &nbsp;Fechar
                    </ContainerBotaoFecha>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalObservacao.propTypes = {
    fechaModalObservacao: PropTypes.func.isRequired,
    modalObservacao: PropTypes.bool.isRequired,
    observacao: PropTypes.arrayOf(
        PropTypes.shape({
            pro_codigo: PropTypes.string,
            pro_id: PropTypes.number,
        })
    ).isRequired,
};

export default memo(ModalObservacao);

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import Modal from 'react-modal';
import ImagemFluxoLicitacao from '../../assets/FluxoLicitacao.png';
import { ContainerModal } from './styles';

const ModalFluxoLicitacao = props => {
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
            overflow: 'scroll',
        },
    };
    const { fechaModalFluxoLicitacao, modalFluxoLicitacao } = props;
    const [largura, setLargura] = useState(1802);
    const [altura, setAltura] = useState(3210);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalFluxoLicitacao(e.target.value);
        }
    }

    function zoomMais() {
        setLargura(largura + 80);
        setAltura(altura + 80);
    }

    function zoomMenos() {
        setLargura(largura - 80);
        setAltura(altura - 80);
    }

    return (
        <>
            <Modal
                isOpen={modalFluxoLicitacao}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <button type="button" onClick={zoomMais}>
                    <FaSearchPlus />
                    &nbsp;Aumentar
                </button>
                <button type="button" onClick={zoomMenos}>
                    <FaSearchMinus />
                    &nbsp;Diminuir
                </button>
                <button type="button" onClick={fechaModalFluxoLicitacao}>
                    <FaRegTimesCircle />
                    &nbsp;Fechar
                </button>
                <ContainerModal>
                    <img
                        src={ImagemFluxoLicitacao}
                        alt="Fluxo de licitação"
                        width={largura}
                        height={altura}
                    />
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalFluxoLicitacao.propTypes = {
    fechaModalFluxoLicitacao: PropTypes.func.isRequired,
    modalFluxoLicitacao: PropTypes.bool.isRequired,
};

export default memo(ModalFluxoLicitacao);

import React from 'react';
import PropTypes from 'prop-types';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import { ContainerModal } from './styles';

const ModalCiencia = props => {
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
    const {
        fechaModalCiencia,
        modalCiencia,
        cienciaTramita,
        id,
        proCodigo,
        decisao,
        tprId,
    } = props;

    function cienciaHandler(e) {
        cienciaTramita(id, tprId);
        fechaModalCiencia(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalCiencia(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalCiencia}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>
                        A decisão foi: <label>{decisao}</label>
                    </h1>
                    <h1>Ciente do processo {proCodigo}?</h1>
                    <hr />
                    <div>
                        <Sim name="btnSim" clickHandler={cienciaHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalCiencia} />
                    </div>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalCiencia.propTypes = {
    cienciaTramita: PropTypes.func.isRequired,
    fechaModalCiencia: PropTypes.func.isRequired,
    modalCiencia: PropTypes.bool.isRequired,
    id: PropTypes.number,
    tprId: PropTypes.string,
    proCodigo: PropTypes.string,
    decisao: PropTypes.string,
};

ModalCiencia.defaultProps = {
    id: null,
    tprId: null,
    proCodigo: null,
    decisao: null,
};

export default ModalCiencia;

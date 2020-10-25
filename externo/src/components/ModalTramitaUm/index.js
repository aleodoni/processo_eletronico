import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { toast as mensagem } from 'react-toastify';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import * as constantes from '../../utils/constantes';
import { ContainerModal, ContainerTitulo, ContainerBotoes } from './styles';

const ModalTramitaUm = (props) => {
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
            border: '1px solid #2E8B57',
            backgroundColor: lighten(0.1, '#2E8B57'),
        },
    };
    const { fechaModalTramitaUm, modalTramitaUm, tramita, dados, tprId } = props;

    function tramitaUmHandler(e) {
        if (document.getElementById('cboTramita').value === '') {
            mensagem.error('Selecione a área e a razão para tramitar');
        } else {
            if (Number(tprId) === Number(constantes.TPR_APOSENTADORIA)) {
                if (Number(document.getElementById('cboTramita').value) === 202) {
                    tramita(202, constantes.AREA_DARH);
                    fechaModalTramitaUm(e.target.value);
                }
                if (Number(document.getElementById('cboTramita').value) === 106) {
                    tramita(106, constantes.AREA_PROJURIS);
                    fechaModalTramitaUm(e.target.value);
                }
            }
            if (Number(tprId) === Number(constantes.TPR_APOSENTADORIA_INICIATIVA_ADM)) {
                if (Number(document.getElementById('cboTramita').value) === 207) {
                    tramita(207, constantes.AREA_DARH);
                    fechaModalTramitaUm(e.target.value);
                }
                if (Number(document.getElementById('cboTramita').value) === 136) {
                    tramita(136, constantes.AREA_PROJURIS);
                    fechaModalTramitaUm(e.target.value);
                }
            }
        }
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitaUm(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitaUm}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <ContainerTitulo>
                        <p>
                            <FaRegQuestionCircle color="#fff" size="3em" />
                        </p>
                        <br />
                        <h1>Deseja tramitar?</h1>
                    </ContainerTitulo>
                    <br />
                    <select name="cboTramita" id="cboTramita">
                        <option key={0} value="">
                            Selecione a área e a razão de tramitação...
                        </option>
                        {dados.map((dado) => (
                            <option key={dado.id} value={dado.prx_id}>
                                {dado.set_nome} - {dado.raz_nome}
                            </option>
                        ))}
                        ;
                    </select>
                    <br />
                    <hr />
                    <ContainerBotoes>
                        <Sim name="btnSim" clickHandler={tramitaUmHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalTramitaUm} />
                    </ContainerBotoes>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaUm.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaUm: PropTypes.func.isRequired,
    modalTramitaUm: PropTypes.bool.isRequired,
    dados: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number,
            prx_id: PropTypes.number,
            set_id: PropTypes.number,
            set_nome: PropTypes.string,
            raz_nome: PropTypes.string,
        })
    ),
    tprId: PropTypes.number.isRequired,
};

ModalTramitaUm.defaultProps = {
    dados: {
        id: null,
        prx_id: null,
        set_id: null,
        set_nome: '',
        raz_nome: '',
    },
};

export default ModalTramitaUm;

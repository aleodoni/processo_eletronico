import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
// eslint-disable-next-line import/no-cycle

import {
    ContainerCodigoProcesso,
    ContainerModal,
    ContainerBotaoFecha,
    ContainerDados,
    ContainerDadosNotaFiscalEmpenho,
} from './styles';

const ModalProcessoPagamento = props => {
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
    const { fechaModalProcesso, modalProcesso, processo } = props;

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcesso(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalProcesso}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <ContainerCodigoProcesso>
                        Processo: {processo.pro_codigo}
                    </ContainerCodigoProcesso>
                    <ContainerDados>
                        <label>Fornecedor:</label>
                        <span>{processo.pro_nome}</span>
                        <label>Autuação:</label>
                        <span>{processo.pro_autuacao}</span>
                    </ContainerDados>
                    <ContainerDadosNotaFiscalEmpenho>
                        <label>Notas fiscais:</label>
                        <>
                            {processo.notas_fiscais ? (
                                <ul>
                                    {processo.notas_fiscais.map(notaFiscal => (
                                        <li key={notaFiscal.pnf_nota_fiscal}>
                                            {notaFiscal.pnf_nota_fiscal}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </>
                    </ContainerDadosNotaFiscalEmpenho>
                    <ContainerDadosNotaFiscalEmpenho>
                        <label>Empenhos:</label>
                        <>
                            {processo.empenhos ? (
                                <ul>
                                    {processo.empenhos.map(empenho => (
                                        <li key={empenho.pen_empenho}>{empenho.pen_empenho}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </>
                    </ContainerDadosNotaFiscalEmpenho>

                    <ContainerBotaoFecha type="button" onClick={fechaModalProcesso}>
                        <FaRegTimesCircle />
                        &nbsp;Fechar
                    </ContainerBotaoFecha>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalProcessoPagamento.propTypes = {
    fechaModalProcesso: PropTypes.func.isRequired,
    modalProcesso: PropTypes.bool.isRequired,
    processo: PropTypes.arrayOf(
        PropTypes.shape({
            pro_codigo: PropTypes.string,
            pro_id: PropTypes.number,
        })
    ).isRequired,
};

export default memo(ModalProcessoPagamento);

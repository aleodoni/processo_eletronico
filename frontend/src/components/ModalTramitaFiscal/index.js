import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import TextArea from '../layout/TextArea';
import { ContainerModal, Erro, BasicSelect, ContainerCampos, ContainerBotoes } from './styles';

const ModalTramitaFiscal = props => {
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

    const formRef = useRef(null);
    const [erro, setErro] = useState('');
    const [prxId, setPrxId] = useState('');
    const [setId, setSetId] = useState('');
    const [comboTramite, setComboTramite] = useState('');
    const [proximosTramites, setProximosTramites] = useState([]);
    const { fechaModalTramitaFiscal, modalTramitaFiscal, tramita, dados, razao } = props;

    useEffect(() => {
        const comboProximoTramite = [];
        comboProximoTramite.push(
            <option key="0|0" data-key="0|0" value="">
                Selecione...
            </option>
        );
        for (let i = 0; i < dados.length; i++) {
            comboProximoTramite.push(
                <option
                    key={`${dados[i].set_id}|${dados[i].prx_id}`}
                    data-key={`${dados[i].set_id}|${dados[i].prx_id}`}
                    value={`${dados[i].set_id}|${dados[i].prx_id}`}>
                    {dados[i].set_nome}
                </option>
            );
        }
        setProximosTramites(comboProximoTramite);
    }, [dados]);

    function tramitaFiscalHandler(e) {
        if (comboTramite === '') {
            setErro('Selecione uma área para tramitar.');
            return;
        }
        const p = formRef.current.getData();

        tramita(prxId, setId, p.obs);
        fechaModalTramitaFiscal(e.target.value);
    }

    function handleComboTramite(e) {
        setErro('');
        const valor = e.target.value;
        const n = valor.indexOf('|');
        const setor = valor.substring(0, n);
        const proximo = valor.substring(n + 1);
        setPrxId(proximo);
        setSetId(setor);
        setComboTramite(e.target.value);
    }



    return (
        <>
            <Modal isOpen={modalTramitaFiscal} style={dialogs} ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja tramitar para o fiscal?</h1>
                    <br />
                    <Erro>{erro}</Erro>
                    <ContainerCampos>
                        <div>Selecione a área</div>
                        <BasicSelect
                            id="selectProximoTramite"
                            onChange={handleComboTramite}
                            value={comboTramite}>
                            {proximosTramites}
                        </BasicSelect>
                        <label>Razão de trâmite: {razao}</label>
                        <Form ref={formRef} onSubmit={null}>
                            <TextArea name="obs" label="Observação" type="text" rows={3} />
                        </Form>
                    </ContainerCampos>
                    <hr />
                    <ContainerBotoes>
                        <Sim name="btnSim" clickHandler={tramitaFiscalHandler} />
                        <Nao name="btnNao" clickHandler={fechaModalTramitaFiscal} />
                    </ContainerBotoes>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaFiscal.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaFiscal: PropTypes.func.isRequired,
    modalTramitaFiscal: PropTypes.bool.isRequired,
    dados: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            prx_id: PropTypes.number,
            set_id: PropTypes.number,
            set_nome: PropTypes.string,
            raz_nome: PropTypes.string,
        })
    ),
    razao: PropTypes.string,
};

ModalTramitaFiscal.defaultProps = {
    dados: {
        id: null,
        prx_id: null,
        set_id: null,
        set_nome: '',
        raz_nome: '',
    },
    razao: null,
};

export default ModalTramitaFiscal;

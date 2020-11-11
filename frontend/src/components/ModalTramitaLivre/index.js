import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { FaRegQuestionCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import Sim from '../layout/button/Sim';
import Nao from '../layout/button/Nao';
import TextArea from '../layout/TextArea';
import * as constantes from '../../utils/constantes';
import {
    ContainerModal,
    Erro,
    BasicSelect,
    ContainerAreaRazao,
    ContainerCampos,
    ContainerBotoes,
} from './styles';

const ModalTramitaLivre = props => {
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
    const [setNome, setSetNome] = useState('');
    const [razao, setRazao] = useState('');
    const [comboTramite, setComboTramite] = useState('');
    const [comboRazao, setComboRazao] = useState('');
    const [proximosTramites, setProximosTramites] = useState([]);
    const [comboRazoes, setComboRazoes] = useState([]);
    const { fechaModalTramitaLivre, modalTramitaLivre, tramita, dados, razoes } = props;

    useEffect(() => {
        const comboProximoTramite = [];

        if (dados.length === 0) {
            setSetNome('Diretoria de Licitações');
            setRazao('Sugestão de modalidade de contratação');
        } else {
            comboProximoTramite.push(
                <option key="0|0" data-key="0|0" value="">
                    Selecione...
                </option>
            );
            comboRazoes.push(
                <option key="0|0" data-key="0|0" value="">
                    Selecione...
                </option>
            );
            for (let i = 0; i < dados.length; i++) {
                comboProximoTramite.push(
                    <option
                        key={`${dados[i].set_id}`}
                        data-key={`${dados[i].set_id}`}
                        value={`${dados[i].set_id}`}>
                        {dados[i].set_nome}
                    </option>
                );
            }
            for (let i = 0; i < razoes.length; i++) {
                comboRazoes.push(
                    <option
                        key={`${razoes[i].raz_id}`}
                        data-key={`${razoes[i].raz_id}`}
                        value={`${razoes[i].raz_id}`}>
                        {razoes[i].raz_nome}
                    </option>
                );
            }
        }
        setProximosTramites(comboProximoTramite);
        setComboRazoes(comboRazoes);
        setComboRazao(constantes.RAZ_ENCAMINHAMENTO);
    }, [comboRazoes, dados, razoes]);

    function tramitaLivreHandler(e) {
        if (comboTramite === '') {
            setErro('Selecione uma área para tramitar.');
        } else if (comboRazao === '') {
            setErro('Selecione uma razão para tramitar.');
        } else {
            const observacao = formRef.current.getFieldValue('obs');
            tramita(null, comboTramite, comboRazao, observacao, null);
            fechaModalTramitaLivre(e.target.value);
        }
    }

    function tramitaLivreLicitacaoHandler(e) {
        const observacao = formRef.current.getFieldValue('obs');
        tramita(
            null,
            constantes.AREA_DLICIT,
            constantes.RAZ_SUGESTAO_MODALIDADE_CONTRATACAO,
            observacao,
            null
        );
        fechaModalTramitaLivre(e.target.value);
    }

    function handleComboTramite(e) {
        setErro('');
        setComboTramite(e.target.value);
    }

    function handleComboRazao(e) {
        setErro('');
        setComboRazao(e.target.value);
    }

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalTramitaLivre(e.target.value);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalTramitaLivre}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <p>
                        <FaRegQuestionCircle color="#fff" size="3em" />
                    </p>
                    <h1>Deseja tramitar?</h1>
                    <br />
                    <Erro>{erro}</Erro>
                    {dados.length > 1 ? (
                        <>
                            <ContainerCampos>
                                <div>Selecione a área*</div>
                                <BasicSelect
                                    id="selectProximoTramite"
                                    onChange={handleComboTramite}
                                    value={comboTramite}>
                                    {proximosTramites}
                                </BasicSelect>
                                <div>Selecione a razão do trâmite*</div>
                                <BasicSelect
                                    id="selectRazaoTramite"
                                    onChange={handleComboRazao}
                                    value={comboRazao}>
                                    {comboRazoes}
                                </BasicSelect>
                                <Form ref={formRef} onSubmit={null}>
                                    <TextArea
                                        name="obs"
                                        label="Observação"
                                        type="text"
                                        rows={3}
                                        cols={120}
                                    />
                                </Form>
                            </ContainerCampos>
                            <hr />
                            <ContainerBotoes>
                                <Sim name="btnSim" clickHandler={tramitaLivreHandler} />
                                <Nao name="btnNao" clickHandler={fechaModalTramitaLivre} />
                            </ContainerBotoes>
                        </>
                    ) : (
                        <>
                            <ContainerCampos>
                                <Form ref={formRef} onSubmit={null}>
                                    <ContainerAreaRazao>Área: {setNome}</ContainerAreaRazao>
                                    <ContainerAreaRazao>Razão: {razao}</ContainerAreaRazao>
                                    <TextArea
                                        name="obs"
                                        label="Observação"
                                        type="text"
                                        rows={3}
                                        cols={120}
                                    />
                                </Form>
                            </ContainerCampos>
                            <hr />
                            <ContainerBotoes>
                                <Sim name="btnSim" clickHandler={tramitaLivreLicitacaoHandler} />
                                <Nao name="btnNao" clickHandler={fechaModalTramitaLivre} />
                            </ContainerBotoes>
                        </>
                    )}
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalTramitaLivre.propTypes = {
    tramita: PropTypes.func.isRequired,
    fechaModalTramitaLivre: PropTypes.func.isRequired,
    modalTramitaLivre: PropTypes.bool.isRequired,
    dados: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            prx_id: PropTypes.number,
            set_id: PropTypes.number,
            set_nome: PropTypes.string,
            raz_nome: PropTypes.string,
        })
    ),
    razoes: PropTypes.arrayOf(
        PropTypes.shape({
            raz_id: PropTypes.number,
            raz_nome: PropTypes.string,
        })
    ),
};

ModalTramitaLivre.defaultProps = {
    dados: {
        id: null,
        prx_id: null,
        set_id: null,
        set_nome: '',
        raz_nome: '',
    },
    razoes: {
        raz_id: null,
        raz_nome: '',
    },
};

export default ModalTramitaLivre;

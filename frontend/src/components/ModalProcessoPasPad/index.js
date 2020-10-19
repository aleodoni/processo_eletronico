import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import TabelaManifestacoes from '../TabelaManifestacoes';
import TabelaTramitacao from '../TabelaTramitacao';
// eslint-disable-next-line import/no-cycle
import axios from '../../configs/axiosConfig';

import {
    ContainerCodigoProcesso,
    ContainerModal,
    ContainerBotaoFecha,
    ContainerIniciativa,
    ContainerDados,
    ContainerComponente,
    ContainerProcessoOrigem,
    ContainerMembroComissao,
} from './styles';

const ModalProcessoPasPad = props => {
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
    const { fechaModalProcessoPasPad, modalProcessoPasPad, processoPasPad } = props;
    const [processosOrigem, setProcessosOrigem] = useState([]);
    const [comissaoProcessante, setComissaoProcessante] = useState([]);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcessoPasPad(e.target.value);
        }
    }

    const carregaProcessoOrigem = useCallback(() => {
        if (processoPasPad.pro_id !== undefined) {
            axios({
                method: 'GET',
                url: `/processo-origem/${processoPasPad.pro_id}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    const processoOrigem = [];
                    for (let i = 0; i < res.data.length; i++) {
                        processoOrigem.push({
                            pro_id_origem: res.data[i].pro_id_origem,
                            processo_origem: res.data[i].processo_origem,
                            tpr_nome: res.data[i].tpr_nome,
                        });
                    }
                    setProcessosOrigem(processoOrigem);
                })
                .catch(() => {
                    console.log('Erro ao carregar processo de origem.');
                });
        }
    }, [processoPasPad.pro_id]);

    const carregaMembrosComissao = useCallback(() => {
        if (processoPasPad.pro_id !== undefined) {
            axios({
                method: 'GET',
                url: `/popup-membros-comissao/${processoPasPad.pro_id}`,
                headers: {
                    authorization: sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    const membrosComissao = [];
                    for (let i = 0; i < res.data.length; i++) {
                        membrosComissao.push({
                            matricula: res.data[i].matricula,
                            cargo: res.data[i].cargo,
                            nome: res.data[i].nome,
                            login: res.data[i].login,
                            area: res.data[i].area,
                        });
                    }
                    setComissaoProcessante(membrosComissao);
                })
                .catch(() => {
                    console.log('Erro ao carregar processo de origem.');
                });
        }
    }, [processoPasPad.pro_id]);

    useEffect(() => {
        carregaProcessoOrigem();
        carregaMembrosComissao();
    }, [carregaProcessoOrigem, carregaMembrosComissao]);

    return (
        <>
            <Modal
                isOpen={modalProcessoPasPad}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <span key={processoPasPad.pro_id}>
                    <ContainerCodigoProcesso>
                        <p>{`Processo: ${processoPasPad.pro_codigo}`}</p>
                    </ContainerCodigoProcesso>

                    <ContainerModal>
                        {processosOrigem.length > 0 ? (
                            <>
                                <p>Processo de origem</p>
                                <ContainerProcessoOrigem>
                                    {processosOrigem.map(linha => (
                                        <label key={linha.pro_id}>
                                            {linha.processo_origem} - {linha.tpr_nome}
                                        </label>
                                    ))}
                                </ContainerProcessoOrigem>
                            </>
                        ) : null}
                        {comissaoProcessante.length > 0 ? (
                            <>
                                <p>Membros da Comissão</p>
                                <ContainerMembroComissao>
                                    {comissaoProcessante.map(linha => (
                                        <div>
                                            {linha.matricula} - {linha.nome} - {linha.login} -{' '}
                                            {linha.area} - {linha.cargo}
                                        </div>
                                    ))}
                                </ContainerMembroComissao>
                            </>
                        ) : null}
                        <p>Iniciativa</p>
                        <ContainerIniciativa>
                            <label>
                                {processoPasPad.pro_iniciativa} -{' '}
                                {processoPasPad.pro_tipo_iniciativa}
                            </label>
                        </ContainerIniciativa>
                        <p>Dados do processo</p>
                        <ContainerDados>
                            {processoPasPad.gen_nome ? (
                                <>
                                    <label>Espécie:</label>
                                    <span>{processoPasPad.gen_nome}</span>
                                </>
                            ) : null}
                            {processoPasPad.tpr_nome ? (
                                <>
                                    <label>Tipo do processo:</label>
                                    <span>{processoPasPad.tpr_nome}</span>
                                </>
                            ) : null}
                            {processoPasPad.visualizacao ? (
                                <>
                                    <label>Visualização:</label>
                                    <span>{processoPasPad.visualizacao}</span>
                                </>
                            ) : null}
                            {processoPasPad.pro_assunto ? (
                                <>
                                    <label>Assunto:</label>
                                    <span>{processoPasPad.pro_assunto}</span>
                                </>
                            ) : null}
                            {processoPasPad.pro_autuacao ? (
                                <>
                                    <label>Autuação:</label>
                                    <span>{processoPasPad.pro_autuacao}</span>
                                </>
                            ) : null}
                            {processoPasPad.usu_autuador ? (
                                <>
                                    <label>Usuário autuador:</label>
                                    <span>{processoPasPad.usu_autuador}</span>
                                </>
                            ) : null}
                            {processoPasPad.flu_nome ? (
                                <>
                                    <label>Fluxo:</label>
                                    <span>{processoPasPad.flu_nome}</span>
                                </>
                            ) : null}
                            {processoPasPad.area_atual_processo ? (
                                <>
                                    <label>Área atual do processo:</label>
                                    <span>{processoPasPad.area_atual_processo}</span>
                                </>
                            ) : null}
                            {processoPasPad.area_iniciativa_processo ? (
                                <>
                                    <label>Área de iniciativa do processo:</label>
                                    <span>{processoPasPad.area_iniciativa_processo}</span>
                                </>
                            ) : null}
                            {processoPasPad.usu_finalizador ? (
                                <>
                                    <label>Usuário finalizador:</label>
                                    <span>
                                        {processoPasPad.usu_finalizador} -{' '}
                                        {processoPasPad.setor_finalizador_processo}
                                    </span>
                                </>
                            ) : null}
                        </ContainerDados>
                        <ContainerComponente>
                            <p>Manifestações</p>
                            <TabelaManifestacoes proId={processoPasPad.pro_id} />
                        </ContainerComponente>
                        <ContainerComponente>
                            <p>Trâmites</p>
                            <TabelaTramitacao proId={processoPasPad.pro_id} />
                        </ContainerComponente>
                        <ContainerBotaoFecha type="button" onClick={fechaModalProcessoPasPad}>
                            <FaRegTimesCircle />
                            &nbsp;Fechar
                        </ContainerBotaoFecha>
                    </ContainerModal>
                </span>
            </Modal>
        </>
    );
};

ModalProcessoPasPad.propTypes = {
    fechaModalProcessoPasPad: PropTypes.func.isRequired,
    modalProcessoPasPad: PropTypes.bool.isRequired,
    processoPasPad: PropTypes.arrayOf(
        PropTypes.shape({
            pro_codigo: PropTypes.string,
            pro_id: PropTypes.number,
        })
    ).isRequired,
};

export default memo(ModalProcessoPasPad);

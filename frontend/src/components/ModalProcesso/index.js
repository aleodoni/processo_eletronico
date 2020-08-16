import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import TabelaManifestacoes from '../TabelaManifestacoes';
import TabelaTramitacao from '../TabelaTramitacao';
import axios from '../../configs/axiosConfig';
// eslint-disable-next-line import/no-cycle

import {
    ContainerCodigoProcesso,
    ContainerModal,
    ContainerBotaoFecha,
    ContainerIniciativa,
    ContainerDados,
    ContainerComponente,
    ContainerProcessoOrigem,
} from './styles';

const ModalProcesso = props => {
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
    const [processosOrigem, setProcessosOrigem] = useState([]);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcesso(e.target.value);
        }
    }

    const carregaProcessoOrigem = useCallback(() => {
        if (processo.pro_id !== undefined) {
            axios({
                method: 'GET',
                url: `/processo-origem/${processo.pro_id}`,
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
    }, [processo.pro_id]);

    useEffect(() => {
        carregaProcessoOrigem();
    }, [carregaProcessoOrigem, processo.pro_id]);

    return (
        <>
            <Modal
                isOpen={modalProcesso}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                <ContainerModal>
                    <ContainerCodigoProcesso>
                        <p>{`Processo: ${processo.pro_codigo}`}</p>
                    </ContainerCodigoProcesso>
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
                    <p>Iniciativa</p>
                    <ContainerIniciativa>
                        <label>
                            {processo.pro_iniciativa} - {processo.pro_tipo_iniciativa}
                        </label>
                    </ContainerIniciativa>

                    {processo.pro_nome ? (
                        <>
                            <p>Dados da Iniciativa</p>
                            <ContainerDados>
                                {processo.pro_matricula ? (
                                    <>
                                        <label>Matrícula:</label>
                                        <span>{processo.pro_matricula}</span>
                                    </>
                                ) : null}
                                <label>Nome:</label>
                                <span>{processo.pro_nome}</span>
                                {processo.pro_cpf ? (
                                    <>
                                        <label>Cpf:</label>
                                        <span>{processo.pro_cpf}</span>
                                    </>
                                ) : null}
                                {processo.pro_cnpj ? (
                                    <>
                                        <label>Cnpj:</label>
                                        <span>{processo.pro_cnpj}</span>
                                    </>
                                ) : null}
                                {processo.pro_fone ? (
                                    <>
                                        <label>Fone:</label>
                                        <span>{processo.pro_fone}</span>
                                    </>
                                ) : null}
                                {processo.pro_celular ? (
                                    <>
                                        <label>Celular:</label>
                                        <span>{processo.pro_celular}</span>
                                    </>
                                ) : null}
                                {processo.pro_email ? (
                                    <>
                                        <label>Email:</label>
                                        <span>{processo.pro_email}</span>
                                    </>
                                ) : null}
                                {processo.pro_contato_pj ? (
                                    <>
                                        <label>Contato PJ:</label>
                                        <span>{processo.pro_contato_pj}</span>
                                    </>
                                ) : null}
                            </ContainerDados>
                        </>
                    ) : null}
                    <p>Dados do processo</p>
                    <ContainerDados>
                        {processo.gen_nome ? (
                            <>
                                <label>Espécie:</label>
                                <span>{processo.gen_nome}</span>
                            </>
                        ) : null}
                        {processo.tpr_nome ? (
                            <>
                                <label>Tipo do processo:</label>
                                <span>{processo.tpr_nome}</span>
                            </>
                        ) : null}
                        {processo.visualizacao ? (
                            <>
                                <label>Visualização:</label>
                                <span>{processo.visualizacao}</span>
                            </>
                        ) : null}
                        {processo.pro_assunto ? (
                            <>
                                <label>Assunto:</label>
                                <span>{processo.pro_assunto}</span>
                            </>
                        ) : null}
                        {processo.pro_autuacao ? (
                            <>
                                <label>Autuação:</label>
                                <span>{processo.pro_autuacao}</span>
                            </>
                        ) : null}
                        {processo.usu_autuador ? (
                            <>
                                <label>Usuário autuador:</label>
                                <span>
                                    {processo.usu_autuador} - {processo.setor_autuador_processo}
                                </span>
                            </>
                        ) : null}
                        {processo.flu_nome ? (
                            <>
                                <label>Fluxo:</label>
                                <span>{processo.flu_nome}</span>
                            </>
                        ) : null}
                        {processo.area_atual_processo ? (
                            <>
                                <label>Área atual do processo:</label>
                                <span>{processo.area_atual_processo}</span>
                            </>
                        ) : null}
                        {processo.area_iniciativa_processo ? (
                            <>
                                <label>Área de iniciativa do processo:</label>
                                <span>{processo.area_iniciativa_processo}</span>
                            </>
                        ) : null}
                        {processo.pro_ultimo_tramite ? (
                            <>
                                <label>Último trâmite:</label>
                                <span>{processo.pro_ultimo_tramite}</span>
                            </>
                        ) : null}
                        {processo.pro_encerramento ? (
                            <>
                                <label>Encerramento:</label>
                                <span>{processo.pro_encerramento}</span>
                            </>
                        ) : null}
                        {processo.usu_finalizador ? (
                            <>
                                <label>Usuário finalizador:</label>
                                <span>
                                    {processo.usu_finalizador} -{' '}
                                    {processo.setor_finalizador_processo}
                                </span>
                            </>
                        ) : null}
                        {processo.tpr_id === 17 ? (
                            <>
                                <label>Comunicado eletrônico prévio:</label>
                                <span>{processo.com_abono}</span>
                                {processo.com_abono === 'Sim' ? (
                                    <>
                                        <label>Núm. comunicado:</label>
                                        <span>{processo.num_abono}</span>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </ContainerDados>
                    <ContainerComponente>
                        <p>Manifestações</p>
                        <TabelaManifestacoes proId={processo.pro_id} />
                    </ContainerComponente>
                    <ContainerComponente>
                        <p>Trâmites</p>
                        <TabelaTramitacao proId={processo.pro_id} />
                    </ContainerComponente>
                    <ContainerBotaoFecha type="button" onClick={fechaModalProcesso}>
                        <FaRegTimesCircle />
                        &nbsp;Fechar
                    </ContainerBotaoFecha>
                </ContainerModal>
            </Modal>
        </>
    );
};

ModalProcesso.propTypes = {
    fechaModalProcesso: PropTypes.func.isRequired,
    modalProcesso: PropTypes.bool.isRequired,
    processo: PropTypes.arrayOf(
        PropTypes.shape({
            pro_codigo: PropTypes.string,
            pro_id: PropTypes.number,
        })
    ).isRequired,
};

export default memo(ModalProcesso);

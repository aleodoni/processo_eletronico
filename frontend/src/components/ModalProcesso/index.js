import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from '../../configs/axiosConfig';
import TabelaManifestacoes from '../TabelaManifestacoes';
import TabelaTramitacao from '../TabelaTramitacao';
// eslint-disable-next-line import/no-cycle
import TabelaProcessoOrigem from '../TabelaProcessoOrigem';

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
    const { fechaModalProcesso, modalProcesso, proId } = props;
    const [processos, setProcessos] = useState([]);

    function fechaHandler(e) {
        if (typeof onClick === 'function') {
            fechaModalProcesso(e.target.value);
        }
    }

    const carregaDadosProcesso = useCallback(() => {
        axios({
            method: 'GET',
            url: `/ver-processo/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                setProcessos(res.data);
            })
            .catch(() => {
                console.log('Erro ao carregar trâmites.');
            });
    }, [proId]);

    useEffect(() => {
        async function carrega() {
            await carregaDadosProcesso();
        }
        carrega();
    }, [carregaDadosProcesso]);

    return (
        <>
            <Modal
                isOpen={modalProcesso}
                onRequestClose={fechaHandler}
                style={dialogs}
                ariaHideApp={false}>
                {processos.map(pro => (
                    <span key={pro.pro_id}>
                        <ContainerCodigoProcesso>
                            <p>{`Processo: ${pro.pro_codigo}`}</p>
                        </ContainerCodigoProcesso>
                        <ContainerProcessoOrigem>
                            <TabelaProcessoOrigem proId={proId} />
                        </ContainerProcessoOrigem>

                        <ContainerModal>
                            <p>Iniciativa</p>
                            <ContainerIniciativa>
                                <label>
                                    {pro.pro_iniciativa} - {pro.pro_tipo_iniciativa}
                                </label>
                            </ContainerIniciativa>
                            {pro.pro_nome ? (
                                <>
                                    <p>Dados da Iniciativa</p>
                                    <ContainerDados>
                                        {pro.pro_matricula ? (
                                            <>
                                                <label>Matrícula:</label>
                                                <span>{pro.pro_matricula}</span>
                                            </>
                                        ) : null}
                                        <label>Nome:</label>
                                        <span>{pro.pro_nome}</span>
                                        {pro.pro_cpf ? (
                                            <>
                                                <label>Cpf:</label>
                                                <span>{pro.pro_cpf}</span>
                                            </>
                                        ) : null}
                                        {pro.pro_cnpj ? (
                                            <>
                                                <label>Cnpj:</label>
                                                <span>{pro.pro_cnpj}</span>
                                            </>
                                        ) : null}
                                        {pro.pro_fone ? (
                                            <>
                                                <label>Fone:</label>
                                                <span>{pro.pro_fone}</span>
                                            </>
                                        ) : null}
                                        {pro.pro_celular ? (
                                            <>
                                                <label>Celular:</label>
                                                <span>{pro.pro_celular}</span>
                                            </>
                                        ) : null}
                                        {pro.pro_email ? (
                                            <>
                                                <label>Email:</label>
                                                <span>{pro.pro_email}</span>
                                            </>
                                        ) : null}
                                        {pro.pro_contato_pj ? (
                                            <>
                                                <label>Contato PJ:</label>
                                                <span>{pro.pro_contato_pj}</span>
                                            </>
                                        ) : null}
                                    </ContainerDados>
                                </>
                            ) : null}
                            <p>Dados do processo</p>
                            <ContainerDados>
                                {pro.gen_nome ? (
                                    <>
                                        <label>Espécie:</label>
                                        <span>{pro.gen_nome}</span>
                                    </>
                                ) : null}
                                {pro.tpr_nome ? (
                                    <>
                                        <label>Tipo do processo:</label>
                                        <span>{pro.tpr_nome}</span>
                                    </>
                                ) : null}
                                {pro.visualizacao ? (
                                    <>
                                        <label>Visualização:</label>
                                        <span>{pro.visualizacao}</span>
                                    </>
                                ) : null}
                                {pro.pro_assunto ? (
                                    <>
                                        <label>Assunto:</label>
                                        <span>{pro.pro_assunto}</span>
                                    </>
                                ) : null}
                                {pro.pro_autuacao ? (
                                    <>
                                        <label>Autuação:</label>
                                        <span>{pro.pro_autuacao}</span>
                                    </>
                                ) : null}
                                {pro.usu_autuador ? (
                                    <>
                                        <label>Usuário autuador:</label>
                                        <span>
                                            {pro.usu_autuador} - {pro.setor_autuador_processo}
                                        </span>
                                    </>
                                ) : null}
                                {pro.flu_nome ? (
                                    <>
                                        <label>Fluxo:</label>
                                        <span>{pro.flu_nome}</span>
                                    </>
                                ) : null}
                                {pro.area_atual_processo ? (
                                    <>
                                        <label>Área atual do processo:</label>
                                        <span>{pro.area_atual_processo}</span>
                                    </>
                                ) : null}
                                {pro.area_iniciativa_processo ? (
                                    <>
                                        <label>Área de iniciativa do processo:</label>
                                        <span>{pro.area_iniciativa_processo}</span>
                                    </>
                                ) : null}
                                {pro.pro_ultimo_tramite ? (
                                    <>
                                        <label>Último trâmite:</label>
                                        <span>{pro.pro_ultimo_tramite}</span>
                                    </>
                                ) : null}
                                {pro.pro_encerramento ? (
                                    <>
                                        <label>Encerramento:</label>
                                        <span>{pro.pro_encerramento}</span>
                                    </>
                                ) : null}
                                {pro.usu_finalizador ? (
                                    <>
                                        <label>Usuário finalizador:</label>
                                        <span>
                                            {pro.usu_finalizador} - {pro.setor_finalizador_processo}
                                        </span>
                                    </>
                                ) : null}
                                {pro.tpr_id === 17 ? (
                                    <>
                                        <label>Comunicado eletrônico prévio:</label>
                                        <span>{pro.com_abono}</span>
                                        {pro.com_abono === 'Sim' ? (
                                            <>
                                                <label>Núm. comunicado:</label>
                                                <span>{pro.num_abono}</span>
                                            </>
                                        ) : null}
                                    </>
                                ) : null}
                            </ContainerDados>
                            <ContainerComponente>
                                <p>Manifestações</p>
                                <TabelaManifestacoes proId={proId} />
                            </ContainerComponente>
                            <ContainerComponente>
                                <p>Trâmites</p>
                                <TabelaTramitacao proId={proId} />
                            </ContainerComponente>
                            <ContainerBotaoFecha type="button" onClick={fechaModalProcesso}>
                                <FaRegTimesCircle />
                                &nbsp;Fechar
                            </ContainerBotaoFecha>
                        </ContainerModal>
                    </span>
                ))}
            </Modal>
        </>
    );
};

ModalProcesso.propTypes = {
    fechaModalProcesso: PropTypes.func.isRequired,
    modalProcesso: PropTypes.bool.isRequired,
    proId: PropTypes.number.isRequired,
};

export default memo(ModalProcesso);

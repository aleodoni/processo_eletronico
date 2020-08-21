import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import axios from '../../configs/axiosConfig';
import { LinkProcesso } from './styles';
// eslint-disable-next-line import/no-cycle
import ModalProcesso from '../ModalProcesso';

function TabelaProcessoOrigem({ proId }) {
    const [rows, setRows] = useState([]);
    const [proIdModal, setProId] = useState(-1);
    const [modalProcesso, setModalProcesso] = useState(false);

    function abreModalProcesso(id) {
        setProId(id);
        setModalProcesso(true);
    }

    function fechaModalProcesso() {
        setModalProcesso(false);
    }

    const carregaProcessoOrigem = useCallback(() => {
        axios({
            method: 'GET',
            url: `/processo-origem/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                const processoOrigem = [];
                for (let i = 0; i < res.data.length; i++) {
                    processoOrigem.push({
                        pro_id_origem: res.data[i].pro_id_origem,
                        processo_origem: res.data[i].processo_origem,
                    });
                }
                setRows(processoOrigem);
            })
            .catch(() => {
                console.log('Erro ao carregar processo de origem.');
            });
    }, [proId]);

    useEffect(() => {
        carregaProcessoOrigem();
    }, [carregaProcessoOrigem]);

    return rows.length > 0 ? (
        <>
            <p>Processo de origem</p>
            {rows.map((linha) => (
                <span>
                    <LinkProcesso
                        type="button"
                        onClick={() => abreModalProcesso(linha.pro_id_origem)}>
                        {linha.processo_origem}
                    </LinkProcesso>
                </span>
            ))}
            <ModalProcesso
                fechaModalProcesso={fechaModalProcesso}
                modalProcesso={modalProcesso}
                proId={proIdModal}
            />
        </>
    ) : null;
}

export default memo(TabelaProcessoOrigem);

TabelaProcessoOrigem.propTypes = {
    proId: PropTypes.string.isRequired,
};

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../configs/axiosConfig';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    table: {
        minWidth: 650,
    },
});

function Row(props) {
    const { linha } = props;
    const classes = useRowStyles();

    return (
        <>
            <TableRow className={classes.root} hover>
                <TableCell>{linha.seq}</TableCell>
                <TableCell>
                    {linha.envio} - {linha.login_envia}
                </TableCell>
                <TableCell>{linha.setor_envia}</TableCell>
                <TableCell>{linha.setor_recebe}</TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    linha: PropTypes.shape({
        seq: PropTypes.number.isRequired,
        envio: PropTypes.string.isRequired,
        login_envia: PropTypes.string.isRequired,
        setor_envia: PropTypes.string.isRequired,
        setor_recebe: PropTypes.string.isRequired,
    }).isRequired,
};

function TabelaTramitacao({ proId }) {
    const [rows, setRows] = useState([]);

    const carregaTramites = useCallback(() => {
        axios({
            method: 'GET',
            url: `/grid-tramites/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const tramites = [];
                for (let i = 0; i < res.data.length; i++) {
                    tramites.push({
                        seq: i + 1,
                        envio: res.data[i].envio,
                        login_envia: res.data[i].login_envia,
                        setor_envia: res.data[i].setor_envia,
                        setor_recebe: res.data[i].setor_recebe,
                        tra_id: res.data[i].tra_id,
                    });
                    res.data.seq = i + 1;
                }
                setRows(tramites);
            })
            .catch(() => {
                console.log('Erro ao carregar trâmites.');
            });
    }, [proId]);

    useEffect(() => {
        carregaTramites();
    }, [carregaTramites]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <label>Seq</label>
                        </TableCell>
                        <TableCell>
                            <label>Envio</label>
                        </TableCell>
                        <TableCell>
                            <label>Área que enviou</label>
                        </TableCell>
                        <TableCell>
                            <label>Área que recebeu</label>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(linha => (
                        <Row key={linha.tra_id} linha={linha} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TabelaTramitacao;

TabelaTramitacao.propTypes = {
    proId: PropTypes.string.isRequired,
};

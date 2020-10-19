import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../configs/axiosConfig';
import { SemTramites } from './styles';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontSize: 16,
        fontFamily: 'Arial',
    },
    body: {
        fontSize: 16,
        fontFamily: 'Arial',
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderStyle: 'solid',
        borderCollapse: 'collapse',
    },
}))(TableRow);

const useRowStyles = makeStyles({
    table: {
        maxWidth: 650,
    },
});

function Row(props) {
    const { linha } = props;
    const classes = useRowStyles();

    return (
        <>
            <StyledTableRow className={classes.root} hover>
                <StyledTableCell>{linha.seq}</StyledTableCell>
                <StyledTableCell>
                    {linha.envio} - {linha.login_envia}
                </StyledTableCell>
                <StyledTableCell>{linha.setor_envia}</StyledTableCell>
                <StyledTableCell>{linha.setor_recebe}</StyledTableCell>
            </StyledTableRow>
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

    return rows.length > 0 ? (
        <TableContainer component={Paper}>
            <Table aria-label="table" size="small">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            <label>Seq</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Envio</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Área que enviou</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Área que recebeu</label>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map(linha => (
                        <Row key={linha.tra_id} linha={linha} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <SemTramites> - Sem trâmites no momento.</SemTramites>
    );
}

export default memo(TabelaTramitacao);

TabelaTramitacao.propTypes = {
    proId: PropTypes.string.isRequired,
};

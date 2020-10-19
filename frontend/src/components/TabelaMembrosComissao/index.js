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
                <StyledTableCell>{linha.matricula}</StyledTableCell>
                <StyledTableCell>{linha.nome}</StyledTableCell>
                <StyledTableCell>{linha.login}</StyledTableCell>
                <StyledTableCell>{linha.area}</StyledTableCell>
                <StyledTableCell>{linha.cargo}</StyledTableCell>
            </StyledTableRow>
        </>
    );
}

Row.propTypes = {
    linha: PropTypes.shape({
        seq: PropTypes.number.isRequired,
        matricula: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        area: PropTypes.string.isRequired,
        cargo: PropTypes.string.isRequired,
    }).isRequired,
};

function TabelaMembrosComissao({ proId }) {
    const [rows, setRows] = useState([]);

    const carregaMembrosComissao = useCallback(() => {
        axios({
            method: 'GET',
            url: `/dados-membros-comissao/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const membros = [];
                for (let i = 0; i < res.data.length; i++) {
                    membros.push({
                        seq: i + 1,
                        matricula: res.data[i].matricula,
                        nome: res.data[i].nome,
                        login: res.data[i].login,
                        area: res.data[i].area,
                        cargo: res.data[i].cargo,
                    });
                    res.data.seq = i + 1;
                }
                setRows(membros);
            })
            .catch(() => {
                console.log('Erro ao carregar membros da comissão.');
            });
    }, [proId]);

    useEffect(() => {
        carregaMembrosComissao();
    }, [carregaMembrosComissao]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="table" size="small">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            <label>Seq</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Matrícula</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Nome</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Login</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Área</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Cargo</label>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map(linha => (
                        <Row key={linha.cop_id} linha={linha} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default memo(TabelaMembrosComissao);

TabelaMembrosComissao.propTypes = {
    proId: PropTypes.string.isRequired,
};

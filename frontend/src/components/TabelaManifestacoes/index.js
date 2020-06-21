import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from '../../configs/axiosConfig';
import { BotaoComoLink, SemManifestacoes } from './styles';

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

const StyledTableCellDetail = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontSize: 16,
        fontFamily: 'Arial',
        width: '5px',
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function downloadAnexoManifestacao(e, arqId, id, arqNome) {
    e.preventDefault();
    axios({
        method: 'GET',
        url: `/download-manifestacao/${id}/${arqId}`,
        headers: {
            authorization: sessionStorage.getItem('token'),
            Accept: 'application/pdf',
        },
        responseType: 'blob',
    })
        .then(res => {
            const blob = new Blob([res.data], { type: res.data.type });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = res.headers['content-disposition'];
            let fileName = arqNome;
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                    fileName = fileNameMatch[1];
                }
            }
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            console.log('Erro ao efetuar o download do anexo.');
        });
}

function Row(props) {
    const { linha } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <>
            <StyledTableRow className={classes.root} hover>
                <StyledTableCellDetail>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                </StyledTableCellDetail>
                <StyledTableCell>{linha.seq}</StyledTableCell>
                <StyledTableCell>{linha.set_nome}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {linha.tmn_nome}
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {linha.arquivos.length > 0 ? (
                                <Table size="small">
                                    <TableHead>
                                        <StyledTableRow>
                                            <TableCell>
                                                <label>Data / Usuário</label>
                                            </TableCell>
                                            <TableCell>
                                                <label>Documento</label>
                                            </TableCell>
                                            <TableCell>
                                                <label>Arquivo</label>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableHead>

                                    <TableBody>
                                        {linha.arquivos.map(linhaArquivo => (
                                            <StyledTableRow key={linhaArquivo.arq_id} hover>
                                                <TableCell>
                                                    {linhaArquivo.data} - {linhaArquivo.arq_login}
                                                </TableCell>
                                                <TableCell>{linhaArquivo.tpd_nome}</TableCell>
                                                <TableCell>
                                                    <BotaoComoLink
                                                        type="button"
                                                        onClick={e =>
                                                            downloadAnexoManifestacao(
                                                                e,
                                                                linhaArquivo.arq_id,
                                                                linhaArquivo.man_Id,
                                                                linhaArquivo.arq_nome
                                                            )
                                                        }>
                                                        {linhaArquivo.arq_nome}
                                                    </BotaoComoLink>
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <label>Sem arquivos</label>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </StyledTableRow>
        </>
    );
}

Row.propTypes = {
    linha: PropTypes.shape({
        seq: PropTypes.number.isRequired,
        set_nome: PropTypes.string.isRequired,
        arquivos: PropTypes.arrayOf(
            PropTypes.shape({
                tpd_nome: PropTypes.string.isRequired,
                arq_nome: PropTypes.string.isRequired,
                arq_id: PropTypes.number.isRequired,
                data: PropTypes.string.isRequired,
            })
        ).isRequired,
        tmn_nome: PropTypes.string.isRequired,
    }).isRequired,
};

function TabelaManifestacao({ proId }) {
    const [rows, setRows] = useState([]);

    const carregaManifestacoes = useCallback(() => {
        axios({
            method: 'GET',
            url: `/manifestacao-processo-dados/${proId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const manifestacoes = [];
                for (let i = 0; i < res.data.length; i++) {
                    manifestacoes.push({
                        seq: i + 1,
                        set_nome: res.data[i].set_nome,
                        man_login: res.data[i].man_login,
                        tmn_nome: res.data[i].tmn_nome,
                        arquivos: res.data[i].arquivos,
                    });
                }
                setRows(manifestacoes);
            })
            .catch(() => {
                console.log('Erro ao retornar manifestações.');
            });
    }, [proId]);

    useEffect(() => {
        carregaManifestacoes();
    }, [carregaManifestacoes]);

    return rows.length > 0 ? (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table dense" size="small">
                <TableHead>
                    <StyledTableRow hover>
                        <StyledTableCellDetail />
                        <StyledTableCell width="10px">
                            <label>Seq</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Área</label>
                        </StyledTableCell>
                        <StyledTableCell>
                            <label>Tipo da manifestação</label>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map(linha => (
                        <Row key={linha.seq} linha={linha} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <SemManifestacoes> - Sem manifestações no momento.</SemManifestacoes>
    );
}

export default memo(TabelaManifestacao);

TabelaManifestacao.propTypes = {
    proId: PropTypes.string.isRequired,
};

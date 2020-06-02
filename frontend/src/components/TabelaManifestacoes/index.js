import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import { BotaoComoLink } from './styles';

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
            <TableRow className={classes.root} hover>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{linha.seq}</TableCell>
                <TableCell>{linha.set_nome}</TableCell>
                <TableCell component="th" scope="row">
                    {linha.tmn_nome}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {linha.arquivos.length > 0 ? (
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <label>Data</label>
                                            </TableCell>
                                            <TableCell>
                                                <label>Documento</label>
                                            </TableCell>
                                            <TableCell>
                                                <label>Arquivo</label>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {linha.arquivos.map(linhaArquivo => (
                                            <TableRow key={linhaArquivo.arq_id} hover>
                                                <TableCell>{linhaArquivo.data}</TableCell>
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
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <label>Sem arquivos</label>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    linha: PropTypes.shape({
        seq: PropTypes.number.isRequired,
        set_nome: PropTypes.string.isRequired,
        arquivos: PropTypes.arrayOf(
            PropTypes.shape({
                tmn_nome: PropTypes.string.isRequired,
                arq_nome: PropTypes.string.isRequired,
                arq_id: PropTypes.string.isRequired,
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
                setRows(res.data);
            })
            .catch(() => {
                console.log('Erro ao retornar manifestações.');
            });
    }, [proId]);

    useEffect(() => {
        carregaManifestacoes();
    }, [carregaManifestacoes]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table dense">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <label>Seq</label>
                        </TableCell>
                        <TableCell>
                            <label>Área</label>
                        </TableCell>
                        <TableCell>
                            <label>Tipo da manifestação</label>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(linha => (
                        <Row key={linha.seq} linha={linha} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TabelaManifestacao;

TabelaManifestacao.propTypes = {
    proId: PropTypes.string.isRequired,
};

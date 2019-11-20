import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import axios from '../../configs/axiosConfig';
import Button from '@material-ui/core/Button';
import SalvaIcon from '@material-ui/icons/Check';
import OrdenaIcon from '@material-ui/icons/UnfoldMore';
import ApagaIcon from '@material-ui/icons/Clear';
import LimpaIcon from '@material-ui/icons/Refresh';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import PrimeiroIcon from '@material-ui/icons/FirstPage';
import UltimoIcon from '@material-ui/icons/LastPage';
import ProximoIcon from '@material-ui/icons/NavigateNext';
import AnteriorIcon from '@material-ui/icons/NavigateBefore';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';

const styles = {
    lateral: {
      paddingLeft: 300,
    },
    links: {
      textDecoration:'none',
    },
    fundoHeader: {
        background: '#EFF8FB',
        color: '#000000',
        height: '0px',
    },
    espacoBotoes: {
        width: '15px',
        height: 'auto',
        display: 'inline-block',
    },
    formulario: {
        display: 'flex',
        flexDirection: 'column',
    },
    legenda: {
        borderRadius: '5px',
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    campoTexto: {
        background: '#ffffff',
        border: '1px solid #C4C4C4',
        borderRadius: '5px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    erro: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
        color: 'red',
    },
    modal: {
        position: 'absolute',
        fontFamily: "Arial, Helvetica, sans-serif",
        width: 300,
        border: '2px solid #116FBF',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        left: '40%',
        top: '40%',
        textAlign: 'center',
        padding: '10px;',
    },
    menuHeader: {
      paddingLeft: '30px',
    }};

class AreaMenu extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            amuId: undefined,
            setId: '',
            mmuId: '',
            areasMenu: [],
            setores: [],
            modelosMenu: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setAmuId = this.setAmulId.bind(this);
        this.setMmuId = this.setMmulId.bind(this);
        this.setSetId = this.setSetId.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
    }

    setAmuId = event => {
        this.setState({
            amuId: event.target.value,
        });
    };

    setMmuId = event => {
        this.setState({
            mmuId: event.target.value,
        });
    };

    setSetId = event => {
        this.setState({
            setId: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            amuId: undefined,
            erro: '',
        });
    };

    preencheCampos = (amuId, telNome) => {
        this.setState({
            amuId: amuId,
            telNome: telNome,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/telas',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ telas: res.data });
        })
        .catch(err => {
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    salva = () => {
        if (this.state.telNome.trim() === '') {
            this.setState({ erro: 'Nome em branco.' });
            return;
        }
        if (this.state.telId === undefined) {
            axios({
                method: 'POST',
                url: '/telas',
                data: { tel_id: null, tel_nome: this.state.telNome.trim() },
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    this.limpaCampos();
                    this.carregaGrid();
                    this.abreHint('Inserido com sucesso.');
                })
                .catch(err => {
                    this.setState({ erro: 'Erro ao inserir registro.' });
                });
        } else {
            axios({
                method: 'PUT',
                url: 'telas/' + this.state.telId,
                data: {
                    tel_nome: this.state.telNome.trim(),
                },
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    this.limpaCampos();
                    this.carregaGrid();
                    this.abreHint('Editado com sucesso.');
                })
                .catch(err => {
                    this.setState({ erro: 'Erro ao editar registro.' });
                });
        }
    };

    exclui = () => {
        axios({
            method: 'DELETE',
            url: 'telas/' + this.state.telId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                this.limpaCampos();
                this.carregaGrid();
                this.abreHint('Excluído com sucesso.');
                this.fechaModal();
            })
            .catch(err => {
                this.setState({ erro: err.response.data.error });
                this.fechaModal();
            });
    };

    fechaHint = () => {
        this.setState({ salva: false, mensagemHint: '' });
    };

    abreHint = mensagemHint => {
        this.setState({ salva: true, mensagemHint: mensagemHint });
    };

    abreModal = () => {
        if (this.state.telId === undefined) {
            this.setState({ erro: 'Selecione um registro para excluir.' });
        } else {
            this.setState({ show: true });
        }
    };

    fechaModal = () => {
        this.setState({ show: false });
    };

    render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Telas"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardHeader title="Telas" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="telId" value={this.state.telId} onChange={this.setTelId} type="hidden" />
                                    <fieldset className={classes.legenda}>
                                        <legend>Nome</legend>
                                        <input className={classes.campoTexto} required id="telNome" type="text" value={this.state.telNome} onChange={this.setTelNome} autoFocus size="100" maxLength="100" />
                                    </fieldset>
                                </form>
                                <br />
                                <Button id="btnSalva" variant="contained" color="primary" onClick={this.salva}>
                                    <SalvaIcon />
                                    Salvar
                                </Button>
                                    &nbsp;
                                <Button id="btnExclui" variant="contained" color="primary" onClick={this.abreModal}>
                                    <ApagaIcon />
                                    Excluir
                                </Button>
                                    &nbsp;
                                <Button id="btnLimpa" variant="contained" color="primary" onClick={this.limpaCampos}>
                                    <LimpaIcon />
                                    Limpar campos
                                </Button>
                                <br />
                                <br />
                                <MaterialTable
                                    columns={[
                                        {
                                            hidden: true,
                                            field: 'tel_id',
                                            type: 'numeric',
                                        },
                                        { title: 'Nome', field: 'tel_nome' },
                                    ]}
                                    data={this.state.telas}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.tel_id, rowData.tel_nome),
                                        },
                                    ]}
                                    options={{
                                        search: false,
                                        toolbar: false,
                                        pageSize: 10,
                                    }}
                                    icons={{
                                        FirstPage: () => <PrimeiroIcon />,
                                        LastPage: () => <UltimoIcon />,
                                        NextPage: () => <ProximoIcon />,
                                        PreviousPage: () => <AnteriorIcon />,
                                        SortArrow: () => <OrdenaIcon />,
                                    }}
                                    localization={{
                                        pagination: {
                                            labelDisplayedRows: '{from}-{to} de {count}',
                                            labelRowsSelect: 'linhas',
                                            nextTooltip: 'Próxima',
                                            firstTooltip: 'Primeira',
                                            lastTooltip: 'Última',
                                            previousTooltip: 'Anterior',
                                        },
                                        header: {
                                            actions: '',
                                        },
                                        body: {
                                            emptyDataSourceMessage: 'Sem registros para mostrar.',
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} open={this.state.salva} onClose={this.fechaHint} autoHideDuration={500} message={this.state.mensagemHint} />
                    <Modal open={this.state.show} onClose={this.fechaModal}>
                    <div className={classes.modal}>
                    <h3>Deseja apagar o registro?</h3>
                    <div>
                        <Button variant="contained" color="primary" type="submit" startIcon={<Check />} onClick={this.exclui}>
                            Sim
                        </Button>
                        <div className={classes.espacoBotoes}/>
                        <Button variant="contained" color="primary" type="submit" startIcon={<Clear />} onClick={this.fechaModal}>
                            Não
                        </Button>
                    </div>
                    </div>
                    </Modal>
                </Grid>

            </div>
        )
    }

}

export default withStyles(styles)(AreaMenu);



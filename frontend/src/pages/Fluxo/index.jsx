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
import ApagaIcon from '@material-ui/icons/Clear';
import LimpaIcon from '@material-ui/icons/Refresh';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import { styles } from './estilos';
import { tabelas } from '../../configs/tabelas';

class Fluxo extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            fluId: undefined,
            fluNome: '',
            fluxos: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setFluId = this.setFluId.bind(this);
        this.setFluNome = this.setFluNome.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
    }

    setFluId = event => {
        this.setState({
            fluId: event.target.value,
        });
    };

    setFluNome = event => {
        this.setState({
            fluNome: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            fluId: undefined,
            fluNome: '',
            erro: '',
        });
    };

    preencheCampos = (fluId, fluNome) => {
        this.setState({
            fluId: fluId,
            fluNome: fluNome,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/fluxos',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ fluxos: res.data });
        })
        .catch(err => {
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    salva = () => {
        if (this.state.fluNome.trim() === '') {
            this.setState({ erro: 'Nome em branco.' });
            return;
        }
        if (this.state.fluId === undefined) {
            axios({
                method: 'POST',
                url: '/fluxos',
                data: { flu_id: null, flu_nome: this.state.fluNome.trim() },
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
                url: 'fluxos/' + this.state.fluId,
                data: {
                    flu_nome: this.state.fluNome.trim(),
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
            url: 'fluxos/' + this.state.fluId,
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
        if (this.state.fluId === undefined) {
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
                <Autorizacao tela="Fluxos"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardHeader title="Fluxos" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="fluId" value={this.state.fluId} onChange={this.setFluId} type="hidden" />
                                    <fieldset className={classes.legenda}>
                                        <legend>Nome</legend>
                                        <input className={classes.campoTexto} required id="fluNome" type="text" value={this.state.fluNome} onChange={this.setFluNome} autoFocus size="100" maxLength="100" />
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
                                            field: 'flu_id',
                                            type: 'numeric',
                                        },
                                        { title: 'Nome', field: 'flu_nome' },
                                    ]}
                                    data={this.state.fluxos}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.flu_id, rowData.flu_nome),
                                        },
                                    ]}
                                    options={tabelas.opcoes}
                                    icons={tabelas.icones}
                                    localization={tabelas.localizacao}
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

export default withStyles(styles)(Fluxo);



import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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
import axios from '../../configs/axiosConfig';
import Autorizacao from '../../components/Autorizacao';
import Menu from '../../components/Menu';
import { styles } from './estilos';
import { tabelas } from '../../configs/tabelas';

class Tela extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erro: '',
            telId: undefined,
            telNome: '',
            telas: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setTelId = this.setTelId.bind(this);
        this.setTelNome = this.setTelNome.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
    }

    setTelId = event => {
        this.setState({
            telId: event.target.value,
        });
    };

    setTelNome = event => {
        this.setState({
            telNome: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            telId: undefined,
            telNome: '',
            erro: '',
        });
    };

    preencheCampos = (telId, telNome) => {
        this.setState({
            telId,
            telNome,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/telas',
            headers: {
                authorization: sessionStorage.getItem('token'),
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
                    authorization: sessionStorage.getItem('token'),
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
                url: `telas/${this.state.telId}`,
                data: {
                    tel_nome: this.state.telNome.trim(),
                },
                headers: {
                    authorization: sessionStorage.getItem('token'),
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
            url: `telas/${this.state.telId}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
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
        this.setState({ salva: true, mensagemHint });
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
        const { classes } = this.props;
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Telas" />
                <Menu />
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardHeader title="Telas" className={classes.fundoHeader} />
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
                                <div className={classes.espacoBotoes} />
                                <Button variant="contained" color="primary" type="submit" startIcon={<Clear />} onClick={this.fechaModal}>
                                    Não
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Tela);

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

class TipoIniciativa extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            tinId: undefined,
            tinNome: '',
            tinTipo: '',
            tiposIniciativa: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setTinId = this.setTinId.bind(this);
        this.setTinTipo = this.setTinTipo.bind(this);
        this.setTinNome = this.setTinNome.bind(this);
        this.setTiposIniciativa = this.setTiposIniciativa.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
    }

    setTinId = event => {
        this.setState({
            tinId: event.target.value,
        });
    };

    setTinTipo = event => {
        this.setState({
            tinTipo: event.target.value,
        });
    };

    setTinNome = event => {
        this.setState({
            tinNome: event.target.value,
        });
    };

    setTiposIniciativa = event => {
        this.setState({
            tiposIniciativa: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            tinId: undefined,
            tinTipo: '',
            tinNome: '',
            erro: '',
        });
    };

    preencheCampos = (tinId, tinTipo, tinNome) => {
        this.setState({
            tinId: tinId,
            tinTipo: tinTipo,
            tinNome: tinNome,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/tipos-de-iniciativa',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ tiposIniciativa: res.data });
        })
        .catch(err => {
            alert(err)
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    salva = () => {
        if (this.state.tinNome.trim() === '') {
            this.setState({ erro: 'Tipo de iniciativa em branco.' });
            return;
        }
        if (this.state.tinTipo === '') {
            this.setState({ erro: 'Tipo não selecionado.' });
            return;
        }
        if (this.state.tinId === undefined) {
            axios({
                method: 'POST',
                url: '/tipos-iniciativa',
                data: {
                    tin_id: null,
                    tin_tipo: this.state.tinTipo,
                    tin_nome: this.state.tinNome,
                },
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
                url: 'tipos-iniciativa/' + this.state.tinId,
                data: {
                    tin_tipo: this.state.tinTipo,
                    tin_nome: this.state.tinNome,
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
            url: 'tipos-iniciativa/' + this.state.tinId,
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
        if (this.state.tinId === undefined) {
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
                <Autorizacao tela="Tipos de iniciativa"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Tipos de iniciativa" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="tinId" value={this.state.tinId} onChange={this.setTinId} type="hidden" />
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Tipo de iniciativa</legend>
                                                <input className={classes.campoTexto} required id="tinNome" type="text" value={this.state.tinNome} onChange={this.setTinNome} size="150" maxLength="150" />
                                            </fieldset>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Tipo</legend>
                                                <select id="selectTipo" onChange={this.setTinTipo} value={this.state.tinTipo}>
                                                <option key="" value="">Selecione...</option>
                                                    <option key="0" value="0">Interna</option>
                                                    <option key="1" value="1">Externa</option>
                                                </select>
                                            </fieldset>
                                        </Grid>
                                    </Grid>
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
                                            field: 'tin_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'tin_tipo',
                                            type: 'numeric',
                                        },
                                        {
                                            title: 'Nome',
                                            field: 'tin_nome'
                                        },
                                        {
                                            title: 'Tipo',
                                            field: 'tipo'
                                        },
                                    ]}
                                    data={this.state.tiposIniciativa}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.tin_id, rowData.tin_tipo, rowData.tin_nome),
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

export default withStyles(styles)(TipoIniciativa);



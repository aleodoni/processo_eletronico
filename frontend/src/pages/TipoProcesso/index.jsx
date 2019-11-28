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

class TipoProcesso extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            tprId: undefined,
            tprNome: '',
            tpr_visualizacao: '',
            genId: '',
            fluId: '',
            tiposProcesso: [],
            generos: [],
            fluxos: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setTprId = this.setTprId.bind(this);
        this.setTprVisualizacao = this.setTprVisualizacao.bind(this);
        this.setTprNome = this.setTprNome.bind(this);
        this.setGenId = this.setGenId.bind(this);
        this.setFluId = this.setFluId.bind(this);
        this.setTiposProcesso = this.setTiposProcesso.bind(this);
        this.setGeneros = this.setGeneros.bind(this);
        this.setFluxos = this.setFluxos.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
        this.carregaGenero();
        this.carregaFluxo();
    }

    setTprId = event => {
        this.setState({
            tprId: event.target.value,
        });
    };

    setTprVisualizacao = event => {
        this.setState({
            tprVisualizacao: event.target.value,
        });
    };

    setTprNome = event => {
        this.setState({
            tprNome: event.target.value,
        });
    };

    setGenId = event => {
        this.setState({
            genId: event.target.value,
        });
    };

    setFluId = event => {
        this.setState({
            fluId: event.target.value,
        });
    };

    setTiposProcesso = event => {
        this.setState({
            tiposProcesso: event.target.value,
        });
    };

    setGeneros = event => {
        this.setState({
            generos: event.target.value,
        });
    };

    setFluxos = event => {
        this.setState({
            fluxos: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            tprId: undefined,
            tprVisualizacao: '',
            tprNome: '',
            genId: '',
            fluId: '',
            erro: '',
        });
    };

    preencheCampos = (tprId, tprVisualizacao, tprNome, genId, fluId) => {
        this.setState({
            tprId: tprId,
            tprVisualizacao: tprVisualizacao,
            tprNome: tprNome,
            genId: genId,
            fluId: fluId,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/tipos-de-processo',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ tiposProcesso: res.data });
        })
        .catch(err => {
            alert(err)
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    carregaGenero = () => {
        axios({
            method: "GET",
            url: "/generos",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboGenero = [];
                comboGenero.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboGenero.push(
                        <option
                            key={res.data[i].gen_id}
                            value={res.data[i].gen_id}
                        >
                            {res.data[i].gen_nome}
                        </option>
                    );
                }
                this.setState({ generos: comboGenero });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar gêneros." });
            });
    };

    carregaFluxo = () => {
        axios({
            method: "GET",
            url: "/fluxos",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboFluxo = [];
                comboFluxo.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboFluxo.push(
                        <option
                            key={res.data[i].flu_id}
                            value={res.data[i].flu_id}
                        >
                            {res.data[i].flu_nome}
                        </option>
                    );
                }
                this.setState({ fluxos: comboFluxo });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar fluxos." });
            });
    };

    salva = () => {
        if (this.state.tprNome.trim() === '') {
            this.setState({ erro: 'Tipo de processo em branco.' });
            return;
        }
        if (this.state.tprVisualizacao === undefined) {
            this.setState({ erro: 'Visualização não selecionada.' });
            return;
        }
        if (this.state.genId === '') {
            this.setState({ erro: 'Gênero não selecionado.' });
            return;
        }
        if (this.state.tprId === undefined) {
            axios({
                method: 'POST',
                url: '/tipos-processo',
                data: {
                    tpr_id: null,
                    tpr_visualizacao: this.state.tprVisualizacao,
                    tpr_nome: this.state.tprNome,
                    gen_id: this.state.genId,
                    flu_id: this.state.fluId,
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
                url: 'tipos-processo/' + this.state.tprId,
                data: {
                    tpr_visualizacao: this.state.tprVisualizacao,
                    tpr_nome: this.state.tprNome,
                    gen_id: this.state.genId,
                    flu_id: this.state.fluId,
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
            url: 'tipos-processo/' + this.state.tprId,
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
        if (this.state.tprId === undefined) {
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
                <Autorizacao tela="Tipos de processo"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Tipos de processo" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="tprId" value={this.state.tprId} onChange={this.setTprId} type="hidden" />
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Tipo de processo</legend>
                                                <input className={classes.campoTexto} required id="tprNome" type="text" value={this.state.tprNome} onChange={this.setTprNome} size="150" maxLength="150" />
                                            </fieldset>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Visualização</legend>
                                                <select id="selectVisualizacao" onChange={this.setTprVisualizacao} value={this.state.tprVisualizacao}>
                                                <option key="" value="">Selecione...</option>
                                                    <option key="0" value="0">Normal</option>
                                                    <option key="1" value="1">Restrito</option>
                                                    <option key="2" value="2">Sigiloso</option>
                                                </select>
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Gênero</legend>
                                                <select id="selectGenero" onChange={this.setGenId} value={this.state.genId}>
                                                    {this.state.generos}
                                                </select>
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Fluxo</legend>
                                                <select id="selectFluxo" onChange={this.setFluId} value={this.state.fluId}>
                                                    {this.state.fluxos}
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
                                            field: 'tpr_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'gen_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'flu_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'tpr_visualizacao',
                                            type: 'numeric',
                                        },
                                        {
                                            title: 'Nome',
                                            field: 'tpr_nome'
                                        },
                                        {
                                            title: 'Visualização',
                                            field: 'visualizacao'
                                        },
                                        {
                                            title: 'Gênero',
                                            field: 'gen_nome'
                                        },
                                        {
                                            title: 'Fluxo',
                                            field: 'flu_nome'
                                        },
                                    ]}
                                    data={this.state.tiposProcesso}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.tpr_id, rowData.tpr_visualizacao, rowData.tpr_nome, rowData.gen_id, rowData.flu_id),
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

export default withStyles(styles)(TipoProcesso);



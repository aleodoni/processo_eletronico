import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
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

class Nodo extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            nodId: undefined,
            nodInicio: false,
            nodFim: false,
            areaId: '',
            fluId: '',
            nodos: [],
            fluxos: [],
            areas: [],
            salva: false,
            show: false,
            mensagemHint: '',
            mostraCampos: false
        };
        this.setNodId = this.setNodId.bind(this);
        this.setNodInicio = this.setNodInicio.bind(this);
        this.setNodFim = this.setNodFim.bind(this);
        this.setAreaId = this.setAreaId.bind(this);
        this.setFluId = this.setFluId.bind(this);
        this.setNodos = this.setNodos.bind(this);
        this.setFluxos = this.setFluxos.bind(this);
        this.setAreas = this.setAreas.bind(this);
    }

    componentDidMount() {
        this.carregaFluxos();
    }

    setNodId = event => {
        this.setState({
            nodId: event.target.value,
        });
    };

    setNodInicio = event => {
        this.setState({
            nodInicio: event.target.checked,
        });
    };

    setNodFim = event => {
        this.setState({
            nodFim: event.target.checked,
        });
    };

    setAreaId = event => {
        this.setState({
            areaId: event.target.value,
        });
    };

    setFluId = event => {
        if (event.target.value === ''){
            this.setState({
                mostraCampos: false,
                nodos: []
            });
            this.carregaArea();
        }else{
            this.setState({
                mostraCampos: true,
            });
            this.carregaArea();
            this.carregaGrid(event.target.value);
        }
        this.setState({
            fluId: event.target.value,
        });
    };

    setNodos = event => {
        this.setState({
            nodos: event.target.value,
        });
    };

    setFluxos = event => {
        this.setState({
            fluxos: event.target.value,
        });
    };

    setAreas = event => {
        this.setState({
            areas: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            nodId: undefined,
            nodInicio: false,
            nodFim: false,
            areaId: '',
            erro: '',
        });
    };

    preencheCampos = (nodId, nodInicio, nodFim, areaId, fluId) => {
        this.setState({
            nodId: nodId,
            nodInicio: nodInicio,
            nodFim: nodFim,
            areaId: areaId,
            fluId: fluId
        });
    };

    carregaGrid = (fluId) => {
        axios({
            method: 'GET',
            url: '/grid-nos/'+fluId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ nodos: res.data });
        })
        .catch(err => {
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    carregaFluxos = () => {
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

    carregaArea = () => {
        axios({
            method: "GET",
            url: "/area",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboArea = [];
                comboArea.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboArea.push(
                        <option
                            key={res.data[i].set_id}
                            value={res.data[i].set_id}
                        >
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                this.setState({ areas: comboArea });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar áreas." });
            });
    };

    salva = () => {
        if (this.state.areaId === '') {
            this.setState({ erro: 'Selecione uma área.' });
            return;
        }
        if (this.state.nodId === undefined) {
            axios({
                method: 'POST',
                url: '/nos',
                data: {
                    nod_id: null,
                    nod_inicio: this.state.nodInicio,
                    nod_fim: this.state.nodFim,
                    flu_id: this.state.fluId,
                    area_id: this.state.areaId
                },
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    this.limpaCampos();
                    this.carregaGrid(res.data.flu_id);
                    this.abreHint('Inserido com sucesso.');
                })
                .catch(err => {
                    this.setState({ erro: 'Erro ao inserir registro.' });
                });
        } else {
            axios({
                method: 'PUT',
                url: 'nos/' + this.state.nodId,
                data: {
                    nod_inicio: this.state.nodInicio,
                    nod_fim: this.state.nodFim,
                    flu_id: this.state.fluId,
                    area_id: this.state.areaId
                },
                headers: {
                    'authorization': sessionStorage.getItem('token'),
                },
            })
                .then(res => {
                    this.limpaCampos();
                    this.carregaGrid(res.data.flu_id);
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
            url: 'nos/' + this.state.nodId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                this.limpaCampos();
                this.carregaGrid(this.state.fluId);
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
        if (this.state.nodId === undefined) {
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
                <Autorizacao tela="Nós"/>
                <Menu/>
                        <Card>
                            <CardHeader title="Nós" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="nodId" value={this.state.nodId} onChange={this.setNodId} type="hidden" />
                                    <Card className={classes.cardFluxo}>
                                        <div className={classes.containerFluxo}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Fluxo</legend>
                                                <select id="fluxo" onChange={this.setFluId} value={this.state.fluId}>
                                                    {this.state.fluxos}
                                                </select>
                                            </fieldset>
                                        </div>
                                    </Card>
                                    { this.state.mostraCampos
                                    ? <div>
                                          <div className={classes.containerDados}>
                                              <fieldset className={classes.legenda}>
                                                  <legend>Áreas</legend>
                                                  <select id="area" onChange={this.setAreaId} value={this.state.areaId}>
                                                      {this.state.areas}
                                                  </select>
                                              </fieldset>
                                              <div className={classes.estiloCheck}>
                                                  <input type="checkbox" name="inicio" id="inicio" value={ this.state.nodInicio } checked={ this.state.nodInicio } onChange={ this.setNodInicio }/>Nó inicial
                                              </div>
                                              <div className={classes.estiloCheck}>
                                                  <input type="checkbox" name="fim" id="fim" value={ this.state.nodFim } checked={ this.state.nodFim } onChange={ this.setNodFim }/>Nó final
                                              </div>
                                          </div>
                                          <Button id="btnSalva" variant="contained" color="primary" onClick={this.salva}>
                                              <SalvaIcon />Salvar
                                          </Button>&nbsp;
                                          <Button id="btnExclui" variant="contained" color="primary" onClick={this.abreModal}>
                                              <ApagaIcon />Excluir
                                          </Button>&nbsp;
                                          <Button id="btnLimpa" variant="contained" color="primary" onClick={this.limpaCampos}>
                                              <LimpaIcon />Limpar campos
                                          </Button>
                                          <br />
                                          <br />
                                          <MaterialTable
                                              columns={[
                                              {
                                                  hidden: true,
                                                  field: 'nod_id',
                                                  type: 'numeric',
                                              },
                                              {
                                                  hidden: true,
                                                  field: 'flu_id',
                                                  type: 'numeric',
                                              },
                                              {
                                                  hidden: true,
                                                  field: 'area_id',
                                                  type: 'string',
                                              },
                                              {
                                                  title: 'Área',
                                                  field: 'area'
                                              },
                                              {
                                                  title: 'Início',
                                                  field: 'inicio'
                                              },
                                              {
                                                  title: 'Fim',
                                                  field: 'fim'
                                              },
                                              ]}
                                              data={this.state.nodos}
                                              actions={[
                                              {
                                                  icon: () => <EditIcon />,
                                                  tooltip: 'Editar',
                                                  onClick: (event, rowData) => this.preencheCampos(rowData.nod_id, rowData.nod_inicio, rowData.nod_fim, rowData.area_id, rowData.flu_id),
                                              },
                                              ]}
                                              options={tabelas.opcoes}
                                              icons={tabelas.icones}
                                              localization={tabelas.localizacao}
                                          />
                                      </div>
                                    : null
                                }
                                </form>



                            </CardContent>
                        </Card>
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

            </div>
        )
    }

}

export default withStyles(styles)(Nodo);



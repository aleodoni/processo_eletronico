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
import { styles } from './estilos';

class AreaMenu extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            amuId: undefined,
            setId: '',
            mmuId: '',
            areasMenu: [],
            areas: [],
            modelosMenu: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setAmuId = this.setAmuId.bind(this);
        this.setMmuId = this.setMmuId.bind(this);
        this.setAreas = this.setAreas.bind(this);
        this.setModelos = this.setModelos.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
        this.carregaAreas();
        this.carregaModelosMenu();
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

    setAreas = event => {
        this.setState({
            setId: event.target.value
        });
    };

    setModelos = event => {
        this.setState({
            mmuId: event.target.value
        });
    };

    limpaCampos = () => {
        this.setState({
            amuId: undefined,
            setId: '',
            mmuId: '',
            erro: '',
        });
    };

    preencheCampos = (amuId, setId, mmuId) => {
        this.setState({
            amuId: amuId,
            setId: setId,
            mmuId: mmuId
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/areas-do-menu',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ areasMenu: res.data });
        })
        .catch(err => {
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    carregaAreas = () => {
        axios({
            method: "GET",
            url: "/area",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboAreas = [];
                comboAreas.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboAreas.push(
                        <option
                            key={res.data[i].set_id}
                            value={res.data[i].set_id}
                        >
                            {res.data[i].set_nome}
                        </option>
                    );
                }
                this.setState({ areas: comboAreas });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar áreas." });
            });
    };

    carregaModelosMenu = () => {
        axios({
            method: "GET",
            url: "/modelo-menu",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboModelosMenu = [];
                comboModelosMenu.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboModelosMenu.push(
                        <option
                            key={res.data[i].mmu_id}
                            value={res.data[i].mmu_id}
                        >
                            {res.data[i].mmu_nome}
                        </option>
                    );
                }
                this.setState({ modelosMenu: comboModelosMenu });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar modelos de menu." });
            });
    };

    salva = () => {
        if (this.state.setId === '') {
            this.setState({ erro: 'Nome de área em branco.' });
            return;
        }
        if (this.state.mmuId === '') {
            this.setState({ erro: 'Nome de modelo de menu em branco.' });
            return;
        }
        if (this.state.amuId === undefined) {
            axios({
                method: 'POST',
                url: '/area-menu',
                data: { amu_id: null, set_id: this.state.setId.trim(), mmu_id: this.state.mmuId },
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
                url: 'area-menu/' + this.state.amuId,
                data: {
                    set_id: this.state.setId.trim(),
                    mmu_id: this.state.mmuId,
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
            url: 'area-menu/' + this.state.amuId,
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
        if (this.state.amuId === undefined) {
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
                <Autorizacao tela="Áreas de menu"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardHeader title="Áreas de menu" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="amuId" value={this.state.amuId} onChange={this.setAmuId} type="hidden" />
                                    <fieldset className={classes.legenda}>
                                        <legend>Área</legend>
                                        <select id="selectAreas" onChange={this.setAreas} value={this.state.setId}>
                                            {this.state.areas}
                                        </select>
                                    </fieldset>
                                    <fieldset className={classes.legenda}>
                                        <legend>Modelo de menu</legend>
                                        <select id="selectModelos" onChange={this.setModelos} value={this.state.mmuId}>
                                            {this.state.modelosMenu}
                                        </select>
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
                                            field: 'amu_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'set_id',
                                            type: 'string',
                                        },
                                        {
                                            hidden: true,
                                            field: 'mmu_id',
                                            type: 'numeric',
                                        },
                                        { title: 'Área', field: 'set_nome' },
                                        { title: 'Modelo', field: 'mmu_nome' },
                                    ]}
                                    data={this.state.areasMenu}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.amu_id, rowData.set_id, rowData.mmu_id),
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



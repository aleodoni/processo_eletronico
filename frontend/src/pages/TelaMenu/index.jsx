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

class TelaMenu extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            erro: '',
            menId: undefined,
            menIdPai: '',
            menNome: '',
            menUrl: '',
            telId: '',
            mmuId: '',
            menOrdemPai: '',
            telasMenu: [],
            menusPai: [],
            telas: [],
            modelos: [],
            salva: false,
            show: false,
            mensagemHint: '',
        };
        this.setMenId = this.setMenId.bind(this);
        this.setMenIdPai = this.setMenIdPai.bind(this);
        this.setMenNome = this.setMenNome.bind(this);
        this.setMenUrl = this.setMenUrl.bind(this);
        this.setTelId = this.setTelId.bind(this);
        this.setMmuId = this.setMmuId.bind(this);
        this.setMenOrdemPai = this.setMenOrdemPai.bind(this);
        this.setTelasMenu = this.setTelasMenu.bind(this);
        this.setMenusPai = this.setMenusPai.bind(this);
        this.setTelas = this.setTelas.bind(this);
        this.setModelos = this.setModelos.bind(this);
    }

    componentDidMount() {
        this.carregaGrid();
        this.carregaPai();
        this.carregaModelo();
        this.carregaTela();
    }

    setMenId = event => {
        this.setState({
            menId: event.target.value,
        });
    };

    setMenIdPai = event => {
        this.setState({
            menIdPai: event.target.value,
        });
    };

    setMenNome = event => {
        this.setState({
            menNome: event.target.value,
        });
    };

    setMenUrl = event => {
        this.setState({
            menUrl: event.target.value,
        });
    };

    setTelId = event => {
        this.setState({
            telId: event.target.value,
        });
    };

    setMmuId = event => {
        this.setState({
            mmuId: event.target.value,
        });
    };

    setMenOrdemPai = event => {
        this.setState({
            menOrdemPai: event.target.value,
        });
    };

    setTelasMenu = event => {
        this.setState({
            telasMenu: event.target.value,
        });
    };

    setTelas = event => {
        this.setState({
            telas: event.target.value,
        });
    };

    setMenusPai = event => {
        this.setState({
            menusPai: event.target.value,
        });
    };

    setModelos = event => {
        this.setState({
            modelos: event.target.value,
        });
    };

    limpaCampos = () => {
        this.setState({
            menId: undefined,
            menIdPai: '',
            menNome: '',
            menUrl: '',
            telId: '',
            mmuId: '',
            menOrdemPai: '',
            erro: '',
        });
    };

    preencheCampos = (menId, menIdPai, menNome, menUrl, telId, mmuId, menOrdemPai) => {
        if (menIdPai === null){
            menIdPai = '';
        }
        this.setState({
            menId: menId,
            menIdPai: menIdPai,
            menNome: menNome,
            menUrl: menUrl,
            telId: telId,
            mmuId: mmuId,
            menOrdemPai: menOrdemPai,
        });
    };

    carregaGrid = () => {
        axios({
            method: 'GET',
            url: '/tela-menu',
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({ telasMenu: res.data });
        })
        .catch(err => {
            alert(err)
            this.setState({ erro: 'Erro ao carregar registros.' });
        });
    };

    carregaPai = () => {
        axios({
            method: "GET",
            url: "/menu-pai",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboPai = [];
                comboPai.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboPai.push(
                        <option
                            key={res.data[i].men_id}
                            value={res.data[i].men_id}
                        >
                            {res.data[i].nome_pai}
                        </option>
                    );
                }
                this.setState({ menusPai: comboPai });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar pais." });
            });
    };

    carregaModelo = () => {
        axios({
            method: "GET",
            url: "/modelo-menu",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboModelo = [];
                comboModelo.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboModelo.push(
                        <option
                            key={res.data[i].mmu_id}
                            value={res.data[i].mmu_id}
                        >
                            {res.data[i].mmu_nome}
                        </option>
                    );
                }
                this.setState({ modelos: comboModelo });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar modelos." });
            });
    };

    carregaTela = () => {
        axios({
            method: "GET",
            url: "/telas",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                var comboTela = [];
                comboTela.push(
                    <option key="" value="">
                        Selecione...
                    </option>
                );
                for (var i = 0; i < res.data.length; i++) {
                    comboTela.push(
                        <option
                            key={res.data[i].tel_id}
                            value={res.data[i].tel_id}
                        >
                            {res.data[i].tel_nome}
                        </option>
                    );
                }
                this.setState({ telas: comboTela });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar telas." });
            });
    };

    salva = () => {
        if (this.state.menNome.trim() === '') {
            this.setState({ erro: 'Nome em branco.' });
            return;
        }
        if (this.state.menId === undefined) {
            axios({
                method: 'POST',
                url: '/menu',
                data: {
                    men_id: null,
                    men_id_pai: this.state.menIdPai,
                    men_url: this.state.menUrl,
                    tel_id: this.state.telId,
                    mmu_id: this.state.mmuId,
                    men_ordem_pai: this.state.menOrdemPai,
                    men_nome: this.state.menNome.trim()
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
                url: 'menu/' + this.state.menId,
                data: {
                    men_id_pai: this.state.menIdPai,
                    men_url: this.state.menUrl,
                    tel_id: this.state.telId,
                    mmu_id: this.state.mmuId,
                    men_ordem_pai: this.state.menOrdemPai,
                    men_nome: this.state.menNome.trim()
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
            url: 'menu/' + this.state.menId,
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
        if (this.state.menId === undefined) {
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
                <Autorizacao tela="Menus"/>
                <Menu/>
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Menus" className={classes.fundoHeader}></CardHeader>
                            <CardContent>
                                <span className={classes.erro}>{this.state.erro}</span>
                                <form className={classes.formulario} noValidate autoComplete="off">
                                    <input id="menId" value={this.state.menId} onChange={this.setMenId} type="hidden" />
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Menu pai</legend>
                                                <select id="selectPai" onChange={this.setMenIdPai} value={this.state.menIdPai}>
                                                    {this.state.menusPai}
                                                </select>
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Modelo de menu</legend>
                                                <select id="selectModelo" onChange={this.setMmuId} value={this.state.mmuId}>
                                                    {this.state.modelos}
                                                </select>
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Item</legend>
                                                <input className={classes.campoTexto} required id="menNome" type="text" value={this.state.menNome} onChange={this.setMenNome} size="60" maxLength="60" />
                                            </fieldset>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Url</legend>
                                                <input className={classes.campoTexto} required id="menUrl" type="text" value={this.state.menUrl} onChange={this.setMenUrl} size="100" maxLength="200" />
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <fieldset className={classes.legenda}>
                                            <legend>Tela</legend>
                                                <select id="selectTela" onChange={this.setTelId} value={this.state.telId}>
                                                    {this.state.telas}
                                                </select>
                                            </fieldset>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <fieldset className={classes.legenda}>
                                                <legend>Ordem pai</legend>
                                                <input className={classes.campoTexto} required id="menOrdemPai" type="text" value={this.state.menOrdemPai} onChange={this.setMenOrdemPai} size="5" maxLength="10" />
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
                                            field: 'men_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'men_id_pai',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'mmu_id',
                                            type: 'numeric',
                                        },
                                        {
                                            hidden: true,
                                            field: 'tel_id',
                                            type: 'numeric',
                                        },
                                        {
                                            title: 'Pai',
                                            field: 'nome_pai'
                                        },
                                        {
                                            title: 'Modelo',
                                            field: 'mmu_nome'
                                        },
                                        {
                                            title: 'Item',
                                            field: 'men_nome'
                                        },
                                        {
                                            title: 'Url',
                                            field: 'men_url'
                                        },
                                        {
                                            title: 'Tela',
                                            field: 'tel_nome'
                                        },
                                        {
                                            title: 'Ordem do pai',
                                            field: 'men_ordem_pai'
                                        },
                                    ]}
                                    data={this.state.telasMenu}
                                    actions={[
                                        {
                                            icon: () => <EditIcon />,
                                            tooltip: 'Editar',
                                            onClick: (event, rowData) => this.preencheCampos(rowData.men_id, rowData.men_id_pai, rowData.men_nome, rowData.men_url, rowData.tel_id, rowData.mmu_id, rowData.men_ordem_pai),
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

export default withStyles(styles)(TelaMenu);



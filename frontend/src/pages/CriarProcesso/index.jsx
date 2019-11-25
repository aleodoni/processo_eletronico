import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
import Grid from '@material-ui/core/Grid';
import axios from '../../configs/axiosConfig';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SalvaIcon from '@material-ui/icons/Check';

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
        paddingBottom: '10px',
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

class CriarProcesso extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            erro: '',
            proId: undefined,
            genId: '',
            tprId: '',
            tiposProcesso: [],
            generos: [],
            salva: false,
            teste: '',
        }
        this.setProId = this.setProId.bind(this);
        this.setGenId = this.setGenId.bind(this);
        this.setGeneros = this.setGeneros.bind(this);
        this.setTprId = this.setTprId.bind(this);
        this.setTiposProcesso = this.setTiposProcesso.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.carregaGenero();
        this.iniciaTipoProcesso();
    }

    setProId = event => {
        this.setState({
            proId: event.target.value,
        });
    };

    setGenId = event => {
        this.setState({
            genId: event.target.value,
            teste: 'aqui muda o combo'
        });

    };

    setTprId = event => {
        this.setState({
            tprId: event.target.value,
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

    onSelect(event) {
        const selectedIndex = event.target.options.selectedIndex;
        const genId = event.target.options[selectedIndex].getAttribute('data-key');
        axios({
            method: "GET",
            url: "/tipos-de-processo/"+genId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            let comboTipoProcesso = [];
            comboTipoProcesso.push(
                <option key="" value="">
                    Selecione...
                </option>
            );
            for (var i = 0; i < res.data.length; i++) {
                comboTipoProcesso.push(
                    <option
                        key={res.data[i].tpr_id}
                        value={res.data[i].tpr_id}
                    >
                        {res.data[i].tpr_nome}
                    </option>
                );
            }
            if (genId === ''){
                this.iniciaTipoProcesso();
            }else{
                this.setState({ tiposProcesso: comboTipoProcesso, genId: genId, tprId: '' });
            }
        })
        .catch(err => {
            this.setState({ erro: "Erro ao carregar tipos de processo." });
        });
    }

    carregaGenero = () => {
        axios({
            method: "GET",
            url: "/generos",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                let comboGenero = [];
                comboGenero.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboGenero.push(
                        <option
                            key={res.data[i].gen_id}
                            data-key={res.data[i].gen_id}
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

    iniciaTipoProcesso = () => {
        this.setState({ tiposProcesso: [], genId: '', tprId: '' });
        let comboTipoProcesso = [];
        comboTipoProcesso.push(
           <option key="" data-key="" value="">
               Selecione...
           </option>
        );
        this.setState({ tiposProcesso: comboTipoProcesso });
    };

    salva = () => {
        if (this.state.tprId === ''){
            this.setState({erro: 'Selecione o tipo do processo.'});
            return;
        }else{
            this.setState({erro: ''});
        }
    }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Criar processo"/>
                <Menu/>
                <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Novo processo" className={classes.fundoHeader}></CardHeader>
                        <CardContent>
                            <div className={classes.erro}>{this.state.erro}</div>
                            <form className={classes.formulario} noValidate autoComplete="off">
                                <input id="proId" value={this.state.proId} onChange={this.setProId} type="hidden" />
                                <Grid container>
                                    <Grid item xs={2}>
                                        <fieldset className={classes.legenda}>
                                            <legend>Gênero</legend>
                                            <select id="selectGenero" onChange={this.onSelect} value={this.state.genId}>
                                                {this.state.generos}
                                            </select>
                                        </fieldset>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <fieldset className={classes.legenda}>
                                            <legend>Tipo do processo</legend>
                                            <select id="selectTiposProcesso" onChange={this.setTprId} value={this.state.tprId}>
                                                {this.state.tiposProcesso}
                                            </select>
                                        </fieldset>
                                    </Grid>
                                </Grid>
                            </form>
                            <br />
                            <Button id="btnSalva" variant="contained" color="primary" onClick={this.salva}>
                                <SalvaIcon />Salvar
                            </Button>&nbsp;
                        </CardContent>
                    </Card>
                </Grid>
                </Grid>

            </div>
        )
      }

}

export default withStyles(styles)(CriarProcesso);



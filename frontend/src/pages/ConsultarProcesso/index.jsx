import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './estilos';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import axios from '../../configs/axiosConfig';
require('dotenv').config();

class ConsultarProcesso extends Component {

    constructor( props, context ) {
        super(props, context);
        this.state = {
            erro: '',
            proCodigo: '',

        }
    }

    setProCodigo = event => {
        const re = /^[0-9\/\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                proCodigo: event.target.value
            });
        }
    };

    onKeyPressed = (e) => {
        if (e.keyCode === 111 || e.keyCode === 191){
            if (this.state.proCodigo.length === 1){
                this.setState({
                    proCodigo: '0000'+this.state.proCodigo
                });
            }
            if (this.state.proCodigo.length === 2){
                this.setState({
                    proCodigo: '000'+this.state.proCodigo
                });
            }
            if (this.state.proCodigo.length === 3){
                this.setState({
                    proCodigo: '00'+this.state.proCodigo
                });
            }
            if (this.state.proCodigo.length === 4){
                this.setState({
                    proCodigo: '0'+this.state.proCodigo
                });
            }
            if (this.state.proCodigo.length === 5){
                this.setState({
                    proCodigo: this.state.proCodigo
                });
            }
        } else{
            if (this.state.proCodigo.length === 5 && e.keyCode !== 8){
                this.setState({
                    proCodigo: this.state.proCodigo + '/'
                });
            }
        }
    }

    consultaProcesso = () => {
        const codigo = this.state.proCodigo;
        this.setState({
            erro: ''
        });
        if (codigo.trim() === ''){
            this.setState({
                erro: 'Código do processo em branco.'
            });
            return;
        }
        axios({
            method: "POST",
            url: "/processo-por-codigo/",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
            data: { proCodigo: codigo }
        })
        .then(res => {
            if (res.data === null) {
                this.setState({
                    erro: 'Código do processo inválido ou inexistente.'
                });
                return;
            }
            this.props.history.push('/dados-processo/'+res.data.pro_id);
        })
        .catch(err => {
            console.log("Erro ao carregar processo por código."+err);
            return;
        });

    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Consultar processo"/>
                <Menu/>
                    <Card>
                        <CardHeader title="Consultar processos" className={classes.fundoHeader}></CardHeader>
                        <CardContent>
                            <div className={classes.containerConsultaProcesso}>
                                <fieldset className={classes.fieldSetConsultaProcesso}>
                                <legend><span className={classes.legendConsultaProcesso}>Código (número/ano)</span></legend>
                                    <div className={classes.containerConsultaProcessoCampo}>
                                        <input id="proCodigo" name="proCodigo" value={this.state.proCodigo} onKeyDown={this.onKeyPressed} onChange={this.setProCodigo} type="text" size="10" maxLength="10" className={classes.textoCampos} autoFocus/>
                                        <Button id="btnConsultaProcesso" variant="contained" color="primary" onClick={this.consultaProcesso} ><SearchIcon />Consultar</Button>
                                    </div>
                                </fieldset>
                                <div className={classes.mensagemConsultaCodigo}><span className={classes.erro}>{ this.state.erro }</span></div>
                            </div>
                        </CardContent>
                    </Card>

            </div>
        )
    }
}

export default withStyles(styles)(ConsultarProcesso);



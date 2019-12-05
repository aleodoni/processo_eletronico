import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './estilos';
import Menu from '../Menu';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../Autorizacao';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

class DadosProcesso extends Component {

    constructor( props, context ) {
        super(props, context);
        this.state = {
            erro: '',
            proId: this.props.match.params.id,
            proCodigo: '',
            proIniciativa: '',
            proTipoIniciativa: '',
            proMatricula: '',
            proNome: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            genNome: '',
            tprNome: '',
            proEncerramento: '',
            proAssunto: '',
            proAutuacao: '',
            usuAutuador: '',
            proUltimoTramite: '',
            visualizacao: '',
            usuFinalizador: '',
            proContatoPj: '',
            fluNome: '',
            areaAtualProcesso: '',
            areaIniciativaProcesso: '',
            setorAutuadorProcesso: '',
            setorFinalizadorProcesso: ''
        }
        this.carregaDadosProcesso(this.state.proId);
    }

    componentDidMount() {

    }

    carregaDadosProcesso = (proId) => {
        axios({
            method: 'GET',
            url: '/ver-processo/'+proId,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            this.setState({
                proCodigo: res.data.pro_codigo,
                proIniciativa: res.data.pro_iniciativa,
                proTipoIniciativa: res.data.pro_tipo_iniciativa,
                proMatricula: res.data.pro_matricula,
                proNome: res.data.pro_nome,
                proFone: res.data.pro_fone,
                proCelular: res.data.pro_celular,
                proEmail: res.data.pro_email,
                proCpf: res.data.cpf,
                proCnpj: res.data.cnpj,
                proEncerramento: res.data.pro_encerramento,
                genNome: res.data.gen_nome,
                tprNome: res.data.tpr_nome,
                proAssunto: res.data.pro_assunto,
                proAutuacao: res.data.pro_autuacao,
                usuAutuador: res.data.usu_autuador,
                proUltimoTramite: res.data.pro_ultimo_tramite,
                visualizacao: res.data.visualizacao,
                usuFinalizador: res.data.usu_finalizador,
                proContatoPj: res.data.pro_contato_pj,
                fluNome: res.data.flu_nome,
                areaAtualProcesso: res.data.area_atual_processo,
                areaIniciativaProcesso: res.data.area_iniciativa_processo,
                setorAutuadorProcesso: res.data.setor_autuador_processo,
                setorFinalizadorProcesso: res.data.setor_finalizador_processo,
            });
        })
        .catch(err => {
            this.setState({ erro: 'Erro ao retornar dados do processo.' });
        });
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Dados processo"/>
                <Menu/>
                    <Card>
                        <CardHeader title={"Processo "+this.state.proCodigo} className={classes.fundoHeader}></CardHeader>
                        <CardContent>
                            <div className={classes.erro} dangerouslySetInnerHTML={{__html: this.state.erro}}></div>
                            <form className={classes.formulario} noValidate autoComplete="off">
                                <input id="proId" value={this.state.proId} type="hidden" />
                            </form>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Iniciativa:</label>
                                <div className={classes.descDados}>{this.state.proIniciativa}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Tipo iniciativa:</label>
                                <div className={classes.descDados}>{this.state.proTipoIniciativa}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Matrícula:</label>
                                <div className={classes.descDados}>{this.state.proMatricula}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Nome:</label>
                                <div className={classes.descDados}>{this.state.proNome}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Cpf:</label>
                                <div className={classes.descDados}>{this.state.proCpf}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Cnpj:</label>
                                <div className={classes.descDados}>{this.state.proCnpj}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Fone:</label>
                                <div className={classes.descDados}>{this.state.proFone}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Celular:</label>
                                <div className={classes.descDados}>{this.state.proCelular}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Email:</label>
                                <div className={classes.descDados}>{this.state.proEmail}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Encerramento:</label>
                                <div className={classes.descDados}>{this.state.proEncerramento}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Assunto:</label>
                                <div className={classes.descDados}>{this.state.proAssunto}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Autuação:</label>
                                <div className={classes.descDados}>{this.state.proAutuacao}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Usuário autuador:</label>
                                <div className={classes.descDados}>{this.state.usuAutuador}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Último trâmite:</label>
                                <div className={classes.descDados}>{this.state.proUltimoTramite}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Usuário finalizador:</label>
                                <div className={classes.descDados}>{this.state.usuFinalizador}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Contato PJ:</label>
                                <div className={classes.descDados}>{this.state.proContatoPj}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Fluxo:</label>
                                <div className={classes.descDados}>{this.state.fluNome}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Área atual do processo:</label>
                                <div className={classes.descDados}>{this.state.areaAtualProcesso}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Área de iniciativa do processo:</label>
                                <div className={classes.descDados}>{this.state.areaIniciativaProcesso}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Setor do autuador do processo:</label>
                                <div className={classes.descDados}>{this.state.setorAutuadorProcesso}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Setor do finalizador do processo:</label>
                                <div className={classes.descDados}>{this.state.setorFinalizadorProcesso}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Gênero:</label>
                                <div className={classes.descDados}>{this.state.genNome}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Tipo do processo:</label>
                                <div className={classes.descDados}>{this.state.tprNome}</div>
                            </div>
                            <div className={classes.containerDados}>
                                <label className={classes.tituloDados}>Visualização:</label>
                                <div className={classes.descDados}>{this.state.visualizacao}</div>
                            </div>
                        </CardContent>
                    </Card>

            </div>
        )
    }
}

export default withStyles(styles)(DadosProcesso);



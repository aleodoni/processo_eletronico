import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './estilos';
import Menu from '../Menu';
import axios from '../../configs/axiosConfig';
import Autorizacao from '../Autorizacao';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AnexoIcon from '@material-ui/icons/AttachFile';
import CriaManifestacaoIcon from '@material-ui/icons/Create';
import TramitaIcon from '@material-ui/icons/CallSplit';
import OKIcon from '@material-ui/icons/Check';
import Modal from '@material-ui/core/Modal';
require('dotenv').config();

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
            setorFinalizadorProcesso: '',
            show: false,
            mensagemModal: ''
        }
        this.carregaDadosProcesso(this.state.proId);
    }

    componentDidMount() {

    }

    carregaAnexo = e =>{
        console.log(e.target.files[0]);
        this.setState({
            mensagemModal: ''
        })
        const tamanhoAnexo = process.env.REACT_APP_TAMANHO_ANEXO;
        const tamanhoAnexoMB = Math.round((tamanhoAnexo / 1024)/1024);
        if (e.target.files[0].size <= tamanhoAnexo){
            if (e.target.files[0].type === 'application/pdf'){
                const data = new FormData()
                data.append('file', e.target.files[0]);
            }else{
                this.setState({
                    show: true,
                    mensagemModal: 'São válidos somente arquivos PDF.'
                })
            }
        }else{
            this.setState({
                show: true,
                mensagemModal: 'Arquivo maior que '+tamanhoAnexoMB+'MB.'
            })
        }
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

    fechaModal = () => {
        this.setState({ show: false });
    };

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
                            <input id="proId" value={this.state.proId} type="hidden" />
                            <div className={classes.containerIniciativa}>
                                <fieldset className={classes.fieldSetIniciativa}>
                                    <legend><span className={classes.legendIniciativa}>Iniciativa</span></legend>
                                    <div className={classes.descDadosIniciativa}>{this.state.proIniciativa} - {this.state.proTipoIniciativa}</div>
                                </fieldset>
                            </div>
                            <div className={classes.containerDados}>
                                <fieldset className={classes.fieldSetIniciativa}>
                                <legend><span className={classes.legendIniciativa}>Dados da Iniciativa</span></legend>
                                { this.state.proMatricula
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Matrícula:</label>
                                          <div className={classes.descDados}>{this.state.proMatricula}</div>
                                      </div>
                                    : null
                                }
                                <div className={classes.containerDados}>
                                    <label className={classes.tituloDados}>Nome:</label>
                                    <div className={classes.descDados}>{this.state.proNome}</div>
                                </div>
                                { this.state.proCpf
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Cpf:</label>
                                          <div className={classes.descDados}>{this.state.proCpf}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proCnpj
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Cnpj:</label>
                                          <div className={classes.descDados}>{this.state.proCnpj}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proFone
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Fone:</label>
                                          <div className={classes.descDados}>{this.state.proFone}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proCelular
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Celular:</label>
                                          <div className={classes.descDados}>{this.state.proCelular}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proEmail
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Email:</label>
                                          <div className={classes.descDados}>{this.state.proEmail}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proContatoPj
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Contato PJ:</label>
                                          <div className={classes.descDados}>{this.state.proContatoPj}</div>
                                      </div>
                                    : null
                                }
                                </fieldset>
                            </div>
                            <div className={classes.containerDados}>
                                <fieldset className={classes.fieldSetIniciativa}>
                                <legend><span className={classes.legendIniciativa}>Dados do processo</span></legend>
                                { this.state.genNome
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Gênero:</label>
                                          <div className={classes.descDados}>{this.state.genNome}</div>
                                      </div>
                                    : null
                                }
                                { this.state.tprNome
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Tipo do processo:</label>
                                          <div className={classes.descDados}>{this.state.tprNome}</div>
                                      </div>
                                    : null
                                }
                                { this.state.visualizacao
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Visualização:</label>
                                          <div className={classes.descDados}>{this.state.visualizacao}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proAssunto
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Assunto:</label>
                                          <div className={classes.descDados}>{this.state.proAssunto}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proAutuacao
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Autuação:</label>
                                          <div className={classes.descDados}>{this.state.proAutuacao}</div>
                                      </div>
                                    : null
                                }
                                { this.state.usuAutuador
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Usuário autuador:</label>
                                          <div className={classes.descDados}>{this.state.usuAutuador} - {this.state.setorAutuadorProcesso}</div>
                                      </div>
                                    : null
                                }
                                { this.state.fluNome
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Fluxo:</label>
                                          <div className={classes.descDados}>{this.state.fluNome}</div>
                                      </div>
                                    : null
                                }
                                { this.state.areaAtualProcesso
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Área atual do processo:</label>
                                          <div className={classes.descDados}>{this.state.areaAtualProcesso}</div>
                                      </div>
                                    : null
                                }
                                { this.state.areaIniciativaProcesso
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Área de iniciativa do processo:</label>
                                          <div className={classes.descDados}>{this.state.areaIniciativaProcesso}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proUltimoTramite
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Último trâmite:</label>
                                          <div className={classes.descDados}>{this.state.proUltimoTramite}</div>
                                      </div>
                                    : null
                                }
                                { this.state.proEncerramento
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Encerramento:</label>
                                          <div className={classes.descDados}>{this.state.proEncerramento}</div>
                                      </div>
                                    : null
                                }
                                { this.state.usuFinalizador
                                    ? <div className={classes.containerDados}>
                                          <label className={classes.tituloDados}>Usuário finalizador:</label>
                                          <div className={classes.descDados}>{this.state.usuFinalizador} - {this.state.setorFinalizadorProcesso}</div>
                                      </div>
                                    : null
                                }
                                </fieldset>
                            </div>
                            <div className={classes.containerBotoes}>
                                <label className={classes.labelUpload} htmlFor="anexo"><AnexoIcon fontSize="small" className={classes.ajustaIcone}/>INSERIR ANEXO</label>
                                <input className={classes.campoUpload} type="file" name="file" onChange={this.carregaAnexo} id="anexo"/>
                                <Button id="btnCriaManifestacao" variant="contained" color="primary" onClick={this.manifestacao}><CriaManifestacaoIcon />Criar manifestação</Button>
                                <Button id="btnTramita" className={classes.botaoTramita} variant="contained" color="primary" onClick={this.tramite}><TramitaIcon />Tramitar</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Modal open={this.state.show} onClose={this.fechaModal}>
                    <div className={classes.modal}>
                        <h3>{this.state.mensagemModal}</h3>
                        <div>
                            <Button variant="contained" color="primary" type="submit" startIcon={<OKIcon />} onClick={this.fechaModal}>Ok</Button>
                        </div>
                    </div>
                    </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(DadosProcesso);



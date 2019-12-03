import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './estilos';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
import axios from '../../configs/axiosConfig';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SalvaIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';

class CriarProcesso extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            erro: '',
            proId: undefined,
            genId: '',
            areaId: '',
            tprId: '',
            tiposProcesso: [],
            tiposIniciativa: [],
            pro_iniciativa: '',
            proNome: '',
            proMatricula: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: '',
            generos: [],
            areas: [],
            salva: false,
            desabilitaMatricula: true,
            desabilitaNomeIniciativa: true,
            desabilitaCpf: true,
            desabilitaCnpj: true,
            desabilitaFone: true,
            desabilitaCelular: true,
            desabilitaEmail: true,
            tipoIniciativaVisivel: false,
            matriculaVisivel: false,
            nomeVisivel: false,
            dadosServidorPublico: false,
            emailVisivel: false,
            cnpjVisivel: false,
            areaVisivel: false,
            assuntoVisivel: false
        }
        this.setProId = this.setProId.bind(this);
        this.setGenId = this.setGenId.bind(this);
        this.setAreaId = this.setAreaId.bind(this);
        this.setGeneros = this.setGeneros.bind(this);
        this.setAreas = this.setAreas.bind(this);
        this.setTprId = this.setTprId.bind(this);
        this.setTiposProcesso = this.setTiposProcesso.bind(this);
        this.setTiposIniciativa = this.setTiposIniciativa.bind(this);
        this.setProIniciativa = this.setProIniciativa.bind(this);
        this.setProNome = this.setProNome.bind(this);
        this.setProMatricula = this.setProMatricula.bind(this);
        this.setProCpf = this.setProCpf.bind(this);
        this.setProCnpj = this.setProCnpj.bind(this);
        this.setProFone = this.setProFone.bind(this);
        this.setProCelular = this.setProCelular.bind(this);
        this.setProEmail = this.setProEmail.bind(this);
        this.setProAssunto = this.setProAssunto.bind(this);
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
        });
    };

    setAreaId = event => {
        this.setState({
            areaId: event.target.value,
        });
    };

    setTprId = event => {
        if (event.target.value === '26'){
            this.setState({
                assuntoVisivel: true
            });
        }else{
            this.setState({
                assuntoVisivel: false
            });
        }
        this.setState({
            tprId: event.target.value,
        });
    };

    setProIniciativa = event => {
        this.setState({
            proIniciativa: event.target.value,
        });
    };

    setTiposProcesso = event => {
        this.setState({
            tiposProcesso: event.target.value,
        });
    };

    setTiposIniciativa = event => {
        this.setState({
            tiposIniciativa: event.target.value,
        });
    };

    setGeneros = event => {
        this.setState({
            generos: event.target.value,
        });
    };

    setAreas = event => {
        this.setState({
            areas: event.target.value,
        });
    };

    setProNome = event => {
        this.setState({
            proNome: event.target.value,
        });
    };

    setProAssunto = event => {
        this.setState({
            proAssunto: event.target.value,
        });
    };

    setProMatricula = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                proMatricula: event.target.value
            });
        }
    };

    setProCpf = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                proCpf: event.target.value
            });
        }
    };

    setProCnpj = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                proCnpj: event.target.value
            });
        }
    };

    setProFone = event => {
        this.setState({
            proFone: event.target.value,
        });
    };

    setProCelular = event => {
        this.setState({
            proCelular: event.target.value,
        });
    };

    setProEmail = event => {
        this.setState({
            proEmail: event.target.value,
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

    carregaTipoIniciativa = (event) => {
        this.limpaCamposIniciativa();
        this.setState({
            erro: ''
        });
        const selectedIndex = event.target.options.selectedIndex;
        const iniciativa = event.target.options[selectedIndex].getAttribute('data-key');
        if (iniciativa !== ''){
            let comboTipoIniciativa = [];
            this.setState({
                tipoIniciativaVisivel: true
            });
            if (iniciativa === 'Interna') {
                comboTipoIniciativa.push(<option key="" data-key="" value="">Selecione...</option>);
                comboTipoIniciativa.push(<option key="Servidor Público" data-key="Servidor Público" value="Servidor Público">Servidor Público</option>);
                comboTipoIniciativa.push(<option key="Diretorias" data-key="Diretorias" value="Diretorias">Diretorias</option>);
                this.setState({
                    cnpjVisivel: false,
                    areaVisivel: false,
                    matriculaVisivel: false,
                    nomeVisivel: false,
                    dadosServidorPublico: false,
                    emailVisivel: false,
                    assuntoVisivel: false
                })
            }
            if (iniciativa === 'Externa') {
                comboTipoIniciativa.push(<option key="" data-key="" value="">Selecione...</option>);
                comboTipoIniciativa.push(<option key="Pessoa Física" data-key="Pessoa Física" value="Pessoa Física">Pessoa Física</option>);
                comboTipoIniciativa.push(<option key="Pessoa Jurídica" data-key="Pessoa Jurídica" value="Pessoa Jurídica">Pessoa Jurídica</option>);
                this.setState({
                    cnpjVisivel: false,
                    matriculaVisivel: false,
                    nomeVisivel: false,
                    dadosServidorPublico: false,
                    emailVisivel: false,
                    areaVisivel: false,
                    assuntoVisivel: false
                })
            }
            this.setState({ tiposIniciativa: comboTipoIniciativa });
        }else{
            this.setState({
                tipoIniciativaVisivel: false,
                matriculaVisivel: false,
                nomeVisivel: false,
                dadosServidorPublico: false,
                emailVisivel: false,
                cnpjVisivel: false,
                areaVisivel: false,
                assuntoVisivel: false
            });
            this.iniciaTipoProcesso();
        }
    }

    carregaDadosIniciativa = (event) => {
        this.limpaCamposIniciativa();
        this.setState({
            erro: ''
        });
        const selectedIndex = event.target.options.selectedIndex;
        const tipoIniciativa = event.target.options[selectedIndex].getAttribute('data-key');
        if (tipoIniciativa !== ''){
            if (tipoIniciativa === 'Servidor Público'){
                this.setState({
                    matriculaVisivel: true,
                    nomeVisivel: true,
                    dadosServidorPublico: true,
                    emailVisivel: true,
                    cnpjVisivel: false,
                    areaVisivel: false,
                    assuntoVisivel: false
                });
            }
            if (tipoIniciativa === 'Diretorias'){
                this.carregaArea();
                this.setState({
                    matriculaVisivel: false,
                    nomeVisivel: false,
                    dadosServidorPublico: false,
                    emailVisivel: false,
                    cnpjVisivel: false,
                    areaVisivel: true,
                    assuntoVisivel: false
                });
            }
            if (tipoIniciativa === 'Pessoa Física'){
                this.setState({
                    matriculaVisivel: false,
                    nomeVisivel: true,
                    dadosServidorPublico: true,
                    emailVisivel: true,
                    cnpjVisivel: false,
                    areaVisivel: false,
                    assuntoVisivel: false
                });
            }
            if (tipoIniciativa === 'Pessoa Jurídica'){
                this.setState({
                    matriculaVisivel: false,
                    nomeVisivel: true,
                    dadosServidorPublico: false,
                    emailVisivel: true,
                    cnpjVisivel: true,
                    areaVisivel: false,
                    assuntoVisivel: false
                });
            }
        }else{
           this.setState({
               matriculaVisivel: false,
               nomeVisivel: false,
               dadosServidorPublico: false,
               emailVisivel: false,
               cnpjVisivel: false,
               areaVisivel: false,
               assuntoVisivel: false
           });
        }

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

    carregaArea = () => {
        axios({
            method: "GET",
            url: "/area",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                let comboArea = [];
                comboArea.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboArea.push(
                        <option
                            key={res.data[i].set_id}
                            data-key={res.data[i].set_id}
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

    criaProcesso = () => {
        this.setState({erro: ''});
        if (this.state.tprId === ''){
            this.setState({erro: 'Selecione o tipo do processo.'});
            return;
        }else{
            this.setState({erro: ''});
        }
    }

    limpaCamposIniciativa = () => {
        this.setState({
            proNome: '',
            proMatricula: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: ''
        });
    }

    testaCPF = cpf => {
        let soma;
        var resto;
        soma = 0;
        if (cpf === "00000000000") return false;

        for (let i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    };

    localiza = () => {
        this.setState({
            proNome: '',
            proCpf: '',
            proCnpj: '',
            proFone: '',
            proCelular: '',
            proEmail: '',
            proAssunto: '',
            erro: '',
        });
        axios({
            method: "GET",
            url: "/dados-pessoa/"+this.state.proMatricula,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            if (res.data === null){
                this.setState({
                    proMatricula: '',
                });
            }else{
                if (res.data.pes_email !== null){
                    res.data.pes_email = res.data.pes_email.toLowerCase();
                }
                this.setState({
                    proNome: res.data.pes_nome,
                    proCpf: res.data.pes_cpf,
                    proFone: res.data.fone,
                    proCelular: res.data.pes_celular,
                    proEmail: res.data.pes_email,
                });
            }
        })
        .catch(err => {
            this.setState({ erro: "Erro ao carregar dados de pessoa." });
        });
    }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Criar processo"/>
                <Menu/>
                    <Card>
                        <CardHeader title="Novo processo" className={classes.fundoHeader}></CardHeader>
                        <CardContent>
                            <div className={classes.erro}>{this.state.erro}</div>
                            <form className={classes.formulario} noValidate autoComplete="off">
                                <input id="proId" value={this.state.proId} onChange={this.setProId} type="hidden" />
                                <div className={classes.containerIniciativa}>
                                    <fieldset className={classes.fieldSetIniciativa}>
                                        <legend><span className={classes.legendIniciativa}>Iniciativa</span></legend>
                                        <select id="selectIniciativa" onChange={this.carregaTipoIniciativa} value={this.state.proIniciativa}>
                                            <option key="" data-key="" value="">Selecione...</option>
                                            <option key="Interna" data-key="Interna" value="Interna">Interna</option>
                                            <option key="Externa" data-key="Externa" value="Externa">Externa</option>
                                        </select>
                                    </fieldset>
                                    { this.state.tipoIniciativaVisivel
                                        ? <fieldset className={classes.fieldSetIniciativa}>
                                              <legend><span className={classes.legendIniciativa}>Tipo da iniciativa</span></legend>
                                              <select id="selectTipoIniciativa" onChange={this.carregaDadosIniciativa} value={this.state.proTipoIniciativa}>
                                                  {this.state.tiposIniciativa}
                                              </select>
                                          </fieldset>
                                        : null
                                    }
                                    { this.state.matriculaVisivel
                                        ? <fieldset className={classes.fieldSetMatricula}>
                                              <legend className={classes.legendIniciativa}>Matrícula</legend>
                                              <input id="proMatricula" name="proMatricula" value={this.state.proMatricula} onChange={this.setProMatricula} type="text" size="5" maxLength="5" className={classes.textoCampos}/>&nbsp;&nbsp;
                                              <Button id="btnLocaliza" variant="contained" color="primary" onClick={this.localiza}><SearchIcon />Localizar</Button>
                                          </fieldset>
                                        : null
                                    }
                                    { this.state.areaVisivel
                                        ? <fieldset className={classes.fieldSetMatricula}>
                                              <legend className={classes.legendIniciativa}>Área</legend>
                                              <select id="selectArea" value={this.state.areaId} onChange={this.setAreaId}>
                                                  {this.state.areas}
                                              </select>
                                          </fieldset>
                                        : null
                                    }
                                </div>
                                { this.state.nomeVisivel
                                    ? <div className={classes.containerNome}>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>Nome</legend>
                                              <input id="proNome" name="proNome" value={this.state.proNome} onChange={this.setProNome} type="text" size="100" maxLength="100" className={classes.textoCampos}/>
                                          </fieldset>
                                      </div>
                                    : null
                                }
                                { this.state.dadosServidorPublico
                                    ? <div className={classes.containerDadosServidorPublico}>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>Cpf</legend>
                                              <input id="proCpf" name="proCpf" value={this.state.proCpf} onChange={this.setProCpf} type="text" size="10" maxLength="11" className={classes.textoCampos}/>
                                          </fieldset>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>Fone</legend>
                                              <input id="proFone" name="proFone" value={this.state.proFone} onChange={this.setProFone} type="text" size="30" maxLength="30" className={classes.textoCampos}/>
                                          </fieldset>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>Celular</legend>
                                              <input id="proCelular" name="proCelular" value={this.state.proCelular} onChange={this.setProCelular} type="text" size="30" maxLength="30" className={classes.textoCampos}/>
                                          </fieldset>
                                      </div>
                                    : null
                                }
                                { this.state.cnpjVisivel
                                    ? <div className={classes.containerDadosServidorPublico}>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>Cnpj</legend>
                                              <input id="proCnpj" name="proCnpj" value={this.state.proCnpj} onChange={this.setProCnpj} type="text" size="12" maxLength="14" className={classes.textoCampos}/>
                                          </fieldset>
                                      </div>
                                    : null
                                }
                                { this.state.emailVisivel
                                    ? <div className={classes.containerNome}>
                                          <fieldset className={classes.fieldSetNome}>
                                              <legend className={classes.legendIniciativa}>E-mail</legend>
                                              <input id="proEmail" name="proEmail" value={this.state.proEmail} onChange={this.setProEmail} type="text" size="100" maxLength="100" className={classes.textoCampos}/>
                                          </fieldset>
                                      </div>
                                    : null
                                }
                                <div className={classes.containerCriaProcesso}>
                                    <fieldset className={classes.fieldSetNome}>
                                        <legend><span className={classes.tituloObrigatorio}>Gênero</span></legend>
                                        <select id="selectGenero" onChange={this.onSelect} value={this.state.genId}>
                                           {this.state.generos}
                                        </select>
                                    </fieldset>
                                    <fieldset className={classes.fieldSetNome}>
                                        <legend><span className={classes.tituloObrigatorio}>Tipo do processo</span></legend>
                                        <select id="selectTiposProcesso" onChange={this.setTprId} value={this.state.tprId}>
                                            {this.state.tiposProcesso}
                                        </select>
                                    </fieldset>
                                </div>
                                { this.state.assuntoVisivel
                                    ? <div className={classes.containerAssunto}>
                                          <fieldset className={classes.fieldSetAssunto}>
                                              <legend className={classes.legendIniciativa}>Assunto</legend>
                                              <textarea id="proAssunto" name="proAssunto" rows="3" cols="100" value={this.state.proAssunto} onChange={this.setProAssunto} className={classes.textoCamposArea}/>
                                          </fieldset>
                                      </div>
                                    : null
                                }
                            </form>
                            <Button id="btnCriaProcesso" variant="contained" color="primary" onClick={this.criaProcesso}>
                                <SalvaIcon />Criar processo
                            </Button>&nbsp;
                        </CardContent>
                    </Card>

            </div>
        )
      }

}

export default withStyles(styles)(CriarProcesso);



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
            tprId: '',
            tiposProcesso: [],
            tinId: '',
            tiposIniciativa: [],
            iniNome: '',
            iniMatricula: '',
            iniCpf: '',
            iniCnpj: '',
            iniFone: '',
            iniCelular: '',
            iniEmail: '',
            proAssunto: '',
            generos: [],
            salva: false,
            teste: '',
            desabilitaMatricula: true,
            desabilitaNomeIniciativa: true,
            desabilitaCpf: true,
            desabilitaCnpj: true,
            desabilitaFone: true,
            desabilitaCelular: true,
            desabilitaEmail: true,
            cssCampo: props.classes.campoDesabilitado,
            cssTitulo: props.classes.tituloDesabilitado,
            cssCampoMatricula: props.classes.campoDesabilitado,
            cssTituloMatricula: props.classes.tituloDesabilitado,
            cssCampoCpf: props.classes.campoDesabilitado,
            cssTituloCpf: props.classes.tituloDesabilitado,
            cssCampoCnpj: props.classes.campoDesabilitado,
            cssTituloCnpj: props.classes.tituloDesabilitado,
            cssCampoFone: props.classes.campoDesabilitado,
            cssTituloFone: props.classes.tituloDesabilitado,
            cssCampoCelular: props.classes.campoDesabilitado,
            cssTituloCelular: props.classes.tituloDesabilitado,
            cssCampoEmail: props.classes.campoDesabilitado,
            cssTituloEmail: props.classes.tituloDesabilitado,
        }
        this.setProId = this.setProId.bind(this);
        this.setGenId = this.setGenId.bind(this);
        this.setGeneros = this.setGeneros.bind(this);
        this.setTprId = this.setTprId.bind(this);
        this.setTiposProcesso = this.setTiposProcesso.bind(this);
        this.setTinId = this.setTinId.bind(this);
        this.setTiposIniciativa = this.setTiposIniciativa.bind(this);
        this.setIniNome = this.setIniNome.bind(this);
        this.setIniMatricula = this.setIniMatricula.bind(this);
        this.setIniCpf = this.setIniCpf.bind(this);
        this.setIniCnpj = this.setIniCnpj.bind(this);
        this.setIniFone = this.setIniFone.bind(this);
        this.setIniCelular = this.setIniCelular.bind(this);
        this.setIniEmail = this.setIniEmail.bind(this);
        this.setProAssunto = this.setProAssunto.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.carregaGenero();
        this.carregaTipoIniciativa();
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

    setTinId = event => {
        this.setState({
            tinId: event.target.value,
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

    setIniNome = event => {
        this.setState({
            iniNome: event.target.value,
        });
    };

    setProAssunto = event => {
        this.setState({
            proAssunto: event.target.value,
        });
    };

    setIniMatricula = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                iniMatricula: event.target.value
            });
        }
    };

    setIniCpf = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                iniCpf: event.target.value
            });
        }
    };

    setIniCnpj = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            this.setState({
                iniCnpj: event.target.value
            });
        }
    };

    setIniFone = event => {
        this.setState({
            iniFone: event.target.value,
        });
    };

    setIniCelular = event => {
        this.setState({
            iniCelular: event.target.value,
        });
    };

    setIniEmail = event => {
        this.setState({
            iniEmail: event.target.value,
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

    carregaTipoIniciativa = () => {
        axios({
            method: "GET",
            url: "/tipos-de-iniciativa",
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                let comboTipoIniciativa = [];
                comboTipoIniciativa.push(
                    <option key="" data-key="" value="">
                        Selecione...
                    </option>
                );
                for (let i = 0; i < res.data.length; i++) {
                    comboTipoIniciativa.push(
                        <option
                            key={res.data[i].tin_id}
                            data-key={res.data[i].tin_id}
                            value={res.data[i].tin_id}
                        >
                            {res.data[i].tin_nome+' ('+res.data[i].tipo+')'}
                        </option>
                    );
                }
                this.setState({ tiposIniciativa: comboTipoIniciativa });
            })
            .catch(err => {
                this.setState({ erro: "Erro ao carregar tipos de iniciativa." });
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
        this.setState({erro: ''});
        if (this.state.tprId === ''){
            this.setState({erro: 'Selecione o tipo do processo.'});
            return;
        }else{
            this.setState({erro: ''});
        }
    }

    habilitaCampos = (event) => {
        this.setState({erro: ''});
        const selectedIndex = event.target.options.selectedIndex;
        const tinId = event.target.options[selectedIndex].getAttribute('data-key');
        this.setState({ tinId: tinId });
        if (tinId !== ''){
            //Servidor ou Vereador ou Ex-Servidor ou Aposentado
            if (parseInt(tinId) === 2 || parseInt(tinId) === 3){
                this.setState({
                    desabilitaMatricula: false,
                    desabilitaNomeIniciativa: false,
                    desabilitaCpf: false,
                    desabilitaCnpj: true,
                    desabilitaFone: false,
                    desabilitaCelular: false,
                    desabilitaEmail: false,
                    cssCampo: this.props.classes.campoObrigatorio,
                    cssTitulo: this.props.classes.tituloObrigatorio,
                    cssCampoMatricula: this.props.classes.campoObrigatorio,
                    cssTituloMatricula: this.props.classes.tituloObrigatorio,
                    cssCampoCpf: this.props.classes.campoObrigatorio,
                    cssTituloCpf: this.props.classes.tituloObrigatorio,
                    cssCampoCnpj: this.props.classes.campoDesabilitado,
                    cssTituloCnpj: this.props.classes.tituloDesabilitado,
                    cssCampoFone: this.props.classes.campoDesabilitado,
                    cssTituloFone: this.props.classes.tituloNaoObrigatorio,
                    cssCampoCelular: this.props.classes.campoDesabilitado,
                    cssTituloCelular: this.props.classes.tituloNaoObrigatorio,
                    cssCampoEmail: this.props.classes.campoDesabilitado,
                    cssTituloEmail: this.props.classes.tituloNaoObrigatorio,

                });
            }
            // Assessoria, Controladoria, Departamento, Diretoria, Setor ou Seção ou Outros (interno)
            if (parseInt(tinId) === 4 || parseInt(tinId) === 5){
                this.setState({
                    desabilitaMatricula: true,
                    desabilitaNomeIniciativa: false,
                    desabilitaCpf: true,
                    desabilitaCnpj: true,
                    desabilitaFone: false,
                    desabilitaCelular: true,
                    desabilitaEmail: false,
                    cssCampo: this.props.classes.campoObrigatorio,
                    cssTitulo: this.props.classes.tituloObrigatorio,
                    cssCampoMatricula: this.props.classes.campoDesabilitado,
                    cssTituloMatricula: this.props.classes.tituloDesabilitado,
                    cssCampoCpf: this.props.classes.campoDesabilitado,
                    cssTituloCpf: this.props.classes.tituloDesabilitado,
                    cssCampoCnpj: this.props.classes.campoDesabilitado,
                    cssTituloCnpj: this.props.classes.tituloDesabilitado,
                    cssCampoFone: this.props.classes.campoDesabilitado,
                    cssTituloFone: this.props.classes.tituloNaoObrigatorio,
                    cssCampoCelular: this.props.classes.campoDesabilitado,
                    cssTituloCelular: this.props.classes.tituloDesabilitado,
                    cssCampoEmail: this.props.classes.campoDesabilitado,
                    cssTituloEmail: this.props.classes.tituloNaoObrigatorio,
                });
            }
            // Empresa, Sindicato ou Órgão Estatal
            if (parseInt(tinId) === 6){
                this.setState({
                    desabilitaMatricula: true,
                    desabilitaNomeIniciativa: false,
                    desabilitaCpf: true,
                    desabilitaCnpj: false,
                    desabilitaFone: false,
                    desabilitaCelular: false,
                    desabilitaEmail: false,
                    cssCampo: this.props.classes.campoObrigatorio,
                    cssTitulo: this.props.classes.tituloObrigatorio,
                    cssCampoMatricula: this.props.classes.campoDesabilitado,
                    cssTituloMatricula: this.props.classes.tituloDesabilitado,
                    cssCampoCpf: this.props.classes.campoDesabilitado,
                    cssTituloCpf: this.props.classes.tituloDesabilitado,
                    cssCampoCnpj: this.props.classes.campoObrigatorio,
                    cssTituloCnpj: this.props.classes.tituloObrigatorio,
                    cssCampoFone: this.props.classes.campoDesabilitado,
                    cssTituloFone: this.props.classes.tituloNaoObrigatorio,
                    cssCampoCelular: this.props.classes.campoDesabilitado,
                    cssTituloCelular: this.props.classes.tituloDesabilitado,
                    cssCampoEmail: this.props.classes.campoDesabilitado,
                    cssTituloEmail: this.props.classes.tituloNaoObrigatorio,
                });
            }
            // Outros (externo)
            if (parseInt(tinId) === 7){
                this.setState({
                    desabilitaMatricula: true,
                    desabilitaNomeIniciativa: false,
                    desabilitaCpf: true,
                    desabilitaCnpj: true,
                    desabilitaFone: false,
                    desabilitaCelular: false,
                    desabilitaEmail: false,
                    cssCampo: this.props.classes.campoObrigatorio,
                    cssTitulo: this.props.classes.tituloObrigatorio,
                    cssCampoMatricula: this.props.classes.campoDesabilitado,
                    cssTituloMatricula: this.props.classes.tituloDesabilitado,
                    cssCampoCpf: this.props.classes.campoDesabilitado,
                    cssTituloCpf: this.props.classes.tituloDesabilitado,
                    cssCampoCnpj: this.props.classes.campoDesabilitado,
                    cssTituloCnpj: this.props.classes.tituloDesabilitado,
                    cssCampoFone: this.props.classes.campoDesabilitado,
                    cssTituloFone: this.props.classes.tituloNaoObrigatorio,
                    cssCampoCelular: this.props.classes.campoDesabilitado,
                    cssTituloCelular: this.props.classes.tituloNaoObrigatorio,
                    cssCampoEmail: this.props.classes.campoDesabilitado,
                    cssTituloEmail: this.props.classes.tituloNaoObrigatorio,
                });
            }
        }else{
            this.setState({
                desabilitaMatricula: true,
                desabilitaNomeIniciativa: true,
                desabilitaCpf: true,
                desabilitaCnpj: true,
                desabilitaFone: true,
                desabilitaCelular: true,
                desabilitaEmail: true,
                cssCampo: this.props.classes.campoDesabilitado,
                cssTitulo: this.props.classes.tituloDesabilitado,
                cssCampoMatricula: this.props.classes.campoDesabilitado,
                cssTituloMatricula: this.props.classes.tituloDesabilitado,
                cssCampoCpf: this.props.classes.campoDesabilitado,
                cssTituloCpf: this.props.classes.tituloDesabilitado,
                cssCampoCnpj: this.props.classes.campoDesabilitado,
                cssTituloCnpj: this.props.classes.tituloDesabilitado,
                cssCampoFone: this.props.classes.campoDesabilitado,
                cssTituloFone: this.props.classes.tituloDesabilitado,
                cssCampoCelular: this.props.classes.campoDesabilitado,
                cssTituloCelular: this.props.classes.tituloDesabilitado,
                cssCampoEmail: this.props.classes.campoDesabilitado,
                cssTituloEmail: this.props.classes.tituloDesabilitado,
            });
        }
        this.limpaCamposIniciativa();
    }

    limpaCamposIniciativa = () => {
        this.setState({
            iniNome: '',
            iniMatricula: '',
            iniCpf: '',
            iniCnpj: '',
            iniFone: '',
            iniCelular: '',
            iniEmail: '',
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
            iniNome: '',
            iniCpf: '',
            iniCnpj: '',
            iniFone: '',
            iniCelular: '',
            iniEmail: '',
            erro: '',
        });
        axios({
            method: "GET",
            url: "/dados-pessoa/"+this.state.iniMatricula,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            if (res.data === null){
                this.setState({
                    iniMatricula: '',
                });
            }else{
                if (res.data.pes_email !== null){
                    res.data.pes_email = res.data.pes_email.toLowerCase();
                }
                this.setState({
                    iniNome: res.data.pes_nome,
                    iniCpf: res.data.pes_cpf,
                    iniFone: res.data.fone,
                    iniCelular: res.data.pes_celular,
                    iniEmail: res.data.pes_email,
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
                                <div className={classes.containerTipoIniciativa}>
                                    <fieldset className={classes.campoObrigatorio}>
                                        <legend><span className={classes.tituloObrigatorio}>Tipo de iniciativa</span></legend>
                                        <select id="selectTipoIniciativa" onChange={this.habilitaCampos} value={this.state.tinId}>
                                           {this.state.tiposIniciativa}
                                        </select>
                                    </fieldset>
                                    <fieldset className={this.state.cssCampoMatricula}>
                                        <legend className={this.state.cssTituloMatricula}>Matrícula</legend>
                                        <input id="iniMatricula" name="iniMatricula" value={this.state.iniMatricula} onChange={this.setIniMatricula} type="text" size="5" maxLength="5" className={classes.textoCampos} disabled={this.state.desabilitaMatricula}/>
                                    </fieldset>
                                    <Button id="btnLocaliza" variant="contained" color="primary" onClick={this.localiza} className={classes.botaoLocaliza} disabled={this.state.desabilitaMatricula}>
                                        <SearchIcon />Localizar
                                    </Button>
                                </div>
                                <div className={classes.containerNomeIniciativa}>
                                    <fieldset className={this.state.cssCampo}>
                                        <legend className={this.state.cssTitulo}>Nome da iniciativa</legend>
                                        <input id="iniNome" name="iniNome" value={this.state.iniNome} onChange={this.setIniNome} type="text" size="100" maxLength="100" className={classes.textoCampos} disabled={this.state.desabilitaNomeIniciativa}/>
                                    </fieldset>
                                </div>
                                <div className={classes.containerDadosTipoIniciativa}>
                                    <fieldset className={this.state.cssCampoCpf}>
                                        <legend className={this.state.cssTituloCpf}>Cpf</legend>
                                        <input id="iniCpf" name="iniCpf" value={this.state.iniCpf} onChange={this.setIniCpf} type="text" size="10" maxLength="11" className={classes.textoCampos} disabled={this.state.desabilitaCpf}/>
                                    </fieldset>
                                    <fieldset className={this.state.cssCampoCnpj}>
                                        <legend className={this.state.cssTituloCnpj}>Cnpj</legend>
                                        <input id="iniCnpj" name="iniCnpj" value={this.state.iniCnpj} onChange={this.setIniCnpj} type="text" size="12" maxLength="14" className={classes.textoCampos} disabled={this.state.desabilitaCnpj}/>
                                    </fieldset>
                                    <fieldset className={this.state.cssCampoFone}>
                                        <legend className={this.state.cssTituloFone}>Fone</legend>
                                        <input id="iniFone" name="iniFone" value={this.state.iniFone} onChange={this.setIniFone} type="text" size="30" maxLength="30" className={classes.textoCampos} disabled={this.state.desabilitaFone}/>
                                    </fieldset>
                                    <fieldset className={this.state.cssCampoCelular}>
                                        <legend className={this.state.cssTituloCelular}>Celular</legend>
                                        <input id="iniCelular" name="iniCelular" value={this.state.iniCelular} onChange={this.setIniCelular} type="text" size="30" maxLength="30" className={classes.textoCampos} disabled={this.state.desabilitaCelular}/>
                                    </fieldset>
                                </div>
                                <div className={classes.containerNomeIniciativa}>
                                    <fieldset className={this.state.cssCampoEmail}>
                                        <legend className={this.state.cssTituloEmail}>E-mail</legend>
                                        <input id="iniEmail" name="iniEmail" value={this.state.iniEmail} onChange={this.setIniEmail} type="text" size="100" maxLength="100" className={classes.textoCampos} disabled={this.state.desabilitaEmail}/>
                                    </fieldset>
                                </div>
                                <div className={classes.containerCriaProcesso}>
                                    <fieldset className={classes.campoObrigatorio}>
                                        <legend><span className={classes.tituloObrigatorio}>Gênero</span></legend>
                                        <select id="selectGenero" onChange={this.onSelect} value={this.state.genId}>
                                           {this.state.generos}
                                        </select>
                                    </fieldset>
                                    <fieldset className={classes.campoObrigatorio}>
                                        <legend><span className={classes.tituloObrigatorio}>Tipo do processo</span></legend>
                                        <select id="selectTiposProcesso" onChange={this.setTprId} value={this.state.tprId}>
                                            {this.state.tiposProcesso}
                                        </select>
                                    </fieldset>
                                </div>
                                <div className={classes.containerAssunto}>
                                    <fieldset className={classes.campoObrigatorio}>
                                        <legend><span className={classes.tituloObrigatorio}>Assunto</span></legend>
                                        <textarea id="proAssunto" name="proAssunto" rows="3" cols="114" maxlength="500" value={this.state.proAssunto} onChange={this.setProAssunto} className={classes.textoCamposArea}/>
                                    </fieldset>
                                </div>
                            </form>
                            <Button id="btnSalva" variant="contained" color="primary" onClick={this.salva}>
                                <SalvaIcon />Salvar
                            </Button>&nbsp;
                        </CardContent>
                    </Card>

            </div>
        )
      }

}

export default withStyles(styles)(CriarProcesso);



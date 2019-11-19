import React, { Component } from 'react';
import { Collapse, Drawer, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import axios from '../../configs/axiosConfig';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import Logo from '../../assets/brasao.png';
import History from 'history';
require('dotenv').config();

const styles = {
  list: {
    width: 300,
    backgroundColor: '#EFF8FB',
  },
  links: {
    textDecoration:'none',
  },
  sair: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    paddingLeft: '40px',
    textDecoration: 'none',
  },
  area: {
    fontSize: '12px',
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 'bold',
    paddingLeft: '5px',
  },
  usuario: {
    fontSize: '12px',
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  modal: {
    position: 'absolute',
    fontFamily: "Arial, Helvetica, sans-serif",
    width: 300,
    border: '2px solid #116FBF',
    backgroundColor: '#FFFFFF',
    left: '40%',
    top: '40%',
    textAlign: 'center',
    padding: '10px;',
  },
  espacoBotoes: {
    width: '15px',
    height: 'auto',
    display: 'inline-block',
  },
  centroMenu: {
    textAlign: 'center',
  },
  imgMenu: {
    width: '50px',
    margin: '10px 0 20px',
  },
  paper: {
    margin: '5px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
  },
  menuHeader: {
    paddingLeft: '30px',
    fontSize: '10px',

  }};

  class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            nomeArea: '',
            nomeSetor: '',
            dataHora: '',
            mostraModalSair: false,
        };
    }

  handleClick( item ) {
    this.setState( prevState => (
      { [ item ]: !prevState[ item ] }
    ) )
  }

  async componentDidMount(){
    const [area, setor, dataHoraAtual, menu] = await Promise.all([
        axios({
            method: "GET",
            url: `area-por-codigo/${sessionStorage.getItem('areaUsuario')}`,
        }),
        axios({
            method: "GET",
            url: `setor-por-codigo/${sessionStorage.getItem('setorUsuario')}`,
        }),
        axios({
            method: "GET",
            url: `data-hora-atual`,
        }),
        axios({
            method: "GET",
            url: `geraMenu/${sessionStorage.getItem('areaUsuario')}`,
        }),
    ]);
    let dados = [];
    let data = JSON.parse(menu.data);
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            dados.push(data[key]);
        }
    }
    this.setState({
        nomeArea: area.data.set_nome,
        nomeSetor: setor.data.set_nome,
        dataHora: 'Data/hora: '+dataHoraAtual.data[0].data_hora_atual,
        data: dados,
    });
  }

  handleOpen = () => {
    this.setState({ mostraModalSair: true });
  };

  handleClose = () => {
    this.setState({ mostraModalSair: false });
  };

  sairSistema = () => {
      window.location.href = '/processo-eletronico';
  }

  handler( children ) {
    const { classes } = this.props
    const { state } = this

    return children.map( ( subOption ) => {
      if ( !subOption.children ) {
        return (
          <div key={ subOption.name }>
            <ListItem
              button
              key={ subOption.name }>
              <Link
                to={ subOption.url }
                className={ classes.links }>
                <ListItemText
                  inset
                  primary={ subOption.name }
                />
              </Link>
            </ListItem>
          </div>
        )
      }
      return (
        <div key={ subOption.name }>
          <ListItem
            button
            onClick={ () => this.handleClick( subOption.name ) }>
            <ListItemText
              inset
              primary={ subOption.name } />
            { state[ subOption.name ] ?
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse
            in={ state[ subOption.name ] }
            timeout="auto"
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse>
        </div>
      )
    } )
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    return (
      <div className={classes.list}>
        <Drawer
          variant="persistent"
          anchor="left"
          open
          classes={ { paper: classes.list } }>
          <div>
            <Paper className={classes.paper}>
                <img src={Logo} alt="Processo Eletrônico" className={classes.imgMenu} /><br />
                <label className={ classes.area }>{this.state.nomeArea}</label><br />
                <label className={ classes.area }>{this.state.nomeSetor}</label><br />
                <label className={ classes.area }>{this.state.dataHora}</label><br />
                <Person />
                <label className={ classes.usuario }>{sessionStorage.getItem('nomeUsuario')}</label>
            </Paper>
            <List>
              { this.handler( this.state.data ) }
            </List>
            <Divider />
            <List>
                <ListItem divider disableGutters>
                    <ExitToApp />
                    <button className={ classes.sair } onClick={this.handleOpen}>
                        <ListItemText className={ classes.menuHeader } inset primary="Sair" />
                    </button>
                </ListItem>
            </List>
          </div>
        </Drawer>
        <Modal open={this.state.mostraModalSair} onClose={this.handleClose}
        >
        <div className={classes.modal}>
          <h3>Deseja sair do sistema?</h3>
          <div>
              <Button variant="contained" color="primary" type="submit" startIcon={<Check />} onClick={this.sairSistema}>
                  Sim
              </Button>
              <div className={classes.espacoBotoes}/>
              <Button variant="contained" color="primary" type="submit" startIcon={<Clear />} onClick={this.handleClose}>
                  Não
              </Button>
          </div>
        </div>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(Menu)

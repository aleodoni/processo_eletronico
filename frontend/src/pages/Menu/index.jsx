import React, { Component } from 'react';
import { Collapse, Drawer, List, ListItem, ListItemText, withStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/PowerSettingsNew';
import Person from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';
import Logo from '../../assets/brasao.png';
import Chip from '@material-ui/core/Chip';
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
    borderRadius: '5px',
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
  },
  paper: {
    margin: '5px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
    paddingBottom: '5px',
  },
  paddingIcone: {
    paddingTop: '10px',
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
            mostraModalSair: false,
        };
    }

  handleClick( item ) {
    this.setState( prevState => (
      { [ item ]: !prevState[ item ] }
    ) )
  }

  async componentDidMount(){
    let dados = [];
    let data = JSON.parse(sessionStorage.getItem('menu'));
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            dados.push(data[key]);
        }
    }
    this.setState({
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
              {(subOption.name === 'Home') ?
              <Link to={ subOption.url } className={ classes.links }>
                  <ListItem button key={ subOption.name }>
                      <HomeIcon /><ListItemText inset primary={ subOption.name }/>
                  </ListItem>
              </Link>
              :
              <Link to={ subOption.url } className={ classes.links }>
                  <ListItem button key={ subOption.name }>
                      <ListItemText inset primary={ subOption.name }/>
                  </ListItem>
              </Link>
              }
          </div>
        )
      }
      return (
        <div key={ subOption.name }>
          <ListItem button onClick={ () => this.handleClick( subOption.name ) }>
              <ListItemText inset primary={ subOption.name } />
              { state[ subOption.name ] ?
                <ExpandLess /> :
                <ExpandMore />
              }
          </ListItem>
          <Collapse in={ state[ subOption.name ] } timeout="auto" unmountOnExit >
              { this.handler( subOption.children ) }
          </Collapse>
        </div>
      )
    } )
  }

  render() {
    const { classes } = this.props;
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
                <label className={ classes.area }>{sessionStorage.getItem('nomeAreaUsuario')}</label><br />
                <label className={ classes.area }>{sessionStorage.getItem('nomeSetorUsuario')}</label><br /><br />
                <Chip label={sessionStorage.getItem('nomeUsuario')} icon={<Person />} color="primary" variant="outlined"/><br />
            </Paper>
            <Divider />
            <List>
              { this.handler( this.state.data ) }
            </List>
            <Divider />
            <List>
                <ListItem divider disableGutters>
                    &nbsp;&nbsp;&nbsp;&nbsp;<ExitToApp />
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

export default withStyles(styles)(Menu);

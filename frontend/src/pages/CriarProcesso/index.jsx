import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';

const styles = {
    lateral: {
      paddingLeft: 300,
    },
    links: {
      textDecoration:'none',
    },
    menuHeader: {
      paddingLeft: '30px'
    }};

class CriarProcesso extends Component {

    constructor( props ) {
        super( props )
        this.state = {}
      }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
                <Autorizacao tela="Criar processo"/>
                <Menu/>
                Criar processo
            </div>
        )
      }

}

export default withStyles(styles)(CriarProcesso);



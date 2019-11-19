import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';

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

class ConsultarProcesso extends Component {

    constructor( props ) {
        super( props )
        this.state = {}
      }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
            <Menu/>
            Consultar processo
            </div>
        )
      }

}

export default withStyles(styles)(ConsultarProcesso)



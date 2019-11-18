import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

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
            Criar processo
            </div>
        )
      }

}

export default withStyles(styles)(CriarProcesso)



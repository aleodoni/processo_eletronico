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

class Home extends Component {

    constructor( props ) {
        super( props )
        this.state = {}
      }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
            Home
            </div>
        )
      }

}

export default withStyles(styles)(Home)

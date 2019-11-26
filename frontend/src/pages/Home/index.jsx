import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Menu from '../Menu';
import Autorizacao from '../Autorizacao';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CriaIcon from '@material-ui/icons/Description';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { styles } from './estilos';

class Home extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
      }

      render() {
        const { classes } = this.props
        return (
            <div className={classes.lateral}>
            <Autorizacao tela="Home"/>
            <Menu/>
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                    <CardHeader title="Acesso rápido" className={classes.fundoHeader} avatar={ <Avatar ><FlashOnIcon/></Avatar> }></CardHeader>
                    <CardContent>
                        <Link to="/processo-cria">
                            <Tooltip title="Criar um novo processo" placement="bottom">
                            <Fab variant="extended" color="primary">
                                <CriaIcon fontSize="large"/><div className={classes.espacoIcone}>Criar processo</div>
                            </Fab>
                            </Tooltip>
                        </Link>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        )
      }

}

export default withStyles(styles)(Home);

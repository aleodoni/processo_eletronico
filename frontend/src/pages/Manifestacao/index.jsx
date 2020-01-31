import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './estilos';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AnexoIcon from '@material-ui/icons/AttachFile';

class ModalManifestacao extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        const { classes } = this.props;
        if (!this.props.show){
            return null;
        }
        return (
            <div>
            <div className={classes.modalPai}></div>
                <div className={classes.modalFilho}>
                    <Card>
                    <CardHeader title={'Manifestação proId:'+this.props.proId} className={classes.fundoHeader}></CardHeader>
                    <CardContent>
                        <div>{this.props.children}</div>
                        <div className={classes.containerBotoes}>
                            <label className={classes.labelUpload} htmlFor="anexo"><AnexoIcon fontSize="small"/>INSERIR ANEXO</label>
                            <input className={classes.campoUpload} type="file" name="file" onChange={this.incluiAnexo} id="anexo"/>
                            <Button variant="contained" color="primary" onClick={e => {this.onClose(e); }}>Fechar</Button>
                        </div>
                    </CardContent>
                    </Card>

                </div>
            </div>
          );
    }
}
  export default withStyles(styles)(ModalManifestacao);

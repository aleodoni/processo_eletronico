import { Component } from 'react';
import axios from '../../configs/axiosConfig';

class Autorizacao extends Component {

    constructor( props ) {
        super( props );
        this.verifica();
    }

    verifica = () => {
        axios({
            method: 'GET',
            url: `telas-por-area/${sessionStorage.getItem('areaUsuario')}`,
            headers: {
                'authorization': sessionStorage.getItem('token'),
            },
        })
        .then(res => {
            const achou = res.data.find(registro => registro.tel_nome === this.props.tela);
            //se não achou não pode ver a tela
            if (achou === undefined){
                window.location.href = '/processo-eletronico';
            }
        })
        .catch(err => {
            alert(err);
        });
    }

    render() {
        return null;
    }
}
export default Autorizacao;

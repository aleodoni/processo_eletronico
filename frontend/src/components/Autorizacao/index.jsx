import { Component } from 'react';
import axios from '../../configs/axiosConfig';

class Autorizacao extends Component {
    constructor(props) {
        super(props);
        this.verifica();
    }

    verifica = () => {
        axios({
            method: 'GET',
            url: `telas-por-area/${sessionStorage.getItem('areaUsuario')}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then(res => {
                const achou = res.data.find(registro => registro.tel_nome === this.props.tela);
                // se não achou não pode ver a tela
                if (achou === undefined) {
                    console.log(`Não achou a permissão para a tela:${this.props.tela}`);
                    window.location.href = '/processo-eletronico';
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return null;
    }
}
export default Autorizacao;

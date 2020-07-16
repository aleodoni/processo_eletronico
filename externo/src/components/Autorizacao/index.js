import { Component } from 'react';
import { toast as mensagem } from 'react-toastify';
import axios from '../../configs/axiosConfig';

class Autorizacao extends Component {
    constructor(props) {
        super(props);
        this.verifica();
    }

    verifica = () => {
        axios({
            method: 'GET',
            url: `telas-por-area/${parseInt(sessionStorage.getItem('areaUsuario'), 10)}`,
            headers: {
                authorization: sessionStorage.getItem('token'),
            },
        })
            .then((res) => {
                const achou = res.data.find((registro) => registro.tel_nome === this.props.tela);
                // se não achou não pode ver a tela
                if (achou === undefined) {
                    mensagem.error(`Não achou a permissão para a tela:${this.props.tela}`);
                    window.location.href = '/processo-eletronico-externo';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return null;
    }
}
export default Autorizacao;

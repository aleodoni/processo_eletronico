import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast as mensagem } from 'react-toastify';

class Autorizacao extends Component {
    constructor(props) {
        super(props);
        this.verifica();
    }

    verifica = () => {
        const permissoes = sessionStorage.getItem('permissoes').toString();
        const permissoesUsuario = permissoes.split(',');
        const p = Array.from(permissoesUsuario);
        const dados = [];
        for (let i = 0; i < p.length; i++) {
            dados.push(p[i]);
        }
        const { tela } = this.props;
        const achou = dados.find(registro => registro === tela);
        if (achou === undefined) {
            mensagem.error(`Não achou a permissão para a tela:${tela}`);
            window.location.href = '/processo-eletronico';
        }
    };

    render() {
        return null;
    }
}

Autorizacao.propTypes = {
    tela: PropTypes.string.isRequired,
};
export default Autorizacao;

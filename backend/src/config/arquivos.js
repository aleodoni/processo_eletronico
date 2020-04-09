require('dotenv/config');

export const destino = process.env.CAMINHO_ARQUIVOS;

export function finalDoCaminho(id) {
    const milhar = Math.floor(id / 1000);
    let retorno = milhar.toString();
    while (retorno.length < 4) {
        retorno = '0' + retorno;
    }
    return retorno + '/';
};

export function nomeFisico(id) {
    let retorno = id.toString();
    while (retorno.length < 7) {
        retorno = '0' + retorno;
    }
    return retorno;
}

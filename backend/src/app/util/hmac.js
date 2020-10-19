// import crypto from 'crypto';
import crypto from 'crypto-js';

// function hmac(texto) {
//     return crypto.createHmac('sha256', process.env.CHAVE).update(texto).digest('hex');
// }

function hmac(texto) {
    const hmac = crypto.HmacSHA256(texto, process.env.CHAVE).toString(crypto.enc.Base64);
    return hmac;
}

module.exports = { hmac };
